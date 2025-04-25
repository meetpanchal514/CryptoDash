import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/* Hero Section */}
      <motion.div
        className="text-center px-4"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-color)' }}>
          CryptoDash
        </h1>
        <p className="text-xl md:text-3xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-color-secondary)' }}>
          Track the future of finance with real-time cryptocurrency insights.
          Stay ahead with CryptoDash.
        </p>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            to="/dashboard"
            className="inline-block font-semibold py-3 px-8 rounded-full shadow-lg transition-colors"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--button-bg-hover)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--button-bg)')}
          >
            Explore Dashboard
          </Link>
        </motion.div>
      </motion.div>

      {/* Visual Element - Floating 3D Spheres */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 blur-3xl animate-pulse sphere-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20 blur-3xl animate-pulse delay-1000 sphere-2"></div>
      </motion.div>
    </div>
  );
}

export default Home;