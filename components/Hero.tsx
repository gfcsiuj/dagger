import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { IMAGES } from '../constants';
import PremiumButton from './PremiumButton';

const ATTRACTION_POINTS = [
  { x: 20, y: 20 }, { x: 50, y: 20 }, { x: 80, y: 20 },
  { x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
  { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
];

const MercuryBlob: React.FC<{ mouseX: any, mouseY: any, index: number }> = ({ mouseX, mouseY, index }) => {
  const stiffness = 120 - (index * 10);
  const damping = 15 + (index * 3);
  
  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });
  const size = 90 - (index * 12); 

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        x: "-50%",
        y: "-50%",
        position: 'absolute'
      }}
      className="bg-white rounded-full pointer-events-none"
    />
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let rawX = e.clientX - rect.left;
    let rawY = e.clientY - rect.top;

    let finalX = rawX;
    let finalY = rawY;

    const width = rect.width;
    const height = rect.height;
    const MAGNET_RADIUS = 100; 
    const MAGNET_STRENGTH = 0.4; 

    ATTRACTION_POINTS.forEach(point => {
      const pX = (point.x / 100) * width;
      const pY = (point.y / 100) * height;
      const dx = rawX - pX;
      const dy = rawY - pY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAGNET_RADIUS) {
        finalX += (pX - rawX) * MAGNET_STRENGTH;
        finalY += (pY - rawY) * MAGNET_STRENGTH;
      }
    });

    x.set(finalX);
    y.set(finalY);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dagger-black pt-28 pb-32 md:pt-40 md:pb-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-dagger-yellow/5 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-dagger-yellow/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 text-center lg:text-right flex flex-col gap-5 md:gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 rounded-full bg-dagger-lightGray border border-dagger-gray w-fit mx-auto lg:mx-0">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dagger-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-dagger-yellow"></span>
            </span>
            <span className="text-xs md:text-sm font-readex text-gray-300">متاح للمشاريع الجديدة</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-rakkas text-white leading-[1.15] md:leading-[1.1]">
            كل لقطة الها <br/>
            <span className="text-dagger-yellow glow-text relative inline-block pb-2 md:pb-0">
              حكاية
              <svg className="absolute w-full h-2 md:h-3 bottom-0 md:-bottom-1 left-0 text-dagger-yellow/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span> وتفاصيل
          </h1>
          
          <p className="text-gray-400 font-readex text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 md:px-0">
            إحنا مو بس مصممين، إحنا شريك نجاحك. من أول فكرة لآخر لقطة نرتبلك كلشي بطريقة احترافية، حتى يطلع براندك بأحلى صورة.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start items-center mt-4 md:mt-8 w-full sm:w-auto">
            <PremiumButton text="ابدا مشروعك" href="#packages" icon={true} className="w-full sm:w-auto transform active:scale-95 transition-transform" />

            <a href="#work" className="w-full sm:w-auto text-center group relative px-10 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-cairo font-bold text-lg overflow-hidden transition-all duration-300 hover:border-dagger-yellow/50 hover:bg-white/10 active:scale-95">
               <span className="relative z-10 flex items-center justify-center gap-3">
                شاهد أعمالي
                <span className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-dagger-yellow transition-colors"></span>
               </span>
            </a>
          </div>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-2 flex justify-center relative mt-2 lg:mt-0"
        >
          <div 
            className="relative w-full max-w-[300px] md:max-w-[450px] aspect-[3/4] group"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </svg>

            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-dagger-gray/20 font-rakkas whitespace-nowrap select-none z-0">
              DAGGER
            </div>

            <div 
              className="absolute inset-0 z-20 overflow-hidden bg-dagger-black shadow-2xl rounded-[2rem] md:rounded-none border border-white/5 md:border-none"
              style={{ clipPath: window.innerWidth > 768 ? 'polygon(15% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 15%)' : 'none' }}
            >
              <img 
                src={IMAGES.PROFILE} 
                alt="DAGGER Color" 
                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
              />

              <div 
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                    filter: 'url(#goo)', 
                    mixBlendMode: 'saturation' 
                }}
              >
                 {[0, 1, 2, 3, 4, 5].map((i) => (
                    <MercuryBlob key={i} index={i} mouseX={x} mouseY={y} />
                 ))}
              </div>
            </div>

            {/* Badges - Optimized for Mobile */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 md:-top-6 md:-right-6 z-30 bg-dagger-yellow text-dagger-black px-3 py-1.5 md:p-4 text-xs md:text-base font-bold font-cairo shadow-lg rounded-lg md:rounded-none"
              style={{ clipPath: window.innerWidth > 768 ? 'polygon(10% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 10%)' : 'none' }}
            >
              7+ سنوات خبرة
            </motion.div>

             <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -left-2 md:-bottom-6 md:-left-6 z-30 bg-dagger-black border border-dagger-gray text-white px-3 py-1.5 md:p-4 text-xs md:text-base font-bold font-cairo shadow-lg flex items-center gap-2 rounded-lg md:rounded-none"
              style={{ clipPath: window.innerWidth > 768 ? 'polygon(10% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 10%)' : 'none' }}
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
              متاح للعمل
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;