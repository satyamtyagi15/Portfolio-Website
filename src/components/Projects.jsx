import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectsData } from '../data/projectsData';
import styles from './Projects.module.css';

const Projects = () => {
  return (
    <motion.div className={styles.projects} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className={styles.pageTitle}>✨ Magical Creations</h2>
      <div className={styles.grid}>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;