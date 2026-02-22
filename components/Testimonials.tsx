import React from 'react';
import { motion } from 'framer-motion';
import { REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-dagger-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <h2 className="text-4xl md:text-6xl font-rakkas text-white mb-4">شركاء النجاح</h2>
        <div className="h-1 w-24 bg-dagger-yellow rounded-full"></div>
      </div>

      {/* Fade Gradients on sides */}
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-dagger-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-dagger-black to-transparent z-20 pointer-events-none"></div>

      <div className="flex overflow-hidden relative z-10">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%" }} // RTL: Moves right
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 pl-6"
        >
          {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, index) => (
            <div 
              key={index}
              className="w-[350px] md:w-[450px] flex-shrink-0 bg-dagger-lightGray/30 backdrop-blur-md border border-white/5 p-8 rounded-[2rem] hover:border-dagger-yellow/30 transition-colors group relative"
            >
              <div className="absolute top-6 left-6 text-dagger-yellow/20 group-hover:text-dagger-yellow/40 transition-colors">
                <Quote size={40} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.stars ? "#FFD700" : "none"} 
                    className={i < review.stars ? "text-dagger-yellow" : "text-gray-600"} 
                  />
                ))}
              </div>

              <p className="text-gray-300 font-readex text-lg leading-relaxed mb-8 relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-dagger-yellow to-dagger-black p-[2px]">
                   <div className="w-full h-full rounded-full bg-dagger-gray flex items-center justify-center text-white font-bold font-cairo">
                      {review.name.charAt(0)}
                   </div>
                </div>
                <div>
                  <h4 className="text-white font-bold font-cairo">{review.name}</h4>
                  <p className="text-dagger-yellow text-xs font-readex">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;