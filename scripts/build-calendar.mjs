#!/usr/bin/env node
/**
 * Writes one .ics file per event into public/calendar/, which Vite then
 * serves in dev and copies into the build.
 *
 * These are real files rather than generated in the page because iPhones
 * only reliably open "Add to Calendar" for a file served with a calendar
 * content type; in-page downloads often land in Files instead.
 *
 * Runs automatically before `npm run dev` and `npm run build`. The output is
 * gitignored -- src/data/events.js is the source of truth.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { events } from '../src/data/events.js';
import { buildIcs, eventSlug } from '../src/lib/events.js';

const OUT = 'public/calendar';

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const event of events) {
  writeFileSync(`${OUT}/${eventSlug(event)}.ics`, buildIcs(event));
}

console.log(`calendar: wrote ${events.length} .ics file(s) to ${OUT}/`);
