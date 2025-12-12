'use client';

import { motion } from 'framer-motion';

interface SliderCardProps {
  step: any;
  position: string;
  onDragStart: any;
  onDragEnd: any;
  onClick: any;
  isPaused: boolean;
}

export default function SliderCard({
  step,
  position,
  onDragStart,
  onDragEnd,
  onClick,
  isPaused,
}: SliderCardProps) {
  const IconComponent = step.icon;

  const getCardStyles = () => {
    switch (position) {
      case 'center':
        return {
          scale: 1,
          x: '0%',
          opacity: 1,
          zIndex: 30,
          width: '90%',
          maxWidth: '600px',
          height: '300px',
        };
      case 'left':
        return {
          scale: 0.75,
          x: '-120%',
          opacity: 0.5,
          zIndex: 10,
          width: '70%',
          maxWidth: '420px',
          height: '240px',
        };
      case 'right':
        return {
          scale: 0.75,
          x: '120%',
          opacity: 0.5,
          zIndex: 10,
          width: '70%',
          maxWidth: '420px',
          height: '240px',
        };
      default:
        return {
          scale: 0.5,
          x: '0%',
          opacity: 0,
          zIndex: 0,
          width: '70%',
          maxWidth: '420px',
          height: '240px',
        };
    }
  };

  const styles = getCardStyles();
  const isActive = position === 'center';

  return (
    <motion.div
      drag={isActive ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      animate={styles}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      className="absolute cursor-pointer"
      style={{
        width: styles.width,
        maxWidth: styles.maxWidth,
        height: styles.height,
        pointerEvents: position === 'hidden' ? 'none' : 'auto',
      }}
    >
      <motion.div
        whileHover={isActive ? { scale: 1.02, y: -4 } : {}}
        className="relative w-full h-full p-6 md:p-8 flex flex-col items-center justify-center text-center group bg-dark-blue"
        style={{
          borderRadius: '20px',
          border: isActive
            ? '1px solid rgba(255,165,0,0.3)'
            : '1px solid rgba(171,178,250,0.12)',
        }}
      >
        {/* Hover Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-400"
          style={{
            background: 'linear-gradient(135deg, rgba(255,165,0,0.03), rgba(171,178,250,0.03))',
            borderRadius: '20px',
          }}
        />

        {/* Icon */}
        <div className="relative z-10 mb-4">
          <motion.div
            whileHover={isActive ? { scale: 1.08 } : {}}
            transition={{ duration: 0.45 }}
          >
            <div
              className={`flex items-center justify-center rounded-full bg-[#0D121F] ${
                isActive ? 'w-20 h-20 md:w-24 md:h-24' : 'w-16 h-16'
              }`}
            >
              <div className={`${isActive ? 'w-10 h-10 md:w-14 md:h-14' : 'w-8 h-8'}`}>
                <IconComponent className="w-full h-full text-gold" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Step Label */}
        <p
          className={`relative z-10 text-gold mb-2 ${
            isActive ? 'text-base md:text-lg' : 'text-sm'
          }`}
        >
          {step.stepLabel}
        </p>

        {/* Title and Description */}
        <div className="relative z-10 px-2">
          <h3
            className={`font-extrabold text-white mb-2 ${
              isActive ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {step.title}
          </h3>

          <p
            className={`text-white leading-relaxed ${isActive ? 'text-sm md:text-base' : 'text-xs'}`}
            style={{ opacity: 0.9 }}
          >
            {step.description}
          </p>
        </div>
        {/* Corner Decoration */}
        <div
          className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-0 group-hover:opacity-80 transition-opacity duration-400"
          style={{ backgroundColor: 'rgba(255,165,0,0.04)' }}
        />
      </motion.div>
    </motion.div>
  );
}