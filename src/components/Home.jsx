import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Typewriter from 'typewriter-effect';
import { Tilt } from 'react-tilt';
import styles from './Home.module.css';

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 6);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(350, 350);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Lights for Physical Materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xb026ff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0x00f0ff, 3, 10);
    pointLight.position.set(-2, -2, 2);
    scene.add(pointLight);

    // 1. Crystal Core (MeshPhysicalMaterial)
    const coreGeo = new THREE.IcosahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transmission: 0.9,
      opacity: 1,
      metalness: 0.1,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // 2. Outer Wireframe Shell
    const shellGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.6 });
    const shell = new THREE.LineSegments(shellEdges, shellMat);
    scene.add(shell);

    // 3. Floating Rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x4dffb8 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 2;
    scene.add(ring2);

    // 4. Particle Field
    const particleCount = 800;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.03, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);
    
    // Add mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      
      core.rotation.y = time * 1.5;
      core.rotation.x = time * 0.8;
      
      shell.rotation.y = -time * 1.2;
      shell.rotation.z = time * 0.5;
      
      ring1.rotation.y = time * 0.5;
      ring1.rotation.z = time * 0.8;
      
      ring2.rotation.x = -time * 0.4;
      ring2.rotation.z = time * 0.6;
      
      particles.rotation.y = time * 0.2;
      particles.rotation.x = time * 0.1;

      // Mouse Parallax Effect
      scene.rotation.y += 0.05 * (mouseX - scene.rotation.y);
      scene.rotation.x += 0.05 * (mouseY - scene.rotation.x);

      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      renderer.dispose();
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    },
    exit: { opacity: 0, scale: 0.9, filter: "blur(15px)", transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8, rotateX: 25, filter: "blur(15px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 } 
    }
  };

  return (
    <motion.div 
      className={styles.home}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ perspective: 1000 }}
    >
      <div className={styles.hero}>
        <div className={styles.glowingOrb}></div>
        
        <div className={styles.heroContent}>
          <motion.div className={styles.textSection} variants={itemVariants}>
            <h1 className={`${styles.name} glitch`}>Satyam <span className={styles.highlight}>Tyagi</span></h1>
            <div className={styles.taglineWrapper}>
              <div className={styles.typedText}>
                <Typewriter
                  options={{
                    strings: [
                      'DSA Enthusiast',
                      'MERN Stack Dev',
                      'AI/ML Explorer',
                      'Hackathon RunnerUp',
                      'Full-Stack Developer'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>
              <div className={styles.waveUnderline}></div>
            </div>
            <p className={styles.bio}>
              "I build production-grade web platforms end-to-end — from sleek React frontends to scalable Node and Go backends, with AI and on-chain layers woven through. Hackathon winner. Content creator. Always shipping."
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com/satyamtyagi15" target="_blank" className="neon-btn">GitHub</a>
              <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank" className="neon-btn">LinkedIn</a>
              <a href="https://www.youtube.com/@astroknight.15" target="_blank" className="neon-btn">YouTube</a>
              <a href="/Satyam-Tyagi-Resume.pdf" target="_blank" download className="neon-btn" style={{ borderColor: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}>📄 Resume</a>
            </div>
            <div className={styles.stats}>
              <div className={styles.statItem}><span className={styles.statNumber}>9+</span><span className={styles.statLabel}>Shipped Projects</span></div>
              <div className={styles.statItem}><span className={styles.statNumber}>2x</span><span className={styles.statLabel}>Hackathons Won</span></div>
              <div className={styles.statItem}><span className={styles.statNumber}>10+</span><span className={styles.statLabel}>Stacks Mastered</span></div>
            </div>
            <div className={styles.openToWork}>
              <span className={styles.otwBadge}>🔓 OPEN TO WORK</span> – Full‑time / Intern / Contract (Remote/Hybrid)
            </div>
          </motion.div>
          
          <motion.div className={styles.visualSection} variants={itemVariants}>
            <div className={styles.profileImageContainer}>
              <img src="/assets/profile.jpg" alt="Satyam Tyagi" className={styles.profilePic} />
              <div className={styles.profileGlow}></div>
            </div>
            <div ref={containerRef} className={styles.cubeContainer}></div>
          </motion.div>
        </div>

        {/* New: What I Do Section */}
        <motion.div className={styles.services} variants={itemVariants}>
          <h3 className={styles.sectionTitle2}>⚡ What I Do</h3>
          <div className={styles.serviceGrid}>
            <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🌐</div>
                <h4>Full‑Stack Development</h4>
                <p>End‑to‑end web apps with MERN, Next.js, Go, PostgreSQL, Redis.</p>
              </div>
            </Tilt>
            <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🤖</div>
                <h4>AI & LLM Integration</h4>
                <p>RAG pipelines, OpenAI APIs, prompt engineering, AI‑powered features.</p>
              </div>
            </Tilt>
            <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🌐</div>
                <h4>Modern Web Architectures</h4>
                <p>Scalable APIs, microservices, progressive web apps, secure authentication.</p>
              </div>
            </Tilt>
            <Tilt options={{ max: 25, scale: 1.05, speed: 400 }}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceIcon}>🎮</div>
                <h4>Gaming & Creative</h4>
                <p>Live streaming, video editing, OBS overlays, interactive UI/UX.</p>
              </div>
            </Tilt>
          </div>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div className={styles.techStack} variants={itemVariants}>
          <h3 className={styles.sectionTitle2}>🧰 Tech Stack I Use</h3>
          <div className={styles.techBadges}>
            {["React","Node.js","Express","MongoDB","Next.js","TypeScript","Go","Python","Redis","Tailwind","Docker","GraphQL"].map(tech => (
              <span key={tech} className={styles.techBadge}>{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* Recent Highlights */}
        <motion.div className={styles.highlights} variants={itemVariants}>
          <h3 className={styles.sectionTitle2}>🏅 Recent Highlights</h3>
          <div className={styles.highlightList}>
            <div><span>🏆</span> RunnerUp @ HackIndia AI & DeepTech 2025</div>
            <div><span>🏆</span> RunnerUp @ IDEAVERSE’25</div>
            <div><span>🚀</span> GSSoC 2026 Contributor (AI Agents track)</div>
            <div><span>🎤</span> Hackathon Ambassador @ HackHazards 2026</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div className={styles.cta} variants={itemVariants}>
          <a href="/contact" className="neon-btn" style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}>📩 Let’s Build Something →</a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;