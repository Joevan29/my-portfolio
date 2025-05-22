'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import Contact from '../../components/Contact';
import { ReactLenis } from "@studio-freight/react-lenis";
import { 
  useScroll, 
  motion, 
  useTransform, 
  useInView, 
  useSpring 
} from 'framer-motion';

export default function About() {
  // Refs for scroll animations
  const container = useRef(null);
  const introRef = useRef(null);
  const skillsRef = useRef(null);
  const rolesRef = useRef(null);
  
  // InView hooks for triggering animations
  const isIntroInView = useInView(introRef, { once: false, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: false });
  const isRolesInView = useInView(rolesRef, { once: false });
  
  // State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  // Spring animations for smoother movement
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 20, 
    stiffness: 100 
  });

  // Check for mobile view on mount and resize
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = 'scroll';
      
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Transform animations based on scroll progress
  const x = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : 250]);
  const y = useTransform(smoothProgress, [0, 1], [-300, isMobile ? 0 : 0]);
  const rotate = useTransform(smoothProgress, [0, 1], [-120, isMobile ? 0 : -20]);
  const margin = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -100]);
  const scale = useTransform(smoothProgress, [0, 0.3, 1], [0.8, 1, 1.1]);
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Skills data
  const skills = [
    "Python", "R", "SQL", "JavaScript", "React", 
    "Machine Learning", "Data Analysis", "Next.js", 
    "Tableau", "Power BI", "Statistics"
  ];
  
  // Roles data
  const roles = [
    {
      id: '01',
      title: 'Data Analyst',
      description: 'I explore, clean, and visualize data to deliver actionable business insights and data-driven decisions.',
      icon: '📊'
    },
    {
      id: '02',
      title: 'Data Scientist',
      description: 'I build predictive models using machine learning to solve real-world problems and extract deeper value from data.',
      icon: '🧠'
    },
    {
      id: '03',
      title: 'Software Engineer',
      description: 'A complete website from concept to implementation. My sense for design and strong development skills enable me to create impactful digital solutions.',
      icon: '💻'
    }
  ];

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* Added padding-top to create space between header and this component */}
      <div className={`${styles.container} pt-[160px] mt-0`} ref={container}>
        {/* Top Section with 3 columns */}
        <div className={styles.topSection}>
          {/* Introduction Section - Left Column */}
          <motion.div 
            ref={introRef}
            initial="hidden"
            animate={isIntroInView ? "visible" : "hidden"}
            variants={titleVariants}
            className={styles.introSection}
          >
            <h1 className={styles.gradientText}>
              <span>I am a final-year student <br /></span>
              <span>at Universitas Nasional, deepening my role</span>
            </h1>
          </motion.div>

          {/* Globe Button - Center Column */}
          <div className={styles.title}>
            <motion.div 
              style={{ x, scale }} 
              className={styles.buttonContainer}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Rounded backgroundColor='000' className={styles.button}>
                <video autoPlay loop muted playsInline className={styles.globeVideo}>
                  <source src="/videos/loopingGlobe.mp4" type="video/mp4" />
                </video>
              </Rounded>
            </motion.div>
          </div>

          {/* Description Section - Right Column */}
          <div className={styles.desc}>
            <motion.svg
              style={{ rotate, scale: 2, margin }}
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.arrow}
            >
              <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="#0a192f" />
            </motion.svg>

            <motion.h4 
              className={`${styles.descText}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <span>
                I specialize in three key roles: 
                <span className={styles.highlight}> Data Analyst</span>, 
                <span className={styles.highlight}> Data Scientist</span>, and 
                <span className={styles.highlight}> Software Engineer</span>. 
                Each of them empowers me to solve complex problems through data, models, and scalable technology.
              </span>
            </motion.h4>

            <motion.div 
              className={styles.exploringText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className={styles.dimText}>Always exploring</span>
              <LoadingDots />
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <motion.div 
          ref={skillsRef}
          className={styles.skillsSection}
          initial="hidden"
          animate={isSkillsInView ? "visible" : "hidden"}
          variants={staggerVariants}
        >
          <motion.h2 
            className={styles.sectionTitle}
            variants={childVariants}
          >
            Skills & Expertise
          </motion.h2>
          
          <motion.div 
            className={styles.skillsGrid}
            variants={childVariants}
          >
            {skills.map((skill, index) => (
              <SkillPill key={index} skill={skill} />
            ))}
          </motion.div>
        </motion.div>

        {/* Helping Section */}
        <div className={styles.helping}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            I can help you with <LoadingDots />
          </motion.h2>
        </div>

        {/* Roles Section */}
        <motion.div 
          ref={rolesRef}
          className={`${styles.rolesContainer} flex flex-col md:flex-row justify-between mb-[100px]`}
          initial="hidden"
          animate={isRolesInView ? "visible" : "hidden"}
          variants={staggerVariants}
        >
          {roles.map(role => (
            <motion.div 
              key={role.id} 
              className={styles.roleCard}
              variants={childVariants}
              whileHover={{ y: -10, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className={styles.roleIcon}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {role.icon}
              </motion.div>
              <h4 className={styles.roleNumber}>{role.id}</h4>
              <div className={styles.roleDivider}></div>
              <h3 className={styles.roleTitle}>{role.title}</h3>
              <p className={styles.roleDescription}>{role.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <Contact />
    </ReactLenis>
  );
}

// Component for animated loading dots
const LoadingDots = () => (
  <motion.span className="inline-flex">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="opacity-0 text-xl"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: i * 0.2,
          ease: "easeInOut"
        }}
      >
        .
      </motion.span>
    ))}
  </motion.span>
);

// Component for skill pills
const SkillPill = ({ skill }) => (
  <motion.div 
    className={styles.skillPill}
    whileHover={{ 
      scale: 1.05, 
      backgroundColor: "#0a192f", 
      color: "white",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)" 
    }}
    transition={{ duration: 0.2 }}
  >
    {skill}
  </motion.div>
);