'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from "lucide-react";
import Crown from '@/public/icons/crown';
import TwoOdds from '@/public/icons/twoOdds';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 3,
    minutes: 20,
    seconds: 20,
  });
  const [currentHeadline, setCurrentHeadline] = useState(0);

  const headlines = [
    {
      parts: [
        { text: 'BET', className: 'text-[#048DFF]' },
        { text: 'SMARTER', className: 'text-gold' },
        { text: 'WIN', className: 'text-[#048DFF]' },
        { text: 'BIGGER', className: 'text-gold' },
      ],
    },
    {
      parts: [
        { text: 'THE', className: 'text-[#048DFF]' },
        { text: 'FUTURE', className: 'text-gold' },
        { text: 'OF', className: 'text-gold' },
        { text: 'BETTING', className: 'text-[#048DFF]' },
      ],
    },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
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
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const headlineTimer = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(headlineTimer);
  }, [mounted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-[55vh] md:min-h-[65vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden text-white md:py-8">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-regal-navy/75" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 container-custom"
      >

        {/* Countdown */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.6 }} 
          className="mb-3 mt-4 sm:mb-4 md:mb-6"
        >
          <div className="flex justify-center items-center gap-1 sm:gap-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-poppins text-white">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <span key={unit} className="flex items-baseline">
                <span className="tabular-nums">{String(value).padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs text-white/80 uppercase ml-0.5 sm:ml-1">{unit}</span>
                {index < 3 && <span className="mx-1 sm:mx-2 text-white">:</span>}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Logo */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="mb-4 sm:mb-6 md:mb-8 flex justify-center px-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[359px]"
          >
            <TwoOdds className="w-full h-auto" style={{ maxWidth: '359px' }} />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="mb-4 sm:mb-6 md:mb-8 flex justify-center px-4">
          <motion.div
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-dark-blue backdrop-blur-md px-4 sm:px-6 md:px-15 py-2 sm:py-3 rounded-full border border-dark-blue shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
            <span className="text-white font-semibold font-poppins text-xs sm:text-sm md:text-base whitespace-nowrap">Premium Betting Experience</span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-poppins leading-tight drop-shadow-[0_4px_26px_rgba(0,0,0,0.8)]"
            >
              {headlines[currentHeadline].parts.map((part, index) => (
                <span key={index} className={part.className}>{part.text} </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-poppins opacity-95 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] px-4"
        >
          Join the most exclusive crypto betting platform. Experience cutting-edge technology, unbeatable odds, and premium high rewards.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pb-8 sm:pb-0">
          
          {/* Primary Button - NOW SCROLLS TO WAITLIST */}
          <motion.button
            onClick={() =>
              document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-primary group shadow-2xl px-6 py-3 text-lg font-semibold rounded-xl transition inline-flex items-center justify-center gap-2 w-[220px] h-[45px]"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Waitlist
            <ArrowRight className="w-5 h-5 text-[#03101F] transition-all duration-300 group-hover:translate-x-1" />
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            className="btn-secondary shadow-2xl px-6 py-3 text-lg font-semibold rounded-xl transition w-[220px] h-[45px]"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>

        </motion.div>

      </motion.div>

    </section>
  );
}