import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './Home.module.css';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(3, 2, 4);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(320, 320);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // 1. Central neon wireframe cube
    const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const cubeWire = new THREE.LineSegments(edgesGeo, new THREE.LineBasicMaterial({ color: 0x00f0ff }));
    const innerCubeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.1 });
    const innerCube = new THREE.Mesh(cubeGeo, innerCubeMat);
    scene.add(innerCube);
    scene.add(cubeWire);
    
    // 2. Floating sphere with wireframe
    const sphereGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const sphereEdges = new THREE.EdgesGeometry(sphereGeo);
    const sphereWire = new THREE.LineSegments(sphereEdges, new THREE.LineBasicMaterial({ color: 0xb026ff }));
    const sphereInnerMat = new THREE.MeshBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.08 });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereInnerMat);
    sphereWire.position.set(1.2, -0.5, 0.8);
    innerSphere.position.set(1.2, -0.5, 0.8);
    scene.add(innerSphere);
    scene.add(sphereWire);
    
    // 3. Torus knot (advanced 3D shape)
    const knotGeo = new THREE.TorusKnotGeometry(0.5, 0.12, 100, 16, 3, 4);
    const knotEdges = new THREE.EdgesGeometry(knotGeo);
    const knotWire = new THREE.LineSegments(knotEdges, new THREE.LineBasicMaterial({ color: 0x4dffb8 }));
    const knotMat = new THREE.MeshBasicMaterial({ color: 0x4dffb8, transparent: true, opacity: 0.1 });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    knotWire.position.set(-1.2, 0.6, -0.5);
    knotMesh.position.set(-1.2, 0.6, -0.5);
    scene.add(knotMesh);
    scene.add(knotWire);
    
    // 4. Additional ring (floating)
    const ringGeo = new THREE.TorusGeometry(0.7, 0.05, 32, 100);
    const ringEdges = new THREE.EdgesGeometry(ringGeo);
    const ringWire = new THREE.LineSegments(ringEdges, new THREE.LineBasicMaterial({ color: 0x2c6bff }));
    ringWire.position.set(0.5, 1.1, -1);
    scene.add(ringWire);
    
    // 5. Floating particles around entire scene (500 particles)
    const particleCount = 500;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i*3] = (Math.random() - 0.5) * 4.5;
      positions[i*3+1] = (Math.random() - 0.5) * 4;
      positions[i*3+2] = (Math.random() - 0.5) * 4.5;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.02 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.008;
      cubeWire.rotation.y = time;
      cubeWire.rotation.x = time * 0.5;
      innerCube.rotation.y = time;
      innerCube.rotation.x = time * 0.5;
      sphereWire.rotation.x = time * 0.7;
      sphereWire.rotation.z = time * 0.3;
      innerSphere.rotation.x = time * 0.7;
      innerSphere.rotation.z = time * 0.3;
      knotWire.rotation.y = time * 0.9;
      knotWire.rotation.x = time * 0.4;
      knotMesh.rotation.y = time * 0.9;
      knotMesh.rotation.x = time * 0.4;
      ringWire.rotation.x = time * 0.5;
      ringWire.rotation.z = time * 0.8;
      particles.rotation.y = time * 0.1;
      particles.rotation.x = time * 0.15;
      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      renderer.dispose();
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <motion.div 
      className={styles.home}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.hero}>
        <div className={styles.glowingOrb}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.textSection}>
            <h1 className={`${styles.name} glitch`}>Satyam <span className={styles.highlight}>Tyagi</span></h1>
            <div className={styles.taglineWrapper}>
              <div className={styles.typedText}>DSA Enthusiast | MERN Stack Dev | AI/ML Explorer | Hackathon RunnerUp</div>
              <div className={styles.waveUnderline}></div>
            </div>
            <p className={styles.bio}>
              "I build production-grade web platforms end-to-end — from sleek React frontends to scalable Node and Go backends, with AI and on-chain layers woven through. Hackathon winner. Content creator. Always shipping."
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/satyamtyagi15" target="_blank" className="neon-btn">GitHub</a>
              <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank" className="neon-btn">LinkedIn</a>
              <a href="https://www.youtube.com/@astroknight.15" target="_blank" className="neon-btn">YouTube</a>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}><span className={styles.statNumber}>9+</span><span className={styles.statLabel}>Shipped Projects</span></div>
              <div className={styles.statItem}><span className={styles.statNumber}>2x</span><span className={styles.statLabel}>Hackathons Won</span></div>
              <div className={styles.statItem}><span className={styles.statNumber}>10+</span><span className={styles.statLabel}>Stacks Mastered</span></div>
            </div>
            <div className={styles.openToWork}>
              <span className={styles.otwBadge}>🔓 OPEN TO WORK</span> – Full‑time / Intern / Contract (Remote/Hybrid)
            </div>
          </div>
          
          <div className={styles.visualSection}>
            <div className={styles.profileImageContainer}>
              <img src="/assets/profile.jpg" alt="Satyam Tyagi" className={styles.profilePic} />
              <div className={styles.profileGlow}></div>
            </div>
            <div ref={containerRef} className={styles.cubeContainer}></div>
          </div>
        </div>

        {/* New: What I Do Section */}
        <div className={`${styles.services} reveal`}>
          <h3 className={styles.sectionTitle2}>⚡ What I Do</h3>
          <div className={styles.serviceGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🌐</div>
              <h4>Full‑Stack Development</h4>
              <p>End‑to‑end web apps with MERN, Next.js, Go, PostgreSQL, Redis.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🤖</div>
              <h4>AI & LLM Integration</h4>
              <p>RAG pipelines, OpenAI APIs, prompt engineering, AI‑powered features.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>⛓️</div>
              <h4>Web3 & Blockchain</h4>
              <p>Smart contracts, dApps, Solidity, ethers.js, Hardhat deployments.</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🎮</div>
              <h4>Gaming & Creative</h4>
              <p>Live streaming, video editing, OBS overlays, interactive UI/UX.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className={`${styles.techStack} reveal`}>
          <h3 className={styles.sectionTitle2}>🧰 Tech Stack I Use</h3>
          <div className={styles.techBadges}>
            {["React","Node.js","Express","MongoDB","Next.js","TypeScript","Go","Python","Solidity","Tailwind","Docker","GraphQL"].map(tech => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Recent Highlights */}
        <div className={`${styles.highlights} reveal`}>
          <h3 className={styles.sectionTitle2}>🏅 Recent Highlights</h3>
          <div className={styles.highlightList}>
            <div><span>🏆</span> RunnerUp @ HackIndia AI & DeepTech 2025</div>
            <div><span>🏆</span> RunnerUp @ IDEAVERSE’25</div>
            <div><span>🚀</span> GSSoC 2026 Contributor (AI Agents track)</div>
            <div><span>🎤</span> Hackathon Ambassador @ HackHazards 2026</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`${styles.cta} reveal`}>
          <a href="/contact" className="neon-btn" style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}>📩 Let’s Build Something →</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;