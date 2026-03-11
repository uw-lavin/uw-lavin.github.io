import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

export default function Resources() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'lavin2024';



  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const resourceSections = [
    {
      title: 'Quick Access',
      description: 'Essential community and directory resources',
      resources: [
        {
          title: 'Lavin Discord',
          description: 'Join the real-time Lavin community.',
          type: 'Discord',
          link: 'https://discord.gg/ATvfzpee'
        },
        {
          title: 'Student Roster',
          description: 'View and search all current Lavin students.',
          type: 'Spreadsheet',
          link: 'https://docs.google.com/spreadsheets/d/1QPm3LSoGjWDQUCDzBIVZbJkK7gF5MM_cQg_BiaGIkAs/edit?gid=0#gid=0'
        },
        {
          title: 'Coffee Chat Instructions',
          description: 'Learn how to schedule and conduct coffee chats.',
          type: 'Document',
          link: 'https://docs.google.com/document/d/1cX-6ZTXVq8PDj9o_BoDGal-nzk_NIjWiwyfiLPQhjzc/edit?tab=t.0'
        }
      ]
    },
    {
      title: 'Academic & Career Workflows',
      description: 'Forms and processes for academic and career advancement',
      resources: [
        {
          title: 'Resume Book Instructions',
          description: 'Submit your resume for the Lavin resume book.',
          type: 'Document',
          link: 'https://docs.google.com/document/d/1fdOya-sW4nII43ALl_uL9y2QGkwP3ly4Dk1Q6bne43k/edit?tab=t.0'
        },
        {
          title: 'Entrepreneurship Minor Request',
          description: 'Apply for the entrepreneurship minor program.',
          type: 'Form',
          link: 'https://docs.google.com/forms/d/e/1FAIpQLSeQL_ZlB_X2sy6IgTsZrVNSrfxAxwA3eP4JGn8qjfhhxbE5aQ/viewform'
        },
        {
          title: 'Creating-A-Company Prereq Skip',
          description: 'Request to skip prerequisites for the Creating-A-Company class.',
          type: 'Form',
          link: 'https://docs.google.com/forms/d/e/1FAIpQLSfmyQPpXIVG_t-XpWwepAOSQ6ReDAHGIX6d3WFbZOo0GU4A3w/viewform'
        }
      ]
    }
  ];

  useEffect(() => {
    const storedAuth = localStorage.getItem('lavinAuth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('lavinAuth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lavinAuth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full">
        {/* ---------- Hero Section ---------- */}
        <section className="bg-slate-50 px-6 md:px-12 pt-10 pb-10 md:pt-12 md:pb-12">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-black font-serif font-black leading-[0.9] text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter drop-shadow-sm mb-4 md:mb-6 lowercase"
            >
              resources
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg md:text-xl text-black/80 font-sans leading-relaxed max-w-2xl"
            >
              Member-only resources, tools, and connections to help you succeed.
            </motion.p>
          </div>
        </section>

        <div className="w-full border-t border-black/10" />

        {/* ---------- Login Section ---------- */}
        <section className="bg-white px-6 md:px-12 py-24">
          <div className="max-w-sm mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-transparent border border-black/10 p-10"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-black mb-4 lowercase text-center">member access</h2>
              <p className="text-[#0f0f0f] mb-8 font-sans text-center text-sm">
                Enter the password to access member-only resources and tools.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm tracking-widest uppercase font-bold text-black/40 mb-2 font-sans">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-black/20 focus:outline-none focus:ring-0 focus:border-black font-sans bg-slate-50 transition-colors"
                    placeholder="Enter password"
                    required
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-open">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-black/80 py-3 px-6 font-serif font-bold text-lg lowercase tracking-wide transition-all duration-200"
                >
                  Access Resources
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ---------- Hero Section ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 pt-10 pb-10 md:pt-12 md:pb-12 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="absolute top-8 right-8 z-20">
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={handleLogout}
              className="text-black/40 hover:text-black font-sans uppercase tracking-widest text-xs font-bold transition-colors"
            >
              Logout
            </motion.button>
          </div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-black font-serif font-black leading-[0.9] text-5xl md:text-7xl lg:text-[7.5rem] tracking-tighter drop-shadow-sm mb-4 md:mb-6 lowercase"
          >
            internal resources
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-black/80 font-sans leading-relaxed max-w-2xl"
          >
            Quick links to the tools, forms, and documents Lavin students rely on for community, operations, academics, and career progress.
          </motion.p>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Internal Resources Section ---------- */}
      <section className="bg-white px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="space-y-24">
            {resourceSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-10"
              >
                <div className="text-left border-l-4 border-gray-900 pl-6 py-2">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-black tracking-tight lowercase mb-2">{section.title}</h3>
                  <p className="text-[#0f0f0f] font-sans">{section.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.resources.map((resource, index) => (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      className="group"
                    >
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-slate-50 p-8 border border-black/10 hover:border-black/30 transition-all duration-300 h-full flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-1 bg-black/5 text-black">
                              {resource.type}
                            </span>
                          </div>
                          <h4 className="text-2xl font-serif font-bold text-black lowercase tracking-tight mb-4">{resource.title}</h4>
                          <p className="text-[#0f0f0f] mb-6 font-sans leading-relaxed text-sm">
                            {resource.description}
                          </p>
                        </div>
                        <div className="text-black uppercase tracking-widest font-bold font-sans text-xs group-hover:text-black/60 transition-colors pt-6 border-t border-black/10">
                          Open →
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-20 text-center pt-10 border-t border-black/10"
          >
            <p className="text-[#0f0f0f] font-sans italic text-sm">
              Need help accessing any resources? Contact the Lavin team.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 