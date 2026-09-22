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

/**
 * Resolve a venue name to a display label and a UW campus map URL.
 *
 * Accepts either a room name ("Peek Forum") or a building name
 * ("Dempsey Hall"). Returns `{ label, href }`, where `href` is null when the
 * venue is not recognised — callers should render the label as plain text.
 */
export function resolveLocation(name) {
  if (!name) return { label: '', href: null };

  const building = ROOMS[name];
  if (building) {
    return { label: `${name}, ${building}`, href: UW_MAP_BASE + BUILDINGS[building] };
  }

  if (BUILDINGS[name]) {
    return { label: name, href: UW_MAP_BASE + BUILDINGS[name] };
  }

  return { label: name, href: null };
}
