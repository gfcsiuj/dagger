import React, { useState } from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import PremiumButton from './PremiumButton';
import { motion } from 'framer-motion';

const DontPressButton = () => {
    const [state, setState] = useState<'idle' | 'hinging' | 'falling'>('idle');

    const handleClick = () => {
        if (state !== 'idle') return;
        
        // Phase 1: Hinge drop (Swing)
        setState('hinging');
        
        // Phase 2: Fall off after swing settles (2.5 seconds later)
        setTimeout(() => {
            setState('falling');
        }, 2500);
    };

    return (
        <div className="flex justify-center mt-16 mb-8 relative z-20 h-20"> {/* Container to reserve space */}
            <motion.button
                onClick={handleClick}
                disabled={state !== 'idle'}
                className={`
                    relative bg-dagger-yellow text-dagger-black px-8 py-3 rounded-full 
                    font-cairo font-black text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)]
                    flex items-center gap-4 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] 
                    transition-shadow cursor-pointer select-none
                `}
                style={{ 
                    transformOrigin: '20px 50%', // The pivot point (Where the dot is)
                }}
                initial={{ rotate: 0, y: 0, opacity: 1 }}
                animate={
                    state === 'hinging' 
                    ? { rotate: 80 } 
                    : state === 'falling' 
                        ? { rotate: 100, y: 1000, opacity: 0 } 
                        : { rotate: 0, scale: [1, 1.05, 1] }
                }
                transition={
                    state === 'hinging' 
                    ? { type: "spring", stiffness: 200, damping: 8, mass: 1.5 } // Bouncy swing physics
                    : state === 'falling'
                        ? { duration: 0.8, ease: "easeIn" } // Gravity fall
                        : { repeat: Infinity, duration: 2 } // Idle pulse
                }
                whileHover={state === 'idle' ? { scale: 1.1 } : {}}
            >
                {/* The "Nail" / Dot on the left */}
                <div className="w-3 h-3 bg-dagger-black rounded-full shadow-inner relative z-10">
                    <div className="absolute top-[1px] left-[1px] w-1 h-1 bg-white/30 rounded-full"></div>
                </div>

                <span>لا تضغطني</span>
                
                {/* Warning Icon (Optional subtle detail) */}
                <span className="text-xl">⚠️</span>

            </motion.button>
        </div>
    );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-dagger-black pt-24 pb-10 relative overflow-hidden border-t border-white/5">
      
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-dagger-yellow/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-rakkas text-white mb-6 leading-tight">
              هل لديك مشروع <br/>
              <span className="text-dagger-yellow">في ذهنك؟</span>
            </h2>
            <p className="text-gray-400 font-readex text-lg max-w-md leading-relaxed">
              دعنا نتحدث عن كيف يمكننا مساعدتك في تحقيق أهدافك وبناء علامة تجارية قوية تنافس بقوة.
            </p>
            
            <div className="mt-10 flex gap-4">
               <a href="https://instagram.com" className="w-14 h-14 rounded-full bg-dagger-lightGray border border-dagger-gray flex items-center justify-center text-white hover:bg-dagger-yellow hover:text-dagger-black transition-all hover:-translate-y-1">
                 <Instagram size={24} />
               </a>
               <a href="https://twitter.com" className="w-14 h-14 rounded-full bg-dagger-lightGray border border-dagger-gray flex items-center justify-center text-white hover:bg-dagger-yellow hover:text-dagger-black transition-all hover:-translate-y-1">
                 <Twitter size={24} />
               </a>
               <a href="https://linkedin.com" className="w-14 h-14 rounded-full bg-dagger-lightGray border border-dagger-gray flex items-center justify-center text-white hover:bg-dagger-yellow hover:text-dagger-black transition-all hover:-translate-y-1">
                 <Linkedin size={24} />
               </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-start lg:items-end">
            <a 
              href="mailto:contact@dagger.com" 
              className="text-3xl md:text-5xl font-cairo font-bold text-white hover:text-dagger-yellow transition-colors mb-6 decoration-dagger-yellow underline underline-offset-8"
            >
              contact@dagger.com
            </a>
            
            <div className="flex items-center gap-2 text-gray-400 font-readex mb-8">
                <span>بغداد، العراق</span>
                <span className="w-2 h-2 rounded-full bg-dagger-yellow"></span>
                <span>متاح عالمياً</span>
            </div>

            <PremiumButton text="أرسل رسالة" href="mailto:contact@dagger.com" icon={true} />
          </div>
        </div>

        {/* The Easter Egg Button */}
        <DontPressButton />

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 font-readex text-sm">
            © 2025 DAGGER. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-gray-500 font-readex text-sm">
            <a href="#" className="hover:text-dagger-yellow transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-dagger-yellow transition-colors">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;