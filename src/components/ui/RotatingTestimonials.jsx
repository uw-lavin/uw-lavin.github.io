import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Lavin gave me the confidence and resources to pitch my first company.",
    name: "Priya K., Class of 2023",
  },
  {
    quote: "Thanks to Lavin, I got an internship at a startup I now help run full-time.",
    name: "Jay M., Class of 2022",
  },
  {
    quote: "I met my cofounder through the Lavin Program — we just raised our seed round!",
    name: "Alina T., Class of 2024",
  },
];

export default function RotatingTestimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-32 mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full text-neutral-600 italic text-md text-center px-4 font-slab"
        >
          {/* Quote */}
          <p className="text-lg text-neutral-800 italic leading-relaxed">
            {testimonials[index].quote}
          </p>

          {/* Author */}
          <p className="mt-4 text-sm font-medium text-husky-purple">{testimonials[index].name}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}