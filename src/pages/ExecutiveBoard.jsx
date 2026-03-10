import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

// Import profile pictures
import ishanPic from '../assets/profilePics/ishan.jpeg';
import krishnaPic from '../assets/profilePics/krishna.webp';
import krishnaPic2 from '../assets/profilePics/krishna2.webp';
import krishnaPic3 from '../assets/profilePics/krishna3.png';
import arnavPic from '../assets/profilePics/arnav.jpeg';
import ananyaPic from '../assets/profilePics/ananya.jpeg';
import sreshtaPic from '../assets/profilePics/sreshta.jpeg';
import angelinePic from '../assets/profilePics/angeline.jpeg';
import miraPic from '../assets/profilePics/mira.jpeg';
import agastyaPic from '../assets/profilePics/agastya.jpeg';

// Custom CSS for 3D flip animation
const flipStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .group:hover .group-hover\\:rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const executiveBoard = [
  {
    name: 'Ishan Sinha',
    role: 'Co-President',
    major: 'Computer Science',
    year: '2025',
    image: ishanPic,
    accomplishments: 'Leading Lavin\'s strategic vision and executive operations, fostering innovation across all program areas',
    linkedin: 'https://www.linkedin.com/in/ishan-sinha-7b74b51aa'
  },
  {
    name: 'Krishna Penjarla',
    role: 'Co-President',
    major: 'Business',
    year: '2025',
    image: krishnaPic3,
    accomplishments: 'Co-leading Lavin\'s mission to empower student entrepreneurs and build lasting community connections',
    linkedin: 'https://www.linkedin.com/in/krishnaspenjarla'
  },
  {
    name: 'Arnav Palkhiwala',
    role: 'Co-Director of Outreach',
    major: 'Computer Science',
    year: '2025',
    image: arnavPic,
    accomplishments: 'Expanding Lavin\'s network with Seattle startups, VCs, and entrepreneurial community partners',
    linkedin: 'https://www.linkedin.com/in/arnav-palkhiwala-a8927b212'
  },
  {
    name: 'Ananya Tripathi',
    role: 'Co-Director of Outreach',
    major: 'Business',
    year: '2025',
    image: ananyaPic,
    accomplishments: 'Building strategic partnerships and connecting Lavin members with industry leaders and opportunities',
    linkedin: 'https://www.linkedin.com/in/ananya-tr'
  },
  {
    name: 'Sreshta Appalabattula',
    role: 'Director of Marketing',
    major: 'Business',
    year: '2025',
    image: sreshtaPic,
    accomplishments: 'Leading Lavin\'s marketing initiatives, social media strategy, and brand development',
    linkedin: 'https://www.linkedin.com/in/sreshtaappala'
  },
  {
    name: 'Angeline Sutandinata',
    role: 'Co-Director of Community Development',
    major: 'Business',
    year: '2025',
    image: angelinePic,
    accomplishments: 'Fostering community engagement, member relationships, and internal program development',
    linkedin: 'https://www.linkedin.com/in/angeline-sutandinata'
  },
  {
    name: 'Mira Evans',
    role: 'Co-Director of Community Development',
    major: 'Computer Science',
    year: '2025',
    image: miraPic,
    accomplishments: 'Co-leading community initiatives and creating meaningful connections within the Lavin ecosystem',
    linkedin: 'https://www.linkedin.com/in/mira-evans-b75772323'
  },
  {
    name: 'Agastya Mongia',
    role: 'Director of Web Design & ENTRE 490 TA',
    major: 'Computer Science',
    year: '2025',
    image: agastyaPic,
    accomplishments: 'Teaching entrepreneurship fundamentals and leading Lavin\'s digital presence and web development',
    linkedin: 'https://www.linkedin.com/in/agastyamongia'
  },
];



const SectionDivider = () => (
  <div className="w-full border-t border-black/10" />
);

export default function ExecutiveBoard() {
  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />
      {/* ---------- Section 1: Hero Header ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-black font-serif font-black leading-[0.9] text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter drop-shadow-sm mb-4 md:mb-6 lowercase whitespace-nowrap"
          >
            25/26 executive board
          </motion.h1>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 2: Board Members ---------- */}
      <section className="bg-white px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Executive Board Members Grid (4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {executiveBoard.map((member, index) => (
                <div key={index} className="group flex flex-col">
                  {/* Image Container with Hover Effect */}
                  <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden mb-5 bg-[#f8f7f4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* LinkedIn Hover Overlay */}
                    {member.linkedin && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-xl"
                          title={`Connect with ${member.name} on LinkedIn`}
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Always Visible Text Details */}
                  <div className="flex flex-col flex-1 pl-1">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0f0f0f] tracking-tight mb-2">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-mono tracking-[0.1em] uppercase text-black/50">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />
    </div>
  );
} 