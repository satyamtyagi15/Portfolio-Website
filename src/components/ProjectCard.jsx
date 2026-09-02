import React from 'react';
import { Tilt } from 'react-tilt';
import styles from './ProjectCard.module.css';
import SciFiObject from './SciFiObject';

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;
  // Use high quality YouTube thumbnail or custom image
  const imgUrl = project.videoId ? `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg` : project.image;

  return (
    <div className={`${styles.timelineWrapper} ${isEven ? styles.even : styles.odd}`}>
      
      {/* Timeline Dot */}
      <div className={styles.timelineDot}></div>

      {/* Content Container */}
      <Tilt options={{ max: 15, scale: 1.02, speed: 400, perspective: 1000 }} className={styles.tiltContainer}>
        <div className={styles.card}>
          
          <div className={styles.imageWrapper}>
            <a 
              href={project.youtubeUrl || project.liveLink || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <img src={imgUrl} alt={project.title} className={styles.projectImg} />
            </a>
            {project.youtubeUrl && (
              <div className={styles.imageOverlay}>
                <a 
                  href={project.youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.playBtn}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.playIcon}>▶</div>
                  <span>Watch Video</span>
                </a>
              </div>
            )}
            <div className={styles.floatingBadge}>{project.category.split('/')[0].trim()}</div>
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.category}>{project.category}</p>
            <p className={styles.fullDesc}>{project.fullDesc}</p>
            
            <div className={styles.techStack}>
              {project.tech.split(',').map((t, i) => (
                <span key={i} className={styles.techTag}>#{t.trim()}</span>
              ))}
            </div>

            <div 
              className={styles.links}
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                📁 GitHub
              </a>
              {project.youtubeUrl && (
                <a href={project.youtubeUrl} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>
                  ▶️ YouTube
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                  🌐 Live
                </a>
              )}
            </div>
          </div>
          
        </div>
      </Tilt>

      {/* 3D Sci-Fi Object on the empty side */}
      <div className={styles.sciFiContainer}>
        <SciFiObject index={index} />
      </div>

    </div>
  );
};

export default ProjectCard;