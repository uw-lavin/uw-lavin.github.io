import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const primaryLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Leadership', path: '/executive-board' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Internal', path: '/resources' },
];

const linkClass =
  'px-4 py-2 text-sm font-medium text-black/80 transition-colors duration-200 rounded-full hover:text-black hover:bg-black/5';

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
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[min(95vw,56rem)]"
      role="banner"
    >
      <nav
        className={`
          flex items-center justify-center rounded-full border border-black/10
          transition-all duration-300 ease-out
          ${scrolled ? 'bg-white/90 shadow-xl backdrop-blur-lg' : 'bg-white/80 shadow-md backdrop-blur-lg'}
        `}
      >
        {/* Desktop: links + recruitment CTA */}
        <ul className="hidden md:flex items-center gap-0.5 py-1 pl-2 pr-1">
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

          {/* Join Us CTA pill */}
          <li className="ml-1">
            <NavLink
              to="/recruitment"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'bg-black/10 border-black/40 text-black'
                  : 'border-black/40 text-black/80 hover:bg-black/8 hover:border-black/60 hover:text-black'
                }`
              }
            >
              Join Us
            </NavLink>
          </li>
        </ul>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-full hover:bg-black/5 transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-center gap-1">
              <span
                className={`block w-5 h-0.5 bg-black/80 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
              />
              <span
                className={`block w-5 h-0.5 bg-black/80 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
              />
              <span
                className={`block w-5 h-0.5 bg-black/80 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`
          md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(90vw,20rem)]
          rounded-2xl border border-black/10 bg-white/95 backdrop-blur-md shadow-xl
          transition-all duration-300 ease-out overflow-hidden
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
                  `block py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${isActive ? 'text-black bg-black/8' : 'text-black/80 hover:bg-black/5'
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
                `block py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors border
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
