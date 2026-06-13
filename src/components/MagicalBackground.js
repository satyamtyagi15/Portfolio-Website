import React, { useState } from 'react';
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

      <button 
        id="sound-btn" 
        onClick={toggleSound}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 9999,
          fontFamily: "'Share Tech Mono', 'Orbitron', monospace",
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: isMuted ? '#FFD700' : '#FF3333',
          cursor: 'pointer',
          background: 'rgba(0, 0, 0, 0.6)',
          border: isMuted ? '2px solid rgba(255, 215, 0, 0.4)' : '2px solid rgba(255, 51, 51, 0.4)',
          textShadow: isMuted ? '0 0 10px rgba(255,215,0,0.5)' : '0 0 10px rgba(255,51,51,0.5)',
          textTransform: 'uppercase',
          padding: '12px 24px',
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
          boxShadow: isMuted ? '0 0 15px rgba(255,215,0,0.2)' : '0 0 15px rgba(255,51,51,0.2)'
        }}
      >
        {isMuted ? '▶ UNMUTE DEATH NOTE' : '▐▐ MUTE DEATH NOTE'}
      </button>
    </>
  );
};

export default CursedBackground;
