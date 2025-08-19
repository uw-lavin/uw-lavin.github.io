import { motion } from 'framer-motion';

// Import profile pictures
import ishanPic from '../assets/profilePics/ishan.jpeg';
import krishnaPic from '../assets/profilePics/krishna.webp';
import krishnaPic2 from '../assets/profilePics/krishna2.webp';
import arnavPic from '../assets/profilePics/arnav.jpeg';
import ananyaPic from '../assets/profilePics/ananya.jpeg';
import jennyPic from '../assets/profilePics/jenny.jpeg';
import danielPic from '../assets/profilePics/daniel.jpeg';
import sreshtaPic from '../assets/profilePics/sreshta.jpeg';
import riyaPic from '../assets/profilePics/riya.jpeg';
import angelinePic from '../assets/profilePics/angeline.jpeg';
import miraPic from '../assets/profilePics/mira.jpeg';
import agastyaPic from '../assets/profilePics/agastya.jpeg';
import junejaPic from '../assets/profilePics/juneja.jpeg';

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
    image: krishnaPic2,
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
    name: 'Jenny Pyon', 
    role: 'Co-Director of PR', 
    major: 'Communications', 
    year: '2025',
    image: jennyPic,
    accomplishments: 'Managing Lavin\'s public relations, media presence, and external communications strategy',
    linkedin: 'https://www.linkedin.com/in/jennypyon'
  },
  { 
    name: 'Daniel Zhang', 
    role: 'Co-Director of PR', 
    major: 'Computer Science', 
    year: '2025',
    image: danielPic,
    accomplishments: 'Co-leading public relations efforts and maintaining Lavin\'s professional brand image',
    linkedin: 'https://www.linkedin.com/in/dzhang10'
  },
  { 
    name: 'Sreshta Appalabattula', 
    role: 'Co-Director of Marketing', 
    major: 'Business', 
    year: '2025',
    image: sreshtaPic,
    accomplishments: 'Leading Lavin\'s marketing initiatives, social media strategy, and brand development',
    linkedin: 'https://www.linkedin.com/in/sreshtaappala'
  },
  { 
    name: 'Riya Dhariwal', 
    role: 'Co-Director of Marketing', 
    major: 'Communications', 
    year: '2025',
    image: riyaPic,
    accomplishments: 'Co-managing marketing campaigns and enhancing Lavin\'s digital presence and engagement',
    linkedin: 'https://www.linkedin.com/in/rdhari/'
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
  { 
    name: 'Ananya Juneja', 
    role: 'Director of Videography/Photography', 
    major: 'Communications', 
    year: '2025',
    image: junejaPic,
    accomplishments: 'Capturing Lavin\'s story through visual content, documenting events, and creating compelling media',
    linkedin: 'https://www.linkedin.com/in/ananya-juneja9'
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const SectionDivider = () => (
  <div className="h-[2px] w-full bg-gradient-to-r from-husky-purple/0 via-husky-purple/40 to-husky-purple/0 my-8" />
);

export default function ExecutiveBoard() {
  return (
    <div className="w-full">
      <style dangerouslySetInnerHTML={{ __html: flipStyles }} />
      {/* ---------- Section 1: Hero Header ---------- */}
      <section className="bg-web-gold px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-husky-purple mb-4 font-encode"
          >
            2025 - 2026 Lavin Executive Board
          </motion.h1>
          <span className="block h-1 w-16 bg-spirit-gold mb-6" />
          <motion.p 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="text-neutral-800 mb-8 text-lg md:text-xl font-open leading-relaxed"
          >
            Meet the student leaders who drive innovation and community within Lavin.
          </motion.p>
        </div>
      </section>

      <SectionDivider />

      {/* ---------- Section 2: Board Members ---------- */}
      <section className="bg-white px-6 md:px-12 py-0">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            {/* Executive Board Members Flip Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executiveBoard.map((member, index) => (
                <div 
                  key={index} 
                  className="group perspective-1000"
                >
                  <div className="relative w-full h-[400px] transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                    {/* Front of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden">
                      <div className="rounded-lg shadow-lg h-full relative overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay with name and title */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                          <p className="text-spirit-gold font-semibold">{member.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                      <div className="bg-gradient-to-br from-husky-purple to-purple-900 rounded-lg p-6 shadow-lg h-full flex flex-col justify-center text-white">
                        <h3 className="text-xl font-bold mb-3 text-center">{member.name}</h3>
                        <p className="text-spirit-gold font-semibold mb-6 text-center">{member.role}</p>
                        {member.linkedin && (
                          <div className="text-center">
                            <a 
                              href={member.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                              title="Connect on LinkedIn"
                            >
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
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