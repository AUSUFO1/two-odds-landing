'use client';

import { motion } from 'framer-motion';
import Crown from '@/public/icons/crown';

export default function HeroBadge() {
  return (
    <motion.div className="mb-4 sm:mb-6 md:mb-8 flex justify-center px-4">
      <motion.div className="inline-flex items-center gap-1.5 sm:gap-2 bg-dark-blue backdrop-blur-md px-4 sm:px-6 md:px-15 py-2 sm:py-3 rounded-full border border-dark-blue shadow-2xl hover:scale-105 transition-transform duration-300">
        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
        <span className="text-white font-semibold font-poppins text-xs sm:text-sm md:text-base whitespace-nowrap">
          Premium Betting Experience
        </span>
      </motion.div>
    </motion.div>
  );
}
