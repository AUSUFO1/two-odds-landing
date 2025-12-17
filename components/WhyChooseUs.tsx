'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import Trophy from '@/public/icons/trophy';
import Security from '@/public/icons/security';
import Support from '@/public/icons/support';
import Bonus from '@/public/icons/bonus';

const benefits = [
  { icon: Trophy, title: 'Best Odds Guaranteed' },
  { icon: Security, title: 'Bank-Grade Security' },
  { icon: Support, title: '24/7 Support' },
  { icon: Bonus, title: 'Exclusive Bonuses' },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Card 1 height growth
  const firstCardHeight = useTransform(
    scrollYProgress,
    [0, 0.22, 0.25],
    ['150px', '200px', '253px']
  );

  // Scale for first card content (icon + text)
  const contentScale = useTransform(scrollYProgress, [0, 0.22, 0.25], [0.85, 0.95, 1]);

  // Cards 2–4 reveal together
  const secondaryOpacity = useTransform(scrollYProgress, [0.28, 0.38], [0, 1]);
  const secondaryY = useTransform(scrollYProgress, [0.28, 0.38], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-regal-navy"
      style={{ height: '300vh' }}
    >
<div className="sticky top-0 flex flex-col items-center justify-center py-16 md:py-24 container-custom">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Why Choose <span className="text-gold">Us?</span>
          </h2>

          <p className="text-gray font-light text-base md:text-lg max-w-2xl mx-auto text-center">
            Experience the difference with our premium platform features.
          </p>
        </div>

        {/* ===== CARDS ===== */}
        <div className="w-full max-w-4xl flex flex-col gap-6 mt-4 px-4 items-center">
          {/* CARD 1 */}
          <motion.div
            style={{ height: firstCardHeight }}
            className="
              relative
              bg-dark-blue border border-lavender/20
              rounded-[36px]
              flex flex-col items-center justify-center
              px-6 md:px-8
              gap-4 md:gap-6
              w-full
            "
          >
            <motion.div
              style={{ scale: contentScale }}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div className="flex items-center justify-center bg-[#0D121F] rounded-full w-16 h-16 md:w-20 md:h-20 shrink-0">
                <Trophy />
              </div>

              <p className="font-semibold text-white text-xl md:text-3xl leading-tight text-center">
                Best Odds Guaranteed
              </p>
            </motion.div>
          </motion.div>

          {/* CARDS 2–4 (APPEAR TOGETHER) */}
          {benefits.slice(1).map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                style={{ opacity: secondaryOpacity, y: secondaryY }}
                className="
                  relative
                  bg-dark-blue border border-lavender/20
                  rounded-[36px]
                  flex flex-col items-center justify-center
                  px-6 md:px-8
                  py-6 md:py-8
                  gap-4 md:gap-6
                  w-full
                "
              >
                <div className="flex items-center justify-center bg-[#0D121F] rounded-full w-16 h-16 md:w-20 md:h-20 shrink-0">
                  <Icon />
                </div>

                <p className="font-semibold text-white text-xl md:text-3xl leading-tight text-center">
                  {benefit.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
