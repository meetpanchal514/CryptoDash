

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function NavbarComponent() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="fixed top-0 w-full bg-opacity-90 backdrop-blur-md z-50 border-b" style={{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>CryptoDash</span>
        </Link>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-semibold py-2 px-4 rounded-full transition-colors"
          onClick={() => setDarkMode(!darkMode)}
          style={{
            backgroundColor: 'var(--button-bg)',
            color: 'var(--button-text)',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'var(--button-bg-hover)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--button-bg)')}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
      </div>
    </nav>
  );
}

export default NavbarComponent;