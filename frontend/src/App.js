import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import './apstyles.css';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative min-h-screen flex flex-col">
        <NavbarComponent />
        <main className="flex-grow pt-16 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;