"use client";

import { useState, useEffect } from 'react';

// --- Custom Icons ---
const FiArrowRight = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12,5 19,12 12,19"></polyline>
  </svg>
);

const FiExternalLink = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const FiGithub = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const FiDatabase = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const FiBrain = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const FiSettings = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const FiBarChart3 = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

const FiArrowUpCustom = ({ size = 20, className = "", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

// Icon untuk tombol "Kembali" atau "Home" di mobile
const FiArrowLeftCustom = ({ size = 20, className = "", ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);


// --- Data Proyek ---
const workProjects = [
  {
    title: "Kimia Farma Dashboard",
    src: "images/kimia-farma-dashboard.png",
    color: "#3B82F6",
    icon: FiDatabase,
    url: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    github: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    date: "2025",
    client: "Rakamin Academy & Kimia Farma",
    category: "Big Data Analytics",
    status: "Completed",
    technologies: ["Python", "MySQL", "Tableau", "Data Analysis", "Business Intelligence", "ETL"],
    description: "This project is part of a Project-Based Internship Program in collaboration between Rakamin Academy and Kimia Farma, focusing on Big Data Analytics. The program aims to enhance participants' understanding and skills as Big Data Analysts in a real-world business environment.",
    features: ["Interactive Business Intelligence Dashboard", "Real-time Sales Performance Tracking", "Comprehensive Data Visualization", "Multi-metric Analysis System", "Advanced Reporting Features"],
    challenges: ["Processing large datasets efficiently", "Creating intuitive visualizations", "Implementing real-time updates"]
  },
  {
    title: "Sentiment Analysis Gojek",
    src: "images/streamlit.png",   
    color: "#10B981",
    icon: FiBrain,
    url: "https://github.com/Joevan29/Streamlit",
    github: "https://github.com/Joevan29/Streamlit",
    date: "2025",
    client: "Personal Project",
    category: "Machine Learning",
    status: "Completed",
    technologies: ["Python", "SVM", "NLP", "Streamlit", "Data Visualization", "Scikit-learn"],
    description: "Sentiment analysis on user reviews of the Gojek application using the Support Vector Machine (SVM) method and interactive visualizations powered by Streamlit.",
    features: ["Support Vector Machine Implementation", "Natural Language Processing", "Interactive Web Interface", "Real-time Sentiment Prediction", "Comprehensive Analytics Dashboard"],
    challenges: ["Text preprocessing and cleaning", "Model accuracy optimization", "Creating interactive visualizations"]
  },
  {
    title: "Digital SIM Management",
    src: "/api/placeholder/400/250",
    color: "#F59E0B",
    icon: FiSettings,
    url: "#",
    github: "#",
    date: "2024",
    client: "Research Project",
    category: "System Design",
    status: "In Development",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "REST API"],
    description: "A project study on digital driver's license (SIM) information system management in Indonesia, focusing on improving the efficiency and accessibility of public services.",
    features: ["Digital License Management", "Secure Authentication System", "Mobile-First Design", "Document Verification", "Real-time Status Tracking"],
    challenges: ["Security and privacy compliance", "Integration with existing systems", "User experience optimization"]
  },
  {
    title: "E-Commerce Analytics",
    src: "/api/placeholder/400/250",
    color: "#8B5CF6",
    icon: FiBarChart3,
    url: "#",
    github: "#",
    date: "2024",
    client: "Personal Project",
    category: "Data Analytics",
    status: "Planning",
    technologies: ["Python", "Pandas", "Power BI", "SQL Server", "Apache Spark"],
    description: "Comprehensive e-commerce analytics platform for tracking customer behavior, sales trends, and business performance metrics.",
    features: ["Customer Behavior Analysis", "Sales Trend Prediction", "Real-time Dashboards", "Automated Reporting", "Performance Optimization"],
    challenges: ["Real-time data processing", "Scalable architecture design", "Advanced predictive modeling"]
  }
];

// --- Komponen Utama ---
export default function Work() {
  const [filter, setFilter] = useState("All");
  const [detailView, setDetailView] = useState(null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  
  const categories = ["All", ...new Set(workProjects.map(project => project.category))];
  
  const filteredProjects = filter === "All" 
    ? workProjects 
    : workProjects.filter(project => project.category === filter);
  
  const handleProjectClick = (project) => {
    setDetailView(project);
  };
  
  const closeDetailView = () => {
    setDetailView(null);
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#10B981';
      case 'In Development': return '#F59E0B';
      case 'Planning': return '#8B5CF6';
      case 'Research Phase': return '#EF4444';
      default: return '#6B7280';
    }
  };
  
  useEffect(() => {
    if (detailView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [detailView]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans relative p-6 pt-6 md:pt-20"> {/* pt-20 untuk desktop, pt-6 untuk mobile */}

      {/* Header Utama Halaman "My Work" */}
      <div className="text-center mb-12 md:mb-16"> {/* Padding atas untuk section ini sekarang diatur oleh div utama atau tombol home mobile */}
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-3 md:mb-4">
          My Work
        </h2>
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-4">
          <div className="h-0.5 w-12 md:w-16 bg-teal-500"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-xl">
            A collection of projects spanning data science, machine learning, and software development.
          </p>
          <div className="h-0.5 w-12 md:w-16 bg-teal-500"></div>
        </div>
      </div>
      
      <div className="flex justify-center gap-3 md:gap-4 mb-10 md:mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-5 md:px-6 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 ${
              filter === category 
                ? 'bg-teal-500 text-white shadow-md' 
                : 'bg-gray-100 text-teal-600 hover:bg-teal-100 hover:text-teal-700 border border-gray-200'
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {filteredProjects.map((project) => {
          const IconComponent = project.icon;
          return (
            <div 
              key={project.title}
              className="relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ease-out border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 flex flex-col"
              onClick={() => handleProjectClick(project)}
            >
              <div className="absolute top-4 right-4 py-1 px-3 rounded-full text-xs font-semibold z-10 text-white shadow-sm"
                style={{ backgroundColor: getStatusColor(project.status) }}>
                {project.status}
              </div>
              
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <div className="absolute inset-0 z-0"
                  style={{ backgroundColor: `${project.color}1A` }} /> 
                
                <div className="absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center z-[5]"
                  style={{ backgroundColor: project.color }}>
                  <IconComponent size={28} color="white" />
                </div>
                
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5 md:p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm font-semibold uppercase"
                    style={{ color: project.color }}>
                    {project.category}
                  </span>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    {project.date}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-800">
                  {project.title}
                </h3>
                
                <p className="text-teal-600 text-xs sm:text-sm mb-3 font-medium">
                  {project.client}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i}
                      className="py-1 px-2.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span 
                      className="py-1 px-2.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${project.color}20`,
                        color: project.color 
                      }}
                    >
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                  <div className="flex gap-4">
                    {project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                        className="text-gray-500 hover:text-teal-500 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}>
                        <FiGithub size={18} />
                      </a>
                    )}
                    {project.url !== "#" && project.url !== project.github && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer"
                        className="text-gray-500 hover:text-teal-500 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}>
                        <FiExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-teal-500 text-sm font-medium hover:text-teal-600 transition-colors duration-200">
                    <span>Details</span>
                    <FiArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {detailView && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 transition-opacity duration-300 ease-in-out ${detailView ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={closeDetailView}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-200 text-gray-800 shadow-2xl flex flex-col transition-all duration-300 ease-in-out"
            style={{ transform: detailView ? 'scale(1)' : 'scale(0.95)', opacity: detailView ? 1 : 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 text-xl md:text-2xl flex items-center justify-center z-20 transition-colors duration-200"
              onClick={closeDetailView}
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <div className="p-6 md:p-8 rounded-t-xl bg-white border-b border-gray-100"
              style={{ background: `linear-gradient(135deg, ${detailView.color}1A, transparent)` }}
            >
              <div className="mb-3 md:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-1 md:mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 m-0">
                    {detailView.title}
                  </h2>
                  <span className="mt-1 sm:mt-0 py-1 px-3 rounded-full text-xs font-semibold text-white self-start"
                    style={{ backgroundColor: getStatusColor(detailView.status) }}>
                    {detailView.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-500 text-xs md:text-sm">
                  <span>{detailView.category}</span>
                  <div className="w-1 h-1 bg-teal-400 rounded-full hidden sm:block"></div>
                  <span>{detailView.date}</span>
                  <div className="w-1 h-1 bg-teal-400 rounded-full hidden sm:block"></div>
                  <span className="truncate max-w-xs">{detailView.client}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{color: detailView.color}}>Overview</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{detailView.description}</p>
              </div>
              
              {detailView.features && detailView.features.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{color: detailView.color}}>Key Features</h3>
                  <ul className="text-gray-700 leading-relaxed pl-5 text-sm md:text-base list-disc">
                    {detailView.features.map((feature, i) => (
                      <li key={i} className="mb-1.5">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {detailView.challenges && detailView.challenges.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{color: detailView.color}}>Technical Challenges</h3>
                  <ul className="text-gray-700 leading-relaxed pl-5 text-sm md:text-base list-disc">
                    {detailView.challenges.map((challenge, i) => (
                      <li key={i} className="mb-1.5">{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{color: detailView.color}}>Technologies Used</h3>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {detailView.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="py-1.5 px-3 md:py-2 md:px-4 rounded-full text-xs md:text-sm font-medium"
                      style={{ 
                        backgroundColor: `${detailView.color}20`,
                        color: detailView.color 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8 pt-6 border-t border-gray-100">
                {detailView.github !== "#" && (
                  <a 
                    href={detailView.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-5 md:py-3 md:px-6 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors duration-200 text-sm md:text-base"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={18} />
                    <span>View on GitHub</span>
                  </a>
                )}
                
                {detailView.url !== "#" && detailView.url !== detailView.github && (
                  <a 
                    href={detailView.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-5 md:py-3 md:px-6 text-white rounded-lg font-semibold transition-opacity duration-200 text-sm md:text-base"
                    style={{backgroundColor: detailView.color}}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={18} />
                    <span>Live Project</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Scroll to Top */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out z-30 opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-300"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <FiArrowUpCustom size={20} />
        </button>
      )}
    </div>
  );
}
