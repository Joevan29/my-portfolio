'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import styles from './style.module.scss';

export default function IndexComponent() {
    const phrase = "I am a final-year student passionate about Data Analytics, Data Science, and Software Engineering.";
    const description = useRef(null);
    const textContainer = useRef(null);
    const isInView = useInView(description, { once: false, margin: "-10%" });
    
    // Define animated skills
    const skills = [
        { title: 'Data Analyst', icon: '📊', color: '#36BFFA' },
        { title: 'Data Scientist', icon: '🧪', color: '#F471B5' },
        { title: 'Software Engineer', icon: '💻', color: '#9BA1FF' },
        { title: 'ML Engineer', icon: '🤖', color: '#60D394' },
    ];
    
    const [activeSkill, setActiveSkill] = useState(0);
    
    // Skill rotation interval
    useEffect(() => {
        const skillsInterval = setInterval(() => {
            setActiveSkill((prev) => (prev + 1) % skills.length);
        }, 3000);
        
        return () => clearInterval(skillsInterval);
    }, []);

    // GSAP animations for floating elements
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate floating squares
        gsap.to('.floating-square', {
            y: 'random(-15, 15)',
            x: 'random(-15, 15)',
            rotate: 'random(-10, 10)',
            duration: 'random(3, 6)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.2,
        });
        
        // Animate glow effects
        gsap.to('.glow-effect', {
            opacity: 'random(0.3, 0.7)',
            scale: 'random(0.95, 1.05)',
            duration: 'random(2, 4)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.3,
        });
        
        // Animated background gradient
        gsap.to('.gradient-bg', {
            backgroundPosition: '-200% center',
            duration: 15,
            repeat: -1,
            ease: 'none',
        });
        
        // Text highlight animation
        gsap.to('.text-highlight', {
            backgroundSize: '100% 100%',
            duration: 1.5,
            scrollTrigger: {
                trigger: description.current,
                start: 'top 70%',
            },
            stagger: 0.2,
        });
        
        // Line drawing animation for decorative lines
        gsap.to('.line-draw', {
            strokeDashoffset: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: description.current,
                start: 'top 80%',
            },
            stagger: 0.15,
        });
    }, []);

    // Generate floating elements for background effect
    const floatingElements = Array.from({ length: 10 }, (_, i) => (
        <div 
            key={i} 
            className={`${styles.floatingSquare} floating-square`} 
            style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                opacity: Math.random() * 0.2 + 0.1,
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                transform: `rotate(${Math.random() * 45}deg)`,
                borderRadius: Math.random() > 0.5 ? '50%' : `${Math.random() * 30}%`,
            }}
        />
    ));

    // Generate glow effects
    const glowEffects = Array.from({ length: 3 }, (_, i) => (
        <div 
            key={i} 
            className={`${styles.glowEffect} glow-effect`} 
            style={{
                left: `${i * 30 + 15}%`,
                top: `${i * 20 + 30}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                opacity: Math.random() * 0.2 + 0.1,
            }}
        />
    ));

    return (
        <motion.div 
            ref={description} 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Background elements */}
            <div className={`${styles.gradientBg} gradient-bg`}></div>
            <div className={styles.decorativeElements}>
                {floatingElements}
                {glowEffects}
                
                <svg className={styles.decorativeSVG} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path className={`${styles.lineDraw} line-draw`} d="M10,30 Q50,10 90,30" />
                    <path className={`${styles.lineDraw} line-draw`} d="M10,70 Q50,90 90,70" />
                    <circle className={`${styles.lineDraw} line-draw`} cx="85" cy="15" r="5" />
                    <circle className={`${styles.lineDraw} line-draw`} cx="15" cy="85" r="5" />
                </svg>
            </div>
            
            <div className={styles.body}>
                {/* Animated headline */}
                <div ref={textContainer} className={styles.headline}>
                    {
                        phrase.split(" ").map((word, index) => (
                            <span key={index} className={styles.mask}>
                                <motion.span
                                    variants={slideUp}
                                    custom={index}
                                    animate={isInView ? "open" : "closed"}
                                    key={index}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))
                    }
                </div>
                
                {/* Skills animation */}
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
                
                {/* Bio text with animated highlights */}
                <motion.div 
                    className={styles.bio}
                    variants={opacity}
                    animate={isInView ? "open" : "closed"}
                >
                    <p>
                        I transform <span className={`${styles.textHighlight} text-highlight`}>complex data</span> into actionable insights and build 
                        <span className={`${styles.textHighlight} text-highlight`}> robust software solutions</span>. 
                        With a strong foundation in statistical analysis and programming, I specialize in 
                        creating <span className={`${styles.textHighlight} text-highlight`}>data-driven applications</span> that solve real-world problems.
                    </p>
                    <p>
                        My expertise spans <span className={`${styles.textHighlight} text-highlight`}>machine learning models</span>, database architectures, and full-stack development.
                        I am constantly exploring new technologies and methodologies to enhance my skills and deliver 
                        <span className={`${styles.textHighlight} text-highlight`}> innovative solutions</span>.
                    </p>
                </motion.div>
                
                {/* Stats section */}
                <motion.div 
                    className={styles.statsContainer}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { value: '15+', label: 'Projects' },
                        { value: '3+', label: 'Years Experience' },
                        { value: '5+', label: 'Technologies' }
                    ].map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <motion.div 
                                className={styles.statValue}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
                
                {/* Button container with hover effects */}
                <motion.div 
                    className={styles.buttonContainer} 
                    data-scroll 
                    data-scroll-speed={0.1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <a href="about" style={{ textDecoration: 'none' }}>
                        <Rounded className={styles.button}>
                            <p>About me</p>
                            <span className={styles.buttonIcon}>
                                <FiArrowRight />
                            </span>
                        </Rounded>
                    </a>
                    <a href="/projects" style={{ textDecoration: 'none' }}>
                        <Rounded className={`${styles.button} ${styles.secondary}`}>
                            <p>View projects</p>
                            <span className={styles.buttonIcon}>
                                <FiArrowRight />
                            </span>
                        </Rounded>
                    </a>
                </motion.div>
                
                {/* Animated decorative dots */}
                <div className={styles.dotGrid}>
                    {Array.from({ length: 16 }, (_, i) => (
                        <motion.div 
                            key={i}
                            className={styles.dot}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ 
                                duration: 0.4, 
                                delay: 0.03 * (i % 4) + 0.05 * Math.floor(i / 4) 
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Animated scroll indicator */}
            <motion.div 
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span>Scroll for more</span>
                <div className={styles.scrollLine}>
                    <motion.div 
                        className={styles.scrollCircle}
                        animate={{ 
                            y: [0, 15, 0],
                            opacity: [0.2, 1, 0.2]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
