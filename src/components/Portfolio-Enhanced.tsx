"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Shield, Brain, Download, ExternalLink, Code, Briefcase, GraduationCap, Award, Terminal as TerminalIcon, Cpu, Wrench, Camera, Menu, X } from 'lucide-react';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { HeroSection } from '@/components/HeroSection';
import { SkillsSection } from '@/components/SkillsSection';
import { TimelineItem } from '@/components/TimelineItem';
import ParticlesBackground from './ParticlesBackground';
import ContactForm from '@/components/ContactForm';
import Terminal from './Terminal';
import TerminalButton from './TerminalButton';
import AdventureCarousel from './AdventureCarousel';

// Enhanced Project Card Component
const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <EnhancedCard className="project-card h-full">
        <div className="p-6">
          <h3 className="project-title text-2xl mb-3">{project.title}</h3>
          <p className="project-description mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span 
                key={techIndex} 
                className="tech-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <p className="text-sm text-gray-300 mb-4">{project.metrics}</p>
          
          <div className="flex space-x-3">
            {project.github && (
              <MagneticButton
                className="inline-flex items-center text-sm text-blue-500 hover:text-blue-400"
                strength={0.2}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  aria-label="View project on GitHub"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </a>
              </MagneticButton>
            )}
            {project.demo && (
              <MagneticButton
                className="inline-flex items-center text-sm text-blue-500 hover:text-blue-400"
                strength={0.2}
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                  aria-label="View live demo"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </EnhancedCard>
    </motion.div>
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


const PortfolioEnhanced: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTerminalTip, setShowTerminalTip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Projects data
  const projects = [
    {
      title: "Phishing Detection Game",
      description: "Created an interactive educational tool for CSAW to help users identify sophisticated phishing attempts. Combined CNN-based image analysis with GPT-3 powered chatbot.",
      tech: ["TensorFlow", "PyTorch", "Docker", "GPT-3", "React"],
      metrics: "Best Challenge Award, 300+ participants"
    },
    {
      title: "Roomies App",
      description: "Co-founded a mobile app for roommate coordination with robust security. Implemented cryptography techniques and consensus-driven AI framework for household challenges.",
      tech: ["React Native", "Firebase", "AI/ML", "Cryptography"],
      metrics: "Enhanced user engagement, improved communication"
    },
    {
      title: "Collegiate Elo Ranking",
      description: "Built a comprehensive ranking system for collegiate esports competitions using the MERN stack. Enhanced security and scalability using SaaS and Azure services.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Azure"],
      metrics: "27% user engagement boost, 50% participation increase"
    }
  ];

  // Experience data
  const experiences = [
    {
      company: "Roomies",
      role: "Co-Founder & Lead Developer",
      date: "Feb 2024 - Present",
      location: "New York, NY",
      highlights: [
        "Implemented cryptography techniques to secure sensitive user data",
        "Developed consensus-driven AI framework inspired by Waze for household challenges",
        "Created LLM-powered module for task aggregation and anonymous proposal submission",
        "Built 'Task Transform' feature to demonstrate AI's practical value to non-technical users"
      ]
    },
    {
      company: "NYU Langone Health",
      role: "AI & Cybersecurity Intern",
      date: "Sep 2024 - Dec 2024",
      location: "New York, NY",
      highlights: [
        "Developed AI-driven chatbot enhancing vulnerability management by 30%",
        "Automated ICS security scans across 11 hospitals and 300+ ambulatory sites",
        "Created documentation and training materials for IT security team adoption"
      ]
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Auditor",
      date: "Dec 2021 - Aug 2023",
      location: "New York, NY",
      highlights: [
        "Administered ICS security assessments across 50+ mission-critical OT/ICS systems",
        "Identified and remediated 100+ cybersecurity vulnerabilities",
        "Reduced non-compliance issues by 20% using NIST frameworks",
        "Developed internal Audit Guide reducing audit time by 20%"
      ]
    }
  ];

  // Education data
  const education = [
    {
      school: "New York University",
      degree: "M.S. Cybersecurity",
      date: "Aug 2022 - June 2025",
      gpa: "3.96",
      highlights: [
        "Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography",
        "Co-developed CNN-based phishing detection system at CSAW (Best Challenge Award)",
        "Active participant in capture-the-flag competitions"
      ]
    },
    {
      school: "CUNY Lehman College",
      degree: "B.S. Computer Science",
      date: "Sep 2018 - June 2022",
      gpa: "3.90",
      highlights: [
        "Led CodePath.org cybersecurity program with 70% placement rate",
        "Enhanced threat detection accuracy by 20% with IBM QRadar",
        "Received Black Hat Briefings Scholarship for cybersecurity work"
      ]
    }
  ];

  // Achievements data
  const achievements = [
    "🏆 Best Challenge Award - Cyber Security Awareness Week @ NYU",
    "🎓 Black Hat Briefings Scholarship recipient",
    "📊 70% placement rate leading CodePath.org cybersecurity program",
    "🛡️ Identified and remediated 100+ vulnerabilities across NYC agencies",
    "📈 40% threat detection improvement with custom security solutions",
    "✝️ President of 180 Christian Fellowship (Fall 2024)"
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

  // Show terminal tip after delay
  useEffect(() => {
    if (!isTerminalOpen) {
      const timer = setTimeout(() => {
        setShowTerminalTip(true);
        const hideTimer = setTimeout(() => {
          setShowTerminalTip(false);
        }, 5000);
        return () => clearTimeout(hideTimer);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTerminalOpen]);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      
      {/* Terminal Button */}
      <TerminalButton onClick={() => setIsTerminalOpen(true)} />
      
      {/* Terminal Tip */}
      <AnimatePresence>
        {showTerminalTip && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-20 right-6 z-40 max-w-xs glass-card p-4 rounded-lg"
          >
            <p className="text-green-400 font-mono text-sm">
              Psst! Try the terminal for a more interactive experience...
            </p>
            <div className="absolute w-4 h-4 bg-slate-800/20 backdrop-blur-lg border-r border-b border-slate-700/30 transform rotate-45 -bottom-2 right-6"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Terminal Component */}
      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      
      {/* Enhanced Navigation Bar */}
      <motion.header 
        className="sticky top-0 z-50 glass-card shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              ES
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-1">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MagneticButton
                      onClick={() => scrollToSection(link.id)}
                      className={`relative text-sm px-4 py-2 rounded-lg transition-all ${
                        activeSection === link.id 
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20" 
                          : "text-gray-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                      strength={0.2}
                    >
                      {link.label}
                    </MagneticButton>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            {/* Mobile Menu Button */}
            <MagneticButton
              className="md:hidden text-gray-300 hover:text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              strength={0.3}
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
            </MagneticButton>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-card"
            >
              <nav className="px-4 py-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg mb-1 transition-all ${
                      activeSection === link.id 
                        ? "text-white bg-gradient-to-r from-blue-500/20 to-violet-500/20" 
                        : "text-gray-300 hover:text-white hover:bg-slate-800/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Code className="section-icon" />
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-900/50">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Briefcase className="section-icon" />
            Professional Experience
          </motion.h2>
          
          <div className="relative">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.company}
                subtitle={exp.role}
                date={exp.date}
                location={exp.location}
                highlights={exp.highlights}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GraduationCap className="section-icon" />
            Education
          </motion.h2>
          
          <div className="relative">
            {education.map((edu, index) => (
              <TimelineItem
                key={index}
                title={edu.school}
                subtitle={edu.degree}
                date={edu.date}
                location={edu.gpa ? `GPA: ${edu.gpa}` : undefined}
                highlights={edu.highlights}
                index={index}
                icon={<GraduationCap className="w-4 h-4" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="section-icon" />
            Key Achievements
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EnhancedCard className="glass-card h-full">
                  <div className="p-6 flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="text-2xl"
                    >
                      {achievement.split(' ')[0]}
                    </motion.div>
                    <p className="text-slate-300">{achievement.slice(2)}</p>
                  </div>
                </EnhancedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adventures Section */}
      <section id="adventures" className="py-20 bg-slate-900/50">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Camera className="section-icon" />
            Adventures & Photography
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AdventureCarousel images={adventureImages} />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="section-container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="section-icon" />
            Get In Touch
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                Let's Connect
              </h3>
              <p className="text-slate-300 mb-6">
                I'm always interested in discussing new opportunities, innovative projects, 
                or just having a conversation about technology and security.
              </p>
              
              <div className="space-y-4">
                <MagneticButton
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
                  strength={0.2}
                >
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>es5888@nyu.edu</span>
                </MagneticButton>
                
                <MagneticButton
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
                  strength={0.2}
                >
                  <Linkedin className="w-5 h-5 text-blue-500" />
                  <span>linkedin.com/in/ethansam</span>
                </MagneticButton>
                
                <MagneticButton
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
                  strength={0.2}
                >
                  <Github className="w-5 h-5 text-blue-500" />
                  <span>github.com/esamnyu</span>
                </MagneticButton>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2025 Ethan Sam. Crafted with passion and code.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  className="text-gray-300 hover:text-white transition-colors"
                  strength={0.3}
                >
                  <link.icon className="w-5 h-5" />
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const socialLinks = [
  { icon: Github, href: "https://github.com/esamnyu", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ethansam", label: "LinkedIn" },
  { icon: Mail, href: "mailto:es5888@nyu.edu", label: "Email" },
];

export default PortfolioEnhanced;