#!/usr/bin/env node
/**
 * Copies events from the public "Lavin Events" Google Calendar into
 * src/content/events/ -- one JSON file per event, which the site builds from.
 *
 * Runs every 15 minutes from .github/workflows/deploy.yml, which commits and
 * deploys only when something changed. Also runnable by hand:
 *
 *   npm run calendar:sync
 *
 * The calendar is the source of truth. This script owns src/content/events/:
 * events added, edited, or deleted in the calendar are added, edited, or
 * deleted here.
 *
 * Safety:
 * - It refuses a calendar's "Secret address". That link works even when the
 *   calendar is private, and this repository is public.
 * - If the calendar can't be fetched or parsed, nothing is changed and the
 *   script exits non-zero, so the site keeps its last good events.
 * - If the calendar comes back empty but the site has events, it assumes a
 *   mistake and changes nothing. Set ALLOW_EMPTY=1 to really clear it.
 *
 * Only timed events that start and end on the same day are published. All-day
 * and multi-day events, cancelled ones, and ones marked private are skipped
 * and listed in the output.
 */
import ICAL from 'ical.js';
import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { eventProblems, eventSlug } from '../src/lib/events.js';

const SETTINGS = 'src/content/calendar.json';
// SYNC_OUT_DIR / SYNC_ICS_FILE exist for testing: write elsewhere, and read a
// local .ics instead of fetching.
const OUT = process.env.SYNC_OUT_DIR || 'src/content/events';
const FIXTURE = process.env.SYNC_ICS_FILE;
const TZ = 'America/Los_Angeles';

// Recurring events are expanded within this window.
const DAY = 24 * 60 * 60 * 1000;
const WINDOW_START = Date.now() - 730 * DAY;
const WINDOW_END = Date.now() + 365 * DAY;
const MAX_PER_SERIES = 400;

const fail = (msg) => {
  console.error(`calendar sync: ${msg}`);
  process.exit(1);
};

// ------------------------------------------------------------ settings ----

const url = (JSON.parse(readFileSync(SETTINGS, 'utf8')).publicIcalUrl || '').trim();
if (!url && !FIXTURE) {
  console.log(`calendar sync: no publicIcalUrl in ${SETTINGS} yet; nothing to do.`);
  process.exit(0);
}
if (!FIXTURE && /\/private-[^/]*\//.test(url)) {
  fail(`${SETTINGS} holds a calendar's SECRET address. Use the "Public address in iCal format" instead.`);
}
if (!FIXTURE && !/^https:\/\/calendar\.google\.com\/calendar\/ical\/[^/]+\/public\/basic\.ics$/.test(url)) {
  fail(`${SETTINGS} publicIcalUrl doesn't look like a Google Calendar public iCal address: ${url}`);
}

// --------------------------------------------------------------- fetch ----

let text;
if (FIXTURE) {
  text = readFileSync(FIXTURE, 'utf8');
} else {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
    if (!res.ok) fail(`fetching the calendar returned HTTP ${res.status}. Is "Lavin Events" set to public?`);
    text = await res.text();
  } catch (err) {
    fail(`could not fetch the calendar (${err.message}).`);
  }
}
if (!text.includes('BEGIN:VCALENDAR')) fail('the calendar address did not return a calendar.');

let root;
try {
  root = new ICAL.Component(ICAL.parse(text));
} catch (err) {
  fail(`could not parse the calendar (${err.message}).`);
}
for (const tz of root.getAllSubcomponents('vtimezone')) ICAL.TimezoneService.register(tz);

// ---------------------------------------------------------- conversion ----

const pacific = new Intl.DateTimeFormat('en-CA', {
  timeZone: TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

// An ICAL.Time -> { date: 'YYYY-MM-DD', time: 'HH:MM' } in Pacific time.
function toPacific(t) {
  if (t.zone === ICAL.Timezone.localTimezone) {
    // "Floating" time with no zone: read it as Pacific wall-clock time.
    const pad = (n) => String(n).padStart(2, '0');
    return { date: `${t.year}-${pad(t.month)}-${pad(t.day)}`, time: `${pad(t.hour)}:${pad(t.minute)}` };
  }
  const p = Object.fromEntries(pacific.formatToParts(t.toJSDate()).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}

// Google descriptions can hold HTML, and a trailing Google Meet block.
function cleanDescription(raw) {
  if (!raw) return '';
  return String(raw)
    .split(/-::~:~::~/)[0]
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const skipped = [];
const published = [];

function consider(item, startDate, endDate) {
  const title = (item.summary || '').trim();
  const label = title || '(untitled)';
  const status = (item.component.getFirstPropertyValue('status') || '').toUpperCase();
  const cls = (item.component.getFirstPropertyValue('class') || '').toUpperCase();

  if (status === 'CANCELLED') return;
  if (cls === 'PRIVATE' || cls === 'CONFIDENTIAL') return skipped.push(`${label}: marked private`);
  if (!title) return skipped.push(`an event with no title`);
  if (startDate.isDate) return skipped.push(`${label} (${startDate.toString()}): all-day events aren't shown`);

  const start = toPacific(startDate);
  const end = toPacific(endDate || startDate);
  if (end.date !== start.date) return skipped.push(`${label} (${start.date}): spans more than one day`);

  const event = {
    title,
    date: start.date,
    start: start.time,
    end: end.time,
    location: (item.location || '').trim(),
    desc: cleanDescription(item.description),
  };
  const problems = eventProblems(event);
  if (problems.length) return skipped.push(`${label} (${start.date}): ${problems.join('; ')}`);
  published.push(event);
}

// Group each recurring series with its edited/moved occurrences.
const byUid = new Map();
for (const vevent of root.getAllSubcomponents('vevent')) {
  const ev = new ICAL.Event(vevent);
  const group = byUid.get(ev.uid) || { master: null, exceptions: [] };
  if (ev.isRecurrenceException()) group.exceptions.push(ev);
  else group.master = ev;
  byUid.set(ev.uid, group);
}

for (const { master, exceptions } of byUid.values()) {
  if (!master) {
    // Edited occurrences whose series isn't in the feed: treat as one-offs.
    for (const ex of exceptions) consider(ex, ex.startDate, ex.endDate);
    continue;
  }
  for (const ex of exceptions) master.relateException(ex);

  if (!master.isRecurring()) {
    consider(master, master.startDate, master.endDate);
    continue;
  }
  const it = master.iterator();
  let kept = 0;
  for (let next = it.next(), guard = 0; next && guard < 20_000; next = it.next(), guard++) {
    const ms = next.toJSDate().getTime();
    if (ms > WINDOW_END || kept >= MAX_PER_SERIES) break;
    if (ms < WINDOW_START) continue;
    const occ = master.getOccurrenceDetails(next);
    consider(occ.item, occ.startDate, occ.endDate);
    kept++;
  }
}

// -------------------------------------------------------------- write ----

mkdirSync(OUT, { recursive: true });
const existing = readdirSync(OUT).filter((f) => f.endsWith('.json'));

if (published.length === 0 && existing.length > 0 && process.env.ALLOW_EMPTY !== '1') {
  fail(
    `the calendar has no publishable events, but the site has ${existing.length}. ` +
      'Changing nothing in case this is a mistake. Set ALLOW_EMPTY=1 to clear the site.',
  );
}

published.sort((a, b) => (a.date + a.start + a.title).localeCompare(b.date + b.start + b.title));

const files = new Map();
for (const event of published) {
  let name = `${eventSlug(event)}.json`;
  for (let n = 2; files.has(name); n++) name = `${eventSlug(event)}-${n}.json`;
  files.set(name, JSON.stringify(event, null, 2) + '\n');
}

let added = 0;
let changed = 0;
let removed = 0;
for (const [name, body] of files) {
  const path = join(OUT, name);
  let before = null;
  try {
    before = readFileSync(path, 'utf8');
  } catch {
    // new file
  }
  if (before === body) continue;
  writeFileSync(path, body);
  before === null ? added++ : changed++;
}
for (const name of existing) {
  if (!files.has(name)) {
    unlinkSync(join(OUT, name));
    removed++;
  }
}

console.log(
  `calendar sync: ${published.length} event(s) published` +
    ` (${added} added, ${changed} changed, ${removed} removed, ${skipped.length} skipped).`,
);
for (const s of skipped) console.log(`  skipped: ${s}`);
