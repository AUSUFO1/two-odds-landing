'use client';

import { motion } from 'framer-motion';
import TwoOdds from '@/public/icons/twoOdds';

export default function HeroLogo() {
  return (
    <motion.div className="mb-4 sm:mb-6 md:mb-8 flex justify-center px-4">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[359px]"
      >
        <TwoOdds className="w-full h-auto" style={{ maxWidth: '359px' }} />
      </motion.div>
    </motion.div>
  );
}
