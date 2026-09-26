// Campus locations, and how to point at them on the UW interactive map.
//
// Rooms on campus are usually announced by room name alone ("Peek Forum"),
// which tells a first-time visitor nothing about where to walk. Everything
// registered here renders as "Room, Building" linked to the UW campus map;
// anything not registered renders as plain text, so an unknown or off-campus
// venue still displays correctly.
//
// To add a venue: find the building on https://www.washington.edu/maps/,
// read its Facility Code off the building panel, and add a row below.

const UW_MAP_BASE = 'https://www.washington.edu/maps/#!/';

// Building name -> UW facility code (lowercased for the map URL).
const BUILDINGS = {
  'PACCAR Hall': 'pcar',
  'Founders Hall': 'fndr',
  'Dempsey Hall': 'dem',
};

// Room / space name -> the building it sits in.
// Sources: Foster's own reservation maps (PACCAR + Dempsey) and the Foster
// student-events space list.
const ROOMS = {
  'Hogan Terrace': 'PACCAR Hall',
  'Deloitte Commons': 'PACCAR Hall',
  'Shansby Auditorium': 'PACCAR Hall',
  'Garvey Family Atrium': 'PACCAR Hall',
  'Jiambalvo Hearth': 'PACCAR Hall',
  "Orin's Cafe": 'PACCAR Hall',
  'Dempsey Gallery': 'PACCAR Hall',
  'Peek Forum': 'Founders Hall',
  'Founders Gallery': 'Founders Hall',
};

// Longest first, so a specific name wins over a shorter one it contains.
const byLength = (names) => [...names].sort((a, b) => b.length - a.length);
const ROOM_NAMES = byLength(Object.keys(ROOMS));
const BUILDING_NAMES = byLength(Object.keys(BUILDINGS));
const mentions = (text, names) => {
  const lower = text.toLowerCase();
  return names.find((n) => lower.includes(n.toLowerCase()));
};

/**
 * Resolve a location, as typed into Google Calendar, to a display label and a
 * UW campus map URL. Returns `{ label, href }`; `href` is null for anything
 * off campus or unrecognised, which callers render as plain text.
 *
 * - Mentions a known room -> "Room, Building", linked. A street address after
 *   it is dropped: "Peek Forum, 4215 E Stevens Way NE" -> "Peek Forum, Founders Hall".
 * - Mentions only a known building -> kept exactly as typed, linked to that
 *   building, so detail like a room number survives:
 *   "Founders Commons (FNDRS 180), Founders Hall".
 * - Anything else -> as typed, no link.
 */
export function resolveLocation(text) {
  const t = (text || '').trim();
  if (!t) return { label: '', href: null };

  const room = mentions(t, ROOM_NAMES);
  if (room) {
    const building = ROOMS[room];
    return { label: `${room}, ${building}`, href: UW_MAP_BASE + BUILDINGS[building] };
  }
  const building = mentions(t, BUILDING_NAMES);
  if (building) return { label: t, href: UW_MAP_BASE + BUILDINGS[building] };

  return { label: t, href: null };
}
