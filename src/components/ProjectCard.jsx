import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const embedUrl = `https://www.youtube.com/embed/${project.videoId}`;
  return (
    <div className={styles.card}>
      <div className={styles.videoWrapper}>
        <iframe 
          src={embedUrl}
          title={project.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.content}>
        <h3>{project.title}</h3>
        <p className={styles.category}>{project.category}</p>
        <p className={styles.fullDesc}>{project.fullDesc}</p>
        <div className={styles.tech}>{project.tech}</div>
        <ul className={styles.highlights}>
          {project.highlights.map((h, i) => <li key={i}>✨ {h}</li>)}
        </ul>
        <div className={styles.links}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
            📁 GitHub Repository →
          </a>
          <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
            ▶️ Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;