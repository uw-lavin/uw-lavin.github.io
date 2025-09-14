import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useIcsEvents from '../hooks/useIcsEvents';

export default function UpcomingEvents({ events: fallbackEvents }) {
  const navigate = useNavigate();
  const { events: icsEvents, loading } = useIcsEvents();
  
  // Use ICS events if available, otherwise fall back to prop events
  const events = icsEvents.length > 0 ? icsEvents : fallbackEvents;
  
  // Limit to maximum 3 events
  const displayEvents = events.slice(0, 3);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-encode text-husky-purple mb-6">
          Upcoming Events
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-neutral-400 text-sm">Loading events…</div>
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-encode text-husky-purple mb-6">
          Upcoming Events
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-neutral-400 text-sm">No upcoming events.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-encode text-husky-purple mb-8">
        Upcoming Events
      </h2>
      <div className="space-y-6">
        {displayEvents.map((event, index) => (
          <motion.div
            key={event.title + (event.start || event.date)}
            className="group relative"
            whileHover={{ x: 4 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
          >
            <div className="border-l-4 border-web-gold pl-6 py-4 hover:bg-gray-50 rounded-r-lg transition-all duration-200 group-hover:border-husky-purple">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-neutral-800 leading-tight">
                  {event.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-neutral-500">
                    <span className="mr-3">📅</span>
                    <time className="font-medium">
                      {formatDate(event.date || event.start)}
                    </time>
                    {formatTime(event.start, event.end) && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-neutral-400">{formatTime(event.start, event.end)}</span>
                      </>
                    )}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-neutral-500">
                      <span className="mr-3">📍</span>
                      <span className="text-neutral-400">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Events Button */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <button 
          onClick={() => navigate('/events')}
          className="w-full bg-web-gold text-husky-purple font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-web-gold focus:ring-offset-2"
        >
          View All Events
        </button>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(dateObj);
}

function formatTime(start, end) {
  if (!start) return null;
  
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  
  // Check if it's an all-day event
  const isAllDay = startDate.getHours() === 0 && startDate.getMinutes() === 0;
  
  if (isAllDay) {
    return 'All Day';
  }
  
  // Format time range
  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  if (endDate) {
    const endTime = endDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return `${startTime} - ${endTime}`;
  }
  
  return startTime;
}
