import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import PremiumButton from './PremiumButton';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
            ${scrolled || isOpen ? 'bg-dagger-gray/80 backdrop-blur-xl border border-white/10 w-full max-w-5xl shadow-2xl' : 'bg-transparent w-full max-w-7xl border border-transparent'}
          `}
        >
          <a href="#" className="text-2xl font-rakkas text-dagger-yellow tracking-tighter z-50 relative">
            DAGGER
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 bg-black/20 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white/80 font-readex text-sm font-medium hover:text-dagger-yellow transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dagger-yellow transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <PremiumButton text="أبدأ مشروعك" href="#contact" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-dagger-yellow z-50 relative"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 z-40 bg-dagger-black/95 backdrop-blur-xl border border-white/10 rounded-[2rem] md:hidden flex flex-col justify-center items-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white font-rakkas text-3xl hover:text-dagger-yellow transition-colors"
              >
                {link.name}
              </a>
            ))}
            <PremiumButton text="تواصل معنا" href="#contact" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;