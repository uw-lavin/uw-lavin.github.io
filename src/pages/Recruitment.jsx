import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import boat24Image from '../assets/boat24new.jpg';
import { fadeUp } from '../lib/animations';

export default function Recruitment() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // The line fills as we scroll through
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full bg-[#f8f7f4] min-h-screen font-sans">

      {/* ---------- HERO SECTION ---------- */}
      <section className="px-6 md:px-12 pt-28 md:pt-32 pb-12 w-full border-b border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col w-full">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="text-[11px] font-mono tracking-[0.3em] uppercase text-black mb-6"
          >
            RECRUITMENT — LAVIN EP — UW SEATTLE
          </motion.div>

          <div className="flex flex-col md:flex-row items-end justify-between w-full gap-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif font-black leading-[0.8] tracking-tighter text-[#0f0f0f] text-[12vw] sm:text-[10vw] md:text-[8vw] flex-shrink-0"
            >
              RECRUITMENT<span className="text-[#c4622d]">.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif italic text-base md:text-lg text-black/60 pb-2 md:pb-4 md:text-right max-w-[200px]"
            >
              competitive.<br className="hidden md:block" /> cohort-based.<br className="hidden md:block" /> life-changing.
            </motion.div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 w-full">
            <a
              href="https://uwfoster.my.site.com/Foster/s/undergraduate/certs-and-minors"
              className="rounded-full px-7 py-3 bg-[#0f0f0f] text-white font-sans text-sm font-semibold hover:bg-black/80 transition-colors whitespace-nowrap"
            >
              Applications Open Fall 2026
            </a>
            <p className="text-[14px] text-[#555] italic font-serif md:text-right max-w-sm">
              Open to all UW undergrads with 3+ years remaining. No business experience required.
            </p>
          </div>

        </div>
      </section>

      {/* ---------- APPLICATION TIMELINE ---------- */}
      <section ref={timelineRef} className="px-6 md:px-12 py-32 relative w-full overflow-hidden">
        <div className="max-w-5xl mx-auto w-full">

          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              className="text-[11px] font-mono tracking-[0.3em] uppercase text-black mb-4"
            >
              APPLICATION PROCESS — FALL 2026
            </motion.div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[8vw] md:text-6xl lg:text-7xl font-serif font-black tracking-tighter text-[#0f0f0f] leading-[0.8] lowercase"
            >
              TIMELINE
            </motion.h2>
          </div>

          <div className="relative w-full max-w-3xl mx-auto my-16">
            {/* Background Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#e0ddd8] md:-translate-x-1/2"></div>

            {/* Foreground Fill Line */}
            <motion.div
              className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-[#0d6e5e] origin-top md:-translate-x-1/2"
              style={{ height: lineHeight }}
            ></motion.div>

            {/* Nodes */}
            <div className="relative z-10 w-full flex flex-col gap-24 py-10 pl-12 md:pl-0">
              <TimelineNode
                date="SEPTEMBER 2026"
                title="application opens"
                desc="Applications open until early October."
                align="left"
              />
              <TimelineNode
                date="OCTOBER 2026"
                title="interviews"
                desc="Select candidates are invited to interview."
                align="right"
              />
              <TimelineNode
                date="LATE OCTOBER 2026"
                title="decisions released"
                desc="Final decisions announced."
                align="left"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ---------- PHOTO SPREAD ---------- */}
      <section className="w-full relative">
        <div className="w-full h-[30vh] md:h-[40vh] relative overflow-hidden">
          <img
            src={boat24Image}
            alt="Lavin Cohort"
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(1) contrast(1.25) brightness(0.92)' }}
          />
          <div className="absolute bottom-4 left-6 md:left-12">
            <span className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-white/90 drop-shadow-sm mix-blend-difference">
              LAVIN COHORT — SEATTLE
            </span>
          </div>
        </div>
      </section>

      {/* ---------- PROGRAM COMMITMENTS ---------- */}
      <section className="px-6 md:px-12 py-24 md:py-32 w-full border-b border-black/10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[8vw] md:text-6xl lg:text-7xl font-serif font-black tracking-tighter text-[#0f0f0f] leading-[0.8] lowercase mb-16"
          >
            commitments
          </motion.h2>

          <div className="w-full flex flex-col border-t border-black/10">
            <CommitmentRow
              title="welcome retreat"
              desc="Two-day kickoff with guest speakers, team challenges, and a Seattle entrepreneur dinner."
            />
            <CommitmentRow
              title="entre 490b"
              desc="Weekly Winter-quarter class (2 credits, C/NC) on fundamentals like pitching, design thinking, and lean startup."
            />
            <CommitmentRow
              title="field trips & lunches"
              desc="Quarterly small-group visits to local startups, VCs, and innovation hubs—network, ask questions, learn on the go."
            />
            <CommitmentRow
              title="community events"
              desc="Quarterly all-student meetings plus socials, workshops, and lightning talks to build your cohort bonds."
            />
            <CommitmentRow
              title="career support"
              desc="Scholarship-backed placements at early-stage startups, plus early access to the UW Buerk Center's job and internship fairs."
            />
          </div>
        </div>
      </section>

      {/* ---------- READY TO APPLY ---------- */}
      <section className="px-6 md:px-12 py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-start relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tighter text-[#0f0f0f] leading-[0.85] lowercase mb-6"
          >
            ready to<br />apply?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[18px] md:text-[20px] text-[#555] italic font-serif mb-12"
          >
            Applications open in Fall 2026. Join the Lavin community.
          </motion.p>

          <motion.a
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            href="https://uwfoster.my.site.com/Foster/s/undergraduate/certs-and-minors"
            className="rounded-full px-8 py-4 bg-[#0f0f0f] text-white font-sans text-sm md:text-base font-semibold hover:bg-black/80 transition-colors"
          >
            Applications Open Fall 2026
          </motion.a>
        </div>

        {/* Rotated watermark Right side */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="hidden lg:flex absolute right-12 top-0 bottom-0 items-center justify-center pointer-events-none"
        >
          <div className="text-[12vw] xl:text-[15vw] leading-none font-serif font-thin text-[#0f0f0f] opacity-[0.03] tracking-tighter whitespace-nowrap rotate-90 origin-center select-none uppercase pointer-events-none">
            FALL 2026 APPLICATIONS
          </div>
        </motion.div>
      </section>

    </div>
  );
}

/* ---------- Helper Components ---------- */

function TimelineNode({ date, title, desc, align }) {
  const isLeft = align === 'left';
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      className={`relative flex w-full items-center md:flex-row flex-col-reverse ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      {/* Node Circle */}
      <motion.div
        variants={{
          hidden: { scale: 0, backgroundColor: '#e0ddd8' },
          visible: { scale: 1, backgroundColor: '#0d6e5e', transition: { type: "spring", delay: 0.1 } }
        }}
        className="absolute left-[-24px] md:left-1/2 w-4 h-4 rounded-full border-[3px] border-[#f8f7f4] md:-translate-x-1/2 z-20"
      />

      {/* Content */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isLeft ? -20 : 20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
        }}
        className={`w-full md:w-1/2 flex flex-col pt-1 md:pt-0 ${isLeft ? 'md:pr-16 md:text-right md:items-end' : 'md:pl-16 text-left items-start'}`}
      >
        <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-black/40 mb-2">
          {date}
        </div>
        <h3 className="font-serif font-bold text-[1.5rem] md:text-[1.8rem] tracking-tight text-[#0f0f0f] mb-2 leading-tight lowercase">
          {title}
        </h3>
        <p className="text-[14px] md:text-[15px] font-sans text-[#555]">
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

function CommitmentRow({ title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full border-b border-black/10 py-6 md:py-10 flex flex-col md:flex-row items-baseline justify-between gap-4 md:gap-12"
    >
      <div className="md:w-1/4 flex-shrink-0">
        <h4 className="font-serif font-bold text-xl md:text-2xl text-[#0f0f0f] lowercase tracking-tight">{title}</h4>
      </div>
      <div className="md:w-3/4 flex-grow">
        <p className="text-base md:text-[17px] text-[#555] font-sans leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}