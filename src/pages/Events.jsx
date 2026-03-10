import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

export default function Events() {
  return (
    <div className="w-full bg-[#f8f7f4] min-h-screen font-sans text-[#0f0f0f]">

      {/* ---------- Header / Masthead ---------- */}
      <section className="px-6 md:px-12 pt-24 pb-12 w-full border-b border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase text-black mb-6"
          >
            UPCOMING EVENTS — LAVIN EP
          </motion.div>

          <div className="flex flex-col md:flex-row items-end justify-between w-full gap-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif font-black leading-[0.8] tracking-tighter text-[#0f0f0f] text-[12vw] sm:text-[10vw] md:text-[8vw] flex-shrink-0"
            >
              EVENTS.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif italic text-base md:text-lg text-black/60 pb-2 md:pb-4 md:text-right max-w-[200px]"
            >
              lectures.<br className="hidden md:block" /> workshops.<br className="hidden md:block" /> socials.
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Events List Section ---------- */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto flex flex-col px-6 md:px-12 py-12 md:py-24">

          {/* Event 1: Showcase (March 12) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-300 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[100px] md:w-[150px] flex flex-col items-start pt-2 shrink-0">
              <span className="text-[15vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-300">
                12
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-black mt-4 border border-black/20 rounded-full px-3 py-1 bg-transparent">
                17:30
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start pl-6 md:pl-10 md:border-l border-black/10 min-w-0 pb-2">
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-black/50 mb-3 break-words w-full">
                INTELLECTUAL HOUSE, U-DISTRICT
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-serif font-bold tracking-tight mb-4 text-[#0f0f0f] break-words w-full">
                Lavin 2025 Cohort Final Showcase
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#555] italic leading-relaxed max-w-2xl font-serif w-full">
                Come grab your cash before judging starts at 6! First come first serve!
              </p>
            </div>
          </motion.div>

          {/* Event 2: Spring ASM (April 07) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-300 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[100px] md:w-[150px] flex flex-col items-start pt-2 shrink-0">
              <span className="text-[15vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-300">
                07
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-black mt-4 border border-black/20 rounded-full px-3 py-1 bg-transparent">
                17:30
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start pl-6 md:pl-10 md:border-l border-black/10 min-w-0 pb-2">
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-black/50 mb-3 break-words w-full">
                ANTHONY'S FORUM, DEMPSEY HALL
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-serif font-bold tracking-tight mb-4 text-[#0f0f0f] break-words w-full">
                Spring ASM
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#555] italic leading-relaxed max-w-2xl font-serif w-full">
                Join us for the required quarterly All Student Meeting.
              </p>
            </div>
          </motion.div>

          {/* Event 3: Zero to One (April 13-14) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-300 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[100px] md:w-[150px] flex flex-col items-start pt-2 shrink-0">
              <span className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-300 flex items-center break-words max-w-full">
                13&mdash;14
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-black mt-4 border border-black/20 rounded-full px-3 py-1 bg-transparent uppercase">
                All Wknd
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start pl-6 md:pl-10 md:border-l border-black/10 min-w-0 pb-2">
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-black/60 mb-3 break-words w-full">
                ESEC &times; Lavin &times; Claude
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-serif font-bold tracking-tight mb-3 text-[#0f0f0f] break-words w-full">
                Zero to One Startupathon
              </h3>
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-black/50 mb-3 break-words w-full">
                HUB LYCEUM, UPPER CAMPUS
              </div>
              <p className="text-[14px] md:text-[15px] text-[#555] italic leading-relaxed max-w-2xl font-serif w-full">
                This is where UW's most ambitious students stop thinking about a startup and start building it.
              </p>
            </div>
          </motion.div>

          {/* Event 4: Eng Career Fair (April 21) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-300 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[100px] md:w-[150px] flex flex-col items-start pt-2 shrink-0">
              <span className="text-[15vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-300">
                21
              </span>
              <span className="text-[10px] md:text-xs font-mono tracking-wider text-black mt-4 border border-black/20 rounded-full px-3 py-1 bg-transparent">
                TBD
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start pl-6 md:pl-10 md:border-l border-black/10 min-w-0 pb-2">
              <div className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-black/50 mb-3 break-words w-full">
                HUB LYCEUM, UPPER CAMPUS
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] font-serif font-bold tracking-tight mb-4 text-[#0f0f0f] break-words w-full">
                Engineering Startup Career Fair
              </h3>
              <p className="text-[14px] md:text-[15px] text-[#555] italic leading-relaxed max-w-2xl font-serif w-full">
                Connect with the fastest growing engineering startups in Seattle.
              </p>
            </div>
          </motion.div>

        </div >
      </section >
    </div >
  );
} 