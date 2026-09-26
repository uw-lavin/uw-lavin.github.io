// Links derived from the public "Lavin Events" Google Calendar.
//
// The one setting is its PUBLIC iCal address, in src/content/calendar.json
// (Google Calendar -> the calendar's Settings -> Integrate calendar -> "Public
// address in iCal format"). Never the "Secret address": that one works even if
// the calendar is private, and this file is published.
import settings from '../content/calendar.json' with { type: 'json' };

const ICAL_RE = /^https:\/\/calendar\.google\.com\/calendar\/ical\/([^/]+)\/public\/basic\.ics$/;

export const publicIcalUrl = (settings.publicIcalUrl || '').trim();

/** The Google calendar ID inside a public iCal address, or null. */
export function calendarIdFrom(url) {
  const m = (url || '').match(ICAL_RE);
  return m ? decodeURIComponent(m[1]) : null;
}

const calendarId = calendarIdFrom(publicIcalUrl);

/**
 * "Add this calendar" link for Google users. It subscribes to the calendar
 * itself, which stays in sync as events change; subscribing by URL instead
 * would only refresh every 12-24 hours. Same shape as Google's own shareable
 * links: the calendar ID, base64-encoded.
 */
export const googleSubscribeUrl = calendarId
  ? `https://calendar.google.com/calendar/u/0?cid=${btoa(calendarId).replace(/=+$/, '')}`
  : null;

/** webcal:// makes Apple Calendar (and Outlook) offer to subscribe. */
export const appleSubscribeUrl = calendarId ? publicIcalUrl.replace(/^https:/, 'webcal:') : null;
