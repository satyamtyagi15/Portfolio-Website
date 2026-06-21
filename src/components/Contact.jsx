import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import styles from './Contact.module.css';

const Contact = () => {
  const containerRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/satyamtyagiji15@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (result.success === "true") {
        setSubmitMessage('Signal transmitted successfully!');
        e.target.reset();
      } else {
        setSubmitMessage('Transmission failed. Try again.');
      }
    } catch (error) {
      setSubmitMessage('Network error. Check connection.');
    }

    setIsSubmitting(false);
  };

  // 3D Particle Sphere Setup
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create Dense Particle Sphere
    const particleCount = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0x915EFF); // Violet
    const color2 = new THREE.Color(0x00f0ff); // Cyan

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Math for a sphere
      const r = 3;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i] = x;
      positions[i+1] = y;
      positions[i+2] = z;

      // Mix colors
      const mixedColor = Math.random() > 0.5 ? color1 : color2;
      colors[i] = mixedColor.r;
      colors[i+1] = mixedColor.g;
      colors[i+2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    // Add surrounding rings
    const ringGeo = new THREE.RingGeometry(3.5, 3.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x915EFF, side: THREE.DoubleSide, transparent: true, opacity: 0.4, wireframe: true });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4, wireframe: true }));
    ring2.rotation.y = Math.PI / 2;
    scene.add(ring2);

    camera.position.z = 7;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event) => {
      // Normalize mouse coordinates
      mouseX = (event.clientX - window.innerWidth / 2) * 0.002;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.002;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate sphere
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      
      // Fast rotating rings
      ring1.rotation.y += 0.01;
      ring1.rotation.z += 0.005;
      
      ring2.rotation.x -= 0.01;
      ring2.rotation.z -= 0.005;

      // Fluid mouse tracking
      targetX = mouseX * 2;
      targetY = mouseY * 2;
      sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
      sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);

      // Parallax effect on camera
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (containerRef.current) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
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
    hidden: { opacity: 0, x: -100, scale: 0.8, rotateY: 30, filter: "blur(15px)" },
    show: { opacity: 1, x: 0, scale: 1, rotateY: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 14, mass: 1 } }
  };

  const contactData = [
    { id: 'email', label: 'SYS.EMAIL', value: 'satyamtyagiji15@gmail.com', icon: 'M', link: 'mailto:satyamtyagiji15@gmail.com' },
    { id: 'phone', label: 'SYS.COMMS', value: '+91 82870 63229', icon: 'P', link: 'tel:+918287063229' },
    { id: 'github', label: 'NET.GIT', value: 'github.com/satyamtyagi15', icon: 'G', link: 'https://github.com/satyamtyagi15' },
    { id: 'linkedin', label: 'NET.LINK', value: 'linkedin.com/in/satyam-tyagi1s', icon: 'L', link: 'https://www.linkedin.com/in/satyam-tyagi1s/' },
    { id: 'youtube', label: 'NET.TUBE', value: 'youtube.com/@astroknight.15', icon: 'Y', link: 'https://www.youtube.com/@astroknight.15' }
  ];

  return (
    <motion.div 
      className={styles.contactContainer}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ perspective: 1000 }}
    >
      <div className={styles.splitLayout}>
        
        {/* Left Side: Holographic Terminal */}
        <div className={styles.terminalSide}>
          <motion.div variants={itemVariants} className={styles.terminalHeader}>
            <div className={styles.statusDot}></div>
            <p>TERMINAL_ONLINE // CONNECTION_SECURE</p>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className={styles.title}>
            Initiate Contact.
          </motion.h1>
          <motion.p variants={itemVariants} className={styles.subtitle}>
            Transmit a signal. Whether it's a project, a hackathon, or just discussing Web Development, AI, and MERN stack.
          </motion.p>

          <div className={styles.dataRows}>
            {contactData.map((data) => (
              <motion.a 
                key={data.id} 
                href={data.link} 
                target={data.id === 'email' || data.id === 'phone' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                variants={itemVariants} 
                className={styles.dataRow}
              >
                <div className={styles.rowIcon}>{data.icon}</div>
                <div className={styles.rowContent}>
                  <span className={styles.rowLabel}>{data.label}</span>
                  <span className={styles.rowValue}>{data.value}</span>
                </div>
                <div className={styles.rowAction}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: 3D Particle Sphere & YouTube Widget */}
        <div className={styles.visualSide}>
          <div ref={containerRef} className={styles.canvasContainer}></div>

          {/* Modern Contact Form */}
          <motion.div 
            className={styles.contactFormContainer}
            variants={itemVariants}
          >
            <div className={styles.formHeader}>
              <span className={styles.pulseDot}></span>
              <h3>Send a Message</h3>
            </div>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input type="text" name="name" required placeholder=" " className={styles.inputField} />
                <label className={styles.inputLabel}>Name // ID</label>
                <div className={styles.inputLine}></div>
              </div>
              <div className={styles.inputGroup}>
                <input type="email" name="email" required placeholder=" " className={styles.inputField} />
                <label className={styles.inputLabel}>Email // COMM</label>
                <div className={styles.inputLine}></div>
              </div>
              <div className={styles.inputGroup}>
                <textarea name="message" required placeholder=" " rows="4" className={styles.textareaField}></textarea>
                <label className={styles.inputLabel}>Message // DATA</label>
                <div className={styles.inputLine}></div>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                <span>{isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT'}</span>
                {!isSubmitting && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                )}
              </button>
              {submitMessage && (
                <p className={styles.submitMessage} style={{ color: submitMessage.includes('success') ? '#4dffb8' : '#ff2b5e', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem', fontFamily: "'JetBrains Mono', monospace" }}>
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;