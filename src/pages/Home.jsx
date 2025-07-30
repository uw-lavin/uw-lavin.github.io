// src/pages/Home.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import titleboatImage from '../assets/titleboat25.jpg';
import SpotlightCarousel from '../components/SpotlightCarousel';
import UpcomingEvents from '../components/UpcomingEvents';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Events data
const upcomingEvents = [
  {
    date: "May 3, 2025",
    title: "Spring Demo Day",
    description: "Showcase your startup ideas to investors and mentors.",
    url: "/events#demo-day"
  },
  {
    date: "June 10, 2025",
    title: "Founder's Workshop",
    description: "Hands-on workshop on lean startup & pitch development.",
    url: "/events#workshop"
  },
  {
    date: "July 20, 2025",
    title: "Summer Field Trip",
    description: "Visit Seattle's top accelerators and co‑working spaces.",
    url: "/events#field-trip"
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full">

      {/* ---------- Hero Section ---------- */}
      <section
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${titleboatImage})` }}
      >
        {/* Darker overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Text + buttons */}
        <div className="relative z-10 h-full flex flex-col justify-start pt-24 px-6 md:px-12">
          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white uppercase font-black leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[10rem]"
          >
            Lavin
            <br/>
            Entrepreneurship
            <br/>
            Program
          </motion.h1>

          {/* CTA buttons – responsive positioning */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="absolute bottom-8 md:bottom-40 right-4 md:right-72 flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <button 
              onClick={() => navigate('/recruitment')}
              className="bg-web-gold hover:bg-yellow-500 text-husky-purple font-bold py-4 px-12  rounded-lg transition-transform transform hover:scale-105 shadow-lg text-base md:text-xl"
            >
              Join Lavin
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="border-2 border-white text-white hover:bg-yellow-500 hover:border-yellow-500 hover:text-husky-purple font-bold py-4 px-12 rounded-lg transition-transform transform hover:scale-105 text-base md:text-xl"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* ---------- Spotlight Carousel ---------- */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-full mx-auto px-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Spotlight Carousel */}
            <div>
              <SpotlightCarousel />
              <h2 className="text-4xl md:text-7xl lg:text-6xl font-bold text-husky-purple text-center pt-40">
              create. innovate. disrupt.
            </h2>
            </div>
            
            {/* Right Column: Upcoming Events */}
            <div>
              <UpcomingEvents events={upcomingEvents} />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
