import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LeonardLavin from '../assets/LeonardLavin.jpeg';
import LogoMarquee from '../components/ui/LogoMarquee';
import RotatingTestimonial from '../components/ui/RotatingTestimonials';
import CountUp from '../components/ui/CountUp';
import InfoCard from '../components/ui/InfoCard';
import StatCard from '../components/ui/StatCard';
import { fadeUp } from '../lib/animations';

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="w-full bg-slate-50">
      {/* ---------- HERO (fades out as user scrolls) ---------- */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative h-[100svh] w-full overflow-hidden pointer-events-auto bg-[#f8f7f4]"
      >
        {/* SVG Noise Grain Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between px-6 md:px-12 pt-[80px] md:pt-12 pb-8 md:pb-12">

          {/* Top Header Label & Rule */}
          <div className="w-full hidden md:block">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delay: 0 } }
              }}
              className="text-[9px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-[#0f0f0f]"
            >
              <span className="md:hidden font-bold">LAVIN</span><span className="md:hidden"> — UW SEATTLE — 1996</span>
              <span className="hidden md:inline font-bold">LAVIN ENTREPRENEURSHIP PROGRAM</span><span className="hidden md:inline"> — UW SEATTLE</span>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { scaleX: 0, originX: 0 },
                visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
              }}
              className="mt-4 w-full h-[1px] bg-black/20"
            />
          </div>

          {/* Main Manifesto Text */}
          <div className="flex-1 flex flex-col justify-center items-start w-full">
            <div className="font-serif font-black leading-[0.95] md:leading-[1.0] tracking-tighter text-[#0f0f0f] text-[16vw] sm:text-[15vw] md:text-[16vw] lg:text-[15vw] overflow-hidden">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] } }
                }}
              >
                CREATE.
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] } }
                }}
                className="md:ml-[4vw]"
              >
                INNOVATE<span className="text-[#3b2c5a]">.</span>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.8, ease: [0.33, 1, 0.68, 1] } }
                }}
              >
                DISRUPT<span className="text-[#a69041]">.</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom Area: CTAs + Subtitle */}
          <div className="w-full flex flex-col-reverse md:flex-row justify-between items-start md:items-end gap-6 mb-4 md:mb-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delay: 1.1 } }
              }}
              className="flex flex-row gap-3 md:gap-4 w-full md:w-auto"
            >
              <button
                onClick={() => navigate('/recruitment')}
                className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-[#0f0f0f] text-white font-sans text-sm font-semibold hover:bg-black/80 transition-colors"
              >
                join.
              </button>
              <button
                onClick={() => navigate('/events')}
                className="flex-1 md:flex-none px-6 md:px-8 py-3 border border-[#0f0f0f]/30 text-[#0f0f0f] font-sans text-sm font-semibold hover:bg-[#0f0f0f]/5 hover:border-[#0f0f0f] transition-all"
              >
                events.
              </button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delay: 1.0 } }
              }}
              className="font-serif italic text-base md:text-lg text-[#0f0f0f] text-left md:text-right"
            >
              AN ENDOWED BUERK CENTER PROGRAM
            </motion.div>
          </div>

          {/* Vertical Foster Text */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-black" style={{ writingMode: 'vertical-rl' }}>
              FOSTER SCHOOL OF BUSINESS
            </div>
          </div>

        </div>
      </motion.section >

      {/* ---------- ABOUT (normal flow, starts immediately) ---------- */}
      < section
        id="about"
        className="w-full bg-[#f8f7f4] scroll-mt-28 md:scroll-mt-32 font-sans"
      >
        {/* 1. Intro Text */}
        <div className="w-full px-6 md:px-12 py-[10vh] md:py-[15vh]">



          {/* Main Description Text - Massive & Centered */}
          <div className="w-full text-center flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 lg:gap-y-4">
            <motion.div className="overflow-hidden pb-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } }}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#0f0f0f] leading-[1.05] tracking-tight">
                  The Lavin Entrepreneurship Program
                </span>
              </motion.div>
            </motion.div>

            <motion.div className="overflow-hidden pb-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 } } }}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#0f0f0f] leading-[1.05] tracking-tight">
                  is a highly-competitive, endowed program
                </span>
              </motion.div>
            </motion.div>

            <motion.div className="overflow-hidden pb-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 } } }}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#0f0f0f] leading-[1.05] tracking-tight">
                  for undergraduate entrepreneurs from all
                </span>
              </motion.div>
            </motion.div>

            <motion.div className="overflow-hidden pb-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.55 } } }}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#0f0f0f] leading-[1.05] tracking-tight">
                  majors and disciplines across campus.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* 2. Stats - Editorial Layout */}
        <div className="py-12 md:py-16 text-black w-full font-serif overflow-hidden">
          <div className="container-x w-full flex flex-col gap-y-4 md:gap-y-10">

            {/* Stat 1: HUNDREDS (Left aligned) */}
            <div className="w-full relative flex flex-col justify-start overflow-visible py-4 md:py-6 group">
              <div className="w-full md:w-1/2 border-l-4 border-gray-900 pl-6 md:pl-8 z-10">
                <div className="text-[14vw] md:text-[10vw] font-serif font-black leading-[0.85] tracking-tight text-gray-900 flex flex-nowrap pb-2 whitespace-nowrap">
                  {"HUNDREDS".split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans mt-4 text-black/90 tracking-tight">
                    of student founders
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-black/50 font-sans tracking-wide uppercase font-semibold">
                    the brightest of uw
                  </p>
                </motion.div>
              </div>

              {/* Removed Timeline per user feedback */}
            </div>

            {/* Stat 2: 30 Years (Right aligned) */}
            <div className="w-full relative flex flex-col justify-end overflow-visible py-4 md:py-6 mt-8 md:mt-0">
              {/* Ghost Context (Left side) - Leonard Lavin tribute */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden md:flex absolute left-0 top-0 bottom-0 w-1/2 items-center pointer-events-none pl-8 lg:pl-16"
              >
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#0f0f0f] font-bold">
                    FOUNDED BY
                  </div>
                  <div className="font-serif text-3xl lg:text-4xl font-black text-[#0f0f0f] tracking-tight leading-tight select-none">
                    Leonard<br />Lavin
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#0f0f0f] mt-1 font-bold">
                    1996 — SEATTLE
                  </div>
                </div>
              </motion.div>

              <div className="w-full md:w-1/2 border-r-4 border-[#3b2c5a] pr-6 md:pr-8 text-right flex flex-col items-end z-10 ml-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-[14vw] md:text-[11vw] lg:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter text-[#3b2c5a] pb-2"
                >
                  <CountUp from={0} to={30} direction="up" duration={2} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans mt-4 text-black/90 tracking-tight">
                    years of legacy
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-black/50 font-sans tracking-wide">
                    building since '96
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Stat 3: 2 YC Backed (Left aligned) */}
            <div className="w-full relative flex flex-col justify-start overflow-visible py-4 md:py-6 mt-8 md:mt-0">
              <div className="w-full md:w-1/2 border-l-4 border-[#a69041] pl-6 md:pl-8 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-[14vw] md:text-[11vw] lg:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter text-[#a69041] pb-2"
                >
                  <CountUp from={0} to={10} direction="up" duration={1.5} />+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-sans mt-4 text-black/90 tracking-tight">
                    Alumni Startups
                  </h3>
                  <p className="mt-2 text-base md:text-lg text-black/50 font-sans tracking-wide max-w-lg mb-6">
                    companies built by Lavin founders
                  </p>
                </motion.div>
              </div>

              {/* Added Context (Right side) - YC Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 items-center pl-16 xl:pl-32"
              >
                <div className="flex flex-col gap-5 relative z-20 w-fit pointer-events-auto">
                  <a href="https://vly.ai/" target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-black/80 border-b border-[#a69041]/30 group-hover:text-[#a69041] group-hover:border-[#a69041] transition-colors pb-1">vly.ai</span>
                    <span className="text-[#a69041] font-sans font-bold text-sm tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">YC W24 &rarr;</span>
                  </a>
                  <a href="https://toastedseattle.com/" target="_blank" rel="noreferrer" className="group flex items-center gap-3">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-black/80 border-b border-[#a69041]/30 group-hover:text-[#a69041] group-hover:border-[#a69041] transition-colors pb-1">toasted seattle</span>
                    <span className="text-[#a69041] font-sans font-bold text-sm tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* 3. Impact on UW and Seattle */}
        < div className="py-24 md:py-32 bg-white" >
          <div className="container-x">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-serif font-bold text-black tracking-tight mb-4 text-center lowercase"
            >
              Lavin&apos;s impact on UW and Seattle
            </motion.h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg text-black/60 font-sans text-center mb-16 max-w-2xl mx-auto"
            >
              The Lavin Entrepreneurship Program at UW serves as a bridge between academic learning and real-world
              entrepreneurship. We provide students with the resources, mentorship, and community needed to turn
              innovative ideas into successful ventures.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              <InfoCard title="Alumni at Top Companies" text="Lavin graduates have joined Stripe, Meta, Amazon, and Y Combinator startups after graduation." />
              <InfoCard title="Ventures Started at UW" text="Lavin students have founded startups like EcoTech, PulseNotes, and PocketPlan that continue to grow in Seattle." />
              <InfoCard title="Collaborations with UW & Seattle" text="Lavin works closely with UW CoMotion, Foster School, and local accelerators like Techstars and Madrona Venture Labs." />
            </motion.div>
          </div>
        </div >

        {/* 4. Marquee */}
        < div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-white border-t border-black/10" >
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <LogoMarquee />
          </motion.div>
        </div >

        {/* 5. Video Section */}
        {/* <div className="w-full py-16 md:py-24 bg-[#f8f7f4] border-t border-black/10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-6xl mx-auto px-6 md:px-12"
          >
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg bg-black">
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/936471424?autoplay=1&loop=1"
                frameBorder={0}
                allowFullScreen
                title="Lavin Program Video"
              />
            </div>
          </motion.div>
        </div> */}
      </section>
    </div>
  );
}


