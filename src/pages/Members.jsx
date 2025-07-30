import { motion } from 'framer-motion';
import LogoMarquee from '../components/LogoMarquee';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionDivider = () => (
  <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />
);

export default function Members() {
  const executiveBoard = [
    { name: 'Alex Johnson', role: 'President', major: 'Computer Science', year: '2025' },
    { name: 'Maria Rodriguez', role: 'Vice President', major: 'Business', year: '2025' },
    { name: 'David Kim', role: 'Treasurer', major: 'Engineering', year: '2026' },
    { name: 'Sarah Chen', role: 'Secretary', major: 'Computer Science', year: '2025' },
    { name: 'Michael Park', role: 'Events Director', major: 'Business', year: '2026' },
    { name: 'Emily Wang', role: 'Marketing Director', major: 'Communications', year: '2025' },
  ];

  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero Header ---------- */}
      <section className="bg-web-gold px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-encode text-husky-purple mb-6"
          >
            Building the Next Generation of Entrepreneurs
          </motion.h1>
          <motion.p 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-neutral-700 mb-8 text-lg md:text-xl font-open leading-relaxed"
          >
            From $1M+ in funding raised to 100+ student founders, our community is transforming ideas into reality. 
            Meet the innovators, builders, and leaders who are reshaping the entrepreneurial landscape.
          </motion.p>
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="flex flex-wrap gap-4 text-sm font-semibold text-husky-purple"
          >
            <span className="bg-purple-100 px-3 py-1 rounded-full">50+ Active Members</span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">25+ Companies Founded</span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">6 Majors Represented</span>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 2: Member Statistics & Impact ---------- */}
      <section className="bg-white px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-encode text-husky-purple mb-12 text-center">
              Our Impact
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-black text-husky-purple mb-2">$1M+</div>
                <div className="text-neutral-700 font-semibold">Funding Raised</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-3xl font-black text-husky-purple mb-2">100+</div>
                <div className="text-neutral-700 font-semibold">Student Founders</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">💡</div>
                <div className="text-3xl font-black text-husky-purple mb-2">50+</div>
                <div className="text-neutral-700 font-semibold">Startups Launched</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-3xl font-black text-husky-purple mb-2">25+</div>
                <div className="text-neutral-700 font-semibold">Companies Founded</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">50</div>
                <div className="text-neutral-700 font-semibold">Active Members</div>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">6</div>
                <div className="text-neutral-700 font-semibold">Majors Represented</div>
              </div>
              
              <div className="text-center p-8 rounded-lg bg-white shadow-lg border border-gray-100 hover:scale-105 hover:shadow-lg transition-transform duration-200">
                <div className="text-5xl font-black text-husky-purple mb-2">3.4</div>
                <div className="text-neutral-700 font-semibold">Average GPA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 3: Alumni Spotlight ---------- */}
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
    </div>
  );
} 