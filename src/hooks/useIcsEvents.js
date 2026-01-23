import { useState, useEffect, useRef } from 'react';
import ical from 'ical';

const LAVIN_ICS_URL = 'https://calendar.google.com/calendar/ical/c_f1b00f89c607965808ce255b76459065238c9d3d5dab91d657e5d7b7dd1e3343%40group.calendar.google.com/public/basic.ics';

// Cache for events data - reduced TTL for accuracy
const CACHE_KEY = 'lavin_events_cache';
const CACHE_TTL = 30 * 1000; // 30 seconds (prioritizing accuracy over speed)

// Multiple CORS proxy options for reliability
const PROXY_OPTIONS = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

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

// Helper function to sleep for retry delays
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry logic and multiple proxy fallbacks
async function fetchWithRetry(url, signal, retryCount = 0) {
  // Try direct fetch first
  try {
    const res = await fetch(url, { 
      signal,
      cache: 'no-cache',
      headers: {
        'Accept': 'text/calendar',
      }
    });
    
    if (res.ok) {
      return await res.text();
    }
    throw new Error(`HTTP ${res.status}`);
  } catch (directError) {
    // If direct fails, try proxies
    if (directError.name === 'AbortError') throw directError;
    
    // Try each proxy option
    for (let i = 0; i < PROXY_OPTIONS.length; i++) {
      try {
        const proxyUrl = PROXY_OPTIONS[i] + encodeURIComponent(url);
        const res = await fetch(proxyUrl, { 
          signal,
          cache: 'no-cache'
        });
        
        if (res.ok) {
          return await res.text();
        }
      } catch (proxyError) {
        if (proxyError.name === 'AbortError') throw proxyError;
        // Continue to next proxy
        continue;
      }
    }
    
    // If all proxies failed and we have retries left, retry
    if (retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`Retry ${retryCount + 1}/${MAX_RETRIES} after ${delay}ms...`);
      await sleep(delay);
      return fetchWithRetry(url, signal, retryCount + 1);
    }
    
    throw new Error('All fetch attempts failed');
  }
}

export default function useIcsEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    // Create abort controller for cleanup
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Check cache first - use stale-while-revalidate pattern
    const cachedEvents = getCachedEvents();
    if (cachedEvents && cachedEvents.length > 0) {
      console.log('Using cached events (stale-while-revalidate):', cachedEvents.length);
      setEvents(cachedEvents);
      setLoading(false);
      // Continue to fetch fresh data in background
    } else if (cachedEvents && cachedEvents.length === 0) {
      // Clear potentially stale empty cache
      localStorage.removeItem(CACHE_KEY);
    }

    // Fetch and process events
    const fetchAndProcessEvents = async () => {
      try {
        console.log('Fetching fresh events from Google Calendar...');
        const icsText = await fetchWithRetry(LAVIN_ICS_URL, signal);
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
      } catch (err) {
        if (signal.aborted) return;
        
        console.error('Error fetching ICS:', err);
        console.error('Error details:', {
          message: err.message,
          name: err.name,
        });
        
        // If we have cached events, keep showing them even if fetch failed
        if (!cachedEvents || cachedEvents.length === 0) {
          setEvents([]);
        }
        setLoading(false);
      }
    };

    // Always fetch fresh data (stale-while-revalidate pattern)
    fetchAndProcessEvents();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { events, loading };
}
