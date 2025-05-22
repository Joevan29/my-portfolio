"use client";

import { useState, useEffect } from 'react';

// Define custom icons
const FiArrowRight = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12,5 19,12 12,19"></polyline>
  </svg>
);

const FiExternalLink = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const FiGithub = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const FiDatabase = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const FiBrain = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const FiSettings = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const FiBarChart3 = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

// Simplified workProjects with just 4 projects
const workProjects = [
  {
    title: "Kimia Farma Dashboard",
    src: "/api/placeholder/400/250",
    color: "#3B82F6",
    icon: FiDatabase,
    url: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    github: "https://github.com/Joevan29/Big-Data-Analytics-Kimia-Farma",
    date: "2023",
    client: "Rakamin Academy & Kimia Farma",
    category: "Big Data Analytics",
    status: "Completed",
    technologies: ["Python", "MySQL", "Tableau", "Data Analysis", "Business Intelligence", "ETL"],
    description: "This project is part of a Project-Based Internship Program in collaboration between Rakamin Academy and Kimia Farma, focusing on Big Data Analytics. The program aims to enhance participants' understanding and skills as Big Data Analysts in a real-world business environment.",
    features: [
      "Interactive Business Intelligence Dashboard",
      "Real-time Sales Performance Tracking",
      "Comprehensive Data Visualization",
      "Multi-metric Analysis System",
      "Advanced Reporting Features"
    ],
    challenges: [
      "Processing large datasets efficiently",
      "Creating intuitive visualizations",
      "Implementing real-time updates"
    ]
  },
  {
    title: "Sentiment Analysis Gojek",
    src: "/api/placeholder/400/250",
    color: "#10B981",
    icon: FiBrain,
    url: "https://github.com/Joevan29/Streamlit",
    github: "https://github.com/Joevan29/Streamlit",
    date: "2023",
    client: "Personal Project",
    category: "Machine Learning",
    status: "Completed",
    technologies: ["Python", "SVM", "NLP", "Streamlit", "Data Visualization", "Scikit-learn"],
    description: "Sentiment analysis on user reviews of the Gojek application using the Support Vector Machine (SVM) method and interactive visualizations powered by Streamlit.",
    features: [
      "Support Vector Machine Implementation",
      "Natural Language Processing",
      "Interactive Web Interface",
      "Real-time Sentiment Prediction",
      "Comprehensive Analytics Dashboard"
    ],
    challenges: [
      "Text preprocessing and cleaning",
      "Model accuracy optimization",
      "Creating interactive visualizations"
    ]
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
    features: [
      "Digital License Management",
      "Secure Authentication System",
      "Mobile-First Design",
      "Document Verification",
      "Real-time Status Tracking"
    ],
    challenges: [
      "Security and privacy compliance",
      "Integration with existing systems",
      "User experience optimization"
    ]
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
    features: [
      "Customer Behavior Analysis",
      "Sales Trend Prediction",
      "Real-time Dashboards",
      "Automated Reporting",
      "Performance Optimization"
    ],
    challenges: [
      "Real-time data processing",
      "Scalable architecture design",
      "Advanced predictive modeling"
    ]
  }
];

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [detailView, setDetailView] = useState(null);
  
  // Get unique categories
  const categories = ["All", ...new Set(workProjects.map(project => project.category))];
  
  // Filter projects based on selected category
  const filteredProjects = filter === "All" 
    ? workProjects 
    : workProjects.filter(project => project.category === filter);
  
  const handleProjectClick = (project) => {
    setDetailView(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeDetailView = () => {
    setDetailView(null);
    document.body.style.overflow = 'auto';
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
  
  // Fix scrolling issue on component mount
  useEffect(() => {
    // Ensure the page is scrollable
    document.body.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans relative overflow-y-auto p-6 pt-24 mt-16">
      {/* Header section */}
      <div className="text-center mb-16 mt-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent mb-4">
          My Work
        </h2>
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="h-0.5 w-16 bg-teal-500"></div>
          <p className="text-gray-600 text-lg">
            A collection of projects spanning data science, machine learning, and software development
          </p>
          <div className="h-0.5 w-16 bg-teal-500"></div>
        </div>
      </div>
      
      {/* Category filter */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-6 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === category 
                ? 'bg-teal-500 text-white' 
                : 'bg-transparent text-teal-500 border-2 border-teal-500'
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {filteredProjects.map((project) => {
          const IconComponent = project.icon;
          return (
            <div 
              key={project.title}
              className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg hover:shadow-teal-400/20"
              onClick={() => handleProjectClick(project)}
            >
              {/* Status badge */}
              <div className="absolute top-4 right-4 py-1 px-3 rounded-full text-xs font-semibold z-10 text-white"
                style={{ backgroundColor: getStatusColor(project.status) }}>
                {project.status}
              </div>
              
              {/* Project image wrapper */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 z-10"
                  style={{ backgroundColor: `${project.color}40` }} />
                
                <div className="absolute top-4 left-4 w-14 h-14 rounded-lg flex items-center justify-center z-20"
                  style={{ backgroundColor: project.color }}>
                  <IconComponent size={30} color="white" />
                </div>
                
                <img 
                  src={project.src} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold uppercase"
                    style={{ color: project.color }}>
                    {project.category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {project.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {project.title}
                </h3>
                
                <p className="text-teal-500 text-sm mb-4">
                  {project.client}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {project.description.length > 120 
                    ? `${project.description.substring(0, 120)}...` 
                    : project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i}
                      className="py-1 px-3 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${project.color}15`,
                        color: project.color 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span 
                      className="py-1 px-3 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${project.color}15`,
                        color: project.color 
                      }}
                    >
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    {project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                        className="text-teal-500 hover:text-teal-600 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}>
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.url !== "#" && project.url !== project.github && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-600 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}>
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-teal-500 text-sm font-medium">
                    <span>View Details</span>
                    <FiArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Project detail modal */}
      {detailView && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-3xl my-8 overflow-auto relative border border-gray-200 text-gray-800">
            <button 
              className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full text-gray-800 text-2xl flex items-center justify-center z-10 transition-all duration-300 hover:bg-gray-300"
              onClick={closeDetailView}
            >
              ×
            </button>
            
            <div className="p-8 rounded-t-xl"
              style={{ background: `linear-gradient(135deg, ${detailView.color}20, transparent)` }}>
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold text-gray-800 m-0">
                    {detailView.title}
                  </h2>
                  <span className="py-1 px-4 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: getStatusColor(detailView.status) }}>
                    {detailView.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <span>{detailView.category}</span>
                  <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                  <span>{detailView.date}</span>
                  <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                  <span>{detailView.client}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-teal-500 text-xl mb-4">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{detailView.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-teal-500 text-xl mb-4">Key Features</h3>
                <ul className="text-gray-600 leading-relaxed pl-6">
                  {detailView.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-teal-500 text-xl mb-4">Technical Challenges</h3>
                <ul className="text-gray-600 leading-relaxed pl-6">
                  {detailView.challenges.map((challenge, i) => (
                    <li key={i} className="mb-2">{challenge}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-teal-500 text-xl mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {detailView.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="py-2 px-4 rounded-full text-sm font-medium"
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
              
              <div className="flex gap-4 justify-center mt-8">
                {detailView.github !== "#" && (
                  <a 
                    href={detailView.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 px-6 bg-transparent text-teal-500 border-2 border-teal-500 rounded-full font-semibold transition-all duration-300 hover:bg-teal-500 hover:bg-opacity-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiGithub size={20} />
                    <span>View on GitHub</span>
                  </a>
                )}
                
                {detailView.url !== "#" && detailView.url !== detailView.github && (
                  <a 
                    href={detailView.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 px-6 bg-teal-500 text-white border-2 border-teal-500 rounded-full font-semibold transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink size={20} />
                    <span>Live Project</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={closeDetailView}
          />
        </div>
      )}
    </div>
  );
}