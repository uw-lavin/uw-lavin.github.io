import { useState, useEffect } from 'react';
import ical from 'ical';

const LAVIN_ICS_URL = 'https://calendar.google.com/calendar/ical/c_f1b00f89c607965808ce255b76459065238c9d3d5dab91d657e5d7b7dd1e3343%40group.calendar.google.com/public/basic.ics';

export default function useIcsEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use a CORS proxy to bypass CORS restrictions
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const fetchUrl = corsProxy + encodeURIComponent(LAVIN_ICS_URL);
    
    // Fetch the raw .ics text
    fetch(fetchUrl)
      .then(res => res.text())
      .then(icsText => {
        // Parse the ICS into an object of VEVENTs
        const data = ical.parseICS(icsText);

        // Pull out only the VEVENT entries
        const vevents = Object.values(data)
          .filter(item => item.type === 'VEVENT')
          .map(ev => ({
            title: ev.summary,
            description: ev.description,
            start: ev.start,
            end: ev.end,
            location: ev.location,
            url: ev.url,        // if present
          }))
          // keep only future events (including today)
          .filter(ev => {
            const now = new Date();
            const eventDate = new Date(ev.start);
            return eventDate >= now;
          })
          // sort by start date
          .sort((a, b) => new Date(a.start) - new Date(b.start));

        setEvents(vevents);
      })
      .catch(err => {
        console.error('Error fetching ICS:', err);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { events, loading };
}
