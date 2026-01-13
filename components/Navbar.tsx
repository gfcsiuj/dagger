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
      case '#hero': return <Home size={24} strokeWidth={1.5} />;
      case '#work': return <Briefcase size={24} strokeWidth={1.5} />;
      case '#services': return <Sparkles size={24} strokeWidth={1.5} />;
      case '#contact': return <Mail size={24} strokeWidth={1.5} />;
      default: return <User size={24} strokeWidth={1.5} />;
    }
  };

  return (
    <>
      {/* --- Desktop Navbar (Standard) --- */}
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
          <a href="#" className="text-3xl font-rakkas text-dagger-yellow tracking-tighter z-50 relative drop-shadow-md">
            DAGGER
          </a>

          <div className="flex items-center gap-8 bg-black/40 px-8 py-3 rounded-full border border-white/5 backdrop-blur-md shadow-lg">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-white/80 font-readex text-sm font-medium hover:text-dagger-yellow transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dagger-yellow transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#FFD700]"></span>
              </a>
            ))}
          </div>

          <div>
            <PremiumButton text="أبدأ مشروعك" href="#contact" />
          </div>
        </motion.nav>
      </div>

      {/* --- Mobile Experience --- */}

      {/* 1. Mobile Top Bar (Dynamic Island Style) */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="fixed top-4 left-4 right-4 z-40 md:hidden flex justify-between items-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
      >
         <a href="#" className="text-2xl font-rakkas text-dagger-yellow tracking-tighter drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
            DAGGER
         </a>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
            <span className="text-[10px] text-white/60 font-readex tracking-wider uppercase">متاح للعمل</span>
         </div>
      </motion.div>

      {/* 2. Mobile Bottom Liquid Dock */}
      <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] h-[80px] px-2 relative flex items-center justify-between"
        >
            {/* The Liquid Background Filter (Optional enhancement via CSS in index.html, handled here by smooth motion) */}
            
            <div className="flex w-full justify-between items-center relative z-20 px-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.href;
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveTab(link.href)}
                    className="relative flex flex-col items-center justify-center w-14 h-14"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="liquid-glow"
                        className="absolute inset-0 rounded-full bg-gradient-to-t from-dagger-yellow/20 to-transparent"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{
                            // Create the "Light Beam" effect upwards
                            boxShadow: '0 -10px 20px rgba(255, 215, 0, 0.15), inset 0 0 10px rgba(255, 215, 0, 0.1)' 
                        }}
                      >
                         {/* The "Source" of the light at the bottom */}
                         <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-dagger-yellow rounded-full shadow-[0_0_10px_#FFD700]"></div>
                      </motion.div>
                    )}
                    
                    <motion.div
                      animate={isActive ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-dagger-yellow' : 'text-gray-500'}`}
                    >
                      {getIcon(link.href)}
                    </motion.div>

                    {/* Animated Label */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.span
                                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.5, transition: { duration: 0.1 } }}
                                className="absolute -bottom-1 text-[9px] font-bold text-white font-readex"
                            >
                                {link.name}
                            </motion.span>
                        )}
                    </AnimatePresence>
                  </a>
                );
              })}
            </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;