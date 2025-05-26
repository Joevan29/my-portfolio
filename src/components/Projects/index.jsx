'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX } from 'react-icons/fi';

export const projects = [
  {
    title: "Kimia Farma Dashboard",
    src: "/images/kimia-farma-dashboard.png",
    color: "#3B82F6",
    date: "2025",
    client: "Rakamin Academy & Kimia Farma",
    description: "This project is part of a Project-Based Internship Program with Rakamin Academy and Kimia Farma. Created a comprehensive business intelligence dashboard to visualize sales performance and trends across multiple metrics. The dashboard provides real-time insights into revenue patterns, customer segmentation, and product performance across different regions."
  },
  {
    title: "Sentiment Analysis Gojek",
    src: "/images/streamlit.png",
    color: "#10B981",
    date: "2025",
    client: "Personal Project",
    description: "Sentiment analysis on user reviews of the Gojek application using Support Vector Machine algorithms. Created interactive visualizations with Streamlit to display sentiment trends and insights. The system processes thousands of reviews to extract meaningful patterns and provides actionable insights for business decision making."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleMoreProjects = () => {
    window.location.href = '/work';
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header - dengan padding top untuk avoid header fixed */}
      <div className="text-center pt-24 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-base md:text-lg"
        >
          Showcasing my work in data science and software development
        </motion.p>
      </div>
      
      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                  style={{ backgroundColor: `${project.color}20` }}
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs md:text-sm text-slate-400">{project.date}</span>
                  <span className="text-xs md:text-sm text-slate-400">{project.client}</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold mb-3">{project.title}</h3>
                
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
                
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  <span>View Details</span>
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* More Projects Button */}
        <motion.button
          onClick={handleMoreProjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto mt-12 flex items-center gap-3 px-6 py-3 border-2 border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-colors"
        >
          <span>More Projects</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiArrowRight />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto"
            onClick={closeModal}
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-slate-800 rounded-xl max-w-2xl w-full relative overflow-hidden shadow-2xl border border-slate-700"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-12 h-12 bg-slate-700/80 hover:bg-slate-600 rounded-full flex items-center justify-center z-20 transition-all duration-200 backdrop-blur-sm border border-slate-600"
                >
                  <FiX className="text-xl text-white" />
                </button>
                
                {/* Project Image */}
                <div className="relative">
                  <img 
                    src={selectedProject.src} 
                    alt={selectedProject.title}
                    className="w-full h-56 md:h-64 object-cover"
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"
                    style={{ backgroundColor: `${selectedProject.color}10` }}
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400">{selectedProject.date}</span>
                    <span className="text-slate-400">{selectedProject.client}</span>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold mb-6">{selectedProject.title}</h2>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-400">Overview</h3>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
