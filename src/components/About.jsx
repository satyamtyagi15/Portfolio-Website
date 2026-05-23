import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <motion.div className={styles.about} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <div className={styles.imageFrame}>
            <img src="/assets/profile.jpg" alt="Satyam Tyagi" className={styles.profileImg} />
            <div className={styles.neonRing}></div>
          </div>
          <div className={styles.bioText}>
            <h2 className={styles.sectionTitle}>Builder. Hacker. Storyteller.</h2>
            <p><strong>Satyam Tyagi (He/Him)</strong> – Full‑Stack Engineer based in Noida, India. DSA Enthusiast | Tech Entrepreneur | MERN Stack Developer | Deep tech Hackathon RunnerUp</p>
            <p>📧 satyamtyagiji15@gmail.com &nbsp;|&nbsp; 📞 +91 8287063229</p>
            <div className={styles.socialMiniAbout}>
              <a href="https://github.com/satyamtyagi15" target="_blank">GitHub</a>
              <a href="https://www.linkedin.com/in/satyam-tyagi1s/" target="_blank">LinkedIn</a>
              <a href="https://www.youtube.com/@astroknight.15" target="_blank">YouTube</a>
            </div>
          </div>
        </div>

        {/* Experience Section */}
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

        {/* New: Education Timeline */}
        <div className={styles.sectionCard}>
          <h3>🎓 Education & Learning</h3>
          <div className={styles.expItem}>
            <strong>Bachelor of Technology (CLG-ABESIT,CSE-AI)</strong> <span>2022 – 2025</span>
            <p>Specialized in web technologies, data structures, and algorithms. Participated in multiple hackathons and tech fests.</p>
          </div>
          <div className={styles.expItem}>
            <strong>Continuous Learning</strong> <span>Always</span>
            <p>Completed 20+ certifications in MERN, AI/ML, Blockchain, DevOps, and Product Management from platforms like Udemy, Infosys Springboard, Cisco, and Intel.</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          <div className={styles.card}><h3>🎨 Frontend</h3><div className={styles.skillList}>React, Next.js, TypeScript, JavaScript, TailwindCSS, HTML5, CSS3, Framer Motion, Redux</div></div>
          <div className={styles.card}><h3>⚙️ Backend</h3><div className={styles.skillList}>Node.js, Express, Go, REST APIs, GraphQL, JWT/OAuth, WebSockets, Microservices</div></div>
          <div className={styles.card}><h3>🗄️ Database</h3><div className={styles.skillList}>MongoDB, PostgreSQL, MySQL, Redis, Firebase</div></div>
          <div className={styles.card}><h3>💻 Languages</h3><div className={styles.skillList}>JavaScript, TypeScript, Python, Java, C, C++, Go, Solidity</div></div>
          <div className={styles.card}><h3>🤖 AI / ML</h3><div className={styles.skillList}>LLM Apps, RAG, Prompt Engineering, OpenAI APIs, scikit-learn, TensorFlow basics</div></div>
          <div className={styles.card}><h3>⛓️ Web3 / Blockchain</h3><div className={styles.skillList}>Solidity, ethers.js, Hardhat, Smart Contract Security, dApps</div></div>
          <div className={styles.card}><h3>🛠️ DevOps & Tools</h3><div className={styles.skillList}>Git, GitHub Actions, Docker, Vercel, Postman, Linux</div></div>
          <div className={styles.card}><h3>🎬 Creative Skills</h3><div className={styles.skillList}>Video Editing, Live Streaming, OBS, Premiere Pro, Thumbnail Design</div></div>
        </div>

        {/* Hobbies & Interests + Fun Facts + Philosophy */}
        <div className={styles.extraGrid}>
          <div className={styles.sectionCard}>
            <h3>🎯 Hobbies & Interests</h3>
            <ul className={styles.list}>
              <li>⚡ Competitive Coding (LeetCode, CodeChef)</li>
              <li>🎮 Live Gaming & Streaming</li>
              <li>🎬 Video Editing & Content Creation</li>
              <li>📖 Reading Tech Blogs & Sci‑Fi</li>
              <li>🧠 Exploring AI & Emerging Tech</li>
            </ul>
          </div>
          <div className={styles.sectionCard}>
            <h3>✨ Fun Facts</h3>
            <ul className={styles.list}>
              <li>🔥 I once coded for 36 hours straight during a hackathon – and won!</li>
              <li>🎨 I design my own thumbnails and stream overlays.</li>
              <li>🚀 My first line of code was a “Hello World” in C++ at age 15.</li>
              <li>🎧 I listen to synthwave while coding.</li>
            </ul>
          </div>
          <div className={styles.sectionCard}>
            <h3>💭 My Philosophy</h3>
            <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>“Code is not just logic – it’s art. Every pixel, every API call, every smart contract tells a story. I build with passion, ship with pride, and never stop learning.”</p>
            <p style={{ marginTop: '0.5rem' }}>— Satyam Tyagi</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;