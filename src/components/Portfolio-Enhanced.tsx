"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import ParticlesBackground from "./ParticlesBackground";
import {
  ProjectsSection,
  ExperienceSection,
  EducationSection,
  IdeasSection,
  ContactSection,
} from "@/components/sections";
import { navLinks, socialLinks } from "@/lib/data";
import Link from "next/link";

const footerSocialLinks = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
];

const SCROLL_HEADER_THRESHOLD = 50;
const SECTION_DETECT_OFFSET = 100;
const MENU_CLOSE_DELAY = 300;

const PortfolioEnhanced: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_HEADER_THRESHOLD);

          const sections = navLinks.map((link) => link.id);
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= SECTION_DETECT_OFFSET && rect.bottom >= SECTION_DETECT_OFFSET;
            }
            return false;
          });

          if (currentSection) {
            setActiveSection(currentSection);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }, MENU_CLOSE_DELAY);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(scrollTimeoutRef.current);
  }, []);

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />

      {/* Navigation */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
                    {link.href ? (
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 text-sm font-body tracking-wide transition-colors duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)]`}
                      >
                        {link.label}
                      </Link>
                    ) : (
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
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
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
                {navLinks.map((link, index) =>
                  link.href ? (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block w-full text-left px-4 py-3 text-base font-body transition-colors text-[var(--text-secondary)]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
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
                  )
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Page Sections */}
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <IdeasSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[var(--text-muted)] text-sm">
              &copy; {new Date().getFullYear()} Ethan Sam. Crafted with precision.
            </p>
            <div className="flex items-center gap-4">
              {footerSocialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
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

export default PortfolioEnhanced;
