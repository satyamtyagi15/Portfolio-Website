import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import * as THREE from 'three';
import styles from './About.module.css';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(250, 250);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    const group = new THREE.Group();

    // 1. Inner Tech Core
    const coreGeo = new THREE.TetrahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x4dffb8, wireframe: true, transparent: true, opacity: 0.3 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // 2. Orbital Nodes (Points)
    const nodesGeo = new THREE.IcosahedronGeometry(2, 1);
    const nodesMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.08, transparent: true, opacity: 0.8 });
    const nodes = new THREE.Points(nodesGeo, nodesMat);
    group.add(nodes);

    // 3. Neural Connections (Lines)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.25 });
    const lineGeo = new THREE.EdgesGeometry(nodesGeo);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    scene.add(group);
    
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;
      
      group.rotation.x = time * 0.8;
      group.rotation.y = time * 1.2;
      
      core.rotation.z = -time * 2;
      core.scale.setScalar(1 + Math.sin(time * 5) * 0.05);
      
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
      transition: { staggerChildren: 0.25, delayChildren: 0.3 }
    },
    exit: { opacity: 0, scale: 0.9, filter: "blur(15px)", transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -80, scale: 0.8, rotateY: 25, filter: "blur(15px)" },
    show: { opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 } }
  };

  return (
    <motion.div 
      className={styles.about} 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ perspective: 1000 }}
    >
      <div className={styles.container} style={{ position: 'relative' }}>
        <div ref={containerRef} style={{ position: 'absolute', top: '10px', right: '20px', pointerEvents: 'none', zIndex: 0, opacity: 0.8 }}></div>
        <motion.div className={styles.profileSection} variants={itemVariants}>
          <div className={styles.imageFrame} style={{ position: 'relative' }}>
            <img src="/assets/profile.jpg" alt="Satyam Tyagi" className={styles.profileImg} />
            <div className={styles.neonRing}></div>
          </div>
          <div className={styles.bioText}>
            <h2 className={styles.sectionTitle}>Builder. Hacker. Storyteller.</h2>
            <p><strong>Satyam Tyagi (He/Him)</strong> – Full‑Stack Engineer based in Noida, India. DSA Enthusiast | Tech Entrepreneur | MERN Stack Developer | Deep tech Hackathon RunnerUp</p>
            <p>📧 satyamtyagiji15@gmail.com &nbsp;|&nbsp; 📞 +91 8287063229</p>
            <div className={styles.socialMiniAbout}>
              <a href="https://github.com/satyamtyagi15" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://www.youtube.com/@astroknight.15" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={itemVariants}>
          <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
            <div className={styles.sectionCard}>
              <h3>💼 Work Experience</h3>
              <div className={styles.expItem}>
                <strong>Web Development Intern</strong> @ Oasis Infobyte <span>May 2026 – Present</span>
                <p>Built interactive React.js components, managed state with hooks, implemented responsive layouts (Flexbox/Grid), used Git, debugged cross-browser issues, delivered all projects on time.</p>
              </div>
              <div className={styles.expItem}>
                <strong>Intern Full‑Stack Developer</strong> @ ThiraneX <span>May 2026 – Present</span>
                <p>Full‑stack development under industry mentorship, improving problem‑solving and collaboration skills.</p>
              </div>
              <div className={styles.expItem}>
                <strong>MERN Stack Developer</strong> @ Codec Technologies India <span>Jun 2025 – Jul 2025</span>
                <p>Delivered full‑stack projects using MongoDB, Express, React, Node.js. Collaborated in Agile environment, implemented REST APIs, received recognition and scholarship eligibility.</p>
              </div>
              <div className={styles.expItem}>
                <strong>Hackathon Ambassador</strong> @ NAMESPACE (HackHazards 2026) <span>May 2026 – Present</span>
                <p>Community outreach, event promotion, networking, increasing participation in innovation‑focused hackathons.</p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* New: Education Timeline */}
        <motion.div variants={itemVariants}>
          <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
            <div className={styles.sectionCard}>
              <h3>🎓 Education & Learning</h3>
              <div className={styles.expItem}>
                <strong>Bachelor of Technology (CLG-ABESIT,CSE-AI)</strong> <span>2022 – 2025</span>
                <p>Specialized in web technologies, data structures, and algorithms. Participated in multiple hackathons and tech fests.</p>
              </div>
              <div className={styles.expItem}>
                <strong>Continuous Learning</strong> <span>Always</span>
                <p>Completed 20+ certifications in MERN, AI/ML, Cloud Computing, DevOps, and Product Management from platforms like Udemy, Infosys Springboard, Cisco, and Intel.</p>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Skills Grid */}
        <motion.div className={styles.skillsGrid} variants={itemVariants}>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🎨 Frontend</h3><div className={styles.skillList}>React, Next.js, TypeScript, JavaScript, TailwindCSS, HTML5, CSS3, Framer Motion, Redux</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>⚙️ Backend</h3><div className={styles.skillList}>Node.js, Express, Go, REST APIs, GraphQL, JWT/OAuth, WebSockets, Microservices</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🗄️ Database</h3><div className={styles.skillList}>MongoDB, PostgreSQL, MySQL, Redis, Firebase</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>💻 Languages</h3><div className={styles.skillList}>JavaScript, TypeScript, Python, Java, C, C++, Go, PHP</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🤖 AI / ML</h3><div className={styles.skillList}>LLM Apps, RAG, Prompt Engineering, OpenAI APIs, scikit-learn, TensorFlow basics</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🌐 Web Technologies</h3><div className={styles.skillList}>WebRTC, Socket.io, OAuth, JWT, PWA, RESTful API design</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🛠️ DevOps & Tools</h3><div className={styles.skillList}>Git, GitHub Actions, Docker, Vercel, Postman, Linux</div></div></Tilt>
          <Tilt options={{ max: 25, scale: 1.05 }}><div className={styles.card}><h3>🎬 Creative Skills</h3><div className={styles.skillList}>Video Editing, Live Streaming, OBS, Premiere Pro, Thumbnail Design</div></div></Tilt>
        </motion.div>

        {/* Hobbies & Interests + Fun Facts + Philosophy */}
        <motion.div className={styles.extraGrid} variants={itemVariants}>
          <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
            <div className={styles.sectionCard} style={{ height: '100%' }}>
              <h3>🎯 Hobbies & Interests</h3>
              <ul className={styles.list}>
                <li>⚡ Competitive Coding (LeetCode, CodeChef)</li>
                <li>🎮 Live Gaming & Streaming</li>
                <li>🎬 Video Editing & Content Creation</li>
                <li>📖 Reading Tech Blogs & Sci‑Fi</li>
                <li>🧠 Exploring AI & Emerging Tech</li>
              </ul>
            </div>
          </Tilt>
          <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
            <div className={styles.sectionCard} style={{ height: '100%' }}>
              <h3>✨ Fun Facts</h3>
              <ul className={styles.list}>
                <li>🔥 I once coded for 36 hours straight during a hackathon – and won!</li>
                <li>🎨 I design my own thumbnails and stream overlays.</li>
                <li>🚀 My first line of code was a “Hello World” in C++ at age 15.</li>
                <li>🎧 I listen to synthwave while coding.</li>
              </ul>
            </div>
          </Tilt>
          <Tilt options={{ max: 15, scale: 1.02, speed: 400 }}>
            <div className={styles.sectionCard} style={{ height: '100%' }}>
              <h3>💭 My Philosophy</h3>
              <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>“Code is not just logic – it’s art. Every pixel, every API call, every smart contract tells a story. I build with passion, ship with pride, and never stop learning.”</p>
              <p style={{ marginTop: '0.5rem' }}>— Satyam Tyagi</p>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;