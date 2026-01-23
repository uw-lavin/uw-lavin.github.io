import { useState, useEffect, useRef } from 'react';
import ical from 'ical';

const LAVIN_ICS_URL = 'https://calendar.google.com/calendar/ical/c_f1b00f89c607965808ce255b76459065238c9d3d5dab91d657e5d7b7dd1e3343%40group.calendar.google.com/public/basic.ics';

// Cache for events data (5 minute TTL)
const CACHE_KEY = 'lavin_events_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedEvents() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    if (now - timestamp < CACHE_TTL) {
      // Convert date strings back to Date objects
      return data.map(ev => ({
        ...ev,
        start: ev.start ? new Date(ev.start) : null,
        end: ev.end ? new Date(ev.end) : null,
      }));
    }
    
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

function setCachedEvents(events) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: events,
      timestamp: Date.now()
    }));
  } catch {
    // Ignore localStorage errors
  }
}

export default function useIcsEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Check cache first (but skip if it's an empty array - might be stale)
    const cachedEvents = getCachedEvents();
    if (cachedEvents && cachedEvents.length > 0) {
      console.log('Using cached events:', cachedEvents.length);
      setEvents(cachedEvents);
      setLoading(false);
      return;
    }
    
    // Clear potentially stale empty cache
    if (cachedEvents && cachedEvents.length === 0) {
      localStorage.removeItem(CACHE_KEY);
    }

    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Fetch and process events
    const fetchAndProcessEvents = async (url, useProxy = false) => {
      const fetchUrl = useProxy 
        ? `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
        : url;
      
      console.log(`Fetching from ${useProxy ? 'proxy' : 'direct'}:`, fetchUrl.substring(0, 80) + '...');
      
      const res = await fetch(fetchUrl, { 
        signal,
        cache: 'no-cache'
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const icsText = await res.text();
      console.log('ICS file fetched, length:', icsText.length);
      
      // Parse the ICS into an object of VEVENTs
      const data = ical.parseICS(icsText);

      // Get current time for comparison
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set to start of today for comparison

      // Pull out only the VEVENT entries
      const allVevents = Object.values(data)
        .filter(item => item.type === 'VEVENT' && item.summary)
        .map(ev => {
          // Ensure start and end are Date objects
          const start = ev.start instanceof Date ? ev.start : new Date(ev.start);
          const end = ev.end instanceof Date ? ev.end : (ev.end ? new Date(ev.end) : null);
          
          return {
            title: ev.summary,
            description: ev.description,
            start: start,
            end: end,
            location: ev.location,
            url: ev.url,
          };
        });

      console.log('Total VEVENTs found:', allVevents.length);
      console.log('Current date/time:', now.toISOString());
      if (allVevents.length > 0) {
        console.log('First 5 events with dates:', allVevents.slice(0, 5).map(e => ({ 
          title: e.title.substring(0, 50), 
          start: e.start.toISOString(),
          startLocal: e.start.toLocaleString()
        })));
      }

      // Keep only future events (events that haven't ended yet)
      // An event is "upcoming" if its end time (or start time if no end) is in the future
      const vevents = allVevents
        .filter(ev => {
          if (!ev.start) {
            console.log('Event missing start date:', ev.title);
            return false;
          }
          
          // Use end time if available, otherwise use start time
          const eventEndTime = ev.end || ev.start;
          
          // Compare dates at midnight (ignore time of day for "today" comparison)
          const eventDate = new Date(eventEndTime);
          eventDate.setHours(0, 0, 0, 0);
          
          // Event is upcoming if it ends today or in the future
          const isUpcoming = eventDate >= now;
          
          if (!isUpcoming) {
            console.log(`Event filtered (past): "${ev.title.substring(0, 40)}" | End: ${eventDate.toISOString()} | Now: ${now.toISOString()}`);
          }
          
          return isUpcoming;
        })
        // Sort by start date
        .sort((a, b) => a.start - b.start);

      console.log('Future events after filtering:', vevents.length);
      if (vevents.length > 0) {
        console.log('Upcoming events to display:', vevents.slice(0, 5).map(e => ({ 
          title: e.title.substring(0, 50), 
          start: e.start.toISOString(),
          startLocal: e.start.toLocaleString()
        })));
      } else {
        console.warn('No upcoming events found! All events were filtered out.');
      }

      // Cache the results
      setCachedEvents(vevents);
      setEvents(vevents);
      setLoading(false);
      return true;
    };

    // Use proxy directly since Google Calendar blocks direct CORS requests
    (async () => {
      try {
        await fetchAndProcessEvents(LAVIN_ICS_URL, true);
      } catch (err) {
        if (signal.aborted) return;
        
        console.error('Error fetching ICS:', err);
        console.error('Error details:', {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
        setEvents([]);
        setLoading(false);
      }
    })();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { events, loading };
}
