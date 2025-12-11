'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import SliderCard from './slider/SliderCard';
import { sliderSteps } from './slider/sliderData';

export default function OnboardingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const stepsLength = sliderSteps.length;

  // Auto-advance slider
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stepsLength);
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, stepsLength]);

  const handleDragStart = (event: any, info: any) => {
    setDragStart(info.point.x);
    setIsPaused(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    const dragDistance = info.point.x - dragStart;
    const threshold = 50;

    if (dragDistance > threshold) {
      setCurrentIndex((prev) => (prev - 1 + stepsLength) % stepsLength);
    } else if (dragDistance < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % stepsLength);
    }

    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleCardClick = () => {
    setIsPaused(!isPaused);
  };

  const getCardPosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(stepsLength - 1)) return 'right';
    if (diff === -1 || diff === stepsLength - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="section-padding relative overflow-hidden bg-regal-navy">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl bg-gold" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl bg-lavender" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-regular text-white mb-3">
            Get Started in <span className="text-gold">5 Easy Steps</span>
          </h2>
          <p className="text-md text-gray-300 max-w-2xl mx-auto">
            Your journey to winning starts <span className="text-gold">here</span>. Simple
            onboarding, powerful results.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
            {sliderSteps.map((step, index) => {
              const position = getCardPosition(index);
              return (
                <SliderCard
                  key={step.id}
                  step={step}
                  position={position}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={handleCardClick}
                  isPaused={isPaused}
                />
              );
            })}
          </div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-regular text-white">
            Begin Your Winning Streak
          </p>
        </motion.div>
      </div>
    </section>
  );
}