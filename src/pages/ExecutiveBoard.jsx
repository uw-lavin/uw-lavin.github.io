import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animations';

// 26/27 executive board. Order here does not matter -- the page sorts by last
// name. `photo` is optional: import an image from ../assets/profilePics/ and
// set it, and it replaces the initials tile.
const executiveBoard = [
  {
    name: 'Sreshta Appalabattula',
    role: 'Director of Marketing',
    cohort: 2023,
    email: 'sappala@uw.edu',
    linkedin: 'https://www.linkedin.com/in/sreshtaappala/',
  },
  {
    name: 'Divij Chawla',
    role: 'Co-President',
    cohort: 2025,
    email: 'dc245@uw.edu',
    linkedin: 'https://www.linkedin.com/in/divijchawla7/',
  },
  {
    name: 'Rishabh Goenka',
    role: 'Director of Community Development + Web Development',
    cohort: 2024,
    email: 'rish9@uw.edu',
    linkedin: 'https://www.linkedin.com/in/rishabh-goenkx/',
  },
  {
    name: 'Nishka Jaiswal',
    role: 'Director of Outreach',
    cohort: 2025,
    email: 'njaisw2@uw.edu',
    linkedin: 'https://www.linkedin.com/in/nishkaj/',
  },
  {
    name: 'Ananya Prakash',
    role: 'ENTRE 490 TA',
    cohort: 2025,
    email: 'aparak@uw.edu',
    linkedin: 'https://www.linkedin.com/in/apraka/',
  },
  {
    name: 'Ishaan Roybiswas',
    role: 'Director of Community Development',
    cohort: 2025,
    email: 'iroybisw@uw.edu',
    linkedin: 'https://www.linkedin.com/in/ishaan-roybiswas/',
  },
  {
    name: 'Ananya Tripathi',
    role: 'Co-President',
    cohort: 2024,
    email: 'ananyat@uw.edu',
    linkedin: 'https://www.linkedin.com/in/ananya-tr/',
  },
  {
    name: 'Anusha Upadhyayula',
    role: 'Director of Outreach',
    cohort: 2025,
    email: 'anushasu@uw.edu',
    linkedin: 'https://www.linkedin.com/in/anusha-upadhyayula/',
  },
];

const lastName = (name) => name.trim().split(/\s+/).pop();

// Alphabetical by last name, then first name for ties.
const sortedBoard = [...executiveBoard].sort(
  (a, b) => lastName(a.name).localeCompare(lastName(b.name)) || a.name.localeCompare(b.name),
);

const initials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

function Avatar({ member }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        className="h-14 w-14 shrink-0 object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#0f0f0f] font-display text-lg font-black tracking-tight text-white"
    >
      {initials(member.name)}
    </div>
  );
}

export default function ExecutiveBoard() {
  return (
    <div className="w-full">
      {/* ---------- Header ---------- */}
      <section className="bg-slate-50 px-6 md:px-12 pt-6 pb-7 md:pt-10 md:pb-9">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-black font-display font-black leading-[0.9] text-[7vw] sm:text-4xl md:text-5xl tracking-tight lowercase whitespace-nowrap"
          >
            26/27 executive board
          </motion.h1>
        </div>
      </section>

      <div className="w-full border-t border-black/10" />

      {/* ---------- Board ---------- */}
      <section className="bg-white px-6 md:px-12 py-8 md:py-12">
        <motion.ul
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {sortedBoard.map((member) => (
            <li
              key={member.email}
              className="flex flex-col border border-black/10 bg-[#f8f7f4] p-4"
            >
              {/* Avatar beside the name rather than above it keeps every card
                  short, which matters most when they stack on a phone. */}
              <div className="flex flex-1 items-start gap-3">
                <Avatar member={member} />
                <div className="min-w-0">
                  <h2 className="text-lg font-display font-bold tracking-tight text-[#0f0f0f] leading-tight">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-[11px] font-display font-bold uppercase tracking-[0.1em] text-black/70 leading-snug">
                    {member.role}
                  </p>
                  <p className="mt-0.5 text-[11px] font-display font-semibold uppercase tracking-[0.1em] text-[#3b2c5a]">
                    {member.cohort} cohort
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-black/10 flex flex-col gap-1 text-sm font-sans">
                <a
                  href={`mailto:${member.email}`}
                  className="break-all text-[#0f0f0f] underline decoration-black/25 underline-offset-[3px] hover:decoration-black transition-colors"
                >
                  {member.email}
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-display font-bold uppercase tracking-[0.12em] text-black/70 hover:text-black transition-colors"
                >
                  LinkedIn &rarr;
                </a>
              </div>
            </li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
