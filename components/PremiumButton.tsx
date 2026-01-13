import React from 'react';
import { ArrowUpLeft } from 'lucide-react';

interface PremiumButtonProps {
  text: string;
  href: string;
  className?: string;
  icon?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ text, href, className = "", icon = false }) => {
  return (
    <a href={href} className={`relative no-underline cursor-pointer flex flex-col items-center justify-center w-fit overflow-visible group ${className}`}>
      {/* --- External Glows --- */}
      <div className="absolute z-0 width-[58px] h-[30px] top-[83%] -left-[11px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,215,0,0.4)_0%,rgba(0,0,0,0)_100%)] blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute z-0 w-[74px] h-[41px] -top-[7px] -right-[12px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,215,0,0.5)_0%,rgba(0,0,0,0)_100%)] blur-[10px] opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* --- Border Container --- */}
      <div className="relative z-10 flex flex-col items-center justify-center p-[1.5px] bg-[#3b3b3b] rounded-full overflow-hidden transition-transform duration-200 group-hover:-translate-y-[2px]">
        
        {/* Border Glows */}
        <div className="absolute z-0 w-[95px] h-[36px] -top-[19px] -right-[17px] bg-dagger-yellow blur-[8px]"></div>
        <div className="absolute z-0 w-[54px] h-[46px] -bottom-[18px] -left-[22px] bg-dagger-yellow/20 blur-[8px]"></div>
        <div className="absolute z-0 w-[40px] h-[34px] -bottom-[17px] -left-[22px] bg-dagger-yellow blur-[8px]"></div>

        {/* --- Inner Container --- */}
        <div className="relative z-20 flex items-center justify-center gap-2 px-8 py-3 bg-black rounded-full overflow-hidden w-full h-full">
            
            {/* Inner Glows */}
            <div className="absolute z-0 w-[77px] h-[41px] top-[118%] left-[8%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,215,0,0.6)_0%,rgba(0,0,0,0)_100%)] blur-[10px] opacity-40"></div>
            <div className="absolute z-0 w-[92px] h-[40px] top-[0%] left-[75%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,215,0,0.6)_0%,rgba(0,0,0,0)_100%)] blur-[10px]"></div>

            {/* Text & Icon */}
            <span className="relative z-10 text-white font-cairo font-black text-lg tracking-wide whitespace-nowrap group-hover:text-dagger-yellow transition-colors duration-300">
                {text}
            </span>
            {icon && (
                <ArrowUpLeft className="relative z-10 w-5 h-5 text-white group-hover:text-dagger-yellow transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1" />
            )}
        </div>
      </div>
    </a>
  );
};

export default PremiumButton;