import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';
import styles from './Projects.module.css';

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, -1, 6);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    const group = new THREE.Group();

    // Holographic Base (Projector)
    const baseGeo = new THREE.CylinderGeometry(1.5, 1.8, 0.2, 32);
    const baseMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.1, wireframe: true });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -1.5;
    group.add(base);

    // Light Beam
    const beamGeo = new THREE.ConeGeometry(1.5, 4, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xb026ff, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = 0.5;
    group.add(beam);

    // Floating Rings Object
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(1 - i * 0.2, 0.05, 16, 50);
      const ringMat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0xb026ff : 0x00f0ff, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.userData = { speedX: (Math.random() - 0.5) * 0.02, speedY: (Math.random() - 0.5) * 0.02 };
      ringGroup.add(ring);
    }
    ringGroup.position.y = 0.5;
    group.add(ringGroup);

    scene.add(group);
    
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      group.rotation.y = time * 0.5;
      
      ringGroup.children.forEach(ring => {
        ring.rotation.x += ring.userData.speedX;
        ring.rotation.y += ring.userData.speedY;
      });
      
      // Floating effect
      ringGroup.position.y = 0.5 + Math.sin(time * 2) * 0.2;

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
      transition: { staggerChildren: 0.25, delayChildren: 0.2 }
    },
    exit: { opacity: 0, scale: 0.9, filter: "blur(15px)", transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8, rotateX: 30, filter: "blur(15px)" },
    show: { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 90, damping: 12, mass: 1 } }
  };

  return (
    <motion.div 
      className={styles.projectsContainer} 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{ perspective: 1000 }}
    >
      <motion.div className={styles.header} variants={itemVariants} style={{ position: 'relative' }}>
        <p className={styles.subTitle}>My Work</p>
        <h2 className={styles.pageTitle}>Projects.</h2>
        <div ref={containerRef} style={{ position: 'absolute', top: '-40px', right: '0', pointerEvents: 'none', opacity: 0.7 }}></div>
        <p className={styles.desc}>
          Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </p>
      </motion.div>

      <div className={styles.timeline}>
        {projectsData.map((project, index) => (
          <motion.div key={project.id} variants={itemVariants} className={styles.timelineItem}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;