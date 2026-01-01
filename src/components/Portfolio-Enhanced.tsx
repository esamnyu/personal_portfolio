"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Briefcase, GraduationCap, Menu, X, ExternalLink } from 'lucide-react';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { HeroSection } from '@/components/HeroSection';
import { TimelineItem } from '@/components/TimelineItem';
import ParticlesBackground from './ParticlesBackground';
import ContactForm from '@/components/ContactForm';

// Enhanced Project Card Component
const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <EnhancedCard className="project-card h-full group">
        <div className="p-8">
          {/* Project number */}
          <span className="text-[var(--accent-gold)] text-sm font-body tracking-wider opacity-60 mb-4 block">
            0{index + 1}
          </span>

          <h3 className="project-title text-2xl mb-4 group-hover:text-[var(--accent-gold)] transition-colors duration-500">
            {project.title}
          </h3>

          <p className="project-description mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                className="tech-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <p className="text-sm text-[var(--accent-gold)] mb-6 font-medium">{project.metrics}</p>

          <div className="flex items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                aria-label="View project on GitHub"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                aria-label="View live demo"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </EnhancedCard>
    </motion.div>
  );
};

// Navigation links - simplified to 5 key sections
const navLinks = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

const PortfolioEnhanced: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Projects data - focused on highest-impact projects
  const projects = [
    {
      title: "Campaign Insights Bot",
      description: "Built an AI-powered Slack alert system for AdTech campaign monitoring. Features real-time anomaly detection using Z-score analysis, GPT-generated insights, and a closed-loop feedback system. Created proactively for interview process—demonstrating product thinking before ever speaking with the team.",
      tech: ["React", "Recharts", "OpenAI GPT", "Tailwind CSS", "Vercel"],
      metrics: "Secured AI Engineer role through demonstrated initiative",
      github: "https://github.com/esamnyu/slackbot",
      demo: "https://slackbot-puce.vercel.app"
    },
    {
      title: "Habitual",
      description: "Full-stack habit tracking social app with real-time messaging, friend system, and streak analytics. Built with React 19, Supabase with 26 RLS security policies, and Capacitor for iOS deployment. Features TensorFlow.js integration for AI-powered insights.",
      tech: ["React 19", "Supabase", "Capacitor", "TensorFlow.js", "Framer Motion"],
      metrics: "Production-ready with 8.2/10 deployment score, 9/10 security rating",
      github: "https://github.com/esamnyu/Habitual"
    },
    {
      title: "Roomies App",
      description: "Co-founded a mobile app for roommate coordination with robust security. Implemented cryptography techniques and consensus-driven AI framework for household challenges.",
      tech: ["React Native", "Firebase", "AI/ML", "Cryptography"],
      metrics: "Enhanced user engagement, improved communication"
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

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

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

      {/* Enhanced Navigation Bar */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="text-2xl font-display font-bold text-gradient-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ES
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`relative px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 ${
                        activeSection === link.id
                          ? "text-[var(--accent-gold)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {link.label}
                      {activeSection === link.id && (
                        <motion.div
                          className="absolute bottom-0 left-4 right-4 h-px bg-[var(--accent-gold)]"
                          layoutId="activeNav"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)]"
            >
              <nav className="px-6 py-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left px-4 py-3 text-base font-body transition-colors ${
                      activeSection === link.id
                        ? "text-[var(--accent-gold)]"
                        : "text-[var(--text-secondary)]"
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

      {/* Projects Section - immediately after hero for maximum impact */}
      <section id="projects" className="py-16 md:py-24 relative">
        <div className="section-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Code className="section-icon" />
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-[var(--bg-secondary)]/30">
        <div className="section-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Briefcase className="section-icon" />
            Experience
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
      <section id="education" className="py-32">
        <div className="section-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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


      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="section-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Mail className="section-icon" />
            Get In Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-2xl font-display font-semibold mb-6 text-gradient-gold">
                Let's Connect
              </h3>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects,
                or having a conversation about technology and security.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:es5888@nyu.edu"
                  className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent-gold)] transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>es5888@nyu.edu</span>
                </a>

                <a
                  href="https://linkedin.com/in/ethansam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent-gold)] transition-colors duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <span>linkedin.com/in/ethansam</span>
                </a>

                <a
                  href="https://github.com/esamnyu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent-gold)] transition-colors duration-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <span>github.com/esamnyu</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[var(--text-muted)] text-sm">
              © 2025 Ethan Sam. Crafted with precision.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
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
