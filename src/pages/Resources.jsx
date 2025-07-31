import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Resources() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const correctPassword = 'lavin2024';

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
          link: 'https://discord.gg/fWusFMEy75'
        },
        {
          title: 'Lavin Student Directory',
          description: 'View and search all current Lavin students.',
          type: 'Spreadsheet',
          link: 'https://docs.google.com/spreadsheets/d/1WK1MvijOVlLwIMZHEsW_FXyqJi5y54JU/edit?gid=1927637468#gid=1927637468'
        },
        {
          title: 'Lavin Families',
          description: 'Access family assignments and information.',
          type: 'Spreadsheet',
          link: 'https://docs.google.com/spreadsheets/d/1CvEpgK_zHIjsaAuLaEtakGgFhkM0ck3szX4icXVePTA/edit?gid=0#gid=0'
        }
      ]
    },
    {
      title: 'Operational & Community Infrastructure',
      description: 'Process guides and community management tools',
      resources: [
        {
          title: 'Coffee Chat Instructions',
          description: 'Learn how to schedule and conduct coffee chats.',
          type: 'Document',
          link: 'https://docs.google.com/document/d/1cX-6ZTXVq8PDj9o_BoDGal-nzk_NIjWiwyfiLPQhjzc/edit?tab=t.0'
        },
        {
          title: 'Family Reimbursement Process',
          description: 'Submit and track family activity reimbursements.',
          type: 'Document',
          link: 'https://docs.google.com/document/d/1qF01jpaTeIIQIyslS7OUV7j_qqHPSFG_-REJtpzlKZc/edit?tab=t.0'
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
        <section className="bg-web-gold px-6 md:px-12 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-encode text-husky-purple mb-6"
            >
              Resources
            </motion.h1>
            <motion.p 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="text-lg md:text-xl text-neutral-700 leading-relaxed font-open"
            >
              Member-only resources, tools, and connections to help you succeed.
            </motion.p>
          </div>
        </section>

        <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

        {/* ---------- Login Section ---------- */}
        <section className="bg-white px-6 md:px-12 py-20">
          <div className="max-w-md mx-auto">
            <motion.div 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-husky-purple mb-6 font-encode">Member Access</h2>
              <p className="text-neutral-700 mb-6 font-open">
                Enter the password to access member-only resources and tools.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2 font-open">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-husky-purple focus:border-transparent font-open"
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                {error && (
                  <p className="text-red-600 text-sm font-open">{error}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-husky-purple text-white py-3 px-6 rounded-lg font-semibold hover:bg-spirit-purple transition-colors duration-200 font-open"
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
          <section className="bg-web-gold px-6 md:px-12 py-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <motion.h1 
                  variants={fadeUp} 
                  initial="hidden" 
                  animate="visible"
                  className="text-4xl md:text-5xl font-encode text-husky-purple"
                >
                  Internal Resources
                </motion.h1>
                <motion.button
                  variants={fadeUp} 
                  initial="hidden" 
                  animate="visible"
                  onClick={handleLogout}
                  className="text-husky-purple hover:text-spirit-purple font-semibold font-open"
                >
                  Logout
                </motion.button>
              </div>
              
              <motion.p 
                variants={fadeUp} 
                initial="hidden" 
                animate="visible"
                className="text-lg md:text-xl text-neutral-700 leading-relaxed font-open"
              >
                Quick links to the tools, forms, and documents Lavin students rely on for community, operations, academics, and career progress.
              </motion.p>
            </div>
          </section>

          {/* ---------- Internal Resources Section ---------- */}
          <section className="bg-white px-6 md:px-12 py-20">
            <div className="max-w-7xl mx-auto">
              
              <div className="space-y-16">
                {resourceSections.map((section, sectionIndex) => (
                  <motion.div 
                    key={sectionIndex}
                    variants={staggerContainer} 
                    initial="hidden" 
                    animate="visible"
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold text-husky-purple mb-2 font-encode">{section.title}</h3>
                      <p className="text-neutral-600 font-open">{section.description}</p>
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
                            className="block bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-lg font-bold text-husky-purple font-encode">{resource.title}</h4>
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-husky-purple/10 text-husky-purple">
                                {resource.type}
                              </span>
                            </div>
                            <p className="text-neutral-600 mb-4 font-open leading-relaxed text-sm">
                              {resource.description}
                            </p>
                            <div className="text-husky-purple font-semibold font-open text-sm group-hover:text-spirit-purple transition-colors">
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
                className="mt-16 text-center"
              >
                <p className="text-neutral-600 font-open">
                  Need help accessing any resources? Contact the Lavin team.
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      );
} 