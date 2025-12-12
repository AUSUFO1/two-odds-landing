'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Countdown from './hero/Countdown';
import HeroLogo from './hero/HeroLogo';
import HeroBadge from './hero/HeroBadge';
import HeroHeadline from './hero/HeroHeadline';
import HeroDescription from './hero/HeroDescription';
import HeroButtons from './hero/HeroButtons';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative min-h-[55vh] md:min-h-[45vh] lg:min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-regal-navy/75" />
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 container-custom"
      >
        <Countdown />
        <HeroLogo />
        <HeroBadge />
        <HeroHeadline />
        <HeroDescription />
        <HeroButtons />
      </motion.div>
    </section>
  );
}
