'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 3, minutes: 20, seconds: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="mb-3 mt-4 md:mt-4 sm:mb-4 md:mb-6">
      <div className="flex justify-center items-center gap-1 sm:gap-2 text-base sm:text-lg md:text-2xl lg:text-2xl font-bold font-poppins text-white">
        {Object.entries(timeLeft).map(([unit, value], index) => (
          <span key={unit} className="flex items-baseline">
            <span className="tabular-nums">{String(value).padStart(2, '0')}</span>
            <span className="text-[10px] sm:text-xs text-white/80 uppercase ml-0.5 sm:ml-1">{unit}</span>
            {index < 3 && <span className="mx-1 sm:mx-2 text-white">:</span>}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
