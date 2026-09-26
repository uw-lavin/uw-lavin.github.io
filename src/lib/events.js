// Event time handling, display formatting, and calendar exports.
// Shared by the Events page, the calendar plugin in vite.config.js, and
// scripts/sync-calendar.mjs, so imports use explicit .js extensions that plain
// Node can resolve.
import { resolveLocation } from './locations.js';

const TZ = 'America/Los_Angeles';
const SITE_EVENTS_URL = 'https://uwlavin.com/#/events';

// ---------------------------------------------------------------- time ----

// Minutes the Pacific wall clock is ahead of UTC at a given instant
// (-420 during daylight time, -480 in winter).
function pacificOffsetMinutes(ts) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .formatToParts(new Date(ts))
      .map((p) => [p.type, p.value]),
  );
  const wallAsUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return (wallAsUtc - ts) / 60000;
}

// '2026-09-25' + '17:00' in Pacific time -> the real instant, correct on
// either side of a daylight-saving change.
function pacificToDate(date, time) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let ts = guess - pacificOffsetMinutes(guess) * 60000;
  const settled = guess - pacificOffsetMinutes(ts) * 60000;
  if (settled !== ts) ts = settled;
  return new Date(ts);
}

export function eventTimes(event) {
  return {
    startAt: pacificToDate(event.date, event.start),
    endAt: pacificToDate(event.date, event.end),
  };
}

// ---------------------------------------------------------- validation ----

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
// Location and description are optional: plenty of calendar events have neither.
const REQUIRED = ['title', 'date', 'start', 'end'];

/** Everything wrong with one entry, as readable sentences. Empty = valid. */
export function eventProblems(e) {
  const problems = [];
  for (const k of REQUIRED) {
    if (typeof e?.[k] !== 'string' || !e[k].trim()) problems.push(`missing "${k}"`);
  }
  if (problems.length) return problems;

  if (!DATE_RE.test(e.date)) {
    problems.push(`date must look like '2026-09-25', got '${e.date}'`);
  } else {
    const [y, m, d] = e.date.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
      problems.push(`'${e.date}' is not a real date`);
    }
  }
  for (const k of ['start', 'end']) {
    if (!TIME_RE.test(e[k])) problems.push(`${k} must be 24-hour like '17:00', got '${e[k]}'`);
  }
  if (!problems.length && e.end <= e.start) {
    problems.push(`end (${e.end}) must be after start (${e.start})`);
  }
  return problems;
}

/** Problems across the whole list, labelled by event. Empty = all good. */
export function validateEvents(events) {
  const out = [];
  const slugs = new Map();
  events.forEach((e, i) => {
    const label = `Event ${i + 1}${e?.title ? ` ("${e.title}")` : ''}`;
    for (const p of eventProblems(e)) out.push(`${label}: ${p}`);
    if (e?.date && e?.title) {
      const slug = eventSlug(e);
      if (slugs.has(slug)) out.push(`${label}: same date and title as event ${slugs.get(slug)}`);
      else slugs.set(slug, i + 1);
    }
  });
  return out;
}

/**
 * Upcoming soonest-first, past most-recent-first. An event is past once it
 * ends. Malformed entries are skipped rather than crashing the page, so one
 * editor's mistake never takes the rest of the list down with it.
 */
export function splitEvents(events, now = Date.now()) {
  const timed = events
    .filter((e) => eventProblems(e).length === 0)
    .map((e) => ({ ...e, ...eventTimes(e) }));
  return {
    upcoming: timed.filter((e) => e.endAt > now).sort((a, b) => a.startAt - b.startAt),
    past: timed.filter((e) => e.endAt <= now).sort((a, b) => b.startAt - a.startAt),
  };
}

// ------------------------------------------------------------- display ----

const fmt = (opts) => new Intl.DateTimeFormat('en-US', { timeZone: TZ, ...opts });
const monthFmt = fmt({ month: 'short' });
const dayFmt = fmt({ day: 'numeric' });
const weekdayFmt = fmt({ weekday: 'long' });
const timeFmt = fmt({ hour: 'numeric', minute: '2-digit' });
const fullDateFmt = fmt({ month: 'short', day: 'numeric', year: 'numeric' });

export function formatEvent(e) {
  return {
    month: monthFmt.format(e.startAt),
    day: dayFmt.format(e.startAt),
    weekday: weekdayFmt.format(e.startAt),
    // "3:30 – 5:00 PM", sharing the AM/PM when both ends match.
    timeRange: timeFmt.formatRange(e.startAt, e.endAt),
    fullDate: fullDateFmt.format(e.startAt),
  };
}

// ------------------------------------------------------------ calendar ----

export function eventSlug(event) {
  const title = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${event.date}-${title}`;
}

// Relative on purpose: resolves against the site root under HashRouter.
export const icsHref = (event) => `calendar/${eventSlug(event)}.ics`;

// Room + building + campus, so map apps can find it. Unknown venues are left
// alone -- they may be off campus.
function calendarLocation(event) {
  const { label, href } = resolveLocation(event.location);
  if (!href || /seattle/i.test(label)) return label;
  return `${label}, University of Washington, Seattle, WA`;
}

const calendarDetails = (event) =>
  event.desc ? `${event.desc}\n\nDetails: ${SITE_EVENTS_URL}` : `Details: ${SITE_EVENTS_URL}`;

// 20260926T000000Z
const utcStamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/**
 * Google Calendar "add event" link. Google does not accept reminders from a
 * link (or from an imported .ics); it applies the person's own default alert.
 */
export function googleCalendarUrl(event) {
  const { startAt, endAt } = eventTimes(event);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: calendarDetails(event),
  });
  const where = calendarLocation(event);
  if (where) params.set('location', where);
  // `dates` goes in with a literal slash, the form Google documents.
  return `https://calendar.google.com/calendar/render?${params}&dates=${utcStamp(startAt)}/${utcStamp(endAt)}`;
}

// RFC 5545 text escaping.
const icsText = (s) =>
  String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// RFC 5545 line folding: at most 75 octets per line, continuation lines begin
// with a space. Counts bytes, not characters, so em dashes can't overflow it.
function foldLine(line) {
  const enc = new TextEncoder();
  const out = [];
  let cur = '';
  let curBytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // the leading space counts
    if (curBytes + b > limit) {
      out.push(cur);
      cur = ch;
      curBytes = b;
    } else {
      cur += ch;
      curBytes += b;
    }
  }
  out.push(cur);
  return out.join('\r\n ');
}

/**
 * A single-event .ics file with two alerts: a day before and an hour before.
 * Apple Calendar keeps both; Outlook keeps one (the hour-before); Google
 * ignores both and uses the person's default.
 */
export function buildIcs(event, now = new Date()) {
  const { startAt, endAt } = eventTimes(event);
  const alarm = (trigger, text) => [
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(text)}`,
    `TRIGGER:${trigger}`,
    'END:VALARM',
  ];
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lavin Entrepreneurship Program//uwlavin.com//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    // Stable per event, so adding it twice updates rather than duplicates.
    `UID:${eventSlug(event)}@uwlavin.com`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${utcStamp(startAt)}`,
    `DTEND:${utcStamp(endAt)}`,
    `SUMMARY:${icsText(event.title)}`,
    `DESCRIPTION:${icsText(calendarDetails(event))}`,
    ...(calendarLocation(event) ? [`LOCATION:${icsText(calendarLocation(event))}`] : []),
    `URL:${SITE_EVENTS_URL}`,
    ...alarm('-P1D', `${event.title} is tomorrow`),
    ...alarm('-PT1H', `${event.title} starts in 1 hour`),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(foldLine).join('\r\n') + '\r\n';
}
