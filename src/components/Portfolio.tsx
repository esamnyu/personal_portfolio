"use client";

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Shield, Brain, Download, ExternalLink, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ParticlesBackground from './ParticlesBackground';
import ContactForm from '@/components/ContactForm';
import Terminal from './Terminal';
import TerminalButton from './TerminalButton';
import { terminalStorage } from '@/utils/terminalSecurity';

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
}

interface Education {
  school: string;
  degree: string;
  date: string;
  highlights: string[];
}

interface Skills {
  languages: string[];
  security_tools: string[];
  frameworks: string[];
  standards: string[];
}

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showTerminalTip, setShowTerminalTip] = useState(false);
  
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
    }
  };

  // Project data with added links
  const projects: Project[] = [
    {
      title: "CSAW LLM Attack CTF",
      description: "Led the team in developing advanced attack vectors using machine learning techniques for LLM security testing",
      tech: ["LLMs", "Machine Learning", "Security Testing", "Python"],
      metrics: "2nd Place Winner",
      github: "https://github.com/yourusername/llm-attack-ctf",
      demo: "https://example.com/llm-attack-demo"
    },
    {
      title: "CSAW Phishing Detection Game",
      description: "Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot for cybersecurity CTF",
      tech: ["TensorFlow", "PyTorch", "Docker", "GPT-3"],
      metrics: "Best Challenge Award, 300+ participants",
      github: "https://github.com/yourusername/phishing-detection"
    },
    {
      title: "Roomies App",
      description: "Led development of mobile application addressing real-time data synchronization and user experience design challenges",
      tech: ["React Native", "Firestore", "Firebase"],
      metrics: "40% dispute reduction, 30% task completion improvement",
      github: "https://github.com/yourusername/roomies-app",
      demo: "https://example.com/roomies-app"
    }
  ];

  // Experience data
  const experiences: Experience[] = [
    {
      company: "NYU Langone Health",
      role: "AI & Cybersecurity Intern",
      date: "May 2024 - August 2024",
      highlights: [
        "Developed AI Chatbot reducing manual policy queries by 30% and enhancing infrastructure security by 25%",
        "Enhanced threat detection by 40% using Crowdstrike Falcon & IBM QRadar, improving accuracy by 20%",
        "Optimized Cortex XSoar playbooks and integrated EnCase forensics, improving response efficiency by 15%"
      ]
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Auditor",
      date: "December 2021 - August 2023",
      highlights: [
        "Administered ICS security assessments across 50+ mission-critical OT/ICS systems using NIST frameworks",
        "Identified and remediated 100+ cybersecurity vulnerabilities across NYC agencies",
        "Improved compliance by 20% and reduced audit time by 20% through standardized processes"
      ]
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Analyst Intern",
      date: "June 2021 - August 2021",
      highlights: [
        "Evaluated 10+ NYC agencies' cybersecurity programs, improving compliance by 15%",
        "Developed internal Audit Guide reducing audit time by 20% and enhancing compliance by 10%",
        "Contributed to privacy and data protection discussions, participating in mock trials for agency responses"
      ]
    }
  ];

  // Education data
  const education: Education[] = [
    {
      school: "New York University, Tandon School of Engineering",
      degree: "M.S. Cybersecurity",
      date: "Expected December 2024",
      highlights: [
        "GPA: 3.96",
        "Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography",
        "Advanced Studies: Penetration Testing, Vulnerability Analysis, Threat Intelligence, AI & ML"
      ]
    },
    {
      school: "City University of New York: Hunter College",
      degree: "B.S. Computer Science",
      date: "May 2021",
      highlights: []
    }
  ];

  // Skills data
  const skills: Skills = {
    languages: ["Python", "JavaScript", "C++", "SQL", "Bash"],
    security_tools: ["CrowdStrike Falcon", "IBM QRadar", "Splunk", "Cortex XSoar", "EnCase", "Wireshark"],
    frameworks: ["React Native", "TensorFlow", "PyTorch", "Docker", "Firestore"],
    standards: ["NIST CSF", "NIST SP-800-53"]
  };

  const achievements: string[] = [
    "CSAW LLM Attack CTF – 2nd Place Winner",
    "ISACA/National Cyber League CTF Scholarship Awardee",
    "180 Christian Fellowship – President (Fall 2024)"
  ];

  // Navigation links
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
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
              <button className="text-gray-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
              <a href="https://linkedin.com/in/yourusername" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white transition-colors hover:scale-110 transform" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/resume.pdf" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
                download
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
              
              <button 
                onClick={() => setIsTerminalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-300"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Access Terminal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your sections - Projects, Experience, Education, Skills, Achievements, Contact, Footer */}
      {/* These sections remain unchanged */}

    </div>
  );
};

export default Portfolio;