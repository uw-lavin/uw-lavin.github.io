import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LogoNoTagline from '../assets/LogoNoTagline.png';

const navLinks = [
  // { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Recruitment', path: '/recruitment' },
  { name: 'Events', path: '/events' },
  { name: 'Leadership', path: '/executive-board' },
  { name: 'Join Us', path: '/sponsors' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Internal', path: '/resources' },
];

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white px-6 py-4 border-b shadow-sm sticky top-0 z-20">
      <nav className="w-full flex items-center justify-between">
        {/* Left-aligned logo as a link to home */}
        <Link to="/" className="flex items-center select-none" aria-label="Lavin Home">
          <img src={LogoNoTagline} alt="Lavin logo" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-base font-medium text-black">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors duration-150 hover:text-blue-600 ${
                  location.pathname === link.path 
                    ? 'font-bold underline underline-offset-4' 
                    : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-black mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-black mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <ul className="py-4 space-y-2 border-t mt-4">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg transition-colors duration-150 hover:bg-gray-100 ${
                  location.pathname === link.path 
                    ? 'font-bold text-blue-600 bg-blue-50' 
                    : 'text-black'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
} 