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

  const resources = [
    {
      title: 'Pitch Deck Templates',
      description: 'Professional templates for investor presentations',
      icon: '📊',
      link: '#'
    },
    {
      title: 'Business Model Canvas',
      description: 'Interactive canvas for business planning',
      icon: '🎯',
      link: '#'
    },
    {
      title: 'Mentor Directory',
      description: 'Connect with industry professionals',
      icon: '👥',
      link: '#'
    },
    {
      title: 'Funding Resources',
      description: 'Grants, competitions, and investment opportunities',
      icon: '💰',
      link: '#'
    },
    {
      title: 'Legal Templates',
      description: 'Founder agreements, NDAs, and contracts',
      icon: '⚖️',
      link: '#'
    },
    {
      title: 'Technical Resources',
      description: 'Development tools and cloud credits',
      icon: '💻',
      link: '#'
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
                  whileInView="visible" 
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-encode text-husky-purple"
                >
                  Resources
                </motion.h1>
                <motion.button
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }}
                  onClick={handleLogout}
                  className="text-husky-purple hover:text-spirit-purple font-semibold font-open"
                >
                  Logout
                </motion.button>
              </div>
              
              <motion.p 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                className="text-lg md:text-xl text-neutral-700 leading-relaxed font-open"
              >
                Welcome to the member-only resources portal. Access tools, templates, and connections.
              </motion.p>
            </div>
          </section>

          <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-16" />

          {/* ---------- Resources Grid Section ---------- */}
          <section className="bg-white px-6 md:px-12 py-20">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {resources.map((resource, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeUp}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-5xl mb-6">{resource.icon}</div>
                    <h3 className="text-xl font-bold text-husky-purple mb-4 font-encode">{resource.title}</h3>
                    <p className="text-neutral-600 mb-6 font-open leading-relaxed">{resource.description}</p>
                    <a
                      href={resource.link}
                      className="text-husky-purple hover:text-spirit-purple font-semibold font-open inline-flex items-center"
                    >
                      Access →
                    </a>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
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