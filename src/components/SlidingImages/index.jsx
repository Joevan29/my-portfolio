'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi'; 
import { 
    SiPython, SiJavascript, SiReact, SiNextdotjs, SiTableau, SiPowerbi, SiMysql,
    SiTensorflow, SiDocker 
} from 'react-icons/si'; 
import { HiChip } from 'react-icons/hi';

// Data Slider (contoh dengan penambahan title dan penyesuaian warna)
const slider1 = [
  { title: "Rental Motor App", color: "var(--project-card-bg, #ffffff)", src: "rentalmotor.png", href: "", category: "App Development" },
  { title: "Cozy App Design", color: "var(--project-card-bg, #ffffff)", src: "cozy.png", href: "", category: "UI/UX Design" },
  { title: "Ratio Website", color: "var(--project-card-bg, #ffffff)", src: "ratio.png", href: "", category: "Web Development" },
  { title: "Jelajah Kalimantan Barat", color: "var(--project-card-bg, #ffffff)", src: "jelajahkalbar.png", href: "https://website-kalimantan-barat.vercel.app/", category: "Web Portal" },
];

const slider2 = [
  { title: "Kimia Farma Dashboard", color: "var(--project-card-bg, #ffffff)", src: "kimia-farma-dashboard.png", category: "Data Analytics" },
  { title: "Panda Project", color: "var(--project-card-bg, #ffffff)", src: "panda.jpg", category: "Branding" },
  { title: "Streamlit Gojek", color: "var(--project-card-bg, #ffffff)", src: "streamlit.png", category: "Machine Learning" },
  { title: "Wix Portfolio", color: "var(--project-card-bg, #ffffff)", src: "wix.jpg", category: "Web Design" },
];

const ProjectItem = ({ title, color, src, href, category }) => {
  const itemContent = (
    <motion.div 
      className={styles.project} 
      style={{ backgroundColor: color }}
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { scale: 1, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" },
        hover: { 
          scale: 1.03, 
          boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
          transition: { type: "spring", stiffness: 300, damping: 15 }
        }
      }}
    >
      <div className={styles.imageContainer}>
        <Image 
          src={`/images/${src}`} 
          alt={title || src} 
          fill 
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" 
          style={{ objectFit: 'cover' }} 
          quality={75}
        />
        <motion.div 
          className={styles.overlay}
          variants={{
            rest: { opacity: 0, y: 20 },
            hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
          }}
        >
          {title && <h3 className={styles.projectTitle}>{title}</h3>}
          {category && <p className={styles.projectCategory}>{category}</p>}
          {href && (
            <div className={styles.viewProjectLink}>
              View Project <FiArrowRight style={{ marginLeft: '0.25rem' }} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={styles.projectLinkWrapper}>
      {itemContent}
    </Link>
  ) : (
    <div className={styles.projectLinkWrapper}>{itemContent}</div> 
  );
};

const Slider = ({ data, xTransform, direction }) => (
  <motion.div style={{ x: xTransform }} className={`${styles.slider} ${direction === 'left' ? styles.sliderLeft : styles.sliderRight}`}>
    {[...data, ...data].map((item, index) => ( 
      <ProjectItem key={`${item.src}-${index}`} {...item} />
    ))}
  </motion.div>
);

export default function SlidingProjects() { 
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'], 
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]), springConfig);  
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], ["-5%", "25%"]), springConfig); 

  const decorativeLineHeight = useTransform(scrollYProgress, [0, 0.8, 1], ["80px", "40px", "5px"]); 
  const decorativeLineOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.6, 0.3, 0]);

  return (
    <div ref={containerRef} className={styles.slidingImagesContainer}>
      <motion.div 
        className={styles.sectionTitleContainer}
        initial={{opacity:0, y: -30}} 
        whileInView={{opacity:1, y:0}}
        viewport={{once: true, amount: 0.5}}
        transition={{duration: 0.6, ease:"circOut"}} 
      >
        <h2 className={styles.featuredProjectsTitle}>Featured Projects</h2> 
        <p className={styles.featuredProjectstitle}>A glimpse into my recent work and explorations.</p>
      </motion.div>

      <div className={styles.slidersWrapper}>
        <Slider data={slider1} xTransform={x1} direction="left" />
        <Slider data={slider2} xTransform={x2} direction="right"/>
      </div>

      <motion.div 
        style={{ height: decorativeLineHeight, opacity: decorativeLineOpacity }} 
        className={styles.decorativeLineContainer}
      >
        <div className={styles.decorativeLine} />
      </motion.div>
    </div>
  );
}
