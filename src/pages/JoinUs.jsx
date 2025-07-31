import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function JoinUs() {
  const sponsors = [
    {
      name: 'Microsoft',
      category: 'Platinum Sponsor',
      description: 'Supporting the next generation of tech entrepreneurs',
      logo: '🪟'
    },
    {
      name: 'Amazon',
      category: 'Gold Sponsor',
      description: 'Empowering student innovation and startup culture',
      logo: '📦'
    },
    {
      name: 'Google',
      category: 'Silver Sponsor',
      description: 'Building the future of technology together',
      logo: '🔍'
    },
    {
      name: 'UW Foster School',
      category: 'Academic Partner',
      description: 'Providing business education and mentorship',
      logo: '🎓'
    },
    {
      name: 'CoMotion',
      category: 'Innovation Partner',
      description: 'UW\'s innovation hub connecting students to industry',
      logo: '⚡'
    },
    {
      name: 'Seattle Angel Fund',
      category: 'Investment Partner',
      description: 'Supporting early-stage student startups',
      logo: '💰'
    }
  ];

  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero / Overview ---------- */}
      <section className="relative bg-web-gold px-6 md:px-12 py-20">
        {/* subtle decorative circle */}
        <div className="pointer-events-none absolute -top-20 -right-10 md:-right-20 h-60 w-60 md:h-80 md:w-80 rounded-full bg-accent-lavender/40 blur-3xl" />

        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h1 className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode">
              Join Us
            </h1>
            <span className="block h-1 w-16 bg-spirit-gold mb-6" />
            <p className="text-lg md:text-xl text-neutral-800 mb-8 leading-relaxed font-open">
              We love our partners! Our sponsors, mentors, and professionals are the backbone of our community, 
              providing invaluable support, guidance, and opportunities that make Lavin's mission possible. 
              Together, we're building the next generation of entrepreneurs and innovators.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 2: Our Sponsors ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            Our Sponsors
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 mb-12 leading-relaxed font-open text-center"
          >
            Our sponsors provide crucial resources, mentorship, and opportunities that enable our members to 
            pursue their entrepreneurial dreams.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          >
            {sponsors.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-neutral-700 text-center font-open"
          >
            Interested in joining our network of partners?
          </motion.p>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 3: Sponsor Us ---------- */}
      <section className="bg-white px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-husky-purple mb-4 font-encode">
              Sponsor Us!
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed font-open max-w-3xl mx-auto">
              Your support helps us create transformative experiences for student entrepreneurs. 
              Whether through financial sponsorship, mentorship opportunities, or event partnerships, 
              your involvement makes a real difference in the lives of aspiring entrepreneurs.
            </p>
            <button className="px-8 py-4 bg-husky-purple text-white rounded-lg text-lg font-semibold hover:bg-spirit-purple transition-colors duration-200 shadow-lg">
              Contact Us About Sponsorship
            </button>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 4: Students ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            👪 Get Involved: Students
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-lg text-neutral-700 font-open">
              <div className="text-center">
                <p className="font-semibold text-husky-purple mb-4">
                  📅 Applications for Lavin membership open each quarter!
                </p>
              </div>
              
              <p>
                Lavin is run for students, by students. We're the premier entrepreneurship organization at UW, 
                connecting ambitious students with the resources, mentorship, and community they need to succeed.
              </p>
              
              <p>
                Join Lavin and become part of a community that's building the future. We provide workshops, 
                networking events, mentorship opportunities, and the chance to work on real startup projects. 
                All UW students are welcome to apply, regardless of your major or experience level.
              </p>
              
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Join the team.</h4>
                <p>
                  It takes a diverse set of skills to run UW's premier entrepreneurship 
                  organization: we need programmers, designers, managers, salespeople, artists, planners, and more. 
                  Applications to join our executive board open each spring quarter.
                </p>
              </div>
              
              <p>
                To get a taste of Lavin, come say hi at the Engineering RSO Fair, Dawg Daze, the Foster School 
                Welcome Day, or Red Square RSO Fair. We'll have merch and snacks!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 5: Professionals ---------- */}
      <section className="bg-white px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            🌟 Get Involved: Professionals
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#fdf9f3] rounded-xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-lg text-neutral-700 font-open">
              <div className="text-center">
                <p className="font-semibold text-husky-purple mb-4">
                  📅 We're always looking for mentors and speakers!
                </p>
              </div>
              
              <p>
                Lavin works closely with volunteer industry professionals to run our events and connect our students 
                with amazing mentors. Professionals can get involved in three ways:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Mentor our members:</h4>
                  <p>
                    Share your expertise and guide the next generation of entrepreneurs. 
                    Whether it's through one-on-one mentoring, workshop facilitation, or project guidance, your insights are invaluable.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Connect us with your company:</h4>
                  <p>
                    If you think your employer would like to sponsor Lavin, 
                    connecting us with a member of your recruiting or university recruiting team is the first step to make that happen.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Speak at our events:</h4>
                  <p>
                    If you think you or someone you know would be a standout speaker 
                    at our events, we'd love to hear from you!
                  </p>
                </div>
              </div>
              
              <p className="text-center">
                Ready to get involved? Email us at <strong>hello@lavin.org</strong> and we'll get things moving!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

      {/* ---------- Section 6: Companies ---------- */}
      <section className="bg-[#fdf9f3] px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold text-husky-purple mb-4 font-encode text-center"
          >
            💡 Get Involved: Companies
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto"
          >
            <div className="space-y-6 text-lg text-neutral-700 font-open">
              <div className="text-center">
                <p className="font-semibold text-husky-purple mb-4">
                  📅 We work with companies year-round to plan sponsorships!
                </p>
              </div>
              
              <p>
                Every year we partner with companies big and small to bring students and industry closer together. 
                We've already begun partnering with companies for the upcoming academic year, but spots are still available.
              </p>
              
              <p>
                If your company is interested in learning more about our corporate sponsorship packages and process, 
                reach out to <strong>hello@lavin.org</strong> so we can get you a prospectus and schedule a meeting 
                with our sponsorship team!
              </p>
              
              <p>
                For a taste of what sponsoring Lavin is like, check out our past events and success stories!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function SponsorCard({ sponsor }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200 text-center">
      <div className="w-20 h-20 bg-neutral-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <span className="text-4xl">{sponsor.logo}</span>
      </div>
      <h3 className="text-xl font-bold text-husky-purple mb-2">{sponsor.name}</h3>
      <p className="text-spirit-purple font-semibold mb-3">{sponsor.category}</p>
      <p className="text-neutral-600 text-sm leading-relaxed">{sponsor.description}</p>
    </div>
  );
} 