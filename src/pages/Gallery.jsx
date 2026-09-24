import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { fadeUp } from '../lib/animations';
import { galleryImage } from '../lib/media';
import gallery from '../content/gallery.json';

// The photo list is edited through the admin (Pages CMS) and kept in order in
// src/content/gallery.json. Each upload is resized to a small WebP at build
// time; a path whose file has gone missing is simply left out.
const images = gallery.photos
  .map((path) => galleryImage(path))
  .filter(Boolean)
  .map((src) => ({ src, title: 'Lavin event photo' }));

export default function Gallery() {
  const breakpointCols = {
    default: 4,
    1200: 3,
    768: 2,
    640: 1
  }

  return (
    <div className="w-full">
      {/* ---------- Section 1: Hero Header ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 pt-6 pb-8 md:pt-10 md:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-black font-display font-black leading-[0.9] text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 md:mb-6 lowercase"
          >
            memories
          </motion.h1>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />


      {/* ---------- Section 3: Photo Gallery ---------- */}
      <section className="bg-white px-4 md:px-8 py-5">
        <div className="w-full">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Masonry
              breakpointCols={breakpointCols}
              className="flex w-auto"
              columnClassName="px-2"
            >
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mb-4 bg-white overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full block object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
