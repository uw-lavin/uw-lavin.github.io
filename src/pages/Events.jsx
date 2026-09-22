import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

// Public-facing event times only — setup/teardown and room-booking windows are
// intentionally not published.
const events = [
  {
    month: 'SEP',
    day: '23',
    weekday: 'Wednesday',
    title: 'Lavin Kickoff Mixer',
    time: '3:30 – 5:00 PM',
    location: 'Hogan Terrace, PACCAR Hall',
    desc: 'A casual outdoor drop-in to meet the Lavin community. Free snacks, current Lavin students on hand, and no commitment — come by if you are even a little curious.',
  },
  {
    month: 'SEP',
    day: '25',
    weekday: 'Friday',
    title: 'Founder Panel + Q&A',
    time: '5:00 PM',
    location: 'Peek Forum',
    desc: 'Current Lavin students and alumni founders on how their startups actually got going — closing with a walkthrough of how to apply.',
  },
  {
    month: 'SEP',
    day: '29',
    weekday: 'Tuesday',
    title: 'Application Workshop',
    time: '12:00 – 1:30 PM',
    location: 'Deloitte Commons',
    desc: 'A hands-on session to start and sharpen your Lavin application in the room, with live feedback from the exec board and program staff.',
  },
];

export default function Events() {
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

      {/* ---------- Events List Section ---------- */}
      <section className="w-full">
        <div className="max-w-5xl mx-auto flex flex-col px-6 md:px-12 py-6 md:py-8">
          {events.map((event) => (
            <motion.article
              key={`${event.month}-${event.day}-${event.title}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-6 md:py-7 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
            >
              {/* Date Column */}
              <div className="w-full md:w-[130px] lg:w-[150px] md:pr-6 flex items-start shrink-0 md:border-r border-[#e0ddd8] pt-1">
                <span className="text-[10px] md:text-xs font-display tracking-[0.15em] font-bold uppercase text-black mt-[1em] md:mt-[1.15em] mr-1.5">
                  {event.month}
                </span>
                <span className="text-4xl md:text-5xl font-display font-black tracking-tight leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200">
                  {event.day}
                </span>
              </div>

              {/* Content Column */}
              <div className="flex-1 flex flex-col items-start md:pl-8 min-w-0 mt-3 md:mt-0 w-full">
                <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight mb-1.5 text-[#0f0f0f] break-words w-full">
                  {event.title}
                </h2>

                <div className="text-[11px] md:text-xs font-display font-bold tracking-wider uppercase text-black/70 mb-2.5">
                  {event.weekday} &nbsp;&middot;&nbsp; {event.time} &nbsp;&middot;&nbsp; {event.location}
                </div>

                <p className="text-sm md:text-base text-black/70 leading-relaxed max-w-2xl font-sans w-full">
                  {event.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
