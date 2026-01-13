import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SERVICES, STATS } from '../constants';
import { ArrowUpLeft } from 'lucide-react';
import PremiumButton from './PremiumButton';

// --- Shared Components ---

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,215,0,0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// Mercury Blob for the Yellow Card
const MercuryBlob = ({ mouseX, mouseY, index }: { mouseX: any, mouseY: any, index: number }) => {
    const stiffness = 120 - (index * 15);
    const damping = 20 + (index * 2);
    
    const x = useSpring(mouseX, { stiffness, damping });
    const y = useSpring(mouseY, { stiffness, damping });
    const size = 120 - (index * 15); 
  
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

const BentoGrid: React.FC = () => {
  // Hooks for the Yellow Card Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleCardMouseLeave = () => {
    x.set(-200);
    y.set(-200);
  };

  return (
    <section id="services" className="py-24 bg-dagger-black relative overflow-hidden">
      {/* SVG Filter for Liquid Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="bento-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </svg>

      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-dagger-gray to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h3 className="text-dagger-yellow font-readex text-2xl mb-2">خدماتنا</h3>
            <h2 className="text-4xl md:text-6xl font-rakkas text-white">نحول الأفكار لواقع</h2>
          </div>
          <p className="text-gray-400 font-readex max-w-md text-2xl">
            نقدم حلول إبداعية متكاملة تناسب طموحك وتبرز علامتك التجارية في السوق.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 rounded-[2rem] border border-dagger-gray group h-full"
          >
            <SpotlightCard className="bg-dagger-lightGray h-full p-8 md:p-12 rounded-[2rem]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-dagger-yellow/5 via-transparent to-transparent"></div>
                
                <div className="relative z-20">
                    <div className="w-12 h-12 rounded-full bg-dagger-yellow/10 flex items-center justify-center mb-6 text-dagger-yellow">
                        <ArrowUpLeft size={24} />
                    </div>
                    <h3 className="text-3xl font-cairo font-black text-white mb-4 group-hover:text-dagger-yellow transition-colors">
                    حلول إبداعية متكاملة
                    </h3>
                    <p className="text-gray-400 font-readex text-2xl leading-relaxed max-w-lg mb-10">
                    من تحديد الفكرة، لتطبيقها باحترافية، لحد ما تستلم مشروعك جاهز بأعلى جودة. شغلنا مو مجرد تصميم، شغلنا فن وهندسة.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-dagger-gray pt-8">
                    {STATS.map((stat, idx) => (
                        <div key={idx}>
                        <p className="text-3xl font-cairo font-black text-white mb-1">{stat.value}</p>
                        <p className="text-gray-500 font-readex text-lg">{stat.label}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </SpotlightCard>
          </motion.div>

          {/* Vertical CTA Card (Yellow Card with Mercury Effect) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-[2rem] relative overflow-hidden group min-h-[400px] border border-dagger-yellow"
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
             {/* The Colored Background Content */}
             <div className="absolute inset-0 bg-dagger-yellow p-8 flex flex-col justify-between z-10">
                <div className="absolute -right-20 -top-20 opacity-10">
                    <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
                </div>
                
                <div className="relative z-20">
                    <h3 className="text-3xl font-rakkas text-dagger-black mb-4">تصميم 3D</h3>
                    <p className="text-dagger-black/80 font-cairo font-bold text-2xl leading-snug">
                        مشاهد سينمائية واقعية تبرز منتجك بطريقة لا مثيل لها بالسوق.
                    </p>
                </div>
                
                <div className="relative z-20 flex justify-center mt-8">
                    <PremiumButton text="اطلب الآن" href="#contact" icon={true} />
                </div>
             </div>

             {/* Mercury Desaturation Overlay */}
             {/* mix-blend-saturation with white blobs creates a grayscale effect on the yellow underneath */}
             <div 
                className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-saturation"
                style={{ filter: 'url(#bento-goo)' }}
             >
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <MercuryBlob key={i} index={i} mouseX={x} mouseY={y} />
                 ))}
             </div>
          </motion.div>

          {/* Service Cards Grid */}
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-[2rem] border border-dagger-gray group h-full"
            >
              <SpotlightCard className="bg-dagger-lightGray p-8 rounded-[2rem] h-full">
                <div className="w-14 h-14 bg-dagger-black rounded-2xl flex items-center justify-center mb-6 text-dagger-yellow group-hover:scale-110 transition-transform border border-dagger-gray relative z-20">
                    <service.icon size={28} />
                </div>
                <h4 className="text-2xl font-cairo font-bold text-white mb-3 relative z-20">{service.title}</h4>
                <p className="text-gray-400 font-readex text-xl leading-relaxed relative z-20">{service.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;