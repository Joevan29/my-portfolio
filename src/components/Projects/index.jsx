'use client';

import styles from './style.module.scss';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';

export const projects = [
  {
    title: "Kimia Farma Dashboard",
    src: "/images/kimia-farma-dashboard.png",
    color: "#3B82F6",
    url: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    github: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    date: "2025",
    client: "Rakamin Academy & Kimia Farma",
    technologies: ["Python", "MySQL", "Tableau", "Data Analysis"],
    description: "This project is part of a Project-Based Internship Program with Rakamin Academy and Kimia Farma. Created a comprehensive business intelligence dashboard to visualize sales performance and trends across multiple metrics."
  },
  {
    title: "Sentiment Analysis Gojek",
    src: "/images/sentiment-gojek.png",
    color: "#10B981",
    url: "https://github.com/Joevan29/Streamlit",
    github: "https://github.com/Joevan29/Streamlit",
    date: "2025",
    client: "Personal Project",
    technologies: ["Python", "SVM", "NLP", "Streamlit", "Data Visualization"],
    description: "Sentiment analysis on user reviews of the Gojek application using Support Vector Machine algorithms. Created interactive visualizations with Streamlit to display sentiment trends and insights."
  }
];

export default function Projects() {
  const router = useRouter();
  const [detailView, setDetailView] = useState(null);
  
  // Refs for animations
  const projectsContainer = useRef(null);
  const headerRef = useRef(null);

  // Handle project click to show detailed view
  const handleProjectClick = (project) => {
    setDetailView(project);
    document.body.style.overflow = 'hidden';
  };
  
  // Close detailed view
  const closeDetailView = () => {
    setDetailView(null);
    document.body.style.overflow = 'auto';
  };
  
  // Function to handle "More Projects" button click
  const handleMoreProjects = () => {
    router.push('/work');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.projectsWrapper}>
      {/* Header section */}
      <div className={styles.header} ref={headerRef}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>
        <motion.div 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.line}></div>
          <p>Showcasing my work in data science and software development</p>
          <div className={styles.line}></div>
        </motion.div>
      </div>
      
      {/* Projects grid */}
      <div className={styles.projectsContainer} ref={projectsContainer}>
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className={styles.projectCard}
            onClick={() => handleProjectClick(project)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.projectImageWrapper}>
              <div className={styles.imageOverlay} style={{ backgroundColor: `${project.color}30` }} />
              <img 
                src={project.src} 
                alt={project.title} 
                className={styles.projectImage}
              />
            </div>
            
            <div className={styles.projectContent}>
              <div className={styles.projectMeta}>
                <span className={styles.projectYear}>{project.date}</span>
                <span className={styles.projectClient}>{project.client}</span>
              </div>
              
              <h3 className={styles.projectTitle}>{project.title}</h3>
              
              <p className={styles.projectDescription}>
                {project.description.length > 100 
                  ? `${project.description.substring(0, 100)}...` 
                  : project.description}
              </p>
              
              <div className={styles.techTags}>
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className={styles.techTag} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className={styles.techTag} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className={styles.projectLinks}>
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                  <FiGithub />
                </Link>
                {project.url !== project.github && (
                  <Link href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    <FiExternalLink />
                  </Link>
                )}
              </div>
            </div>
            
            <div className={styles.viewDetails}>
              <span>View Details</span>
              <FiArrowRight />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* More Projects button */}
      <motion.div 
        className={styles.moreProjects}
        onClick={handleMoreProjects}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>More Projects</span>
        <FiArrowRight className={styles.arrowIcon} />
      </motion.div>
      
      {/* Project detail modal */}
      <AnimatePresence>
        {detailView && (
          <motion.div 
            className={styles.projectDetail}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={styles.detailContainer}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className={styles.closeButton}
                onClick={closeDetailView}
              >
                ×
              </button>
              
              <div className={styles.detailHeader} style={{ backgroundColor: `${detailView.color}15` }}>
                <div className={styles.detailHeaderContent}>
                  <h2>{detailView.title}</h2>
                  <div className={styles.detailMeta}>
                    <span>{detailView.date}</span>
                    <div className={styles.metaDivider}></div>
                    <span>{detailView.client}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.detailImageContainer}>
                <div className={styles.imageGlow} style={{ backgroundColor: detailView.color }} />
                <img src={detailView.src} alt={detailView.title} className={styles.detailImage} />
              </div>
              
              <div className={styles.detailContent}>
                <div className={styles.detailDescription}>
                  <h3>Overview</h3>
                  <p>{detailView.description}</p>
                </div>
                
                <div className={styles.detailTechnologies}>
                  <h3>Technologies</h3>
                  <div className={styles.techTagsDetail}>
                    {detailView.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className={styles.techTagDetail}
                        style={{ backgroundColor: `${detailView.color}20`, color: detailView.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.detailButtons}>
                  <a 
                    href={detailView.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.detailButton} ${styles.githubButton}`}
                  >
                    <FiGithub className={styles.buttonIcon} />
                    <span>View on GitHub</span>
                  </a>
                  
                  {detailView.url !== detailView.github && (
                    <a 
                      href={detailView.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${styles.detailButton} ${styles.liveButton}`}
                    >
                      <FiExternalLink className={styles.buttonIcon} />
                      <span>Live Project</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            
            <div 
              className={styles.detailOverlay} 
              onClick={closeDetailView}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
