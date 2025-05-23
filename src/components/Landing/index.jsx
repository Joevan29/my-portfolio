'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

// Import your SCSS module
import styles from './style.module.scss';

export default function Home() {
  // State for animated elements
  const [activeSkill, setActiveSkill] = useState(0);
  
  // References for animations
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  // Skill rotation interval
  useEffect(() => {
    const skillsInterval = setInterval(() => {
      setActiveSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    
    return () => clearInterval(skillsInterval);
  }, []);

  // GSAP animations
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Scrolling text animation
    gsap.to(slider.current, {
      scrollTrigger: {
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: '-500px',
    });
    
    // Start animation loop for text
    requestAnimationFrame(animate);
    
    // Entrance animations
    const tl = gsap.timeline();
    tl.fromTo('.hero-title', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    ).fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
      "-=0.3"
    ).fromTo('.social-icon', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, stagger: 0.1 }, 
      "-=0.2"
    );
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animation function for text scroll
  const animate = () => {
    if (xPercent < -100) xPercent = 0;
    else if (xPercent > 0) xPercent = -100;

    gsap.set(firstText.current, { xPercent });
    gsap.set(secondText.current, { xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // Skills data
  const skills = [
    { title: 'Data Analyst', icon: '📊', color: '#36BFFA' },
    { title: 'Data Scientist', icon: '🧪', color: '#F471B5' },
    { title: 'Software Engineer', icon: '💻', color: '#9BA1FF' },
    { title: 'ML Engineer', icon: '🤖', color: '#60D394' },
  ];

  return (
    <main className={styles.landing}>
      {/* Background */}
      <div className={styles.backgroundOverlay}>
        <Image
          src="/images/background1.jpg"
          fill
          priority
          alt="background"
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.backgroundGradient} />
      </div>
      
      {/* Animated text slider */}
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Information Systems Student</p>
          <p ref={secondText}>Information Systems Student</p>
        </div>
      </div>
      
      {/* Hero section content */}
      <div className={styles.heroContent}>
        <h1 className={`${styles.heroTitle} hero-title`}>
          Portfolio
        </h1>
        
        <p className={`${styles.heroSubtitle} hero-subtitle`}>
          This my personal portfolio website, showcasing my projects and skills.
        </p>
        
        {/* Social icons */}
        <div className={styles.socialIcons}>
          {[
            { Icon: FaLinkedin, href: "https://linkedin.com/in/jvnprmnachmd", label: "LinkedIn" },
            { Icon: FaGithub, href: "https://github.com/joevan29", label: "GitHub" },
            { Icon: FaEnvelope, href: "mailto:joevanpan@outlook.com", label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={`${styles.socialIcon} social-icon`}
            >
              <Icon />
            </a>
          ))}
        </div>
        
        {/* Skills display */}
        <div className={styles.skillsContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill}
              className={styles.skillItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ color: skills[activeSkill].color }}
            >
              <span className={styles.skillIcon}>{skills[activeSkill].icon}</span>
              <span className={styles.skillTitle}>{skills[activeSkill].title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <FiChevronDown />
          <span>Scroll to explore</span>
        </div>
      </div>
      
      {/* Static ID Card with CSS animations only */}
      <div className={styles.idCardContainer}>
        <div className={styles.idCard}>
          <div className={styles.cardInner}>
            <div className={styles.cardHeader}>
              <div className={styles.cardBadge}>UNIVERSITAS NASIONAL</div>
            </div>
            
            <div className={styles.cardHole} />
            
            <div className={styles.cardContent}>
              <div className={styles.profileImageContainer}>
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={85}
                  height={85}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.profileText}>
                <p className={styles.name}>
                  Joevan Pramana Achmad
                </p>
                <p className={styles.role}>
                  Data Enthusiast
                </p>
                <div className={styles.securityLevel}>
                  <span className={styles.securityDot} />
                  Access Level: PREMIUM
                </div>
              </div>
            </div>
            
            <div className={styles.cardDivider}>
              <span className={styles.dividerGlow} />
            </div>
            
            <div className={styles.cardFooter}>
              <div className={styles.cardDetail}>
                <span className={styles.detailLabel}>ID</span>
                <span className={styles.detailValue}>DN-0347</span>
              </div>
              <div className={styles.cardDetail}>
                <span className={styles.detailLabel}>ISSUED</span>
                <span className={styles.detailValue}>2025</span>
              </div>
              <div className={styles.cardDetail}>
                <span className={styles.detailLabel}>ACCESS</span>
                <span className={styles.detailValue}>ALL</span>
              </div>
            </div>
            
            <div className={styles.cardBarcode}>
              <div className={styles.barcodeLines}></div>
              <span className={styles.barcodeText}>*JPA2025*</span>
            </div>
            
            <div className={`${styles.cornerAccent} ${styles.topLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.topRight}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomRight}`} />
            
            <div className={styles.cardWatermark}>
              DN
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
