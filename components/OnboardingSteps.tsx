'use client';

import { motion } from 'framer-motion';
import Arrow from '@/public/icons/arrow';
import Image from '@/public/icons/image';
import Email from '@/public/icons/email';
import Card from '@/public/icons/card';
import Coin from '@/public/icons/coin';
import Trophy from '@/public/icons/trophy';

export default function OnboardingSteps() {
  const steps = [
    {
      id: 1,
      title: 'Create Account',
      description: 'Quick signup in under 60 seconds',
      icon: Image,
      stepLabel: 'Step 1',
    },
    {
      id: 2,
      title: 'Verify Mail',
      description: 'Secure KYC process for your safety',
      icon: Email,
      stepLabel: 'Step 2',
    },
    {
      id: 4,
      title: 'Place your Bets',
      description: 'Lock In Your Choice',
      icon: Coin,
      stepLabel: 'Step 4',
    },
    {
      id: 3,
      title: 'Import Wallet',
      description: 'Seamless and secure wallet import',
      icon: Card,
      stepLabel: 'Step 3',
    },
    {
      id: 5,
      title: 'Start Winning',
      description: 'Begin Your Winning Streak',
      icon: Trophy,
      stepLabel: 'Step 5',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section
      className="section-padding relative overflow-hidden bg-(--regal-navy)"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl bg-(--gold)"
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl bg-(--lavender)"
        />
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
            Get Started in <span className="text-(--gold)">5 Easy Steps</span>
          </h2>
          <p className="text-md text-gray-300 max-w-2xl mx-auto">
            Your journey to winning starts <span className="text-(--gold)">here</span>. Simple onboarding, powerful
            results.
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto"
        >
          {/* DESKTOP VERSION */}
          <div className="hidden lg:block relative">
            {/* ───── TOP ROW ───── */}
            <div className="grid grid-cols-2 gap-2 mb-30">
              <motion.div variants={cardVariants}>
                <StepCard step={steps[0]} />
              </motion.div>
              <motion.div variants={cardVariants}>
                <StepCard step={steps[1]} />
              </motion.div>
            </div>

            {/* Arrow 1 */}
            <Arrow
              className="absolute"
              style={{
                top: '120px',
                left: '50%',
                transform: 'translateX(-50%) rotate(0deg)',
                width: '160px',
                height: '50px',
                opacity: 0.9,
                color: '#FFA500',
              }}
            />

            {/* Arrow 2 */}
            <Arrow
              className="absolute"
              style={{
                top: '270px',
                right: '20%',
                transform: 'rotate(90deg)',
                width: '100px',
                height: '50px',
                opacity: 0.9,
                color: '#FFA500',
              }}
            />

            {/* ───── MIDDLE ROW ───── */}
            <div className="grid grid-cols-2 gap-2 mb-40">
              <motion.div variants={cardVariants}>
                <StepCard step={steps[2]} />
              </motion.div>
              <motion.div variants={cardVariants}>
                <StepCard step={steps[3]} />
              </motion.div>
            </div>

            {/* Arrow 3 */}
            <Arrow
              className="absolute"
              style={{
                top: '460px',
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)',
                width: '160px',
                height: '50px',
                opacity: 0.9,
                color: '#FFA500',
              }}
            />

            {/* Arrow 4 */}
            <Arrow
              className="absolute"
              style={{
                top: '650px',
                left: '30%',
                transform: 'rotate(55deg)',
                width: '160px',
                height: '50px',
                opacity: 0.9,
                color: '#FFA500',
              }}
            />

            {/* ───── BOTTOM ROW ───── */}
            <motion.div variants={cardVariants} className="flex justify-center">
              <div className="w-full" style={{ maxWidth: '600px' }}>
                <StepCard step={steps[4]} isWide />
              </div>
            </motion.div>
          </div>

          {/* MOBILE STACK */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => (
              <div key={step.id}>
                <motion.div variants={cardVariants}>
                  <StepCard step={step} />
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center py-6">
                    <Arrow
                      style={{
                        transform: 'rotate(90deg)',
                        width: '70px',
                        height: '30px',
                        opacity: 0.9,
                        color: '#FFA500',
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   STEP CARD
-------------------------------------------------- */

function StepCard({
  step,
  isWide = false,
}: {
  step: any;
  isWide?: boolean;
}) {
  const IconComponent = step.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative p-4 md:p-6 flex flex-col items-center justify-center text-center group bg-(--dark-blue)"
      style={{
        borderRadius: '20px',
        border: '1px solid rgba(171,178,250,0.12)',
        height: isWide ? '260px' : '240px',
        width: '100%',
        maxWidth: isWide ? '600px' : '320px',
        margin: '0 auto',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-400"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,165,0,0.03), rgba(171,178,250,0.03))',
          borderRadius: '20px',
        }}
      />

      <div className="relative z-10 mb-3 overflow-visible">
        <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.45 }}>
          <div
            className={`flex items-center justify-center rounded-full bg-[#0D121F] ${
              isWide
                ? 'w-20 h-20 md:w-24 md:h-24'
                : 'w-16 h-16 md:w-20 md:h-20'
            }`}
          >
            <div
              className={`${
                isWide ? 'w-10 h-10 md:w-14 md:h-14' : 'w-8 h-8 md:w-10 md:h-10'
              }`}
            >
              <IconComponent className="w-full h-full text-(--gold)" />
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-[16px] mb-2 relative z-10 text-(--gold)">
        {step.stepLabel}
      </p>

      <div className="relative z-10 px-2">
        <h3
          className={`font-extrabold text-white mb-1 ${
            isWide ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          {step.title}
        </h3>

        <p
          className={`text-white leading-relaxed ${
            isWide ? 'text-sm' : 'text-xs md:text-sm'
          }`}
          style={{ opacity: 0.9 }}
        >
          {step.description}
        </p>
      </div>

      <div
        className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-0 group-hover:opacity-80 transition-opacity duration-400"
        style={{ backgroundColor: 'rgba(255,165,0,0.04)' }}
      />
    </motion.div>
  );
}
