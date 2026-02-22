import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    const completeTimer = setTimeout(() => {
        onComplete();
    }, 2500); // Slight delay after hitting 100%

    return () => {
        clearInterval(timer);
        clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[99999] bg-dagger-black flex items-center justify-center overflow-hidden"
    >
        <div className="relative">
            {/* The Counter */}
            <h1 className="text-[120px] md:text-[200px] font-black font-rakkas text-white leading-none tracking-tighter flex items-end">
                <span>{count}</span>
                <span className="text-4xl md:text-6xl text-dagger-yellow mb-4 md:mb-8">%</span>
            </h1>
            
            {/* Loading Bar */}
            <div className="w-full h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-dagger-yellow"
                    initial={{ width: "0%" }}
                    animate={{ width: `${count}%` }}
                />
            </div>
            
            {/* Tagline */}
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-12 left-0 w-full text-center text-gray-500 font-readex text-sm tracking-widest uppercase"
            >
                Loading Dagger Experience
            </motion.p>
        </div>
    </motion.div>
  );
};

export default Preloader;