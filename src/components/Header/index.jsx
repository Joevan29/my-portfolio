'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion'; // AnimatePresence dan Nav tidak lagi diperlukan
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Rounded dan Magnetic mungkin tidak lagi diperlukan jika tombol menu dihapus,
// kecuali jika Magnetic digunakan pada item nav. Saya akan biarkan Magnetic untuk item nav.
import Magnetic from '../../common/Magnetic'; 

export default function IndexComponent() {
    const header = useRef(null);
    // isActive dan button (untuk menu) tidak lagi diperlukan
    // const [isActive, setIsActive] = useState(false);
    // const button = useRef(null); 
    const pathname = usePathname();
    const logoRef = useRef(null);
    const navRef = useRef(null); // Untuk kontainer nav items
    const [isScrolled, setIsScrolled] = useState(false);
    
    const isHomePage = pathname === '/';

    // useEffect untuk setIsActive(false) saat pathname berubah tidak lagi diperlukan
    // useEffect(() => {
    //     if (isActive) setIsActive(false);
    // }, [pathname]);

    useEffect(() => {
        // Animasi awal untuk logo dan item nav
        if (logoRef.current) { // Pastikan ref sudah ada
            gsap.fromTo(logoRef.current, 
                { y: -50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 } // Tambahkan sedikit delay
            );
        }
        
        // Pastikan selector .nav-item ada dan elemennya terlihat
        gsap.fromTo(`.${styles.el}`, // Menggunakan kelas dari module SCSS untuk konsistensi
            { y: -30, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 } // Delay sedikit lebih besar
        );
        
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const headerElement = header.current; // Gunakan ref header
            if (!headerElement) return;

            if (scrollPosition > 50) {
                if (!isScrolled) { // Hanya jalankan GSAP jika state berubah untuk efisiensi
                    setIsScrolled(true);
                    gsap.to(headerElement, { 
                        backgroundColor: isHomePage ? 'rgba(10, 25, 47, 0.85)' : 'rgba(245, 245, 250, 0.85)', 
                        backdropFilter: 'blur(10px)',
                        boxShadow: isHomePage ? '0 10px 30px -10px rgba(2, 12, 27, 0.7)' : '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                        padding: '15px 40px',
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            } else {
                if (isScrolled) { // Hanya jalankan GSAP jika state berubah
                    setIsScrolled(false);
                    gsap.to(headerElement, { 
                        backgroundColor: 'transparent', 
                        backdropFilter: 'none',
                        boxShadow: 'none',
                        padding: '20px 40px',
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            }
        };

        // Inisialisasi style header saat mount berdasarkan posisi scroll awal
        handleScroll(); // Panggil sekali untuk set style awal

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, isHomePage, isScrolled]); // Tambahkan isScrolled sebagai dependency

    useEffect(() => {
        const headerElement = header.current; // Gunakan ref
        if (!headerElement) return;

        const indicators = headerElement.querySelectorAll(`.${styles.indicator}`); // Selector lebih spesifik
        
        // Set warna teks dan indikator berdasarkan halaman
        let textColor, indicatorColor;
        if (isHomePage) {
            textColor = 'white';
            indicatorColor = 'white';
        } else {
            textColor = '#0a192f';
            indicatorColor = '#0a192f';
        }
        
        // Terapkan warna teks ke elemen yang relevan di dalam header
        // Ini lebih aman daripada headerElement.style.color = textColor; yang bisa menimpa semua
        const logoNameElement = headerElement.querySelector(`.${styles.name}`);
        const navLinkElements = headerElement.querySelectorAll(`.${styles.el} a`);

        if (logoNameElement) {
            // Untuk logo, styling warna 'Jopan' dan 'Pan' sudah diatur di SCSS,
            // Mungkin 'codeBy' atau 'copyright' yang perlu diubah warnanya.
            const codeByElement = logoNameElement.querySelector(`.${styles.codeBy}`);
            const copyrightElement = headerElement.querySelector(`.${styles.copyright}`);
            if (codeByElement) codeByElement.style.color = textColor === 'white' ? 'rgba(255,255,255,0.75)' : textColor;
            if (copyrightElement) { // Asumsikan copyright juga mengikuti tema
                 // Anda mungkin perlu menyesuaikan ini jika copyright punya warna gradien spesifik
            }
        }
        navLinkElements.forEach(link => link.style.color = textColor);


        indicators.forEach(indicator => {
            indicator.style.backgroundColor = indicatorColor;
            indicator.style.transform = 'scaleX(0)'; // Reset scale ke scaleX
        });

        const pages = {
            '/about': `.${styles.el}[data-navtitle="About"] .${styles.indicator}`,
            '/work': `.${styles.el}[data-navtitle="Work"] .${styles.indicator}`,
            '/contact': `.${styles.el}[data-navtitle="Contact"] .${styles.indicator}`
        };
        
        if (pages[pathname]) {
            const activeIndicator = headerElement.querySelector(pages[pathname]);
            if (activeIndicator) {
                activeIndicator.style.transform = 'scaleX(1)'; // Ubah ke scaleX untuk animasi lebar
            }
        }
    }, [pathname, isHomePage]);

    // useLayoutEffect untuk button tidak lagi diperlukan
    // useLayoutEffect(() => { ... });

    const navItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.4 + i * 0.07, // Sesuaikan delay agar sinkron dengan GSAP
                duration: 0.4,      // Sesuaikan durasi
                ease: [0.6, 0.05, 0.01, 0.9]
            }
        }),
        hover: {
            y: -2, // Efek hover lebih subtle
            transition: { duration: 0.2, ease: "easeInOut" }
        }
    };

    const logoVariants = {
        initial: { opacity: 0, y: -30 }, // Sesuaikan initial state
        animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.7, // Sesuaikan durasi
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1 // Sesuaikan delay
            }
        },
        hover: {
            scale: 1.03, // Hover lebih subtle
            // rotate: 2, // Rotasi kecil jika diinginkan
            transition: { duration: 0.2, ease: "easeInOut" }
        }
    };
    
    // Kelas header dinamis, tidak perlu lagi styles.lightHeader jika warna diatur via JS
    const headerClass = `${styles.header} ${isScrolled ? styles.scrolled : ''}`;

    return (
        <>
            {/* Header akan selalu ditampilkan, kelas 'hidden md:block' dihapus agar konsisten */}
            {/* Jika ingin header ini hanya untuk desktop, tambahkan kembali 'hidden md:flex' atau sejenisnya */}
            <motion.div 
                ref={header} 
                className={headerClass}
                id='header' // ID dipertahankan untuk GSAP target
                // Animasi masuk header utama bisa disederhanakan atau dihapus jika logo & nav sudah dianimasikan
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9], delay: 0 }}
            >
                {/* Logo di kiri */}
                <a href="/">
                    <motion.div 
                        className={`${styles.logo} ${!isHomePage ? styles.darkLogo : ''}`} // darkLogo mungkin perlu penyesuaian
                        ref={logoRef}
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                    >
                        <motion.div 
                            className={styles.logoGlow}
                            animate={{ 
                                opacity: [0.15, 0.4, 0.15], // Opacity lebih subtle
                                scale: [1, 1.03, 1]      // Scale lebih subtle
                            }}
                            transition={{ 
                                duration: 3.5, // Durasi sedikit lebih lama
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
                
                {/* Navigasi di kanan */}
                <motion.div 
                    className={styles.nav} // Pastikan .nav di SCSS mengatur item ke kanan
                    ref={navRef}
                    initial="hidden" // Parent untuk stagger
                    animate="visible"  // Parent untuk stagger
                    // initial={{ opacity: 0 }} // Bisa juga animasi sederhana untuk container nav
                    // animate={{ opacity: 1 }}
                    // transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {[
                        { title: 'Work', href: '/work', indicatorClass: 'work-indicator' },
                        { title: 'About', href: '/about', indicatorClass: 'about-indicator' },
                        { title: 'Contact', href: '/contact', indicatorClass: 'contact-indicator' }
                    ].map((item, i) => (
                        <Magnetic key={item.title}>
                            <motion.div 
                                className={`${styles.el} ${pathname === item.href ? styles.active : ''}`}
                                custom={i} // Untuk delay stagger
                                variants={navItemVariants}
                                // initial, animate akan di-inherit dari parent jika tidak di-override
                                whileHover="hover"
                                data-navtitle={item.title} // Untuk selector JS active indicator
                            >
                                <a href={item.href}>{item.title}</a>
                                <motion.div 
                                    // Kelas 'indicator' & item.indicatorClass masih bisa dipakai untuk JS
                                    // Tapi animasi hover indikator lebih baik via Framer Motion atau CSS transisi murni
                                    className={`${styles.indicator} indicator ${item.indicatorClass}`}
                                    // Contoh animasi hover murni Framer Motion untuk indicator (bukan GSAP/JS DOM manipulation lagi)
                                    // initial={{ scaleX: 0 }}
                                    // animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                                    // whileHover={{ scaleX: 1 }} // Bisa juga seperti ini jika hanya hover
                                    // transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </motion.div>
                        </Magnetic>
                    ))}
                </motion.div>
                
                {/* Tombol menu dan Nav component DIHILANGKAN */}
                {/* <motion.div ref={button} className={styles.headerButtonContainer} ... /> */}
            </motion.div>
            
            {/* <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence> */}
        </>
    );
}
