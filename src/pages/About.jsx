// About.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LeonardLavin from '../assets/LeonardLavin.jpeg';
import LogoMarquee from '../components/LogoMarquee';
import RotatingTestimonial from '../components/RotatingTestimonials';
import CountUp from '../components/CountUp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionDivider = () => (
  <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />
);

export default function About() {
  const navigate = useNavigate();
  
  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero / Overview ---------- */}
      <section className="relative bg-web-gold px-6 md:px-12 py-20">
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
          <button 
            onClick={() => navigate('/recruitment')}
            className="px-6 py-3 bg-husky-purple text-white rounded-md font-semibold hover:bg-spirit-purple transition"
          >
            Apply to Lavin →
          </button>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 2: Lavin's Impact on UW and Seattle ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            Lavin's Impact on UW and Seattle
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 leading-relaxed font-open mb-8"
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

      <SectionDivider />

      {/* ---------- Section 3: Our Impact in Numbers ---------- */}
      <section className="bg-white px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-encode text-husky-purple mb-12 text-center">
              Our Impact in Numbers
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-black text-husky-purple mb-2">
                  $<CountUp from={0} to={1} separator="," direction="up" duration={1} className="count-up-text" />M+
                </div>
                <div className="text-neutral-700 font-semibold">Funding Raised</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-3xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={500} separator="," direction="up" duration={1} className="count-up-text" />+
                </div>
                <div className="text-neutral-700 font-semibold">Student Founders</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">💡</div>
                <div className="text-3xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={200} separator="," direction="up" duration={1} className="count-up-text" />+
                </div>
                <div className="text-neutral-700 font-semibold">Startups Launched</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-3xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={25} separator="," direction="up" duration={1} className="count-up-text" />+
                </div>
                <div className="text-neutral-700 font-semibold">Companies Founded</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={115} separator="," direction="up" duration={1} className="count-up-text" />
                </div>
                <div className="text-neutral-700 font-semibold">Active Members</div>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={50} separator="," direction="up" duration={1} className="count-up-text" />
                </div>
                <div className="text-neutral-700 font-semibold">Majors Represented</div>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">
                  <CountUp from={0} to={3.7} separator="," direction="up" duration={1} className="count-up-text" />
                </div>
                <div className="text-neutral-700 font-semibold">Average GPA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 4: Alumni Spotlight ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-encode text-husky-purple mb-6 text-center">
              Alumni Spotlight
            </h2>
            
            <div className="space-y-6 text-lg text-neutral-700 mb-12 font-open">
              <p>
                Our Lavin alumni have gone on to make significant impacts in the entrepreneurial ecosystem, 
                from founding successful startups to leading innovation at major tech companies.
              </p>
              <p>
                Many of our graduates have secured positions at top-tier companies like Google, Meta, 
                Amazon, and Microsoft, while others have launched their own ventures with funding from 
                prestigious accelerators like Y Combinator.
              </p>
              <p>
                The Lavin network continues to grow stronger each year, with alumni actively mentoring 
                current students and creating opportunities for the next generation of entrepreneurs.
              </p>
            </div>

            <LogoMarquee />
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 5: Who was Leonard Lavin ---------- */}
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
            <h2 className="text-3xl font-bold text-husky-purple mb-4 font-encode">Who was Leonard Lavin</h2>
            <span className="block h-1 w-12 bg-spirit-gold mb-6" />
            <p className="text-lg text-neutral-700 leading-relaxed font-open mb-6">
              Leonard Lavin was a pioneering entrepreneur and philanthropist who founded Alberto-Culver Company, a
              global consumer products company. His legacy of innovation and business acumen continues to inspire the
              next generation of entrepreneurs at the University of Washington.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed font-open">
              Through his generous support and vision, the Lavin Entrepreneurship Program was established to provide
              students with the resources, mentorship, and community needed to turn innovative ideas into successful
              ventures. His commitment to education and entrepreneurship lives on through every Lavin student.
            </p>
          </motion.div>
        </div>
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