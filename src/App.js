import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import MagicalBackground from './components/MagicalBackground';
import StarsCanvas from './components/StarsCanvas';
import styles from './App.module.css';

function ScrollObserver() {
  const location = useLocation();

  useEffect(() => {
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
    
    setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    }, 100); 

    return () => obs.disconnect();
  }, [location.pathname]);

  return null;
}

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/achievements" element={<Achievements />} />
      </Routes>
    </AnimatePresence>
  );
};

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.neon-btn')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "#b026ff" : "#00f0ff",
          backgroundColor: isHovering ? "rgba(176, 38, 255, 0.1)" : "transparent"
        }}
        transition={{ type: "spring", mass: 0.1, stiffness: 150, damping: 15 }}
      />
      <motion.div
        className="mouse-glow"
        animate={{ x: mousePos.x - 150, y: mousePos.y - 150 }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollObserver />
      <CustomCursor />
      <div className={styles.app}>
        <StarsCanvas />
        <MagicalBackground />
        {/* Grid Overlay for subtle texture */}
        <div className="grid-overlay"></div>
        
        <Navbar />
        <main className={styles.mainContent}>
          <AnimatedRoutes />
          <div className="wave-divider"></div>
        </main>
      </div>
    </Router>
  );
}

export default App;