'use client';

import styles from './style.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const [activeProject, setActiveProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // Refs for animations
  const projectsContainer = useRef(null);
  const headerRef = useRef(null);
  const cursor = useRef(null);
  
  // For detailed project view
  const [detailView, setDetailView] = useState(null);
  
  // For particle effects
  const [particles, setParticles] = useState([]);
  
  // For scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Generate particles once at component mount
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);
  
  // Track mouse position for cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // GSAP animations setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animation
    gsap.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    
    // Staggered project items animation
    gsap.fromTo('.project-item',
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsContainer.current,
          start: 'top 70%',
        }
      }
    );
    
    // Animate particles
    gsap.to('.particle', {
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      opacity: 'random(0.1, 0.5)',
      duration: 'random(3, 8)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    });
    
    // Animate technology tags
    gsap.fromTo('.tech-tag',
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-tags',
          start: 'top 90%',
        }
      }
    );
    
  }, []);
  
  // Custom cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      mixBlendMode: "difference"
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(100, 255, 218, 0.4)",
      mixBlendMode: "difference"
    }
  };
  
  // Enter/leave project handlers for hover effects
  const projectEnter = () => setCursorVariant("project");
  const projectLeave = () => setCursorVariant("default");
  const buttonEnter = () => setCursorVariant("button");
  
  // Handle project click to show detailed view
  const handleProjectClick = (project) => {
    setDetailView(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when detail view is open
  };
  
  // Close detailed view
  const closeDetailView = () => {
    setDetailView(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };
  
  // Function to handle "More Projects" button click
  const handleMoreProjects = () => {
    router.push('/work');
  };

  return (
    <motion.div 
      className={styles.projectsWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Custom cursor */}
      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Background particles */}
      <div className={styles.particlesContainer}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`${styles.particle} particle`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 30}%`,
            }}
          />
        ))}
      </div>
      
      {/* Scroll progress indicator */}
      <motion.div 
        className={styles.progressBar}
        style={{ scaleX: scrollProgress }}
      />
      
      {/* Header section */}
      <div className={styles.header} ref={headerRef}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h1>
        <motion.div 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
            className={`${styles.projectCard} project-item`}
            onClick={() => handleProjectClick(project)}
            onMouseEnter={projectEnter}
            onMouseLeave={projectLeave}
            whileHover={{ 
              y: -10, 
              boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 15px ${project.color}40`
            }}
            layoutId={`project-container-${index}`}
          >
            <motion.div 
              className={styles.projectImageWrapper}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.imageOverlay} style={{ backgroundColor: `${project.color}30` }} />
              <img 
                src={project.src} 
                alt={project.title} 
                className={styles.projectImage}
              />
            </motion.div>
            
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
              
              <div className={`${styles.techTags} tech-tags`}>
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className={`${styles.techTag} tech-tag`} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className={`${styles.techTag} tech-tag`} style={{ backgroundColor: `${project.color}20`, color: project.color }}>
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
        onMouseEnter={buttonEnter}
        onMouseLeave={projectLeave}
        onClick={handleMoreProjects}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
          >
            <motion.div 
              className={styles.detailContainer}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <motion.button 
                className={styles.closeButton}
                onClick={closeDetailView}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              
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
                  <motion.a 
                    href={detailView.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.detailButton} ${styles.githubButton}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className={styles.buttonIcon} />
                    <span>View on GitHub</span>
                  </motion.a>
                  
                  {detailView.url !== detailView.github && (
                    <motion.a 
                      href={detailView.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${styles.detailButton} ${styles.liveButton}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink className={styles.buttonIcon} />
                      <span>Live Project</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.detailOverlay} 
              onClick={closeDetailView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}