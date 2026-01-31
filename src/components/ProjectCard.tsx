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
  Cpu,
  Shield,
  Zap,
  Activity,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Project } from "@/types";

const projectIcons: Record<string, React.ReactNode> = {
  "Campaign Insights Bot": <Activity className="w-12 h-12" strokeWidth={1.5} />,
  Anchor: <Terminal className="w-12 h-12" strokeWidth={1.5} />,
  "Roomies App": <Shield className="w-12 h-12" strokeWidth={1.5} />,
};

const projectAccentColors: Record<string, string> = {
  "Campaign Insights Bot": "from-emerald-500/20 via-cyan-500/10",
  Anchor: "from-amber-500/20 via-orange-500/10",
  "Roomies App": "from-violet-500/20 via-fuchsia-500/10",
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
        <div className="h-48 w-full bg-[var(--bg-secondary)] relative overflow-hidden">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
            </>
          ) : (
            <>
              {/* Base grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-50" />

              {/* Dynamic gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${projectAccentColors[project.title] || "from-[var(--accent-gold)]/20 via-transparent"} to-transparent`} />

              {/* Animated orbs */}
              <motion.div
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[var(--accent-gold)]/8 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-[var(--accent-gold)]/6 blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              {/* Decorative lines */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-8 right-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/20 to-transparent" />
                <div className="absolute bottom-12 left-8 w-16 h-[1px] bg-gradient-to-r from-[var(--accent-gold)]/20 to-transparent" />
                <div className="absolute top-12 left-12 w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/15 to-transparent" />
              </div>

              {/* Center icon with glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon glow */}
                  <div className="absolute inset-0 bg-[var(--accent-gold)]/20 blur-xl rounded-full scale-150 group-hover:bg-[var(--accent-gold)]/30 transition-colors duration-500" />
                  {/* Icon container */}
                  <div className="relative p-4 rounded-2xl border border-[var(--accent-gold)]/20 bg-[var(--bg-primary)]/40 backdrop-blur-sm group-hover:border-[var(--accent-gold)]/40 transition-colors duration-500">
                    <div className="text-[var(--accent-gold)]/60 group-hover:text-[var(--accent-gold)]/90 transition-colors duration-500">
                      {projectIcons[project.title] || <Code className="w-12 h-12" strokeWidth={1.5} />}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom fade for smooth transition to content */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
            </>
          )}
          {/* Project number overlay */}
          <span className="absolute top-4 left-4 text-[var(--accent-gold)] text-xs font-body tracking-wider opacity-80 bg-[var(--bg-primary)]/60 px-2 py-1 rounded">
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
