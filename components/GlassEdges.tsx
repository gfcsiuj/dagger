import React from 'react';

const GlassEdges: React.FC = () => {
  return (
    <>
      {/* TOP GLASS - Thin Curved Lens (No Border) */}
      <div className="fixed top-0 left-0 w-full h-[100px] z-40 pointer-events-none">
        <div 
            className="absolute top-0 left-0 w-full h-full backdrop-blur-[12px] bg-black/10"
            style={{
                // Smoother, thinner curve downwards
                maskImage: 'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)'
            }}
        ></div>
      </div>

      {/* BOTTOM GLASS - Thin Curved Lens (No Border) */}
      <div className="fixed bottom-0 left-0 w-full h-[100px] z-40 pointer-events-none">
         <div 
            className="absolute bottom-0 left-0 w-full h-full backdrop-blur-[12px] bg-black/10"
            style={{
                // Smoother, thinner curve upwards
                maskImage: 'radial-gradient(ellipse 70% 100% at 50% 100%, black 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 100% at 50% 100%, black 30%, transparent 100%)'
            }}
         ></div>
      </div>
    </>
  );
};

export default GlassEdges;