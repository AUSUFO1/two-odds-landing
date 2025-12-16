'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Logo from '@/public/icons/logo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 bg-regal-navy shadow-xl border-b border-regal-navy"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 md:h-20">

          {/* Left: Logo */}
          <div className="shrink-0">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <Logo className="w-10 h-10 md:w-12 md:h-12" />
            </motion.div>
          </div>

          {/* Center: Desktop nav */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-8 lg:gap-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.12 }}
                  className="text-white hover:text-gold transition-colors font  text-lg md:text-2xl lg:text-2xl relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Mobile toggle */}
          <div className="ml-auto">
            <motion.button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <motion.div
                  initial={{ rotate: 0, scale: 0.95 }}
                  animate={{ rotate: 90, scale: 1 }}
                  transition={{ duration: 0.22 }}
                >
                  <X className="w-7 h-7 md:w-8 md:h-8 text-orange" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    rotate: [0, -8, 8, -8, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-orange" strokeWidth={2} fill="currentColor" />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden w-full bg-dark-blue text-white mt-2 px-4 py-4 overflow-hidden border-t border-orange/20 rounded-b-lg"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -16, opacity: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left text-white hover:text-gold transition-colors font-medium py-3 font-poppins text-sm border-b border-white/10 last:border-0"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}