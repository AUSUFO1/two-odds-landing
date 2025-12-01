'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = [
    { name: 'Privacy Policies', href: '#privacy' },
    { name: 'Terms and conditions', href: '#terms' },
    { name: 'Cookie policies', href: '#cookies' },
    { name: 'Cookie settings', href: '#cookie-settings' },
  ];

  return (
    <footer style={{ backgroundColor: 'regal-navy' }}>
      <div className="container-custom py-12">
        {/* Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-8"
        >
          {footerLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="
                text-white 
                font-medium 
                text-base
                underline 
                underline-offset-4 
                decoration-white 
                hover:decoration-white
                transition-all 
                duration-200
              "
              style={{ opacity: 0.9 }}
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white text-base" style={{ opacity: 0.9 }}>
            Gamble responsibly. <span className="font-semibold">18+ only.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
