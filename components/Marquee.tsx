import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { MARQUEE_TEXT } from '../constants';

const MercuryBlob = ({ mouseX, mouseY, index }: { mouseX: any, mouseY: any, index: number }) => {
  const stiffness = 150 - (index * 15);
  const damping = 20 + (index * 2);
  
  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });
  const size = 100 - (index * 10); 

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

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
     x.set(-200);
     y.set(-200);
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 group"
    >
        {/* SVG Filter for Liquid Effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="marquee-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
        </svg>

        {/* Main Content */}
        <div className="bg-dagger-yellow py-4 overflow-hidden border-y-4 border-dagger-black rotate-1 sm:-rotate-1 scale-105 shadow-xl relative">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                <span key={i} className="text-4xl md:text-5xl font-cairo font-black text-dagger-black mx-4 uppercase tracking-wider">
                    {MARQUEE_TEXT}
                </span>
                ))}
            </div>

            {/* Mercury Desaturation Layer */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-saturation"
                style={{ filter: 'url(#marquee-goo)' }}
            >
                {[0, 1, 2, 3, 4].map((i) => (
                    <MercuryBlob key={i} index={i} mouseX={x} mouseY={y} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default Marquee;