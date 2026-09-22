import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';
import { unlock } from '../lib/memberVault';
import vault from '../data/resources.enc.json';

export default function Resources() {
  // `sections` is null until the payload is decrypted. The links do not exist
  // anywhere in the built site until then -- see src/lib/memberVault.js.
  const [sections, setSections] = useState(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = await unlock(password, vault);
      if (payload) {
        setSections(payload);
        setPassword('');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    // Nothing is persisted, so this just drops the payload from memory.
    setSections(null);
    setPassword('');
  };

  if (!sections) {
    return (
      <div className="w-full">
        {/* ---------- Hero Section ---------- */}
        <section className="bg-slate-50 px-6 md:px-12 pt-5 pb-6 md:pt-7 md:pb-7">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-black font-display font-black leading-[0.9] text-3xl md:text-4xl tracking-tight mb-2 lowercase"
            >
              resources
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm md:text-base text-black/70 font-sans leading-relaxed max-w-xl"
            >
              Member-only resources, tools, and connections to help you succeed.
            </motion.p>
          </div>
        </section>

        <div className="w-full border-t border-black/10" />

        {/* ---------- Login Section ---------- */}
        <section className="bg-white px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-sm mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-transparent border border-black/10 p-7"
            >
              <h2 className="text-xl md:text-2xl font-display font-bold tracking-tight text-black mb-2 lowercase text-center">member access</h2>
              <p className="text-black/70 mb-5 font-sans text-center text-sm">
                Enter the password to unlock member-only resources and tools.
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
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-black text-white hover:bg-black/80 disabled:opacity-60 py-3 px-6 font-display font-bold text-lg lowercase tracking-wide transition-all duration-200"
                >
                  {busy ? 'Unlocking…' : 'Access Resources'}
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
      <section className="bg-slate-50 px-6 md:px-12 pt-5 pb-6 md:pt-7 md:pb-7 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* In normal flow, not absolute — it used to sit on top of the
              heading at phone width. */}
          <div className="w-full flex justify-end -mb-1">
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
            className="text-black font-display font-black leading-[0.9] text-3xl md:text-4xl tracking-tight mb-2 lowercase"
          >
            internal resources
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-sm md:text-base text-black/70 font-sans leading-relaxed max-w-xl"
          >
            Quick links to the tools, forms, and documents Lavin students rely on for community, operations, academics, and career progress.
          </motion.p>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Internal Resources Section ---------- */}
      <section className="bg-white px-6 md:px-12 py-8 md:py-10">
        <div className="max-w-5xl mx-auto">

          <div className="space-y-8 md:space-y-10">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div className="text-left border-l-[3px] border-gray-900 pl-4">
                  <h3 className="text-lg md:text-xl font-display font-bold text-black tracking-tight lowercase">{section.title}</h3>
                  <p className="text-xs md:text-sm text-black/60 font-sans">{section.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                        className="block bg-slate-50 p-4 border border-black/10 hover:border-black/30 hover:bg-white transition-colors duration-200 h-full flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] tracking-widest uppercase font-bold px-2 py-1 bg-black/5 text-black">
                              {resource.type}
                            </span>
                          </div>
                          <h4 className="text-base md:text-lg font-display font-bold text-black lowercase tracking-tight mb-1">{resource.title}</h4>
                          <p className="text-black/60 mb-3 font-sans leading-snug text-xs md:text-sm">
                            {resource.description}
                          </p>
                        </div>
                        <div className="text-black uppercase tracking-widest font-bold font-sans text-[10px] group-hover:text-black/60 transition-colors pt-2 border-t border-black/10">
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
            className="mt-8 text-center pt-5 border-t border-black/10"
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