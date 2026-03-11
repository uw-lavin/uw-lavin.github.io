import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Leadership', path: '/executive-board' },
  { name: 'Memories', path: '/gallery' },
  { name: 'Internal', path: '/resources' },
];

const linkClass =
  'px-4 py-2 text-sm font-medium text-black/80 transition-colors duration-200 hover:text-black hover:bg-black/5';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 lg:top-8 left-0 right-0 z-50 pointer-events-none flex flex-col items-center lg:flex-row lg:justify-end xl:justify-center max-w-[1400px] mx-auto px-0 lg:px-8"
      role="banner"
    >
      {/* Desktop Wrapper */}
      <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
        {/* Main Links Pill */}
        <nav
          className={`
            flex items-center justify-center border border-black/10 px-2 py-1
            transition-all duration-300 ease-out
            ${scrolled ? 'bg-white/90 shadow-xl backdrop-blur-lg' : 'bg-white/80 shadow-md backdrop-blur-lg'}
          `}
        >
          <ul className="flex items-center gap-0.5">
            {primaryLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? 'text-black bg-black/8 font-semibold' : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Join Us Standalone CTA */}
        <NavLink
          to="/recruitment"
          className={({ isActive }) =>
            `px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out whitespace-nowrap shadow-md hover:shadow-lg
            ${isActive
              ? 'bg-black text-white hover:bg-black/80'
              : 'bg-black text-white hover:bg-black/80 hover:-translate-y-0.5'
            }`
          }
        >
          Join Us
        </NavLink>
      </div>

      {/* Mobile Wrapper */}
      <nav
        className="lg:hidden w-full h-[48px] bg-[#f8f7f4] border-b border-[#e0ddd8] flex items-center justify-between px-6 pointer-events-auto -mt-1"
      >
        {/* Mobile: Logo */}
        <span className="text-[12px] font-mono tracking-[0.25em] opacity-70 uppercase text-[#0f0f0f] mt-[2px]">
          LAVIN
        </span>

        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 -mr-2 group"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <div className="w-[22px] flex flex-col justify-center gap-[5px]">
            <span
              className={`block w-[22px] h-[1.5px] bg-[#0f0f0f] group-hover:bg-[#0d6e5e] transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                }`}
            />
            <span
              className={`block w-[22px] h-[1.5px] bg-[#0f0f0f] group-hover:bg-[#0d6e5e] transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block w-[22px] h-[1.5px] bg-[#0f0f0f] group-hover:bg-[#0d6e5e] transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`
          lg:hidden absolute top-[48px] left-1/2 -translate-x-1/2 mt-4 w-[min(90vw,20rem)]
          border border-black/10 bg-white/95 backdrop-blur-md shadow-xl
          transition-all duration-300 ease-out overflow-hidden pointer-events-auto
          ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
        `}
      >
        <ul className="py-2 px-2">
          {primaryLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2.5 px-4 text-sm font-medium transition-colors ${isActive ? 'text-black bg-black/8' : 'text-black/80 hover:bg-black/5'
                  }`
                }
                end={link.path === '/'}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {/* Join Us as a standout item at the bottom */}
          <li className="mt-1 pt-1 border-t border-black/8">
            <NavLink
              to="/recruitment"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2.5 px-4 text-sm font-semibold transition-colors border
                ${isActive ? 'bg-black/10 border-black/30 text-black' : 'border-black/30 text-black/80 hover:bg-black/5'}`
              }
            >
              Join Us
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
