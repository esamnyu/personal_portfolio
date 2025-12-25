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
  "Cybersecurity Engineer",
  "AI Security Specialist",
  "Full-Stack Developer",
  "CTF Player",
];

// Elegant stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle ambient glow - top */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.06) 0%, transparent 70%)',
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

      {/* Subtle floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 169, 98, 0.03) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232, 213, 183, 0.03) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
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
        {/* Elegant pre-title */}
        <motion.div
          variants={itemVariants}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-3 text-[var(--text-muted)] text-sm tracking-[0.2em] uppercase font-body">
            <span className="w-8 h-px bg-[var(--accent-gold)] opacity-50" />
            Portfolio
            <span className="w-8 h-px bg-[var(--accent-gold)] opacity-50" />
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="hero-title mb-6"
          variants={itemVariants}
        >
          Ethan Sam
        </motion.h1>

        {/* Role cycler */}
        <motion.div
          variants={itemVariants}
          className="hero-subtitle mb-8"
        >
          <RoleCycler />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Bridging the gap between AI innovation and cybersecurity excellence.
          <span className="text-[var(--accent-warm)]"> Building secure, intelligent systems</span> that make a difference.
        </motion.p>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-16"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="social-link"
              aria-label={link.label}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1 + index * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <link.icon className="social-icon" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
        >
          <motion.button
            onClick={scrollToProjects}
            className="btn-primary inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[var(--accent-gold)] to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Elegant corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[var(--border-subtle)] opacity-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[var(--border-subtle)] opacity-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[var(--border-subtle)] opacity-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[var(--border-subtle)] opacity-30" />
    </section>
  );
};
