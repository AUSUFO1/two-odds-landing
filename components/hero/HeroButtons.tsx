'use client';

import { ArrowRight } from 'lucide-react';

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pb-8 sm:pb-0">
      <button
        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        className="btn-primary group shadow-2xl px-6 py-3 md:py-4 text-base md:text-lg font-bold rounded-2xl md:rounded-[17px] transition inline-flex items-center justify-center gap-2 w-60 sm:w-[250px] md:w-[270px] h-14 md:h-[65px] hover:scale-105 active:scale-95"
      >
        <span className="font-bold">Join Waitlist</span>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#03101F] transition-all duration-300 group-hover:translate-x-1" />
      </button>

      <button
        className="btn-secondary shadow-2xl px-6 py-3 md:py-4 text-base md:text-lg font-bold rounded-2xl md:rounded-[17px] transition w-60 sm:w-[250px] md:w-[270px] h-14 md:h-[65px] hover:scale-105 active:scale-95"
      >
        <span className="font-bold">Learn More</span>
      </button>
    </div>
  );
}