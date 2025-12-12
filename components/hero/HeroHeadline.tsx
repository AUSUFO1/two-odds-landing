'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const headlines = [
  { parts: [{ text: 'BET', className: 'text-[#048DFF]' }, { text: 'SMARTER', className: 'text-gold' }, { text: 'WIN', className: 'text-[#048DFF]' }, { text: 'BIGGER', className: 'text-gold' }] },
  { parts: [{ text: 'THE', className: 'text-[#048DFF]' }, { text: 'FUTURE', className: 'text-gold' }, { text: 'OF', className: 'text-gold' }, { text: 'BETTING', className: 'text-[#048DFF]' }] },
];

export default function HeroHeadline() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % headlines.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="mb-6">
      <AnimatePresence mode="wait">
        <motion.h1
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-xl md:text-5xl lg:text-6xl font-extrabold font-poppins leading-tight drop-shadow-[0_4px_26px_rgba(0,0,0,0.8)]"
        >
          {headlines[current].parts.map((part, i) => <span key={i} className={part.className}>{part.text} </span>)}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
}
