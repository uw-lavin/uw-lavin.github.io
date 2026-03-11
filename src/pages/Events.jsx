import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } }
};

export default function Events() {
  return (
    <div className="w-full bg-[#f8f7f4] min-h-screen font-sans text-[#0f0f0f]">

      {/* ---------- Header / Masthead ---------- */}
      <section className="px-6 md:px-12 pt-28 md:pt-32 pb-12 w-full border-b border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase text-black mb-6"
          >
            UPCOMING EVENTS
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
      </section >

      {/* ---------- Events List Section ---------- */}
      < section className="w-full" >
        <div className="max-w-7xl mx-auto flex flex-col px-6 md:px-12 py-12 md:py-24">

          {/* Event 1: Showcase (March 12) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[120px] sm:w-[160px] md:w-[240px] lg:w-[320px] md:pr-8 lg:pr-12 flex items-start shrink-0 md:border-r border-[#e0ddd8] pt-2">
              <span className="text-xs md:text-base font-mono tracking-[0.2em] font-semibold uppercase text-black mt-[0.8em] md:mt-[1.2em] mr-2">
                MAR
              </span>
              <span className="text-[14vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200">
                12
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start md:pl-10 min-w-0 pb-2 mt-4 md:mt-0 relative w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2rem] font-serif font-bold tracking-tight mb-2 text-[#0f0f0f] break-words w-full">
                Lavin 2025 Cohort Final Showcase
              </h3>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4">
                <div className="text-[14px] md:text-[15px] font-bold font-mono tracking-wider uppercase text-black">
                  5:30 PM &nbsp;&middot;&nbsp; Intellectual House, U-District
                </div>
              </div>

              <p className="text-base md:text-lg text-[#0f0f0f] italic leading-relaxed max-w-2xl font-serif w-full">
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
            className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[120px] sm:w-[160px] md:w-[240px] lg:w-[320px] md:pr-8 lg:pr-12 flex items-start shrink-0 md:border-r border-[#e0ddd8] pt-2">
              <span className="text-xs md:text-base font-mono tracking-[0.2em] font-semibold uppercase text-black mt-[0.8em] md:mt-[1.2em] mr-2">
                APR
              </span>
              <span className="text-[14vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200">
                7
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start md:pl-10 min-w-0 pb-2 mt-4 md:mt-0 relative w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2rem] font-serif font-bold tracking-tight mb-2 text-[#0f0f0f] break-words w-full">
                Spring ASM
              </h3>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4">
                <div className="text-[14px] md:text-[15px] font-bold font-mono tracking-wider uppercase text-black">
                  5:30 PM &nbsp;&middot;&nbsp; Anthony's Forum, Dempsey Hall
                </div>
              </div>

              <p className="text-base md:text-lg text-[#0f0f0f] italic leading-relaxed max-w-2xl font-serif w-full">
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
            className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[120px] sm:w-[160px] md:w-[240px] lg:w-[320px] md:pr-8 lg:pr-12 flex flex-col items-start pt-2 shrink-0 md:border-r border-[#e0ddd8]">
              <div className="flex items-start">
                <span className="text-xs md:text-base font-mono tracking-[0.2em] font-semibold uppercase text-black mt-[0.6em] md:mt-[0.9em] mr-1">
                  APR
                </span>
                <span className="text-[11vw] sm:text-6xl md:text-[3rem] lg:text-[4.5rem] xl:text-7xl font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200 whitespace-nowrap">
                  13&ndash;14
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start md:pl-10 min-w-0 pb-2 mt-4 md:mt-0 relative w-full">
              <div className="text-[10px] font-mono tracking-[0.1em] text-black/50 mb-2 break-words w-full">
                ESEC &times; LAVIN &times; CLAUDE
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2rem] font-serif font-bold tracking-tight mb-2 text-[#0f0f0f] break-words w-full">
                Zero to One Startupathon
              </h3>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4">
                <div className="text-[14px] md:text-[15px] font-bold font-mono tracking-wider uppercase text-black">
                  ALL WKND &nbsp;&middot;&nbsp; HUB Lyceum
                </div>
              </div>

              <p className="text-base md:text-lg text-[#0f0f0f] italic leading-relaxed max-w-2xl font-serif w-full">
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
            className="group relative flex flex-col md:flex-row w-full border-b border-[#e0ddd8] py-8 transition-all duration-200 hover:pl-4 border-l-[3px] border-l-transparent hover:border-l-[#3b2c5a]"
          >
            {/* Date Column */}
            <div className="w-[120px] sm:w-[160px] md:w-[240px] lg:w-[320px] md:pr-8 lg:pr-12 flex items-start shrink-0 md:border-r border-[#e0ddd8] pt-2">
              <span className="text-xs md:text-base font-mono tracking-[0.2em] font-semibold uppercase text-black mt-[0.8em] md:mt-[1.2em] mr-2">
                APR
              </span>
              <span className="text-[14vw] md:text-7xl lg:text-[5.5rem] font-serif font-black tracking-tighter leading-[0.85] text-[#0f0f0f] group-hover:text-[#3b2c5a] transition-colors duration-200">
                21
              </span>
            </div>

            {/* Content Column */}
            <div className="flex-1 flex flex-col items-start md:pl-10 min-w-0 pb-2 mt-4 md:mt-0 relative w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2rem] font-serif font-bold tracking-tight mb-2 text-[#0f0f0f] break-words w-full">
                Engineering Startup Career Fair
              </h3>

              {/* Metadata Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4">
                <div className="text-[14px] md:text-[15px] font-bold font-mono tracking-wider uppercase text-black">
                  4:00 PM &nbsp;&middot;&nbsp; HUB Lyceum
                </div>
              </div>

              <p className="text-base md:text-lg text-[#0f0f0f] italic leading-relaxed max-w-2xl font-serif w-full">
                Exclusive career fair for Lavin and AIMS members. Connect with the fastest growing engineering startups in Seattle ACTUALLY seeking UW engineering talent.
              </p>
            </div>
          </motion.div>

        </div >
      </section >
    </div >
  );
} 