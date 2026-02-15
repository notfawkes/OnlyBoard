'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="page-root">
      {/* Shared logo — animates from center to top-left */}
      <motion.img
        src="/logo/logo_dark_full.png"
        alt="OnBoard"
        className={loading ? 'logo-loading' : 'logo-nav'}
        layout
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }}
      />

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="loading-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="loading-bar-container">
              <motion.div
                className="loading-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 2.5,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                onAnimationComplete={() => setLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Landing content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <LandingPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
