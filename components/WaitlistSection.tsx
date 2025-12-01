'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FormIcon from '@/public/icons/form';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully joined the waitlist!');
        setEmail('');
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
      console.error('Waitlist submission error:', error);
    }
  };

  return (
    <section
      id="waitlist"
      className="w-full py-10 md:py-16 flex justify-center px-4"
      style={{ backgroundColor: 'var(--regal-navy)' }}
    >
      <div
        className="w-full max-w-2xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-xl relative group"
        style={{ backgroundColor: 'var(--dark-blue)' }}
      >
        {/* Glow Effect on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-400 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,165,0,0.03), rgba(171,178,250,0.03))',
          }}
        />

        {/* Decorative Corner Glow */}
        <div
          className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-0 group-hover:opacity-80 transition-opacity duration-400"
          style={{ backgroundColor: 'rgba(255,165,0,0.04)' }}
        />

        {/* Icon with Animation */}
        <div className="flex justify-center mb-5 md:mb-6 relative z-10">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.45 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#0D121F]"
          >
            <FormIcon className="w-6 h-6 md:w-7 md:h-7 text-gold" />
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-center text-white text-xl md:text-2xl font-bold mb-2 md:mb-3 relative z-10">
          Join the <span style={{ color: 'var(--gold)' }}>Exclusive</span> Waitlist
        </h2>

        {/* Description */}
        <p className="text-center text-gray-300 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed px-2 relative z-10">
          Be among the first to experience the future of betting. Limited spots available.
        </p>

        {/* Form - ALWAYS INLINE (Mobile & Desktop) */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 mb-4 relative z-10"
        >
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
            className="flex-1 text-black text-xs md:text-sm px-3 md:px-4 py-2.5 md:py-3 rounded-lg outline-none placeholder-gray-600 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary text-xs md:text-sm px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 md:gap-2 whitespace-nowrap shrink-0"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
                Joining...
              </>
            ) : (
              'Reserve Spot'
            )}
          </button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-4 relative z-10">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0 mt-0.5" />
            <p className="text-green-300 text-xs md:text-sm leading-relaxed">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4 relative z-10">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-300 text-xs md:text-sm leading-relaxed">{message}</p>
          </div>
        )}

        {/* Terms */}
        <p className="text-start text-gray-400 text-[10px] md:text-xs mt-4 md:mt-6 leading-relaxed relative z-10">
          By joining, you agree to receive exclusive updates and early access offers
        </p>
      </div>
    </section>
  );
}