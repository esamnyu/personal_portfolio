"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Terminal,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Project } from "@/types";

const projectIcons: Record<string, React.ReactNode> = {
  "Campaign Insights Bot": <MessageSquare className="w-8 h-8" />,
  Habitual: <Terminal className="w-8 h-8" />,
  "Roomies App": <Smartphone className="w-8 h-8" />,
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
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

          <p className="project-description text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 4).map((tech, techIndex) => (
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

          <p className="text-xs text-[var(--accent-gold)] mb-4 font-medium">
            {project.metrics}
          </p>

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
