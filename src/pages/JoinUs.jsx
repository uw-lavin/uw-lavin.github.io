import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

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
      <section className="relative bg-slate-50 px-6 md:px-12 pt-10 pb-10 md:pt-12 md:pb-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h1 className="text-black font-serif font-black leading-[0.9] text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter drop-shadow-sm mb-4 md:mb-6 lowercase">
              join us
            </h1>
            <p className="text-lg md:text-xl text-black/80 mb-8 leading-relaxed font-sans text-center">
              We love our partners! Our sponsors, mentors, and professionals are the backbone of our community,
              providing invaluable support, guidance, and opportunities that make Lavin's mission possible.
              Together, we're building the next generation of entrepreneurs and innovators.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Section 2: Our Sponsors ---------- */}
      <section className="bg-white px-6 md:px-12 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-black mb-6 lowercase text-center"
          >
            our sponsors
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-[#0f0f0f] mb-16 font-sans text-center max-w-2xl mx-auto"
          >
            Our sponsors provide crucial resources, mentorship, and opportunities that enable our members to
            pursue their entrepreneurial dreams.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
            className="text-lg text-[#0f0f0f] text-center font-sans tracking-tight"
          >
            Interested in joining our network of partners?
          </motion.p>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Section 3: Sponsor Us ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 py-24 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-black mb-6 lowercase text-center">
              sponsor us!
            </h2>
            <p className="text-lg text-[#0f0f0f] mb-10 font-sans max-w-2xl mx-auto">
              Your support helps us create transformative experiences for student entrepreneurs.
              Whether through financial sponsorship, mentorship opportunities, or event partnerships,
              your involvement makes a real difference in the lives of aspiring entrepreneurs.
            </p>
            <button className="btn-primary inline-block">
              Contact Us About Sponsorship
            </button>
          </motion.div>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Section 4: Students ---------- */}
      <section className="bg-white px-6 md:px-12 py-24 relative">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-black mb-12 lowercase text-center"
          >
            get involved: students
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-transparent border border-black/10 rounded-none p-10 max-w-4xl mx-auto"
          >
            <div className="space-y-8 text-lg text-black/80 font-sans">
              <div className="text-left border-l-4 border-gray-900 pl-4 py-1 italic">
                <p className="text-black/80">
                  Applications for Lavin membership open each quarter!
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
                <h4 className="font-serif font-bold text-xl text-black lowercase tracking-tight mb-2">join the team.</h4>
                <p className="text-base text-[#0f0f0f]">
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

      <div className="w-full border-t border-black/10" />

      {/* ---------- Section 5: Professionals ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 py-24 relative">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-black mb-12 lowercase text-center"
          >
            get involved: professionals
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-transparent border border-black/10 rounded-none p-10 max-w-4xl mx-auto"
          >
            <div className="space-y-8 text-lg text-black/80 font-sans">
              <div className="text-left border-l-4 border-gray-900 pl-4 py-1 italic">
                <p className="text-black/80">
                  We're always looking for mentors and speakers!
                </p>
              </div>

              <p>
                Lavin works closely with volunteer industry professionals to run our events and connect our students
                with amazing mentors. Professionals can get involved in three ways:
              </p>

              <div className="space-y-8 mt-12">
                <div>
                  <h4 className="font-serif font-bold text-xl text-black lowercase tracking-tight mb-2">mentor our members</h4>
                  <p className="text-base text-[#0f0f0f]">
                    Share your expertise and guide the next generation of entrepreneurs.
                    Whether it's through one-on-one mentoring, workshop facilitation, or project guidance, your insights are invaluable.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-xl text-black lowercase tracking-tight mb-2">connect us with your company</h4>
                  <p className="text-base text-[#0f0f0f]">
                    If you think your employer would like to sponsor Lavin,
                    connecting us with a member of your recruiting or university recruiting team is the first step to make that happen.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-xl text-black lowercase tracking-tight mb-2">speak at our events</h4>
                  <p className="text-base text-[#0f0f0f]">
                    If you think you or someone you know would be a standout speaker
                    at our events, we'd love to hear from you!
                  </p>
                </div>
              </div>

              <p className="text-left mt-10">
                Ready to get involved? Email us at <strong className="text-black font-semibold">lavin.entrepreneurship@gmail.com</strong> and we'll get things moving.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Section 6: Companies ---------- */}
      <section className="bg-white px-6 md:px-12 py-24 relative">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-black mb-12 lowercase text-center"
          >
            get involved: companies
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-transparent border border-black/10 rounded-none p-10 max-w-4xl mx-auto"
          >
            <div className="space-y-8 text-lg text-black/80 font-sans">
              <div className="text-left border-l-4 border-gray-900 pl-4 py-1 italic">
                <p className="text-black/80">
                  We work with companies year-round to plan sponsorships!
                </p>
              </div>

              <p>
                Every year we partner with companies big and small to bring students and industry closer together.
                We've already begun partnering with companies for the upcoming academic year, but spots are still available.
              </p>

              <p>
                If your company is interested in learning more about our corporate sponsorship packages and process,
                reach out to <strong className="text-black font-semibold">lavin.entrepreneurship@gmail.com</strong> so we can get you a prospectus and schedule a meeting
                with our sponsorship team.
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
    <div className="bg-slate-50 p-8 border border-black/10 hover:border-black/30 transition-colors duration-200 text-left flex flex-col justify-between">
      <div>
        <div className="w-16 h-16 bg-white border border-black/10 mb-6 flex items-center justify-center -rotate-3 text-4xl opacity-50 grayscale">
          {sponsor.logo}
        </div>
        <h3 className="text-2xl font-serif font-bold text-black lowercase tracking-tight mb-2">{sponsor.name}</h3>
        <p className="text-sm tracking-widest uppercase font-bold text-black/40 mb-4">{sponsor.category}</p>
      </div>
      <p className="text-[#0f0f0f] text-sm font-sans leading-relaxed pt-6 border-t border-black/10">{sponsor.description}</p>
    </div>
  );
} 