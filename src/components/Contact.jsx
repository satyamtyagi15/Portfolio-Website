import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div className={styles.contact} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={styles.container}>
        <h2>Let's build something.</h2>
        <p>Got a project, a hackathon team, a collab, or just want to nerd out about AI / Web3 / Go? Reach out directly – I read every message.</p>
        
        <div className={styles.contactMethods}>
          <a href="mailto:satyamtyagiji15@gmail.com" className={styles.contactCard}>
            <div className={styles.icon}>📧</div>
            <div className={styles.details}>
              <h3>Email me</h3>
              <p>satyamtyagiji15@gmail.com</p>
              <span className={styles.action}>Open your email app →</span>
            </div>
          </a>
          
          <a href="tel:+918287063229" className={styles.contactCard}>
            <div className={styles.icon}>📞</div>
            <div className={styles.details}>
              <h3>Call me</h3>
              <p>+91 82870 63229</p>
              <span className={styles.action}>Open dialer →</span>
            </div>
          </a>
        </div>

        <div className={styles.socialRow}>
          <p>Or connect on social media:</p>
          <div className={styles.socialIcons}>
            <a href="https://github.com/satyamtyagi15" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.youtube.com/@astroknight.15" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>

        {/* YouTube Channel Section - with fallback SVG if image missing */}
        <div className={styles.youtubeSection}>
          <div className={styles.youtubeCard}>
            <div className={styles.youtubeImage}>
              {!imgError ? (
                <img 
                  src="/assets/channel.jpg" 
                  alt="AstroKnight Channel" 
                  className={styles.channelImg}
                  onError={() => setImgError(true)}
                />
              ) : (
                // Fallback SVG (neon‑style avatar)
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.channelSvg}>
                  <circle cx="50" cy="50" r="48" stroke="#ff2b5e" strokeWidth="3" fill="#0a0820" />
                  <path d="M65 50L45 62V38L65 50Z" fill="#ff2b5e" />
                  <text x="50" y="82" textAnchor="middle" fill="#00f0ff" fontSize="12" fontFamily="Orbitron" fontWeight="bold">AK</text>
                </svg>
              )}
              <div className={styles.channelBadge}>🎬</div>
            </div>
            <div className={styles.youtubeDetails}>
              <h3>AstroKnight – My YouTube Channel</h3>
              <p>I share coding tutorials, project breakdowns, live gaming streams, and tech insights. Subscribe for weekly content on MERN, AI, Web3, and creative coding.</p>
              <a href="https://www.youtube.com/@astroknight.15" target="_blank" rel="noopener noreferrer" className={styles.youtubeBtn}>
                🚀 Visit Channel →
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;