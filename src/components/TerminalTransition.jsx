import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const TerminalTransition = ({ children }) => {
  const [booting, setBooting] = useState(false);
  const [text, setText] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Start boot sequence on route change
    setBooting(true);
    setText("");
    
    const pathName = location.pathname === '/' ? '/ROOT' : location.pathname.toUpperCase();
    
    const lines = [
      `[SYS] ESTABLISHING CONNECTION TO ${pathName}...`,
      `[SEC] BYPASSING PROTOCOL FIREWALL... GRANTED.`,
      `[DATA] DECRYPTING NEURAL ASSETS...`,
      `[UI] INITIALIZING HOLOGRAPHIC INTERFACE...`
    ];
    
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setText(prev => prev + lines[currentLine] + "\n");
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 250);
      }
    }, 150); // Fast typing speed
    
    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {booting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)", transition: { duration: 0.4, ease: "easeInOut" } }}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              backgroundColor: '#050816',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{
              width: '80%',
              maxWidth: '800px',
              fontFamily: '"JetBrains Mono", "Orbitron", monospace',
              color: '#4dffb8',
              textShadow: '0 0 10px rgba(77,255,184,0.6)',
              fontSize: '1.2rem',
              lineHeight: '2',
              whiteSpace: 'pre-wrap',
              textAlign: 'left'
            }}>
              {text}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                █
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
    </>
  );
};

export default TerminalTransition;
