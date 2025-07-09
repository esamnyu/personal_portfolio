"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Shield, Brain, Download, ExternalLink, Code, Briefcase, GraduationCap, Award, Terminal as TerminalIcon, Cpu, Wrench, Camera, Menu, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import ContactForm from '@/components/ContactForm';
import Terminal from './Terminal';
import TerminalButton from './TerminalButton';
import AdventureCarousel from './AdventureCarousel';
// import { terminalStorage } from '@/utils/terminalSecurity';

// Define interfaces for data structures
interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string;
  github?: string;
  demo?: string;
}

interface Experience {
  company: string;
  role: string;
  date: string;
  highlights: string[];
  location?: string;
}

interface Education {
  school: string;
  degree: string;
  date: string;
  highlights: string[];
  gpa?: string;
}

interface Skills {
  languages: string[];
  security_tools: string[];
  frameworks: string[];
  standards: string[];
  ml_ai: string[];
  other: string[];
}

// Typed role component
const TypedRole: React.FC = () => {
  const roles = ['Cybersecurity Engineer', 'AI Enthusiast', 'CTF Player'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentFullText = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(prev => {
          if (isDeleting) {
            return currentFullText.substring(0, prev.length - 1);
          } else {
            return currentFullText.substring(0, prev.length + 1);
          }
        });
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);
  
  return (
    <p className="hero-subtitle">
      <span className="text-slate-400">{displayText}</span>
      <span className="animate-pulse">|</span>
    </p>
  );
};

// Project Card Component with 3D hover effect
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };
  
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;
  
  return (
    <Card 
      ref={cardRef}
      className="project-card h-full cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateZ(10px)' : ''}`
      }}
    >
      <CardHeader>
        <CardTitle className="project-title">{project.title}</CardTitle>
        <CardDescription className="project-description">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <motion.span 
              key={techIndex} 
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <p className="text-sm text-gray-300 mb-4">
          <span className="metric-text">{project.metrics}</span>
        </p>
        <div className="flex space-x-3">
          {project.github && (
            <a 
              href={project.github} 
              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-1 transition-transform group-hover:rotate-12" />
              GitHub
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-1 transition-transform group-hover:scale-110" />
              Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Navigation links
const navLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "adventures", label: "Adventures" },
  { id: "contact", label: "Contact" }
];

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTerminalTip, setShowTerminalTip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // After 3 seconds of page load, show terminal tip if terminal hasn't been opened
  useEffect(() => {
    if (!isTerminalOpen) {
      const timer = setTimeout(() => {
        setShowTerminalTip(true);
        
        // Hide the tip after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowTerminalTip(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);
  
  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    // First close the mobile menu
    setIsMobileMenuOpen(false);
    
    // Then use a small timeout to allow the menu animation to complete
    // before scrolling to the section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }, 300); // Match this to your menu animation duration
  };

  // Project data with added links
  const projects: Project[] = [
    {
      title: "CSAW Phishing Detection Game",
      description: "Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot for cybersecurity education",
      tech: ["TensorFlow", "PyTorch", "Docker", "GPT-3"],
      metrics: "Best Challenge Award, 300+ participants, Earned Black Hat scholarship",
      github: "https://github.com/esamnyu/phishing-detection"
    },
    {
      title: "Roomies App",
      description: "Co-founded and led development of a mobile application for roommate coordination with cryptography security and AI-driven decision making",
      tech: ["React Native", "Firestore", "Firebase", "AI/ML"],
      metrics: "Implemented LLM module for task aggregation, Improved user engagement",
      github: "https://github.com/esamnyu/roomies-app",
      demo: "https://roomies-app.com"
    },
    {
      title: "Collegiate Elo Ranking System",
      description: "Engineered a comprehensive ranking system for collegiate esports competitions using MERN stack",
      tech: ["MongoDB", "Express", "React", "Node.js", "SaaS", "Azure"],
      metrics: "27% user engagement boost, 50% increase in competition participation",
      github: "https://github.com/esamnyu/elo-ranking"
    }
  ];

  // Experience data
  const experiences: Experience[] = [
    {
      company: "Roomies",
      role: "Co-Founder & Lead Developer",
      date: "February 2024 - Present",
      location: "New York, NY",
      highlights: [
        "Implemented cryptography techniques to secure user data and incorporated structured feedback loops",
        "Developed community-driven AI framework for household challenges inspired by Waze",
        "Created LLM-powered module for task aggregation and anonymous proposal submission",
        "Demonstrated AI's practical value with 'Task Transform' feature for non-technical users"
      ]
    },
    {
      company: "NYU Langone Medical Center",
      role: "AI & Cybersecurity Intern",
      date: "May 2024 - August 2024",
      location: "New York, NY",
      highlights: [
        "Developed AI-driven chatbot reducing manual policy queries by 30% and enhancing security",
        "Improved threat detection accuracy by 20% and rates by 40% using CrowdStrike Falcon & IBM QRadar",
        "Increased response efficiency for high-risk devices by 15% by refining Cortex XSoar playbooks",
        "Strengthened infrastructure security by 25% through automated vulnerability management"
      ]
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Auditor",
      date: "December 2021 - August 2023",
      location: "New York, NY",
      highlights: [
        "Administered ICS security assessments across 50+ mission-critical OT/ICS systems",
        "Identified and remediated 100+ cybersecurity vulnerabilities across NYC agencies",
        "Reduced non-compliance issues by 20% using NIST frameworks",
        "Strengthened cybersecurity framework by identifying vulnerabilities in operating systems"
      ]
    },
    {
      company: "Electronic Gaming Federation",
      role: "Software Engineer Intern",
      date: "January 2020 - June 2020",
      location: "New York, NY",
      highlights: [
        "Engineered collegiate Elo ranking system using MERN stack with 27% boost in user engagement",
        "Enhanced security and scalability using SaaS and Azure services, supporting 100+ institutions",
        "Implemented cryptography protocols to strengthen system against security breaches"
      ]
    },
    {
      company: "Codepath.org",
      role: "Cybersecurity Fellowship",
      date: "September 2018 - September 2019",
      location: "New York, NY",
      highlights: [
        "Led recruitment and facilitated cohort-based cybersecurity program for 40+ individuals",
        "Achieved 70% placement rate for program participants",
        "Conducted training on incident response, information security and SaaS applications"
      ]
    }
  ];

  // Education data
  const education: Education[] = [
    {
      school: "New York University, Tandon School of Engineering",
      degree: "M.S. Cybersecurity",
      date: "August 2022 - June 2025",
      gpa: "3.96",
      highlights: [
        "Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography",
        "Advanced Studies: Penetration Testing, Vulnerability Analysis, Threat Intelligence, AI & ML"
      ]
    },
    {
      school: "City University of New York: Hunter College",
      degree: "B.S. Computer Science",
      date: "August 2017 - June 2021",
      gpa: "3.76",
      highlights: []
    }
  ];

  // Skills data
  const skills: Skills = {
    languages: ["Python", "JavaScript", "C++", "SQL", "Bash", "HTML/CSS"],
    security_tools: ["CrowdStrike Falcon", "IBM QRadar", "Splunk", "Cortex XSoar", "EnCase", "Wireshark"],
    frameworks: ["React Native", "MERN Stack", "Docker", "Git", "Azure", "Firebase/Firestore"],
    standards: ["NIST CSF", "NIST SP-800-53"],
    ml_ai: ["TensorFlow", "PyTorch", "Generative AI", "LLM Integration", "Computer Vision"],
    other: ["Agile", "Data Structures & Algorithms", "Operating Systems", "Computer Networking", "Digital Forensics", "Vulnerability Management"]
  };

  const achievements: string[] = [
    "Best Challenge Award - Cyber Security Awareness Week @ NYU",
    "Black Hat Briefings Scholarship Recipient",
    "70% Placement Rate for Codepath.org Cybersecurity Program",
    "180 Christian Fellowship – President (Fall 2024)",
    "Enhanced threat detection by 40% with custom security solutions"
  ];

  // Adventure images data
  const adventureImages = [
    {
      src: "/images/adventures/arch_zoomed_out.jpeg",
      alt: "Delicate Arch at sunset",
      location: "Arches National Park, Utah",
      caption: "Watching the sunset at the iconic Delicate Arch"
    },
    {
      src: "/images/adventures/arch.jpeg",
      alt: "Closer view of Delicate Arch at twilight",
      location: "Arches National Park, Utah",
      caption: "The magnificent silhouette of Delicate Arch against the twilight sky"
    },
    {
      src: "/images/adventures/roadtrip_colorado.jpeg",
      alt: "Group selfie in snowy mountains",
      location: "Rocky Mountains, Colorado",
      caption: "Winter road trip with friends through the Colorado Rockies"
    },
    {
      src: "/images/adventures/so_cold.jpeg",
      alt: "Person sitting in canyon water",
      location: "The Narrows, Zion National Park",
      caption: "Taking a moment to reflect in the cold waters of a slot canyon"
    },
    {
      src: "/images/adventures/the_shallows.jpeg",
      alt: "Friends hiking through a slot canyon",
      location: "Zion National Park, Utah",
      caption: "Exploring the stunning narrow canyons with the crew"
    }
  ];


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ParticlesBackground />
      
      {/* Terminal Button */}
      <TerminalButton onClick={() => setIsTerminalOpen(true)} />
      
      {/* Terminal Tip Message */}
      {showTerminalTip && (
        <div className="fixed bottom-20 right-6 z-40 max-w-xs bg-black bg-opacity-90 text-green-400 p-4 rounded-lg border border-green-500 shadow-lg font-mono text-sm animate-pulse">
          <p>Psst! Try the terminal for a more interactive experience...</p>
          <div className="absolute w-4 h-4 bg-black border-r border-b border-green-500 transform rotate-45 -bottom-2 right-6"></div>
        </div>
      )}
      
      {/* Terminal Component */}
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      {/* Navigation Bar */}
      <motion.header 
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-md border-b border-slate-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 font-heading"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ES
            </motion.div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`relative text-sm px-3 py-2 transition-colors group ${
                        activeSection === link.id 
                          ? "text-blue-400 font-medium" 
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 transform origin-left transition-transform duration-300 ${
                          activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <motion.button 
                className="text-gray-300 hover:text-white transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-slate-800 shadow-lg"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-3">
                <ul className="space-y-3">
                  {navLinks.map(link => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className={`text-sm w-full text-left py-2 px-3 rounded block ${
                          activeSection === link.id 
                            ? "text-blue-500 font-medium bg-slate-700" 
                            : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                        } transition-colors`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Hero Section */}
      <section id="home" className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1 
              className="hero-title animate-text-shimmer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              Ethan Sam
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <TypedRole />
            </motion.div>
            <motion.div 
              className="flex justify-center space-x-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <a href="https://github.com/esamnyu" className="social-link" aria-label="GitHub">
                <Github className="social-icon" />
              </a>
              <a href="https://linkedin.com/in/ethansam" className="social-link" aria-label="LinkedIn">
                <Linkedin className="social-icon" />
              </a>
              <a href="mailto:es5888@nyu.edu" className="social-link" aria-label="Email">
                <Mail className="social-icon" />
              </a>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <button 
                onClick={() => setIsTerminalOpen(true)}
                className="btn-primary inline-flex items-center group"
              >
                <TerminalIcon className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Access Terminal
              </button>
              <a 
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="px-6 py-3 font-medium rounded-lg border-2 border-slate-600 hover:border-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
              >
                View Projects
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Code className="section-icon" />
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/50">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Briefcase className="section-icon" />
            Professional Experience
          </motion.h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="border-l-2 border-blue-500/50 pl-6 relative hover:border-blue-500 transition-colors duration-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0 shadow-lg shadow-blue-500/50"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                </motion.div>
                <h3 className="text-xl font-bold text-white font-heading">{exp.company}</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <p className="text-blue-400 font-medium">{exp.role}</p>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <p className="text-gray-400 text-sm">{exp.date}</p>
                    {exp.location && (
                      <p className="text-gray-400 text-sm ml-2">· {exp.location}</p>
                    )}
                  </div>
                </div>
                <ul className="mt-3 space-y-2">
                  {exp.highlights.map((highlight, hIndex) => (
                    <motion.li 
                      key={hIndex} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + hIndex * 0.05 }}
                    >
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span className="text-gray-300">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="section-container">
          <h2 className="section-title">
            <GraduationCap className="section-icon" />
            Education
          </h2>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-violet-500 pl-6 relative">
                <div className="absolute w-4 h-4 bg-violet-500 rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-bold text-white">{edu.school}</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <p className="text-violet-400 font-medium">{edu.degree}</p>
                  <div className="flex items-center mt-1 sm:mt-0">
                    <p className="text-gray-300 text-sm">{edu.date}</p>
                    {edu.gpa && (
                      <p className="text-gray-300 text-sm ml-2">· GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
                {edu.highlights.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {edu.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start">
                        <span className="text-violet-400 mr-2 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-800/50">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Wrench className="section-icon" />
            Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Code, title: "Languages", skills: skills.languages },
              { icon: Shield, title: "Security Tools", skills: skills.security_tools },
              { icon: Brain, title: "ML & AI", skills: skills.ml_ai },
              { icon: Cpu, title: "Frameworks & Tools", skills: skills.frameworks },
              { icon: Shield, title: "Security Standards", skills: skills.standards },
              { icon: Wrench, title: "Other Skills", skills: skills.other }
            ].map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className="glass-card hover:border-blue-500/50 transition-all duration-300 h-full group">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white font-heading">
                      <category.icon className="w-5 h-5 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, index) => (
                        <motion.span 
                          key={index} 
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: categoryIndex * 0.1 + index * 0.02 }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Award className="section-icon" />
            Achievements
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card hover:border-blue-500/50 transition-all duration-300 group hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <motion.div 
                        className="flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-full p-3 mr-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Award className="w-6 h-6 text-blue-400 glow-blue" />
                      </motion.div>
                      <p className="pt-2 text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventures Section - Uncommented and improved */}
      <section id="adventures" className="py-20 px-4 bg-slate-800/50">
        <div className="section-container">
          <h2 className="section-title">
            <Camera className="section-icon" />
            Adventures
          </h2>
          <div className="space-y-8">
            <p className="text-gray-300 max-w-3xl mx-auto text-center mb-8">
              Life isn't just about code and cybersecurity. Here are some glimpses into my adventures around the world 
              when I'm not behind a keyboard.
            </p>
            <AdventureCarousel images={adventureImages} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="section-icon" />
            Contact Me
          </motion.h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-heading">Get In Touch</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm currently open to new opportunities and collaborations in cybersecurity and AI development.
                Feel free to reach out if you'd like to discuss potential projects or positions.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Mail, text: 'es5888@nyu.edu', href: 'mailto:es5888@nyu.edu' },
                  { icon: Linkedin, text: 'linkedin.com/in/ethansam', href: 'https://linkedin.com/in/ethansam', external: true },
                  { icon: Github, text: 'github.com/esamnyu', href: 'https://github.com/esamnyu', external: true }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <contact.icon className="w-5 h-5 text-blue-400 mr-3 group-hover:text-blue-300 transition-colors glow-blue" />
                    <a 
                      href={contact.href} 
                      className="text-gray-300 hover:text-white transition-colors relative overflow-hidden"
                      {...(contact.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {contact.text}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">© 2025 Ethan Sam. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://github.com/esamnyu" className="text-gray-300 hover:text-white" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/ethansam" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:es5888@nyu.edu" className="text-gray-300 hover:text-white" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;