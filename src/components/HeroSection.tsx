"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: "https://github.com/esamnyu", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/ethansam", label: "LinkedIn" },
  { icon: Mail, href: "mailto:es5888@nyu.edu", label: "Email" },
];

const roles = [
  "AI Security Engineer",
  "Full-Stack Developer",
];

// Faster stagger animation for compact hero
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const RoleCycler: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[1.5em] overflow-hidden">
      {roles.map((role, index) => (
        <motion.span
          key={role}
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            y: index === currentIndex ? 0 : index < currentIndex ? -40 : 40,
            opacity: index === currentIndex ? 1 : 0,
            filter: index === currentIndex ? "blur(0px)" : "blur(4px)",
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-[70vh] flex items-center justify-center relative overflow-hidden pt-8"
    >
      {/* Subtle ambient glow - top */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.05) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="section-container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main title - smaller for compact hero */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-gradient-gold"
          variants={itemVariants}
        >
          Ethan Sam
        </motion.h1>

        {/* Role cycler */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl text-[var(--accent-warm)] font-body mb-6"
        >
          <RoleCycler />
        </motion.div>

        {/* Description - concise */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Building secure, intelligent systems at the intersection of AI and cybersecurity.
        </motion.p>

        {/* Social links + CTA in one row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-300"
                aria-label={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToProjects}
            className="btn-primary inline-flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Projects</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
