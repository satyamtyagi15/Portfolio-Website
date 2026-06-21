import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './Achievements.module.css';

const Achievements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    const geometry = new THREE.TetrahedronGeometry(1.5, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0xffd700, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, material);
    scene.add(wireframe);

    const innerGeo = new THREE.TetrahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.2 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);
    
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      wireframe.rotation.y = time;
      wireframe.rotation.z = time * 0.5;
      innerMesh.rotation.y = time;
      innerMesh.rotation.z = time * 0.5;
      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      renderer.dispose();
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.3 }
    },
    exit: { opacity: 0, scale: 0.9, filter: "blur(15px)", transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8, rotateZ: -10, filter: "blur(15px)" },
    show: { opacity: 1, y: 0, scale: 1, rotateZ: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 14, mass: 1 } }
  };

  return (
    <motion.div 
      className={styles.achievements} 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ perspective: 1000 }}
    >
      <div style={{ position: 'relative' }}>
        <motion.h2 variants={itemVariants}>Trophies, badges & receipts.</motion.h2>
        <div ref={containerRef} style={{ position: 'absolute', top: '-60px', right: '0px', pointerEvents: 'none', opacity: 0.8 }}></div>
      </div>
      <motion.p className={styles.subheading} variants={itemVariants}>Recognition from hackathons, certifications I've earned along the way, and a few numbers that mark the journey so far.</motion.p>

      <motion.div className={styles.statsRow} variants={itemVariants}>
        <div className={styles.statBlock}><span>9+</span><br/>Production Projects</div>
        <div className={styles.statBlock}><span>2x</span><br/>Hackathons Won</div>
        <div className={styles.statBlock}><span>10+</span><br/>Languages / Stacks</div>
        <div className={styles.statBlock}><span>1</span><br/>YouTube Channel</div>
      </motion.div>

      <motion.h3 className={styles.sectionHeader} variants={itemVariants}>🏆 Hackathon Wins & Roles</motion.h3>
      <motion.div className={styles.grid} variants={itemVariants}>
        <div className={styles.achCard}>
          <h3>HackIndia AI & DeepTech — RunnerUp</h3>
          <p className={styles.org}>HackIndia · 2025</p>
          <p>Deep tech hackathon focusing on AI & Modern Web. Built and pitched a full‑stack AI product, beating dozens of teams.</p>
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
      </motion.div>

      <motion.h3 className={styles.sectionHeader} variants={itemVariants}>📜 Certifications & Licenses</motion.h3>
      <motion.div className={styles.certsGrid} variants={itemVariants}>
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
      </motion.div>

      <motion.h3 className={styles.sectionHeader} variants={itemVariants}>🏅 Badges & Recognition</motion.h3>
      <motion.div className={styles.badgeGrid} variants={itemVariants}>
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
      </motion.div>
    </motion.div>
  );
};

export default Achievements;