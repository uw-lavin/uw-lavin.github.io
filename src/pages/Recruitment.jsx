import { motion } from 'framer-motion';
import boat24Image from '../assets/boat24.png';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const timelineData = [
  {
    date: "September 24, 2025",
    title: "Applications Open",
    description: "Applications for 2025 cohort open",
    icon: "📝",
    status: "upcoming"
  },
  {
    date: "October 1-7, 2025",
    title: "First Round Interviews",
    description: "Selected candidates invited for interviews",
    icon: "🎯",
    status: "upcoming"
  },
  {
    date: "November 1, 2025",
    title: "Decisions Released",
    description: "Final decisions and welcome to Lavin",
    icon: "🎉",
    status: "upcoming"
  }
];

export default function Recruitment() {
  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero / Overview ---------- */}
      <section className="relative bg-web-gold px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h1 className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode">
              Step into Entrepreneurship
            </h1>
            <span className="block h-1 w-16 bg-spirit-gold mb-6" />
            <div className="space-y-6 text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed font-open">
              <p>
                The Lavin Entrepreneurship Program is competitive. We look for the most driven, passionate and creative individuals we can find. Whether you're intending to major in engineering, business, computer science, or are undecided—if you know your path is entrepreneurial, you belong in Lavin!
              </p>
              <p>
                The online application for Lavin opens in mid-September, and decisions are made by early November. Any University of Washington undergraduate student (including incoming first-years) with at least three years remaining in their time at UW is eligible to apply.
              </p>
              <p>
                On your application you will be asked to write about your 'entrepreneurial' experiences, skills you have taught yourself, and what you hope to learn to further your entrepreneurial journey. We encourage you to think broadly about how being an entrepreneur can include times in your life where you take action to solve the problems you see in your world and that does not necessarily mean your actions resulted in a new business being started–though if you did start a business or non-profit, we'd love to hear about it!
              </p>
            </div>
            <button className="px-8 py-4 bg-husky-purple text-white rounded-lg text-lg font-semibold hover:bg-spirit-purple transition-colors duration-200 shadow-lg">
              Applications Opening Soon
            </button>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 2: Application Timeline ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            Application Timeline
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 mb-16 leading-relaxed font-open text-center"
          >
            Our application process is designed to identify the most passionate and driven student entrepreneurs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Container */}
            <div className="flex flex-col md:flex-row items-center justify-between relative">
              {/* Timeline Steps */}
              {timelineData.map((step, index) => (
                <TimelineStep
                  key={index}
                  step={step}
                  index={index}
                  isLast={index === timelineData.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 3: Lavin Requirements ---------- */}
      <section className="bg-white px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-12 font-encode text-center"
          >
            Program Commitments
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Program Description */}
            <div className="space-y-6">
              <div className="space-y-6 text-lg text-neutral-700">
                <p>
                  Lavin is a competitive, cohort‑based program combining a 16‑credit Entrepreneurship curriculum with hands‑on activities and career support. Students commit to:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Welcome Retreat</h4>
                    <p>Two‑day kickoff with guest speakers, team challenges, and a Seattle entrepreneur dinner.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Startup Skills Course (ENTRE 490B)</h4>
                    <p>Weekly Winter‑quarter class (2 credits, C/NC) on fundamentals like pitching, design thinking, and lean startup.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Field Trips & Lunches</h4>
                    <p>Quarterly small‑group visits to local startups, VCs, and innovation hubs—network, ask questions, learn on the go.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Community Events</h4>
                    <p>Quarterly all‑student meetings plus socials, workshops, and lightning talks to build your cohort bonds.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-2">Internships & Career Support</h4>
                    <p>Scholarship‑backed placements at early‑stage startups, plus early access to the UW Buerk Center's job and internship fairs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center items-center">
              <div className="rounded-lg overflow-hidden w-full">
                <img 
                  src={boat24Image}
                  alt="Lavin program activities" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 4: Apply Now ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-husky-purple mb-4 font-encode">
              Ready to Apply?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed font-open">
              Applications open in Fall 2025. Join the Lavin community and start your entrepreneurial journey.
            </p>
            <button className="px-8 py-4 bg-husky-purple text-white rounded-lg text-lg font-semibold hover:bg-spirit-purple transition-colors duration-200 shadow-lg">
            Applications Opening Soon
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function TimelineStep({ step, index, isLast }) {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-8 relative z-10">
      {/* Icon Circle */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-white border-4 border-husky-purple rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">{step.icon}</span>
        </div>
        {/* Connection line for mobile */}
        {!isLast && (
          <div className="md:hidden w-0.5 h-8 bg-husky-purple/30 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="text-center md:text-left max-w-xs">
        {/* Date Badge */}
        <div className="inline-block bg-husky-purple text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
          {step.date}
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg text-husky-purple mb-2">
          {step.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-neutral-600 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
} 