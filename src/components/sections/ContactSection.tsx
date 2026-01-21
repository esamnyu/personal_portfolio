"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { socialLinks } from "@/lib/data";

export const ContactSection: React.FC = () => {
  return (
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
            Let&apos;s Connect
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
            I&apos;m always interested in discussing new opportunities,
            innovative projects, or having a conversation about technology and
            security.
          </p>

          <motion.a
            href={`mailto:${socialLinks.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-semibold rounded-full hover:bg-[var(--accent-gold-light)] transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </motion.a>

          <div className="flex items-center justify-center gap-6 mt-10">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)] transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.github}
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
  );
};
