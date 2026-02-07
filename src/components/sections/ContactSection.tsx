"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
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
          <p className="text-[var(--text-secondary)] text-lg mb-4 leading-relaxed">
            Looking for roles where I can secure AI systems at scale —
            guardrails, red teaming, model governance, or building the
            infrastructure that makes AI safe to deploy.
          </p>
          <p className="text-[var(--text-muted)] text-sm mb-10">
            Also open to collaborating on AI security research and open-source tooling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.a
              href={`mailto:${socialLinks.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-semibold rounded-full transition-opacity duration-300 hover:opacity-90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-300 font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-5 h-5" />
              Resume
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-6">
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
