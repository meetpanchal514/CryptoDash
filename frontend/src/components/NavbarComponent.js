import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function NavbarComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 shadow-md z-50"
      style={{ backgroundColor: 'var(--navbar-bg)' }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
        CryptoDash
      </Link>
      <div className="flex items-center space-x-4">
        <motion.div variants={linkVariants} whileHover="hover">
          <Link to="/" className="text-lg" style={{ color: 'var(--text-color)' }}>
            Home
          </Link>
        </motion.div>
        <motion.div variants={linkVariants} whileHover="hover">
          <Link to="/dashboard" className="text-lg" style={{ color: 'var(--text-color)' }}>
            Dashboard
          </Link>
        </motion.div>
        <motion.button
          onClick={toggleTheme}
          className="text-lg focus:outline-none pl-2 pr-2"
          style={{ color: 'var(--text-color)' }}
          variants={linkVariants}
          whileHover="hover"
        >
          {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
        </motion.button>
        {isAuthenticated ? (
          <motion.button
            onClick={handleLogout}
            className="text-lg"
            style={{ color: 'var(--text-color)' }}
            variants={linkVariants}
            whileHover="hover"
          >
            Logout
          </motion.button>
        ) : (
          <motion.div variants={linkVariants} whileHover="hover">
            <Link to="/signin" className="text-lg" style={{ color: 'var(--text-color)' }}>
              Sign In
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default NavbarComponent;