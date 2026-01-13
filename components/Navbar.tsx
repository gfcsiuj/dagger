import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Sparkles, Mail, User } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import PremiumButton from './PremiumButton';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(NAV_LINKS[0].href);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map icons to links
  const getIcon = (href: string) => {
    switch (href) {
      case '#hero': return <Home size={22} />;
      case '#work': return <Briefcase size={22} />;
      case '#services': return <Sparkles size={22} />;
      case '#contact': return <Mail size={22} />;
      default: return <User size={22} />;
    }
  };

  return (
    <>
      {/* --- Desktop Navbar (Top) --- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 hidden md:flex">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
            ${scrolled ? 'bg-dagger-gray/80 backdrop-blur-xl border border-white/10 w-full max-w-5xl shadow-2xl' : 'bg-transparent w-full max-w-7xl border border-transparent'}
          `}
        >
          <a href="#" className="text-2xl font-rakkas text-dagger-yellow tracking-tighter z-50 relative">
            DAGGER
          </a>

          <div className="flex items-center gap-8 bg-black/20 px-6 py-2 rounded-full border border-white/5 backdrop-blur-sm">
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

          <div>
            <PremiumButton text="أبدأ مشروعك" href="#contact" />
          </div>
        </motion.nav>
      </div>

      {/* --- Mobile Top Bar (Logo Only) --- */}
      <div className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-center md:hidden pointer-events-none mix-blend-difference">
         <a href="#" className="text-3xl font-rakkas text-dagger-yellow tracking-tighter pointer-events-auto drop-shadow-lg">
            DAGGER
          </a>
      </div>

      {/* --- Mobile Bottom Floating Tab Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
          className="bg-dagger-gray/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] h-[72px] flex items-center justify-around px-2 relative overflow-hidden"
        >
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.href)}
                  className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-tab-active"
                      className="absolute inset-0 bg-white/5 mx-2 my-2 rounded-2xl border border-white/5 shadow-[inset_0_0_10px_rgba(255,215,0,0.1)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <motion.div
                    animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                    className={`relative z-20 ${isActive ? 'text-dagger-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]' : 'text-gray-400'}`}
                  >
                    {getIcon(link.href)}
                  </motion.div>
                  
                  {isActive && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-bold mt-1 text-white font-readex"
                    >
                        {link.name}
                    </motion.span>
                  )}
                </a>
              );
            })}
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;