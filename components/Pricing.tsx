import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import PremiumButton from './PremiumButton';

const PACKAGES = [
  {
    id: 0,
    name: "باقة وِسبر",
    englishName: "WHISPER",
    price: "75k IQD",
    description: "باقة موشن جرافيك اقتصادية للمشاريع الجديدة.",
    features: [
      "موشن جرافيك 10 ساعات",
      "تعليق صوتي احترافي",
      "تحريك سلس",
      "مؤثرات صوتية",
      "موسيقى بالخلفية",
      "جودة عالية FHD"
    ],
    highlight: false
  },
  {
    id: 1,
    name: "باقة أويك",
    englishName: "AWAKE",
    price: "100k IQD",
    description: "باقة احترافية لتحقيق أقصى استفادة من الترويج.",
    features: [
      "كل مميزات باقة وِسبر",
      "انسيرتات بجودة عالية",
      "تصميم مشاهد خاصة",
      "بحث عميق للسوق",
      "كتابة محتوى إعلاني",
      "دعم فني وتعديلات"
    ],
    highlight: true
  },
  {
    id: 2,
    name: "باقة وكن 3D",
    englishName: "WOKEN 3D",
    price: "--- IQD",
    description: "باقة VIP تتضمن مشاهد سينمائية كاملة.",
    features: [
      "مشاهد كاملة ثري دي",
      "استخدام بلندر Blender",
      "إخراج سينمائي",
      "مودلنج خاص للمنتج",
      "تلوين احترافي",
      "أعلى جودة ممكنة 4K"
    ],
    highlight: false
  }
];

const Pricing: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PACKAGES.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  const getCardStyles = (index: number) => {
    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex - 1 + PACKAGES.length) % PACKAGES.length;
    const isRight = index === (activeIndex + 1) % PACKAGES.length;

    let styles = "absolute transition-all duration-700 ease-in-out w-full max-w-md cursor-pointer";
    let transform = "";
    let zIndex = 0;
    let opacity = 1;
    let filter = "none";

    if (isCenter) {
      transform = "translateX(0) scale(1) translateZ(0)";
      zIndex = 20;
      opacity = 1;
      filter = "none";
    } else if (isLeft) {
      transform = "translateX(-60%) scale(0.85) perspective(1000px) rotateY(15deg)";
      zIndex = 10;
      opacity = 0.6;
      filter = "blur(4px)";
    } else if (isRight) {
      transform = "translateX(60%) scale(0.85) perspective(1000px) rotateY(-15deg)";
      zIndex = 10;
      opacity = 0.6;
      filter = "blur(4px)";
    }

    return { className: styles, style: { transform, zIndex, opacity, filter } };
  };

  return (
    <section id="packages" className="py-32 bg-dagger-black relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dagger-yellow/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-rakkas text-white mb-4">باقاتنا المميزة</h2>
          <p className="text-gray-400 font-readex text-2xl">اختر الباقة التي تناسب حجم مشروعك وطموحك</p>
        </div>

        {/* Desktop 3D View */}
        <div 
          className="hidden md:flex justify-center items-center h-[700px] relative w-full perspective-1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {PACKAGES.map((pkg, index) => {
            const { className, style } = getCardStyles(index);
            const isCenter = index === activeIndex;

            return (
              <div 
                key={index}
                className={className}
                style={style}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`
                  h-full rounded-[2.5rem] p-8 flex flex-col border backdrop-blur-md transition-colors duration-500
                  ${isCenter ? 'bg-dagger-lightGray border-dagger-yellow/50 shadow-[0_0_50px_rgba(255,215,0,0.15)]' : 'bg-dagger-gray/40 border-white/5 hover:bg-dagger-gray/60'}
                `}>
                  {pkg.highlight && isCenter && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-dagger-yellow text-dagger-black px-6 py-1 rounded-b-xl font-bold text-sm font-cairo shadow-lg">
                      الأكثر طلباً
                    </div>
                  )}

                  <div className="mb-8 text-center">
                    <h3 className={`text-3xl font-cairo font-black mb-2 ${isCenter ? 'text-white' : 'text-gray-300'}`}>{pkg.name}</h3>
                    <p className="text-dagger-yellow font-readex text-lg tracking-[0.2em] mb-4 uppercase">{pkg.englishName}</p>
                    <div className={`text-5xl font-rakkas mb-4 ${isCenter ? 'text-white' : 'text-gray-400'}`}>{pkg.price}</div>
                    <p className="text-gray-400 text-lg font-readex leading-relaxed h-12">
                      {pkg.description}
                    </p>
                  </div>

                  <div className={`border-t pt-8 flex-grow ${isCenter ? 'border-white/10' : 'border-white/5'}`}>
                    <ul className="space-y-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300 font-readex text-lg">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isCenter ? 'bg-dagger-yellow text-dagger-black' : 'bg-white/10 text-white/50'}`}>
                            <Check size={12} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex justify-center">
                    {isCenter ? (
                        <PremiumButton text="أطلب الباقة" href="#contact" className="w-full" />
                    ) : (
                        <button className="w-full py-4 rounded-full font-bold font-cairo text-center transition-all duration-300 border bg-transparent border-white/10 text-gray-500 cursor-not-allowed pointer-events-none">
                            اضغط للمعاينة
                        </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View (Standard Stack) */}
        <div className="md:hidden grid grid-cols-1 gap-8">
          {PACKAGES.map((pkg, index) => (
            <div 
              key={index}
              className={`rounded-[2rem] p-8 border ${pkg.highlight ? 'bg-dagger-lightGray border-dagger-yellow/50' : 'bg-dagger-gray border-white/5'}`}
            >
               <div className="mb-6">
                <h3 className="text-2xl font-cairo font-bold text-white">{pkg.name}</h3>
                <div className="text-3xl font-rakkas text-dagger-yellow my-2">{pkg.price}</div>
                <p className="text-gray-400 text-lg font-readex">{pkg.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-lg">
                    <Check size={14} className="text-dagger-yellow" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <PremiumButton text="اطلب الان" href="#contact" className="w-full" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        <div className="hidden md:flex justify-center gap-4 mt-8">
            <button 
                onClick={() => {setIsPaused(true); setActiveIndex((prev) => (prev - 1 + PACKAGES.length) % PACKAGES.length)}}
                className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all hover:border-dagger-yellow"
            >
                <ArrowRight />
            </button>
            <button 
                onClick={() => {setIsPaused(true); setActiveIndex((prev) => (prev + 1) % PACKAGES.length)}}
                className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-all hover:border-dagger-yellow"
            >
                <ArrowLeft />
            </button>
        </div>

        <div className="mt-12 text-center">
            <p className="text-gray-500 font-readex text-lg">
                ملاحظة: مدة المقاطع تكون 30 ثانية. للمقاطع الأطول يرجى التواصل معنا.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;