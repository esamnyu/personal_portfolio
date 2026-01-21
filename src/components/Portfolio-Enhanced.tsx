"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Briefcase, GraduationCap, Menu, X, ExternalLink, Terminal, Smartphone, MessageSquare } from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { TimelineItem } from '@/components/TimelineItem';
import ParticlesBackground from './ParticlesBackground';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

// Project visual icons mapping
const projectIcons: Record<string, React.ReactNode> = {
  "Campaign Insights Bot": <MessageSquare className="w-8 h-8" />,
  "Habitual": <Terminal className="w-8 h-8" />,
  "Roomies App": <Smartphone className="w-8 h-8" />,
};

// Enhanced Project Card Component with visual header
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
      className="h-full"
    >
      <SpotlightCard className="h-full group overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors duration-500">
        {/* Visual header */}
        <div className="h-40 w-full bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern" />
          <div className="absolute -right-10 -top-10 bg-[var(--accent-gold)]/10 w-[200px] h-[200px] blur-3xl rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center text-[var(--accent-gold)]/30 group-hover:text-[var(--accent-gold)]/50 transition-colors duration-500">
            {projectIcons[project.title] || <Code className="w-8 h-8" />}
          </div>
          {/* Project number overlay */}
          <span className="absolute top-4 left-4 text-[var(--accent-gold)] text-xs font-body tracking-wider opacity-60">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          <h3 className="project-title text-xl mb-3 group-hover:text-[var(--accent-gold)] transition-colors duration-500">
            {project.title}
          </h3>

          <p className="project-description text-sm mb-4 line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                className="tech-tag text-xs"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <p className="text-xs text-[var(--accent-gold)] mb-4 font-medium">{project.metrics}</p>

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
      </SpotlightCard>
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
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient-gold">
              Let's Connect
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
              I'm always interested in discussing new opportunities, innovative projects,
              or having a conversation about technology and security.
            </p>

            <motion.a
              href="mailto:es5888@nyu.edu"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-semibold rounded-full hover:bg-[var(--accent-gold-light)] transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </motion.a>

            <div className="flex items-center justify-center gap-6 mt-10">
              <a
                href="https://linkedin.com/in/ethansam"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/esamnyu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
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
