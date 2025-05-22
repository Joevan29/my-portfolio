'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion, useInView, useAnimationControls } from 'framer-motion';

export default function Contact() {
  // Apply scroll fix on component mount
  useEffect(() => {
    // Reset any scroll locks that might be present
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'visible';
    document.documentElement.style.height = 'auto';
    
    // Clean up function to reset styles when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);
  const [activeIcon, setActiveIcon] = useState(null);
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: false, margin: "-100px" });
  const controls = useAnimationControls();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: "easeOut",
        duration: 0.8
      }
    }
  };
  
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { 
      href: "https://www.instagram.com/jvnprmnachmd/", 
      icon: <FaInstagram size={32} />, 
      name: "Instagram", 
      color: "from-purple-500 to-pink-500",
      hoverColor: "from-purple-600 to-pink-600" 
    },
    { 
      href: "https://www.linkedin.com/in/jvnpmrnachmd/", 
      icon: <FaLinkedin size={32} />, 
      name: "LinkedIn", 
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800" 
    },
    { 
      href: "https://github.com/joevan29", 
      icon: <FaGithub size={32} />, 
      name: "GitHub", 
      color: "from-gray-700 to-gray-900",
      hoverColor: "from-gray-800 to-black" 
    },
  ];

  return (
    <section 
      ref={contactRef}
      className="relative py-24 min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50"
      style={{ minHeight: '100vh', position: 'relative', overflowY: 'auto' }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-24 left-0 w-64 h-64 rounded-full bg-indigo-100 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-24 right-24 w-80 h-80 rounded-full bg-sky-100 opacity-40 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-100 opacity-30 blur-2xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 z-10 relative">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            className="inline-block text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
            variants={titleVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 mx-auto rounded-full mb-4"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I'm always open to new opportunities and collaborations. 
            Let's create something amazing together!
          </motion.p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Contact Form */}
          <motion.div 
            className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-center">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Send me a message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 outline-none resize-none"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium text-lg 
                    transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : "Send Message"}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          {/* Contact Details */}
          <motion.div className="space-y-8" variants={containerVariants}>
            {/* Personal Info */}
            <motion.div
              className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <motion.div 
                className="flex items-start space-x-4 mb-6"
                variants={itemVariants}
              >
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <a 
                    href="tel:+62895360037785" 
                    className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-200"
                  >
                    +62 895-3600-37785
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-4"
                variants={itemVariants}
              >
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a 
                    href="mailto:joevanpan@outlook.com" 
                    className="text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors duration-200"
                  >
                    joevanpan@outlook.com
                  </a>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100"
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect with me</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${social.color} text-white
                      transform transition-all duration-300 hover:shadow-lg`}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                      backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setActiveIcon(index)}
                    onMouseLeave={() => setActiveIcon(null)}
                  >
                    <motion.div
                      animate={activeIcon === index ? { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 1 } } : {}}
                    >
                      {social.icon}
                    </motion.div>
                    <span className="mt-2 font-medium text-sm">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.div 
        className="text-center mt-16 text-gray-500"
        variants={itemVariants}
      >
        <p>© {new Date().getFullYear()} Joevan Pramana Achmad. All rights reserved.</p>
      </motion.div>
    </section>
  );
}