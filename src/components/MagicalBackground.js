import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CursedTheme.css'; // We will create this

const CursedBackground = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="video-bg">
        <iframe
          className="youtube-bg"
          src={`https://www.youtube.com/embed/ttVoVr2F75k?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=ttVoVr2F75k&playsinline=1`}
          title="Death Note AMV"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>
      <div className="video-overlay"></div>
      <div className="video-tint"></div>
      <div className="scanlines"></div>
      <div className="vignette"></div>

      {/* Floating Draggable Sound Button */}
      <motion.button 
        id="sound-btn" 
        onClick={toggleSound}
        drag
        dragMomentum={false}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '100px', /* Raised higher to avoid mobile dock overlap */
          right: '20px',
          zIndex: 9999,
          fontFamily: "'Share Tech Mono', 'Orbitron', monospace",
          fontSize: '13px',
          fontWeight: 'bold',
          letterSpacing: '1px',
          color: isMuted ? '#FFD700' : '#FF3333',
          cursor: 'grab',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.7)',
          border: isMuted ? '1px solid rgba(255, 215, 0, 0.4)' : '1px solid rgba(255, 51, 51, 0.4)',
          textShadow: isMuted ? '0 0 10px rgba(255,215,0,0.5)' : '0 0 10px rgba(255,51,51,0.5)',
          textTransform: 'uppercase',
          padding: '10px 18px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: isMuted ? '0 0 15px rgba(255,215,0,0.2)' : '0 0 15px rgba(255,51,51,0.2)'
        }}
        title="Drag me anywhere!"
      >
        <span style={{ opacity: 0.5, cursor: 'grab', fontSize: '16px' }}>✥</span>
        {isMuted ? '▶ UNMUTE DEATH NOTE' : '▐▐ MUTE DEATH NOTE'}
      </motion.button>
    </>
  );
};

export default CursedBackground;
