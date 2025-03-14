"use client";

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Shield, Brain, Download, ExternalLink, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ParticlesBackground from './ParticlesBackground';
import ContactForm from '@/components/ContactForm';

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
            <a 
              href="/resume.pdf" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
              download
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Featured Projects
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              A selection of my recent work in cybersecurity, AI, and software development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={project.title} className={`animate-fade-in transition-transform duration-300 hover:-translate-y-2`}>
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6">{project.metrics}</p>
                    
                    <div className="mt-auto flex gap-4">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <Code className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Professional Experience
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              My journey as a cybersecurity professional and AI enthusiast
            </p>
          </div>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.company + experience.role} className="animate-fade-in">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <CardTitle className="text-white">{experience.company}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {experience.role}
                        </CardDescription>
                      </div>
                      <span className="text-gray-400 mt-2 md:mt-0">{experience.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {experience.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Education
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              My academic background and qualifications
            </p>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={edu.school} className="animate-fade-in">
                <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <CardTitle className="text-white">{edu.school}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {edu.degree}
                        </CardDescription>
                      </div>
                      <span className="text-gray-400 mt-2 md:mt-0">{edu.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {edu.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Skills & Technologies
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              My technical toolkit and areas of expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-fade-in">
              <Card className="bg-slate-800/50 border-slate-700 h-full hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" /> Languages & Frameworks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skills.languages.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {skills.frameworks.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="animate-fade-in">
              <Card className="bg-slate-800/50 border-slate-700 h-full hover:border-green-500/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" /> Security Tools & Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {skills.security_tools.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-green-500/20 text-green-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {skills.standards.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Achievements
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              Recognition and accomplishments throughout my career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={achievement} className="animate-fade-in">
                <Card className="bg-slate-800/50 border-slate-700 h-full hover:border-yellow-500/50 transition-all duration-300">
                  <CardHeader className="flex items-center justify-center text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <CardTitle className="text-white text-lg">{achievement}</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Get In Touch
            </h2>
            <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
              Have a project in mind or interested in collaborating? Let's connect!
            </p>
          </div>
          <div className="max-w-lg mx-auto animate-fade-in">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:your.email@example.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ethan Sam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;