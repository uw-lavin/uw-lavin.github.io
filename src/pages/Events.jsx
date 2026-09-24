import { motion } from 'framer-motion';
import MapLink from '../components/ui/MapLink';
import { formatEvent, googleCalendarUrl, icsHref, splitEvents, eventSlug } from '../lib/events';
import { resolveLocation } from '../lib/locations';

// One JSON file per event, created and edited through the admin (Pages CMS).
// Events move from "upcoming" to the past-events log on their own once they
// end, so nothing ever needs deleting.
const events = Object.values(
  import.meta.glob('/src/content/events/*.json', { eager: true, import: 'default' }),
);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

const calButton =
  'inline-flex items-center gap-1.5 border border-black/15 bg-white px-2.5 py-1.5 text-[10px] md:text-[11px] font-display font-bold uppercase tracking-[0.12em] text-black/75 hover:border-black hover:text-black transition-colors';

function UpcomingEvent({ event }) {
  const f = formatEvent(event);
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-6 md:py-7 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
    >
      {/* Date Column */}
      <div className="w-full md:w-[130px] lg:w-[150px] md:pr-6 flex items-start shrink-0 md:border-r border-[#e0ddd8] pt-1">
        <span className="text-[10px] md:text-xs font-display tracking-[0.15em] font-bold uppercase text-black mt-[1em] md:mt-[1.15em] mr-1.5">
          {f.month}
        </span>
        <span className="text-4xl md:text-5xl font-display font-black tracking-tight leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200">
          {f.day}
        </span>
      </div>

      {/* Content Column */}
      <div className="flex-1 flex flex-col items-start md:pl-8 min-w-0 mt-3 md:mt-0 w-full">
        <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-1.5 text-[#0f0f0f] break-words w-full">
          {event.title}
        </h2>

        <div className="text-[11px] md:text-xs font-display font-bold tracking-wider uppercase text-black/70 mb-2.5">
          {f.weekday} &nbsp;&middot;&nbsp; {f.timeRange} &nbsp;&middot;&nbsp; <MapLink name={event.location} />
        </div>

        <p className="text-sm md:text-base text-black/70 leading-relaxed max-w-2xl font-sans w-full">
          {event.desc}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Add ${event.title} to Google Calendar`}
            className={calButton}
          >
            + Google Calendar
          </a>
          {/* No `download` attribute: letting the browser open the file is what
              brings up iPhone's "Add to Calendar" sheet. */}
          <a
            href={icsHref(event)}
            aria-label={`Add ${event.title} to Apple Calendar or Outlook`}
            className={calButton}
          >
            + Apple / Outlook
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  const { upcoming, past } = splitEvents(events);

  return (
    <div className="w-full bg-[#f8f7f4] min-h-screen font-sans text-[#0f0f0f]">

      {/* ---------- Header / Masthead ---------- */}
      <section className="px-6 md:px-12 pt-6 md:pt-8 pb-6 md:pb-8 w-full border-b border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1 }}
            className="text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-black mb-3"
          >
            UPCOMING EVENTS
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-3 md:gap-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-black leading-[0.85] tracking-tight text-[#0f0f0f] text-[12vw] sm:text-5xl md:text-6xl lg:text-7xl flex-shrink-0"
            >
              EVENTS.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans italic text-base md:text-lg text-black/60 pb-2 md:pb-4 md:text-right max-w-[220px]"
            >
              mixers.<br className="hidden md:block" /> panels.<br className="hidden md:block" /> workshops.
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Upcoming ---------- */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto flex flex-col px-6 md:px-12 py-6 md:py-8">
          {upcoming.length > 0 ? (
            upcoming.map((event) => <UpcomingEvent key={eventSlug(event)} event={event} />)
          ) : (
            <p className="py-10 text-center text-sm md:text-base text-black/60 font-sans">
              Nothing scheduled right now — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ---------- Past events: a quiet log, most recent first ---------- */}
      {past.length > 0 && (
        <section className="w-full">
          <div className="max-w-5xl mx-auto px-6 md:px-12 pb-10 md:pb-14">
            <h2 className="mb-2 text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-black/45">
              Past events
            </h2>
            <ul className="border-t border-[#e0ddd8]">
              {past.map((event) => {
                const f = formatEvent(event);
                return (
                  <li
                    key={eventSlug(event)}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 border-b border-[#e0ddd8] py-2.5 text-black/50"
                  >
                    <span className="sm:w-[110px] shrink-0 text-[10px] md:text-[11px] font-display font-bold uppercase tracking-[0.12em]">
                      {f.fullDate}
                    </span>
                    <span className="text-sm font-display font-bold text-black/60">{event.title}</span>
                    <span className="text-xs font-sans sm:ml-auto">{resolveLocation(event.location).label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
