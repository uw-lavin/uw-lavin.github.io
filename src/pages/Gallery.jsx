// src/pages/Gallery.jsx
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import CircularGallery from '../components/CircularGallery';

// Import gallery images
import img1 from '../assets/Gallery Images/_dsc3882jpg_52913072518_o.jpg';
import img2 from '../assets/Gallery Images/_dsc3867jpg_52912040252_o.jpg';
import img3 from '../assets/Gallery Images/_dsc3397jpg_52912607816_o.jpg';
import img4 from '../assets/Gallery Images/20240307_234834_E5F299.JPEG';
import img5 from '../assets/Gallery Images/20240307_234833_EEB886 2.JPEG';
import img6 from '../assets/Gallery Images/20D99343-1F72-4777-9B46-C8C4D81EC693.JPG';
import img7 from '../assets/Gallery Images/bouldering.JPEG';
import img9 from '../assets/Gallery Images/Welcome Reception Fall 2023.png';
import img10 from '../assets/Gallery Images/IMG_5838.JPG';
import img11 from '../assets/Gallery Images/IMG_5763.JPG';
import img12 from '../assets/Gallery Images/20250510_200158.jpg';
import img13 from '../assets/Gallery Images/_dsc0467jpg_53732717906_o.jpg';
import img14 from '../assets/Gallery Images/_dsc0468jpg_53731794042_o.jpg';
import img15 from '../assets/Gallery Images/_dsc0323jpg_53732914213_o.jpg';
import img16 from '../assets/Gallery Images/_dsc0166jpg_53732702526_o.jpg';
import img17 from '../assets/Gallery Images/_dsc0167jpg_53732702756_o.jpg';

const images = [
  { src: img10, title: "Lavin Event 10" },
  { src: img2, title: "Lavin Event 2" },
  { src: img15, title: "Lavin Event 15" },
  { src: img7, title: "Bouldering Activity" },
  { src: img11, title: "Lavin Event 11" },
  { src: img4, title: "Lavin Event 4" },
  { src: img13, title: "Lavin Event 13" },
  { src: img1, title: "Lavin Event 1" },
  { src: img16, title: "Lavin Event 16" },
  { src: img6, title: "Lavin Event 6" },
  { src: img12, title: "Lavin Event 12" },
  { src: img3, title: "Lavin Event 3" },
  { src: img14, title: "Lavin Event 14" },
  { src: img5, title: "Lavin Event 5" },
  { src: img17, title: "Lavin Event 17" },
  { src: img9, title: "Welcome Reception Fall 2023" },
];

// Sample images for the most recent event (CircularGallery)
const recentEventImages = [
  { image: img10 },
  { image: img11 },
  { image: img12 },
  { image: img13 },
  { image: img14 },
  { image: img15 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
      <section className="bg-web-gold px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode"
          >
            Gallery
          </motion.h1>
          <span className="block h-1 w-16 bg-spirit-gold mb-6" />
          <motion.p 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-neutral-800 mb-8 text-lg md:text-xl font-open leading-relaxed"
          >
            Capturing moments from Lavin events, activities, and community memories.
          </motion.p>
        </div>
      </section>

      {/* ---------- Section 2: Recent Event Circular Gallery ---------- */}
      {/*<section className="bg-white px-6image.png md:px-12 py-5">
        <div className="w-full">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery 
                items={recentEventImages}
                bend={1}
                textColor="#545050"
                borderRadius={0.05}
                font="bold 24px Figtree"
                scrollSpeed={0.5}
                scrollEase={0.08}
              />
            </div>
          </motion.div>
        </div>
      </section>*/}

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
                  className="mb-4 bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={img.src}
                    alt={img.title}
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
