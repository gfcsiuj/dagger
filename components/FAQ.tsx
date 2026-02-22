import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-dagger-black relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-dagger-yellow text-sm font-readex">
             <HelpCircle size={14} />
             <span>مركز المعلومات</span>
           </div>
          <h2 className="text-4xl md:text-5xl font-rakkas text-white mb-6">أسئلة شائعة</h2>
          <p className="text-gray-400 text-lg font-readex">
            إجابات سريعة على ما يدور في ذهنك
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-dagger-yellow bg-white/5' : 'border-white/10 bg-dagger-lightGray/30 hover:border-white/20'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-right focus:outline-none group"
                >
                  <span className={`text-xl md:text-2xl font-cairo font-bold transition-colors ${isOpen ? 'text-dagger-yellow' : 'text-white group-hover:text-gray-200'}`}>
                    {faq.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ml-4 ${isOpen ? 'bg-dagger-yellow text-dagger-black border-dagger-yellow rotate-180' : 'bg-transparent text-gray-400 border-gray-600'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                         <div className="h-px w-full bg-white/10 mb-6"></div>
                        <p className="text-gray-300 font-readex text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;