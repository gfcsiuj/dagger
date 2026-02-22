import React from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_STEPS } from '../constants';

const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 bg-dagger-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-rakkas text-white mb-2">رحلة الإبداع</h2>
            <p className="text-dagger-yellow font-readex text-xl">كيف نحول الفكرة إلى واقع</p>
          </div>
          <div className="hidden md:block h-px w-full max-w-xs bg-gradient-to-l from-dagger-yellow to-transparent opacity-50 mb-4"></div>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line (Mobile) */}
          <div className="absolute top-0 right-[27px] md:left-1/2 w-0.5 h-full bg-white/10 md:-translate-x-1/2 z-0 hidden md:block"></div>
          
          <div className="grid grid-cols-1 gap-12 md:gap-24 relative">
            {WORKFLOW_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Text Content */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:text-left' : 'md:justify-start md:text-right'}`}>
                    <div className={`bg-dagger-lightGray/50 border border-white/5 p-8 rounded-3xl backdrop-blur-sm max-w-lg hover:border-dagger-yellow/30 transition-colors group relative overflow-hidden w-full ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-dagger-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <span className="w-10 h-10 rounded-full bg-dagger-yellow/10 text-dagger-yellow flex items-center justify-center border border-dagger-yellow/20">
                            <step.icon size={20} />
                        </span>
                        <h3 className="text-2xl font-cairo font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 font-readex text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node (Number) */}
                  <div className="relative z-10 flex flex-col items-center justify-center w-full md:w-auto">
                    <div className="w-14 h-14 rounded-full bg-dagger-black border-2 border-dagger-yellow flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)] relative group">
                        <span className="text-dagger-yellow font-bold font-cairo text-lg">{index + 1}</span>
                        
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-full border border-dagger-yellow opacity-0 group-hover:animate-ping"></div>
                    </div>
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="hidden md:block md:w-1/2 relative px-12">
                     <span className="absolute top-1/2 -translate-y-1/2 text-[120px] font-black text-white/5 font-rakkas select-none pointer-events-none stroke-text opacity-20">
                        {step.id}
                     </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;