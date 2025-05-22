'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

// Import your SCSS module
import styles from './style.module.scss';

export default function Home() {
  // State for animated elements
  const [activeSkill, setActiveSkill] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // References for animations
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  
  // Set visibility after a short delay for entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

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
    
    // Particle effect animation
    gsap.to('.particle', {
      y: 'random(-100, 100)',
      x: 'random(-100, 100)',
      opacity: 'random(0.3, 0.8)',
      duration: 'random(3, 8)',
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2,
    });
    
    // Start animation loop
    requestAnimationFrame(animate);
    
    // Additional animations for page elements
    const tl = gsap.timeline();
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      "-=0.4"
    ).fromTo('.social-icon', 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }, 
      "-=0.2"
    );
    
    // ID Card animation
    gsap.to('.card-element', {
      y: 'random(-5, 5)',
      x: 'random(-3, 3)',
      rotate: 'random(-2, 2)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.easeInOut',
      stagger: 0.1,
    });
    
  }, []);

  // Animation function for infinite text scroll
  const animate = () => {
    if (xPercent < -100) xPercent = 0;
    else if (xPercent > 0) xPercent = -100;

    gsap.set(firstText.current, { xPercent });
    gsap.set(secondText.current, { xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // For draggable ID card
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const smoothX = useSpring(dragX, { stiffness: 80, damping: 15 });
  const smoothY = useSpring(dragY, { stiffness: 80, damping: 15 });
  const rotate = useTransform(smoothX, [-150, 150], [-10, 10]);
  const rotateY = useTransform(smoothX, [-150, 150], [-15, 15]);
  const rotateX = useTransform(smoothY, [-150, 150], [10, -10]);
  
  // Fix for the scale transformation
  const scale = useMotionValue(1);
  
  useEffect(() => {
    const updateScale = () => {
      const x = smoothX.get();
      const y = smoothY.get();
      scale.set(1 + (Math.abs(x) + Math.abs(y)) / 500);
    };
    
    const unsubscribeX = smoothX.on("change", updateScale);
    const unsubscribeY = smoothY.on("change", updateScale);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothX, smoothY]);

  // Skills data
  const skills = [
    { title: 'Data Analyst', icon: '📊', color: '#36BFFA' },
    { title: 'Data Scientist', icon: '🧪', color: '#F471B5' },
    { title: 'Software Engineer', icon: '💻', color: '#9BA1FF' },
    { title: 'ML Engineer', icon: '🤖', color: '#60D394' },
  ];
  
  // Generate particles for background effect
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div 
      key={i} 
      className={`${styles.particle} particle`} 
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
      }}
    />
  ));

  return (
    <motion.main
      className={styles.landing}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background - FIXED (no parallax effect) */}
      <motion.div
        className={styles.backgroundOverlay}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.8 }}
        transition={{ duration: 2 }}
      >
        <Image
          src="/images/background1.jpg"
          fill
          priority
          alt="background"
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.backgroundGradient} />
        {particles}
      </motion.div>
      
      {/* Animated text slider */}
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Information Systems Student</p>
          <p ref={secondText}>Information Systems Student</p>
        </div>
      </div>
      
      {/* Hero section content */}
      <div className={styles.heroContent}>
        <motion.h1 
          className={`${styles.heroTitle} hero-title`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Portfolio
        </motion.h1>
        
        <motion.p
          className={`${styles.heroSubtitle} hero-subtitle`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          This my personal portfolio website, showcasing my projects and skills.
        </motion.p>
        
        {/* Social icons with updated links */}
        <div className={styles.socialIcons}>
          {[
            { Icon: FaLinkedin, href: "https://linkedin.com/in/jvnprmnachmd", label: "LinkedIn" },
            { Icon: FaGithub, href: "https://github.com/joevan29", label: "GitHub" },
            { Icon: FaEnvelope, href: "mailto:joevanpan@outlook.com", label: "Email" },
          ].map(({ Icon, href, label }, idx) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              className={`${styles.socialIcon} social-icon`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 5, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)' 
              }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
        
        {/* Animated skills display */}
        <div className={styles.skillsContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill}
              className={styles.skillItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{ color: skills[activeSkill].color }}
            >
              <span className={styles.skillIcon}>{skills[activeSkill].icon}</span>
              <span className={styles.skillTitle}>{skills[activeSkill].title}</span>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <FiChevronDown />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
      
      {/* Enhanced ID Card with glass morphism effect */}
      <div className={styles.idCardContainer}>
        <motion.div
          className={styles.idCard}
          initial={{ opacity: 0, y: 100, rotateX: 60 }}
          animate={{
            opacity: 1,
            y: [0, -5, 0],
            rotateX: 0,
            boxShadow: [
              '0 0 20px rgba(255,255,255,0.15)',
              '0 0 40px rgba(0,255,255,0.5)',
              '0 0 20px rgba(255,255,255,0.15)'
            ]
          }}
          transition={{ 
            duration: 6, 
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5
          }}
          whileHover={{
            scale: 1.05,
            rotate: 2,
            backgroundColor: 'rgba(0,255,255,0.18)',
            boxShadow: '0 0 45px rgba(0,255,255,0.7)',
            filter: 'brightness(1.25)',
            rotateY: 15,
            rotateX: 5
          }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          style={{
            x: smoothX,
            y: smoothY,
            rotate,
            scale,
            rotateY,
            rotateX,
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          dragElastic={0.1}
        >
          <div className={styles.cardInner}>
            <div className={styles.cardHeader}>
              <div className={styles.companyLogo}>PLAY<span>NEXUS</span></div>
              <div className={styles.cardBadge}>UNIVERSITAS NASIONAL</div>
            </div>
            
            <motion.div 
              className={`${styles.cardHologram} card-element`}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className={`${styles.cardGlow} card-element`}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            <div className={styles.cardHole} />
            
            <motion.div 
              className={`${styles.cardChip} card-element`}
              animate={{
                boxShadow: [
                  '0 0 5px rgba(0,255,255,0.3)',
                  '0 0 10px rgba(0,255,255,0.7)',
                  '0 0 5px rgba(0,255,255,0.3)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className={styles.chipLines}>
                <div className={styles.chipLine}></div>
                <div className={styles.chipLine}></div>
                <div className={styles.chipLine}></div>
              </div>
            </motion.div>
            
            <div className={styles.cardContent}>
              <div className={styles.profileImageContainer}>
                <Image
                  src="/images/profile.jpg"
                  alt="Profile"
                  width={85}
                  height={85}
                  className={styles.profileImage}
                />
                <motion.div 
                  className={`${styles.profileImageGlow} card-element`}
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className={styles.profileText}>
                <motion.p
                  className={styles.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  Joevan Pramana Achmad
                </motion.p>
                <motion.p
                  className={styles.role}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 1 }}
                >
                  Data Enthusiast
                </motion.p>
                <motion.div
                  className={styles.securityLevel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.4, duration: 1 }}
                >
                  <motion.span 
                    className={`${styles.securityDot} card-element`}
                    animate={{
                      backgroundColor: ['#00ff9d', '#00ffee', '#00ff9d'],
                      boxShadow: [
                        '0 0 5px rgba(0,255,157,0.5)',
                        '0 0 12px rgba(0,255,238,0.8)',
                        '0 0 5px rgba(0,255,157,0.5)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  Access Level: PREMIUM
                </motion.div>
              </div>
            </div>
            
            <div className={styles.cardDivider}>
              <motion.span
                className={`${styles.dividerGlow} card-element`}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  width: ['20%', '80%', '20%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
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
            
            {/* New decorative elements */}
            <div className={styles.cardCircuit}>
              <div className={styles.circuitLine}></div>
              <div className={styles.circuitLine}></div>
              <div className={styles.circuitLine}></div>
              <div className={styles.circuitDot}></div>
              <div className={styles.circuitDot}></div>
            </div>
            
            <motion.div 
              className={`${styles.cardQRCode} card-element`}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={styles.cardWatermark}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              DN
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated glow effects */}
      <motion.div
        className={styles.glowCircle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <motion.div
        className={styles.glowCircleSmall}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', delay: 2 }}
      />
    </motion.main>
  );
}