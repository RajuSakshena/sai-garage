import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';

// Logo image — replace the file in src/images (update the extension here if it is not .png).
import saiGarageLogo from '../images/sai_garage_logo.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center" aria-label="Sai Garage home">
          <img
            src={saiGarageLogo}
            alt="Sai Garage"
            className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-black hover:text-[#E51B12] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Call Now */}
        <a
          href="tel:+917850986841"
          className="hidden md:inline-flex items-center gap-2 bg-[#E51B12] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#c4150d] transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-[#F5F4F2] hover:text-[#E51B12] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+917850986841"
            className="mt-2 inline-flex items-center gap-2 bg-[#E51B12] text-white text-sm font-semibold px-4 py-2 rounded-lg w-full justify-center"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
