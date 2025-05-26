'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { 
    SiPython, SiJavascript, SiReact, SiNextdotjs, SiTableau, SiPowerbi, SiMysql,
    SiTensorflow, SiDocker 
} from 'react-icons/si'; 
import { HiChip } from 'react-icons/hi';

import styles from './style.module.scss';

const heroData = {
  name: "Joevan Pramana Achmad",
  titles: ["Data Analyst", "Data Scientist", "Software Engineer", "ML Engineer"],
  subtitle: "Transforming data into insights and crafting digital solutions. Explore my journey and projects below.",
  profileImage: "/images/profile.png", // GANTI DENGAN PATH FOTO PROFIL ANDA
};

const socialLinks = [
  { Icon: FaLinkedin, href: "https://linkedin.com/in/jvnprmnachmd", label: "LinkedIn" },
  { Icon: FaGithub, href: "https://github.com/joevan29", label: "GitHub" },
  { Icon: FaEnvelope, href: "mailto:joevanpan@outlook.com", label: "Email" },
];

const skillsData = [
  { name: "Python", Icon: SiPython },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "SQL", Icon: SiMysql },
  { name: "Tensorflow", Icon: SiTensorflow },
  { name: "Tableau", Icon: SiTableau },
  { name: "Power BI", Icon: SiPowerbi },
  { name: "Docker", Icon: SiDocker },
  { name: "Data Analysis", Icon: HiChip },
  { name: "Machine Learning", Icon: HiChip },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.8 },
  },
};

const skillCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  hover: { 
    scale: 1.06, 
    y: -6, 
    boxShadow: "0px 12px 28px rgba(0,0,0,0.18), 0px 8px 12px rgba(0,0,0,0.15)"
  }
}

export default function Home() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % heroData.titles.length);
    }, 2800); 
    return () => clearInterval(interval);
  }, [heroData.titles.length]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.main 
      className={styles.landingPage}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className={styles.animatedBackground}></div>

      <motion.section className={styles.heroSection} variants={itemVariants}>
        <motion.div className={styles.profileImageContainer} variants={itemVariants}>
          <div className={styles.profileImageWrapper}> 
            <Image
              src={heroData.profileImage}
              alt={heroData.name}
              width={130} 
              height={130}
              className={styles.profileImage}
              priority
              quality={85} 
            />
          </div>
        </motion.div>

        <motion.h1 className={styles.heroName} variants={itemVariants}>
          {heroData.name}
        </motion.h1>

        <div className={styles.heroTitleContainer}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={heroData.titles[currentTitleIndex]}
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {heroData.titles[currentTitleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>
        
        <motion.p className={styles.heroSubtitle} variants={itemVariants}>
          {heroData.subtitle}
        </motion.p>

        <motion.div className={styles.socialLinksContainer} variants={itemVariants}>
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ y: -3, scale: 1.12, color: 'var(--accent-glow, #33fff0)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className={styles.scrollIndicator} 
          onClick={() => scrollToSection('skills')} 
          whileHover={{scale: 1.1, opacity: 1}}
          initial={{opacity:0, y:10}} 
          animate={{opacity:1, y:0, transition:{delay:0.8, duration:0.5}}} 
        >
          <motion.div 
            animate={{ y: [0, 6, 0]}}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <FaArrowDown />
          </motion.div>
          <span>Explore Skills</span>
        </motion.div>
      </motion.section>

      <motion.section className={styles.skillsSection} id="skills">
        <motion.h3 
            className={styles.sectionTitle} 
            initial={{opacity: 0, y:30}}
            whileInView={{opacity:1, y:0}}
            viewport={{ once: true, amount: 0.4 }} 
            transition={{duration: 0.6, ease: "easeOut"}}
        >
          Skills & Expertise
        </motion.h3>
        <motion.div 
          className={styles.skillsGrid}
          variants={{
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
            hidden: {}
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }} 
        >
          {skillsData.map((skill) => (
            <motion.div 
              key={skill.name} 
              className={styles.skillCard}
              variants={skillCardVariants}
              whileHover="hover" 
            >
              {skill.Icon ? 
                <skill.Icon className={styles.skillIcon} title={skill.name} /> :
                <HiChip className={styles.skillIconFallback} title={skill.name} />
              }
              <span className={styles.skillName}>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      {/* Tambahkan JSX untuk section Kontak dan Footer Anda di sini jika perlu */}

    </motion.main>
  );
}
