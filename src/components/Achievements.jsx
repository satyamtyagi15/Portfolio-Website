import React from 'react';
import { motion } from 'framer-motion';
import styles from './Achievements.module.css';

const Achievements = () => {
  return (
    <motion.div className={styles.achievements} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2>Trophies, badges & receipts.</h2>
      <p className={styles.subheading}>Recognition from hackathons, certifications I've earned along the way, and a few numbers that mark the journey so far.</p>

      <div className={styles.statsRow}>
        <div className={styles.statBlock}><span>9+</span><br/>Production Projects</div>
        <div className={styles.statBlock}><span>2</span><br/>Hackathons Won</div>
        <div className={styles.statBlock}><span>10+</span><br/>Languages / Stacks</div>
        <div className={styles.statBlock}><span>1</span><br/>YouTube Channel</div>
      </div>

      <h3 className={styles.sectionHeader}>🏆 Hackathon Wins & Roles</h3>
      <div className={styles.grid}>
        <div className={styles.achCard}>
          <h3>HackIndia AI & DeepTech — RunnerUp</h3>
          <p className={styles.org}>HackIndia · 2025</p>
          <p>Deep tech hackathon focusing on AI & Web3. Built and pitched a full‑stack AI product, beating dozens of teams.</p>
          <span className={styles.tag}>RunnerUp</span>
        </div>
        <div className={styles.achCard}>
          <h3>IDEAVERSE’25 — RunnerUp</h3>
          <p className={styles.org}>Ideaverse · 2025</p>
          <p>Top‑ranked for innovation, execution and product polish. Shipped a working prototype with deployed demo.</p>
          <span className={styles.tag}>RunnerUp</span>
        </div>
        <div className={styles.achCard}>
          <h3>Hackathon Ambassador @ HackHazards 2026</h3>
          <p className={styles.org}>NAMESPACE · Present</p>
          <p>Selected as ambassador for one of the largest innovation‑focused hackathons. Responsible for community outreach, networking, and increasing participation.</p>
          <span className={styles.tag}>Ambassador</span>
        </div>
        <div className={styles.achCard}>
          <h3>GSSoC 2026 — Contributor (AI Agents / Open Source)</h3>
          <p className={styles.org}>GirlScript Summer of Code</p>
          <p>Selected as Contributor/Mentee. Participating in AI Agents and Open Source tracks.</p>
          <span className={styles.tag}>Open Source</span>
        </div>
      </div>

      <h3 className={styles.sectionHeader}>📜 Certifications & Licenses</h3>
      <div className={styles.certsGrid}>
        <div className={styles.certCard}>AI FOR ALL – Intel & CBSE (AI Aware) · 2025</div>
        <div className={styles.certCard}>React Hooks Crash Course – GreatStack</div>
        <div className={styles.certCard}>JavaScript Fundamentals – GreatStack</div>
        <div className={styles.certCard}>Python Essentials 1 – Cisco · Apr 2026</div>
        <div className={styles.certCard}>The Complete Power BI Practical Course 2026 – Udemy</div>
        <div className={styles.certCard}>Advanced Product Management – Udemy</div>
        <div className={styles.certCard}>Start a Business: Design Thinking – Udemy</div>
        <div className={styles.certCard}>Startup Growth Strategies – Udemy</div>
        <div className={styles.certCard}>Business Model Canvas Masterclass – Udemy</div>
        <div className={styles.certCard}>Entrepreneurship Course – Infosys Springboard</div>
        <div className={styles.certCard}>Network Fundamentals – Infosys Springboard</div>
        <div className={styles.certCard}>Database Management System Part‑1 – Infosys Springboard</div>
        <div className={styles.certCard}>Power BI Practical Course 2026 – Udemy</div>
        <div className={styles.certCard}>Data Structures & Algorithms (C++/Java) – Self-Paced</div>
        <div className={styles.certCard}>Go for Backend Engineering – Self-Paced</div>
      </div>

      <h3 className={styles.sectionHeader}>🏅 Badges & Recognition</h3>
      <div className={styles.badgeGrid}>
        <div className={styles.badgeItem}>
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="4 2"/>
            <text x="50" y="45" textAnchor="middle" fill="#4dffb8" fontSize="10" fontFamily="Orbitron">GSSoC</text>
            <text x="50" y="65" textAnchor="middle" fill="#b026ff" fontSize="8" fontFamily="Orbitron">2026</text>
          </svg>
          <span>Contributor</span>
        </div>
        <div className={styles.badgeItem}>
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#00f0ff" strokeWidth="2"/>
            <text x="50" y="45" textAnchor="middle" fill="#4dffb8" fontSize="9" fontFamily="Orbitron">AI Aware</text>
            <text x="50" y="65" textAnchor="middle" fill="#b026ff" fontSize="8" fontFamily="Orbitron">Intel</text>
          </svg>
          <span>Intel AI For All</span>
        </div>
        <div className={styles.badgeItem}>
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,15 75,35 75,65 50,85 25,65 25,35" fill="none" stroke="#b026ff" strokeWidth="2"/>
            <text x="50" y="55" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="Orbitron">Ambassador</text>
          </svg>
          <span>HackHazards '26</span>
        </div>
        <div className={styles.badgeItem}>
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="#4dffb8" strokeWidth="2"/>
            <text x="50" y="55" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="Orbitron">Python</text>
          </svg>
          <span>Cisco Certified</span>
        </div>
        <div className={styles.badgeItem}>
          <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="25" width="70" height="50" rx="5" fill="none" stroke="#2c6bff" strokeWidth="2"/>
            <text x="50" y="55" textAnchor="middle" fill="#4dffb8" fontSize="8" fontFamily="Orbitron">Infosys</text>
          </svg>
          <span>Springboard</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;