'use client';

import { motion } from 'framer-motion';
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
  return (
    <section className="section-padding relative overflow-hidden bg-regal-navy">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl bg-gold" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-lavender" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 md:mb-6 lg:mb-7"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 md:mb-4">
            Why Choose <span className="text-gold">Us?</span>
          </h2>

          <p className="text-gray font-light text-base md:text-lg max-w-2xl mx-auto px-4">
            Experience the difference with our premium platform features.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: typeof benefits[0];
  index: number;
}) {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className="
        relative group
        bg-dark-blue border border-lavender/20
        rounded-2xl sm:rounded-3xl md:rounded-[36px]
        w-full max-w-[800px]
        flex flex-col sm:flex-row items-center justify-center
        px-4 sm:px-6 md:px-8
        py-6 sm:py-7 md:py-8
        gap-4 sm:gap-6 md:gap-8
      "
    >
      {/* Hover Glow Layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-400 rounded-2xl sm:rounded-3xl md:rounded-[36px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,165,0,0.03), rgba(171,178,250,0.03))',
        }}
      />

      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.45 }}
        className="flex items-center justify-center bg-[#0D121F] rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 shrink-0 relative z-10"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon />
        </div>
      </motion.div>

      <h3
        className="font-bold text-white text-lg sm:text-xl md:text-2xl leading-tight text-center sm:text-left relative z-10"
        style={{ opacity: 0.95 }}
      >
        {benefit.title}
      </h3>

      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-80 transition-opacity duration-400"
        style={{ backgroundColor: 'rgba(255,165,0,0.04)' }}
      />
    </motion.div>
  );
}