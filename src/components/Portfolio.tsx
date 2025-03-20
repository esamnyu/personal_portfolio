"use client";

import React, { useState, useEffect } from 'react';
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
  
  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu when a section is selected
    }
  };

  // Project data with added links
  const projects: Project[] = [
    {
      title: "CSAW Phishing Detection Game",
      description: "Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot for cybersecurity education",
      tech: ["TensorFlow", "PyTorch", "Docker", "GPT-3"],
      metrics: "Best Challenge Award, 300+ participants, Earned Black Hat scholarship",
      github: "https://github.com/yourusername/phishing-detection"
    },
    {
      title: "Roomies App",
      description: "Co-founded and led development of a mobile application for roommate coordination with cryptography security and AI-driven decision making",
      tech: ["React Native", "Firestore", "Firebase", "AI/ML"],
      metrics: "Implemented LLM module for task aggregation, Improved user engagement",
      github: "https://github.com/yourusername/roomies-app",
      demo: "https://roomies-app.com"
    },
    {
      title: "Collegiate Elo Ranking System",
      description: "Engineered a comprehensive ranking system for collegiate esports competitions using MERN stack",
      tech: ["MongoDB", "Express", "React", "Node.js", "SaaS", "Azure"],
      metrics: "27% user engagement boost, 50% increase in competition participation",
      github: "https://github.com/yourusername/elo-ranking"
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
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">ES</div>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`text-sm ${
                        activeSection === link.id ? "text-blue-400 font-medium" : "text-gray-300 hover:text-white"
                      } transition-colors`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <button 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
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
                            ? "text-blue-400 font-medium bg-slate-700" 
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
      </header>
      
      {/* Hero Section */}
      <section id="home" className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Ethan Sam
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">   
              Cybersecurity Engineer | AI Enthusiast | CTF Player
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <a href="https://github.com/yourusername" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform" aria-label="GitHub">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/ethansam" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:es5888@nyu.edu" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              
              <button 
                onClick={() => setIsTerminalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                <TerminalIcon className="w-5 h-5 mr-2" />
                Access Terminal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="section-container">
          <h2 className="section-title">
            <Code className="section-icon" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="project-card border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="project-title">{project.title}</CardTitle>
                  <CardDescription className="project-description">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{project.metrics}</p>
                  <div className="flex space-x-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/50">
        <div className="section-container">
          <h2 className="section-title">
            <Briefcase className="section-icon" />
            Professional Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-6 relative">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-bold text-white">{exp.company}</h3>
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
                    <li key={hIndex} className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                    <p className="text-gray-400 text-sm">{edu.date}</p>
                    {edu.gpa && (
                      <p className="text-gray-400 text-sm ml-2">· GPA: {edu.gpa}</p>
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
          <h2 className="section-title">
            <Wrench className="section-icon" />
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Code className="w-5 h-5 mr-2 text-blue-400" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Security Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.security_tools.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  ML & AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.ml_ai.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Cpu className="w-5 h-5 mr-2 text-blue-400" />
                  Frameworks & Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Security Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.standards.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Wrench className="w-5 h-5 mr-2 text-blue-400" />
                  Other Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.other.map((skill, index) => (
                    <span key={index} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4">
        <div className="section-container">
          <h2 className="section-title">
            <Award className="section-icon" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 rounded-full p-3 mr-4">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="pt-2">{achievement}</p>
                  </div>
                </CardContent>
              </Card>
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
          <h2 className="section-title">
            <Mail className="section-icon" />
            Contact Me
          </h2>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
                I'm currently open to new opportunities and collaborations in cybersecurity and AI development.
                Feel free to reach out if you'd like to discuss potential projects or positions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-3" />
                  <a href="mailto:es5888@nyu.edu" className="text-gray-300 hover:text-white transition-colors">
                    es5888@nyu.edu
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="w-5 h-5 text-blue-400 mr-3" />
                  <a href="https://linkedin.com/in/ethansam" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/ethansam
                  </a>
                </div>
                <div className="flex items-center">
                  <Github className="w-5 h-5 text-blue-400 mr-3" />
                  <a href="https://github.com/esamnyu" className="text-gray-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                    github.com/esamnyu
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 Ethan Sam. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/ethansam" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:es5888@nyu.edu" className="text-gray-400 hover:text-white" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;