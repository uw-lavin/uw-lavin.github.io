import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Events() {
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
            className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode"
          >
            Events
          </motion.h1>
          <span className="block h-1 w-16 bg-spirit-gold mb-6" />
          <motion.p 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-lg md:text-xl text-neutral-800 leading-relaxed font-open"
          >
            All our upcoming lectures, workshops, and socials—pulled straight from the official Lavin calendar.
          </motion.p>
        </div>
      </section>

      <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-" />

      {/* ---------- Calendar Section ---------- */}
      <section className="bg-white px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-4 md:p-8 shadow-lg border border-gray-100"
          >
            <div className="w-full h-[600px] md:h-[700px] lg:h-[800px]">
              <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&title=Upcoming%20Lavin%20Events&showTz=0&mode=AGENDA&showPrint=0&showTitle=0&src=Y19mMWIwMGY4OWM2MDc5NjU4MDhjZTI1NWI3NjQ1OTA2NTIzOGM5ZDNkNWRhYjkxZDY1N2U1ZDdiN2RkMWUzMzQzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23f09300" 
                style={{ border: 0 }} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="yes"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 