'use client';

import { motion } from 'framer-motion';

export default function HeroDescription() {
  return (
    <motion.p
      className="text-sm font-light md:text-4xl lg:text-xl xl:text-2xl text-white max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-poppins opacity-95 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] px-4"
    >
      Join the most exclusive crypto betting platform. Experience cutting-edge technology, unbeatable odds, and premium high rewards.
    </motion.p>
  );
}
