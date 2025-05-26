'use client';

import React, { useRef, useEffect, useState } from 'react';
import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton'; // Assuming this is a local component
import Contact from '../../components/Contact'; // Assuming this is a local component
import { ReactLenis } from "@studio-freight/react-lenis";
import { 
  useScroll, 
  motion, 
  useTransform, 
  useInView, 
  useSpring 
} from 'framer-motion';

// Icon for the mobile "Home" button
const FiArrowLeftCustom = ({ size = 20, className = "", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function About() {
  // Refs for scroll animations
  const container = useRef(null);
  const introRef = useRef(null);
  const skillsRef = useRef(null);
  const rolesRef = useRef(null);
  
  // InView hooks for triggering animations
  const isIntroInView = useInView(introRef, { once: false, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: false, margin: "-100px" }); // Adjusted margin for consistency
  const isRolesInView = useInView(rolesRef, { once: false, margin: "-100px" });   // Adjusted margin for consistency
  
  // State for responsive design
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"] // Animate from when container bottom hits viewport top, to when container bottom hits viewport bottom
  });

  // Spring animations for smoother movement
  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 20, 
    stiffness: 100,
    restDelta: 0.001 // Define a rest delta for the spring
  });

  // Check for mobile view on mount and resize
  useEffect(() => {
    // Let ReactLenis manage body overflow when 'root' is true
    // if (typeof document !== "undefined") {
    //   document.body.style.overflow = 'scroll'; // Removed: Lenis will handle this.
    // }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transform animations based on scroll progress
  // These animations are largely disabled on mobile for better performance/UX
  const x = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : 250]);
  // const y = useTransform(smoothProgress, [0, 1], [-300, isMobile ? 0 : 0]); // 'y' transform not used in JSX currently
  const rotate = useTransform(smoothProgress, [0, 1], [-120, isMobile ? 0 : -20]);
  const margin = useTransform(smoothProgress, [0, 1], [0, isMobile ? 0 : -100]);
  const scale = useTransform(smoothProgress, [0, 0.3, 1], [0.8, 1, 1.1]); // Globe scale animation
  
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
        delayChildren: 0.3 // Ensure parent is visible before children animate
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
      
      {/* Main content container with responsive top padding */}
      <div 
        className={`${styles.container} mt-0 ${isMobile ? 'pt-6 pb-12' : 'pt-[160px] pb-24'}`} // Responsive padding-top & added padding-bottom
        ref={container}
      >
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
              whileHover={{ scale: 1.15 }} // Slightly increased hover scale for globe
              whileTap={{ scale: 0.9 }}   // Adjusted tap scale
              transition={{ type: "spring", stiffness: 300, damping: 15 }} // Adjusted spring
            >
              {/* Assuming Rounded is a custom component */}
              <Rounded backgroundColor='000' className={styles.button}> 
                <video autoPlay loop muted playsInline className={styles.globeVideo}>
                  <source src="/videos/loopingGlobe.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Rounded>
            </motion.div>
          </div>

          {/* Description Section - Right Column */}
          <div className={styles.desc}>
            <motion.svg
              style={{ rotate, scale: isMobile ? 1.5 : 2, margin }} // Adjusted scale for mobile arrow
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
              animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Animate based on intro view
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
              animate={isIntroInView ? { opacity: 1 } : { opacity: 0 }} // Animate based on intro view
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
            variants={childVariants} // Uses childVariants for individual animation from parent
          >
            Skills & Expertise
          </motion.h2>
          
          <motion.div 
            className={styles.skillsGrid}
            // No need for variants here if staggerVariants on parent handles children
          >
            {skills.map((skill, index) => (
              // SkillPill now uses childVariants to be part of the stagger
              <SkillPill key={index} skill={skill} variants={childVariants} /> 
            ))}
          </motion.div>
        </motion.div>

        {/* Helping Section */}
        <div className={styles.helping}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            // Trigger animation when skills are in view or slightly after
            animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} 
            transition={{ duration: 0.7, delay: 0.5 }} // Delay after skills grid might start
          >
            I can help you with <LoadingDots />
          </motion.h2>
        </div>

        {/* Roles Section */}
        <motion.div 
          ref={rolesRef}
          className={`${styles.rolesContainer} flex flex-col md:flex-row justify-between`} // Removed mb, handled by main container pb
          initial="hidden"
          animate={isRolesInView ? "visible" : "hidden"}
          variants={staggerVariants}
        >
          {roles.map(role => (
            <motion.div 
              key={role.id} 
              className={styles.roleCard}
              variants={childVariants}
              whileHover={{ y: -8, boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.08)" }} // Adjusted hover effect
              transition={{ type: "spring", stiffness: 350, damping: 20 }} // Adjusted spring
            >
              <motion.div 
                className={styles.roleIcon}
                whileHover={{ rotate: [0, -12, 12, -12, 0], scale: 1.1 }} // Added scale to icon hover
                transition={{ duration: 0.6 }}
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
  <motion.span className="inline-flex ml-1"> {/* Added margin-left for spacing */}
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="opacity-0 text-xl" // Match text size with context if needed
        style={{ display: 'inline-block' }} // Ensure dots flow correctly
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: i * 0.25, // Slightly adjusted delay
          ease: "easeInOut"
        }}
      >
        .
      </motion.span>
    ))}
  </motion.span>
);

// Component for skill pills
const SkillPill = ({ skill, variants }) => ( // Added variants prop
  <motion.div 
    className={styles.skillPill}
    variants={variants} // Apply variants for staggered animation
    whileHover={{ 
      scale: 1.08, // Slightly increased hover scale
      backgroundColor: "#003B4A", // Example hover color, adjust to your theme
      color: "#E0F7FA",        // Example hover text color
      boxShadow: "0px 5px 20px rgba(0, 59, 74, 0.2)" 
    }}
    transition={{ duration: 0.15, type: "tween" }} // Faster tween transition
  >
    {skill}
  </motion.div>
);
