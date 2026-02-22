import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const WORKS = [
  { title: "حملة إعلانية", category: "سوشيال ميديا", img: "https://picsum.photos/600/800?random=1" },
  { title: "تصميم شعار", category: "هوية بصرية", img: "https://picsum.photos/600/600?random=2" },
  { title: "موشن جرافيك", category: "فيديو", img: "https://picsum.photos/800/600?random=3" },
  { title: "واجهة تطبيق", category: "UI/UX", img: "https://picsum.photos/600/800?random=4" },
];

// 9 Invisible Magnetic Points
const ATTRACTION_POINTS = [
  { x: 20, y: 20 }, { x: 50, y: 20 }, { x: 80, y: 20 },
  { x: 20, y: 50 }, { x: 50, y: 50 }, { x: 80, y: 50 },
  { x: 20, y: 80 }, { x: 50, y: 80 }, { x: 80, y: 80 }
];

const MercuryBlob: React.FC<{ mouseX: any, mouseY: any, index: number }> = ({ mouseX, mouseY, index }) => {
  // EXTREME PHYSICS VARIATION
  // Low index = Fast, snaps to magnet (The "Head")
  // High index = Slow, lazy, heavy (The "Tail")
  // This creates the "partial attraction" effect where part of the liquid goes and part stays.
  const stiffness = 180 - (index * 20); 
  const damping = 10 + (index * 5); 
  
  const x = useSpring(mouseX, { stiffness, damping });
  const y = useSpring(mouseY, { stiffness, damping });

  // Size variation
  const size = 120 - (index * 8); 

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

const MagneticImage: React.FC<{ work: any, index: number }> = ({ work, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let rawX = e.clientX - rect.left;
    let rawY = e.clientY - rect.top;

    let finalX = rawX;
    let finalY = rawY;

    const width = rect.width;
    const height = rect.height;
    const MAGNET_RADIUS = 80; // Smaller radius for tighter snap
    const MAGNET_STRENGTH = 0.6; // Stronger pull

    ATTRACTION_POINTS.forEach(point => {
      const pX = (point.x / 100) * width;
      const pY = (point.y / 100) * height;

      const dx = rawX - pX;
      const dy = rawY - pY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MAGNET_RADIUS) {
        // Strong interpolation towards the point
        finalX += (pX - rawX) * MAGNET_STRENGTH;
        finalY += (pY - rawY) * MAGNET_STRENGTH;
      }
    });

    x.set(finalX);
    y.set(finalY);
  };

  const handleMouseLeave = () => {
    // Move away when leaving
    x.set(-200);
    y.set(-200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-[2rem] overflow-hidden group border border-white/5 ${index === 2 ? 'md:col-span-2' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
        {/* Base Image */}
        <img 
            src={work.img} 
            alt={work.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* The Mercury Liquid Layer (Desaturation Effect) */}
        <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-saturation"
            style={{ filter: 'url(#gallery-goo)' }}
        >
            {/* More blobs for longer "tail" effect */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <MercuryBlob key={i} index={i} mouseX={x} mouseY={y} />
            ))}
        </div>

        {/* Text Overlay (Visible on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-20 pointer-events-none">
            <p className="text-dagger-yellow font-readex text-sm mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{work.category}</p>
            <h3 className="text-white font-cairo font-bold text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{work.title}</h3>
        </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-dagger-black relative">
      {/* SVG Filter Definition for the Gallery */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="gallery-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </svg>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-rakkas text-white mb-2">أحدث الأعمال</h2>
            <div className="h-1 w-24 bg-dagger-yellow rounded-full mt-4"></div>
          </div>
          <a href="#" className="text-white font-readex font-bold text-lg hover:text-dagger-yellow transition-colors flex items-center gap-2 group">
            عرض كل الأعمال
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[350px]">
          {WORKS.map((work, idx) => (
            <MagneticImage key={idx} work={work} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;