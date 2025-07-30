// About.jsx
import { motion } from 'framer-motion';
import LeonardLavin from '../assets/LeonardLavin.jpeg';
import LogoMarquee from '../components/LogoMarquee';
import RotatingTestimonial from '../components/RotatingTestimonials';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero / Overview ---------- */}
      <section className="relative bg-web-gold px-6 md:px-12 py-20">
        {/* subtle decorative circle */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent-lavender/40 blur-3xl" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text block */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h1 className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode">
              Welcome to Lavin
            </h1>

            <span className="block h-1 w-16 bg-spirit-gold mb-6" />

            <p className="text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed font-open">
              The Lavin Entrepreneurship Program is a highly-competitive program for undergraduate entrepreneurs
              from all majors and disciplines across campus. Only the brightest, most passionate and driven students
              are accepted each year. By combining curriculum with hands-on learning, the UW Buerk Center for
              Entrepreneurship gives Lavin students (Laviners) the experience, skills and know-how to succeed in
              their future business ventures.
            </p>

            {/* Testimonial Card */}
            <div className="relative max-w-xl">
              <div className="absolute -top-6 -left-6 text-accent-lavender text-6xl leading-none select-none">
                "
              </div>
              <RotatingTestimonial />
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-full max-w-xl aspect-video rounded-lg overflow-hidden shadow-xl bg-black">
              <iframe
                className="w-full h-full"
                src="https://player.vimeo.com/video/936471424?autoplay=1&loop=1"
                frameBorder="0"
                allowFullScreen
                title="Lavin Program Video"
              />
            </div>
          </motion.div>
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/recruitment" className="px-6 py-3 bg-husky-purple text-white rounded-md font-semibold hover:bg-spirit-purple transition">
            Apply to Lavin →
          </a>
        </div>
      </section>
      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 2: Lavin x Seattle ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode"
          >
            Lavin x Seattle
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 leading-relaxed font-open"
          >
            The Lavin Entrepreneurship Program at UW serves as a bridge between academic learning and real-world
            entrepreneurship. We provide students with the resources, mentorship, and community needed to turn
            innovative ideas into successful ventures.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 mb-12 leading-relaxed font-open"
          >
            Seattle's vibrant startup ecosystem provides Lavin members with unparalleled opportunities to learn,
            grow, and succeed. Students benefit from connections to tech giants, venture capital, accelerators,
            and UW's own innovation hubs.
          </motion.p>

          {/* Info Cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <InfoCard
              title="Alumni at Top Companies"
              text="Lavin graduates have joined Stripe, Meta, Amazon, and Y Combinator startups after graduation."
            />
            <InfoCard
              title="Ventures Started at UW"
              text="Lavin students have founded startups like EcoTech, PulseNotes, and PocketPlan that continue to grow in Seattle."
            />
            <InfoCard
              title="Collaborations with UW & Seattle"
              text="Lavin works closely with UW CoMotion, Foster School, and local accelerators like Techstars and Madrona Venture Labs."
            />
          </motion.div>
        </div>
      </section>
      

      {/* ---------- Logo Marquee ---------- */}
      <LogoMarquee />
      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 3: Leonard Lavin ---------- */}
      <section className="bg-white px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={LeonardLavin}
              alt="Leonard Lavin"
              className="rounded-lg shadow-lg max-h-96 w-auto object-cover"
            />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-husky-purple mb-4 font-encode">Leonard Lavin</h2>
            <span className="block h-1 w-12 bg-spirit-gold mb-6" />
            <p className="text-lg text-neutral-700 leading-relaxed font-open">
              Leonard Lavin was a pioneering entrepreneur and philanthropist who founded Alberto-Culver Company, a
              global consumer products company. His legacy of innovation and business acumen continues to inspire the
              next generation of entrepreneurs at the University of Washington.
            </p>
          </motion.div>
        </div>

        {/* Bottom decorative blob */}
        <div className="pointer-events-none absolute -bottom-20 -left-24 h-72 w-72 rounded-full bg-accent-teal/30 blur-3xl" />
      </section>
    </div>
  );
}

/* ---------- Small helper components ---------- */

function InfoCard({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <h3 className="font-semibold text-lg text-husky-purple mb-2">{title}</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">{text}</p>
    </div>
  );
}