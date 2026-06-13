import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import MagicalBackground from './components/MagicalBackground';
import styles from './App.module.css';

function App() {
  useEffect(() => {
    // Scroll Reveal Observer
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("visible");
            }, i * 70);
          }
        });
      },
      { threshold: 0.08 }
    );
    
    // Select all elements with reveal class and observe
    setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    }, 500); // slight delay to allow router render

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
      obs.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        {/* The Cursed Video Background replaces MagicalBackground */}
        <MagicalBackground />
        {/* Grid Overlay for subtle texture */}
        <div className="grid-overlay"></div>
        
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