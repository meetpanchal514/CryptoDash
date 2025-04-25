


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NavbarComponent from './components/NavbarComponent';
import Footer from './components/Footer';
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
        {/* Add padding-top for navbar (h-16) and padding-bottom for footer (py-3) */}
        <main className="flex-grow pt-16 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

