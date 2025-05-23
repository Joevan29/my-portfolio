'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, motion, AnimatePresence } from 'framer-motion';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
import { FiArrowRight } from 'react-icons/fi';
import styles from './style.module.scss';

export default function IndexComponent() {
    const phrase = "I am a final-year student passionate about Data Analytics, Data Science, and Software Engineering.";
    const description = useRef(null);
    const isInView = useInView(description, { once: true, margin: "-10%" });
    
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

    return (
        <motion.div 
            ref={description} 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Simplified background */}
            <div className={styles.gradientBg}></div>
            
            <div className={styles.body}>
                {/* Animated headline */}
                <div className={styles.headline}>
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
                
                {/* Simplified skills animation */}
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
                
                {/* Simplified bio text */}
                <motion.div 
                    className={styles.bio}
                    variants={opacity}
                    animate={isInView ? "open" : "closed"}
                >
                    <p>
                        I transform <span className={styles.textHighlight}>complex data</span> into actionable insights and build 
                        <span className={styles.textHighlight}> robust software solutions</span>. 
                        With a strong foundation in statistical analysis and programming, I specialize in 
                        creating <span className={styles.textHighlight}>data-driven applications</span> that solve real-world problems.
                    </p>
                    <p>
                        My expertise spans <span className={styles.textHighlight}>machine learning models</span>, database architectures, and full-stack development.
                        I am constantly exploring new technologies and methodologies to enhance my skills and deliver 
                        <span className={styles.textHighlight}> innovative solutions</span>.
                    </p>
                </motion.div>
                
                {/* Simplified stats section */}
                <motion.div 
                    className={styles.statsContainer}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { value: '15+', label: 'Projects' },
                        { value: '3+', label: 'Years Experience' },
                        { value: '5+', label: 'Technologies' }
                    ].map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div className={styles.statValue}>
                                {stat.value}
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
                
                {/* Simplified button container */}
                <motion.div 
                    className={styles.buttonContainer}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
                
                {/* Static decorative dots - no animation */}
                <div className={styles.dotGrid}>
                    {Array.from({ length: 16 }, (_, i) => (
                        <div 
                            key={i}
                            className={styles.dot}
                        />
                    ))}
                </div>
            </div>
            
            {/* Simplified scroll indicator */}
            <div className={styles.scrollIndicator}>
                <span>Scroll for more</span>
                <div className={styles.scrollLine}>
                    <div className={styles.scrollCircle} />
                </div>
            </div>
        </motion.div>
    );
}
