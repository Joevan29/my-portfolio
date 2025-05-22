'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function IndexComponent() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const logoRef = useRef(null);
    const navRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Determine if we're on the home page
    const isHomePage = pathname === '/';

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useEffect(() => {
        // Initial animation for the logo and nav items
        gsap.fromTo(logoRef.current, 
            { y: -50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        
        gsap.fromTo(".nav-item", 
            { y: -30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.3 }
        );
        
        // Handle scroll changes for header appearance with smoother transitions
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setIsScrolled(true);
                
                // Apply consistent styling with different colors based on page
                gsap.to('#header', { 
                    backgroundColor: isHomePage ? 'rgba(10, 25, 47, 0.85)' : 'rgba(245, 245, 250, 0.85)', 
                    backdropFilter: 'blur(10px)',
                    boxShadow: isHomePage ? '0 10px 30px -10px rgba(2, 12, 27, 0.7)' : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                    padding: '15px 40px',
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                setIsScrolled(false);
                gsap.to('#header', { 
                    backgroundColor: 'transparent', 
                    backdropFilter: 'none',
                    boxShadow: 'none',
                    padding: '20px 40px',
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isHomePage]);

    useEffect(() => {
        // Handle different page styles with a cleaner approach
        const headerElement = document.getElementById('header');
        const indicators = document.querySelectorAll('.indicator');
        
        // Set text color based on page
        if (isHomePage) {
            headerElement.style.color = 'white';
            indicators.forEach(indicator => {
                indicator.style.backgroundColor = 'white';
            });
        } else {
            headerElement.style.color = '#0a192f'; // Using a dark blue instead of pure black for better aesthetics
            indicators.forEach(indicator => {
                indicator.style.backgroundColor = '#0a192f';
            });
        }

        // Reset all indicators
        indicators.forEach(indicator => {
            indicator.style.transform = 'scale(0)';
        });

        // Highlight active page indicator
        const pages = {
            '/about': '.about-indicator',
            '/work': '.work-indicator',
            '/contact': '.contact-indicator'
        };
        
        if (pages[pathname]) {
            document.querySelector(pages[pathname]).style.transform = 'scale(1)';
        }
    }, [pathname, isHomePage]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) }
            }
        });
    }, []);

    // Animation variants for menu items
    const navItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.6, 0.05, 0.01, 0.9] // Fixed cubic-bezier
            }
        }),
        hover: {
            y: -3,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Logo animation variants
    const logoVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.6,
                ease: "backOut"
            }
        },
        hover: {
            scale: 1.05,
            rotate: 5,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Apply specific header class based on page
    const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isHomePage ? styles.lightHeader : ''}`;

    return (
        <>
            <div className='hidden md:block'>
                <motion.div 
                    ref={header} 
                    className={headerClass}
                    id='header'
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        duration: 0.8, 
                        ease: [0.6, 0.05, 0.01, 0.9] // Fixed cubic-bezier
                    }}
                >
                    <a href="/">
                        <motion.div 
                            className={`${styles.logo} ${!isHomePage ? styles.darkLogo : ''}`}
                            ref={logoRef}
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                        >
                            <motion.div 
                                className={styles.logoGlow}
                                animate={{ 
                                    opacity: [0.2, 0.5, 0.2],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                    duration: 3, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <p className={styles.copyright}>©</p>
                            <div className={styles.name}>
                                <p className={styles.codeBy}>Code by</p>
                                <p className={styles.Jopan}>Jopan</p>
                                <p className={styles.Pan}>Pan</p>
                            </div>
                        </motion.div>
                    </a>
                    
                    <motion.div 
                        className={styles.nav}
                        ref={navRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {[
                            { title: 'Work', href: '/work', class: 'work-indicator' },
                            { title: 'About', href: '/about', class: 'about-indicator' },
                            { title: 'Contact', href: '/contact', class: 'contact-indicator' }
                        ].map((item, i) => (
                            <Magnetic key={item.title}>
                                <motion.div 
                                    className={`${styles.el} ${pathname === item.href ? styles.active : ''} nav-item`}
                                    custom={i}
                                    variants={navItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                >
                                    <a href={item.href}>{item.title}</a>
                                    <motion.div 
                                        className={`indicator ${item.class} ${styles.indicator}`}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            </Magnetic>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        ref={button} 
                        className={styles.headerButtonContainer}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                    >
                        <Rounded 
                            onClick={() => { setIsActive(!isActive) }} 
                            className={`${styles.button} ${isActive ? styles.activeButton : ""} ${!isHomePage ? styles.darkButton : ""}`}
                        >
                            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""} ${!isHomePage ? styles.darkBurger : ""}`}></div>
                        </Rounded>
                    </motion.div>
                </motion.div>
                
                <AnimatePresence mode="wait">
                    {isActive && (
                        <Nav />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}