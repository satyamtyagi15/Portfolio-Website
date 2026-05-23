import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import styles from './App.module.css';

function App() {
  useEffect(() => {
    // Mouse follow glow effect
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);
    const moveGlow = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', moveGlow);
    return () => {
      window.removeEventListener('mousemove', moveGlow);
      if (glow) glow.remove();
    };
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        {/* Aurora Background */}
        <div className="aurora-bg">
          <div className="aurora-blob blob1"></div>
          <div className="aurora-blob blob2"></div>
          <div className="aurora-blob blob3"></div>
          <div className="lightning"></div>
          <div className="city-overlay"></div>
        </div>
        {/* Grid Overlay */}
        <div className="grid-overlay"></div>
        {/* 50 Floating Particles */}
        <div className="floating-particles">
          {[...Array(50)].map((_, i) => <div key={i} className="particle"></div>)}
        </div>
        
        <Navbar />
        <main className={styles.mainContent}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/achievements" element={<Achievements />} />
            </Routes>
          </AnimatePresence>
          <div className="wave-divider"></div>
        </main>
      </div>
    </Router>
  );
}

export default App;