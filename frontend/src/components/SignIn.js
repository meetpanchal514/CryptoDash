// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(auth, email, password);
//         navigate('/dashboard');
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <motion.div
//         className="p-8 rounded-lg shadow-lg max-w-md w-full"
//         style={{ backgroundColor: 'var(--card-background)' }}
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-color)' }}>
//           {isSignUp ? 'Sign Up' : 'Sign In'}
//         </h2>
//         {error && (
//           <p className="text-center mb-4" style={{ color: 'var(--error-text)' }}>
//             {error}
//           </p>
//         )}
//         <div>
//           <div className="mb-4">
//             <label className="block mb-2" style={{ color: 'var(--text-color)' }}>
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 rounded-lg border"
//               style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-2" style={{ color: 'var(--text-color)' }}>
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 rounded-lg border"
//               style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
//               placeholder="Enter your password"
//             />
//           </div>
//           <motion.button
//             onClick={handleAuth}
//             className="w-full py-3 rounded-lg font-semibold"
//             style={{
//               backgroundColor: 'var(--button-bg)',
//               color: 'var(--button-text)',
//             }}
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             {isSignUp ? 'Sign Up' : 'Sign In'}
//           </motion.button>
//         </div>
//         <p className="mt-4 text-center" style={{ color: 'var(--text-color-secondary)' }}>
//           {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
//           <button
//             onClick={() => setIsSignUp(!isSignUp)}
//             className="underline"
//             style={{ color: 'var(--button-bg)' }}
//           >
//             {isSignUp ? 'Sign In' : 'Sign Up'}
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// export default SignIn;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // Handle Email/Password Sign-In or Sign-Up
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setResetError('');

    if (!resetEmail) {
      setResetError('Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage('Password reset email sent! Please check your inbox.');
      setResetEmail('');
    } catch (err) {
      setResetError(err.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="p-8 rounded-lg shadow-lg max-w-md w-full"
        style={{ backgroundColor: 'var(--card-background)' }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-color)' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        {error && (
          <p className="text-center mb-4" style={{ color: 'var(--error-text)' }}>
            {error}
          </p>
        )}
        <div>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'var(--text-color)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" style={{ color: 'var(--text-color)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
              placeholder="Enter your password"
            />
          </div>
          {!isSignUp && (
            <p className="mb-4 text-right">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="underline text-sm"
                style={{ color: 'var(--button-bg)' }}
              >
                Forgot Password?
              </button>
            </p>
          )}
          <motion.button
            onClick={handleAuth}
            className="w-full py-3 rounded-lg font-semibold mb-4"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </motion.button>
          <motion.button
            onClick={handleGoogleSignIn}
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.621h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.332,2,12.545,2C6.735,2,2,6.735,2,12.545S6.735,23.09,12.545,23.09c5.811,0,10.545-4.735,10.545-10.545c0-0.669-0.062-1.321-0.178-1.947h-10.367V10.239z"
              />
            </svg>
            Continue with Google
          </motion.button>
        </div>
        <p className="mt-4 text-center" style={{ color: 'var(--text-color-secondary)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline"
            style={{ color: 'var(--button-bg)' }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div className="p-6 rounded-lg shadow-lg max-w-sm w-full" style={{ backgroundColor: 'var(--card-background)' }}>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: 'var(--text-color)' }}>
              Reset Password
            </h3>
            {resetMessage && (
              <p className="text-center mb-4" style={{ color: 'var(--text-color)' }}>
                {resetMessage}
              </p>
            )}
            {resetError && (
              <p className="text-center mb-4" style={{ color: 'var(--error-text)' }}>
                {resetError}
              </p>
            )}
            <div className="mb-4">
              <label className="block mb-2" style={{ color: 'var(--text-color)' }}>
                Email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-3 rounded-lg border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={handleForgotPassword}
                className="py-2 px-4 rounded-lg font-semibold"
                style={{
                  backgroundColor: 'var(--button-bg)',
                  color: 'var(--button-text)',
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Send Reset Email
              </motion.button>
              <motion.button
                onClick={() => setShowForgotPassword(false)}
                className="py-2 px-4 rounded-lg font-semibold"
                style={{
                  backgroundColor: 'var(--button-bg)',
                  color: 'var(--button-text)',
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SignIn;