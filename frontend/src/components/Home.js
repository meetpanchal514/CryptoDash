import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="sphere-1 absolute w-64 h-64 rounded-full opacity-50 animate__animated animate__pulse animate__infinite grad" style={{ top: '10%', left: '10%' }}></div>
        <div className="sphere-2 absolute w-96 h-96 rounded-full opacity-50 animate__animated animate__pulse animate__infinite" style={{ bottom: '15%', right: '15%' }}></div>
      </div>

      <motion.div
        className="relative z-10 text-center p-8 max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6"
          style={{ color: 'var(--text-color)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Welcome to CryptoDash
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          style={{ color: 'var(--text-color-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Your one-stop platform to track cryptocurrency prices, market trends, and historical data in real-time.
        </motion.p>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            to="/dashboard"
            className="inline-block py-3 px-6 rounded-lg font-semibold text-lg"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            }}
          >
            Explore Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;