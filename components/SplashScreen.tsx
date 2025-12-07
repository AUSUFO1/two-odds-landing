'use client';

import { useEffect, useState } from 'react';
import Logo from '@/public/icons/logo';
import TwoOdds from '@/public/icons/twoOdds';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: '#003C6E',
      }}
    >
      <div className="mb-12">
        <Logo className="w-32 h-32" />
      </div>

      <div className="flex items-center justify-center my-8 breathing-animation">
        <TwoOdds style={{ width: '359px', height: '89px' }} />
      </div>

      <p className="text-3xl text-alice-blue font-semibold tracking-wider font-poppins mt-4">
        Coming Soon
      </p>

      <style jsx>{`
        @keyframes breathing {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .breathing-animation {
          animation: breathing 1500ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}