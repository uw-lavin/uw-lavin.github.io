// Lavin events. This is the only place to edit.
//
//   date   'YYYY-MM-DD'
//   start  'HH:MM', 24-hour, Pacific time -- no offsets, daylight saving is
//          handled for you
//   end    'HH:MM', same format. Required: calendar entries need an end time.
//
// Publish the time the event actually runs, not the room booking or setup
// window. `location` is a room name; the building and campus-map link come
// from src/lib/locations.js.
//
// Nothing needs deleting when an event is over: once its end time passes, the
// Events page moves it to the "Past events" log automatically.
export const events = [
  {
    date: '2026-09-23',
    start: '15:30',
    end: '17:00',
    title: 'Lavin Kickoff Mixer',
    location: 'Hogan Terrace',
    desc: 'A casual outdoor drop-in to meet the Lavin community. Free snacks, current Lavin students on hand, and no commitment — come by if you are even a little curious.',
  },
  {
    date: '2026-09-25',
    start: '17:00',
    end: '18:30',
    title: 'Founder Panel + Q&A',
    location: 'Peek Forum',
    desc: 'Current Lavin students and alumni founders on how their startups actually got going — closing with a walkthrough of how to apply.',
  },
  {
    date: '2026-09-29',
    start: '12:00',
    end: '13:30',
    title: 'Application Workshop',
    location: 'Deloitte Commons',
    desc: 'A hands-on session to start and sharpen your Lavin application in the room, with live feedback from the exec board and program staff.',
  },
];
