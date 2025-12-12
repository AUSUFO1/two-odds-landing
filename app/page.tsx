'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OnboardingSlider from '@/components/OnboardingSlider';
import WhyChooseUs from '@/components/WhyChooseUs';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash screen is showing
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSplash]);

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar />
          <Hero />
          <OnboardingSlider />
          <WhyChooseUs />
          <WaitlistSection />
          <Footer />
        </>
      )}
    </main>
  );
}