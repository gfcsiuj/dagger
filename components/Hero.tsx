import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { IMAGES } from '../constants';
import PremiumButton from './PremiumButton';

// 9 Invisible Magnetic Points (Percentage based: x, y)
// These represent "gravity wells" on the image
const ATTRACTION_POINTS = [
  { x: 20, y: 20 }, { x: 50, y: 20 }, { x: 80, y: 20 },
  { x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
  { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
];

const MercuryBlob = ({ mouseX, mouseY, index }: { mouseX: any, mouseY: any, index: number }) => {
  // Creating different physics for each blob to simulate "breaking" mercury
  // The higher the index, the "lazier" and "heavier" the blob feels
  const stiffness = 120 - (index * 10);
  const damping = 15 + (index * 3);
  
  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });

  // Randomize size slightly
  const size = 90 - (index * 12); 

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        left: x, // Use left/top for positioning relative to container
        top: y,
        x: "-50%", // Use translate to center the blob on the coordinate
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
    
    // Raw Mouse Position
    let rawX = e.clientX - rect.left;
    let rawY = e.clientY - rect.top;

    // PHYSICS ENGINE: Magnetic Attraction Logic
    // This calculates if the mouse is close to one of the 9 points and "pulls" it.
    let finalX = rawX;
    let finalY = rawY;

    const width = rect.width;
    const height = rect.height;
    const MAGNET_RADIUS = 100; // Pixel radius to start feeling the pull
    const MAGNET_STRENGTH = 0.4; // How strong the pull is (0 to 1)

    ATTRACTION_POINTS.forEach(point => {
      // Convert percentage to pixels
      const pX = (point.x / 100) * width;
      const pY = (point.y / 100) * height;

      // Calculate distance
      const dx = rawX - pX;
      const dy = rawY - pY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Apply attraction force if within radius
      if (distance < MAGNET_RADIUS) {
        // Linear interpolation towards the point
        // The closer you are, the stronger the pull, but we use a fixed lerp for "snap" feel
        finalX += (pX - rawX) * MAGNET_STRENGTH;
        finalY += (pY - rawY) * MAGNET_STRENGTH;
      }
    });

    x.set(finalX);
    y.set(finalY);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dagger-black pt-32 pb-20 md:pt-40">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-dagger-yellow/5 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-dagger-yellow/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text Content - Order 1 on Mobile, Order 1 on Desktop (Consistent Logic: Text First is better for mobile UX) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 text-center lg:text-right flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dagger-lightGray border border-dagger-gray w-fit mx-auto lg:mx-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dagger-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-dagger-yellow"></span>
            </span>
            <span className="text-sm font-readex text-gray-300">متاح للمشاريع الجديدة</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-rakkas text-white leading-[1.1]">
            كل لقطة الها <br/>
            <span className="text-dagger-yellow glow-text relative inline-block">
              حكاية
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-dagger-yellow/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span> وتفاصيل
          </h1>
          
          <p className="text-gray-400 font-readex text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
            إحنا مو بس مصممين، إحنا شريك نجاحك. من أول فكرة لآخر لقطة نرتبلك كلشي بطريقة احترافية، حتى يطلع براندك بأحلى صورة ويشد الناس إلك.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mt-4 md:mt-8">
            
            {/* Primary Button */}
            <PremiumButton text="ابدا مشروعك" href="#packages" icon={true} className="w-full sm:w-auto" />

            {/* Secondary Button */}
            <a href="#work" className="w-full sm:w-auto text-center group relative px-10 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-cairo font-bold text-lg overflow-hidden transition-all duration-300 hover:border-dagger-yellow/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,215,0,0.1)]">
               <span className="relative z-10 flex items-center justify-center gap-3">
                شاهد أعمالي
                <span className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-dagger-yellow transition-colors"></span>
               </span>
            </a>

          </div>
        </motion.div>

        {/* IMAGE SECTION - Order 2 on Mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-2 flex justify-center relative mt-4 lg:mt-0"
        >
          <div 
            className="relative w-full max-w-[320px] aspect-[3/4] md:max-w-[450px] group"
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            {/* SVG Filter Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
              </filter>
            </svg>

            {/* Background Text Mobile Adjustment: Hidden on tiny screens, visible on md */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-dagger-gray/20 font-rakkas whitespace-nowrap select-none z-0">
              DAGGER
            </div>

            {/* Main Image Container */}
            <div 
              className="absolute inset-0 z-20 overflow-hidden bg-dagger-black shadow-2xl rounded-3xl md:rounded-none"
              style={{ clipPath: 'polygon(15% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 15%)' }}
            >
              {/* 1. Base Layer */}
              <img 
                src={IMAGES.PROFILE} 
                alt="DAGGER Color" 
                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
              />

              {/* 2. Mercury Liquid Layer */}
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

            {/* Badges - Adjusted for mobile position */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-30 bg-dagger-yellow text-dagger-black px-4 py-2 md:p-4 text-sm md:text-base font-bold font-cairo shadow-lg"
              style={{ clipPath: 'polygon(10% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 10%)' }}
            >
              7+ سنوات خبرة
            </motion.div>

             <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 z-30 bg-dagger-black border border-dagger-gray text-white px-4 py-2 md:p-4 text-sm md:text-base font-bold font-cairo shadow-lg flex items-center gap-2"
              style={{ clipPath: 'polygon(10% 0%, 100% 0, 100% 85%, 85% 100%, 0 100%, 0% 10%)' }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              متاح للعمل
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;