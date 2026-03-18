"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Smartphone,
  MessageSquare,
  Activity,
} from "lucide-react";
import Image from "next/image";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Project } from "@/types";

const projectIcons: Record<string, React.ReactNode> = {
  "Campaign Insights Bot": <Activity className="w-8 h-8" strokeWidth={1.5} />,
  "Roomies App": <Smartphone className="w-8 h-8" strokeWidth={1.5} />,
};

const projectDecorations: Record<string, React.ReactNode> = {
  "Campaign Insights Bot": (
    <>
      {/* Mini bar chart */}
      <div className="absolute bottom-20 left-8 flex items-end gap-2">
        {[28, 48, 32, 60, 40, 52, 36, 44].map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-t-sm"
            style={{
              height: h,
              background:
                "linear-gradient(to top, rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.08))",
            }}
          />
        ))}
      </div>
      {/* Status indicator */}
      <div className="absolute top-8 right-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400/60 animate-pulse" />
        <div className="w-16 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
      </div>
      {/* Data lines */}
      <div className="absolute top-20 right-8 flex flex-col gap-3">
        <div className="w-20 h-px bg-cyan-400/30" />
        <div className="w-12 h-px bg-cyan-400/20" />
        <div className="w-16 h-px bg-cyan-400/25" />
        <div className="w-10 h-px bg-cyan-400/15" />
      </div>
      {/* Slack-style message bubbles */}
      <div className="absolute bottom-20 right-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400/20" />
          <div className="w-20 h-4 rounded bg-emerald-500/10 border border-emerald-500/10" />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="w-3 h-3 rounded-full bg-cyan-400/20" />
          <div className="w-14 h-4 rounded bg-cyan-500/10 border border-cyan-500/10" />
        </div>
      </div>
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-24 h-24">
        <div className="absolute top-8 left-8 w-8 h-[1px] bg-emerald-400/20" />
        <div className="absolute top-8 left-8 w-[1px] h-8 bg-emerald-400/20" />
      </div>
    </>
  ),
  "Roomies App": (
    <>
      {/* Phone outline mockup */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-48 rounded-2xl border border-violet-400/15 bg-violet-500/5">
        {/* Screen content lines */}
        <div className="mt-6 mx-3 flex flex-col gap-2">
          <div className="w-full h-2 rounded bg-violet-400/15" />
          <div className="w-3/4 h-2 rounded bg-fuchsia-400/12" />
          <div className="w-full h-6 rounded bg-violet-400/8 mt-2" />
          <div className="w-full h-6 rounded bg-fuchsia-400/8" />
          <div className="w-full h-6 rounded bg-violet-400/8" />
        </div>
        {/* Bottom nav dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400/15" />
        </div>
      </div>
      {/* Chat bubbles floating around */}
      <div className="absolute top-10 right-8">
        <div className="w-20 h-6 rounded-xl rounded-tr-sm bg-violet-500/12 border border-violet-500/10" />
      </div>
      <div className="absolute top-20 left-6">
        <div className="w-14 h-6 rounded-xl rounded-tl-sm bg-fuchsia-500/12 border border-fuchsia-500/10" />
      </div>
      {/* People avatars */}
      <div className="absolute bottom-12 right-6 flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/15" />
        <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/15" />
        <div className="w-6 h-6 rounded-full bg-violet-500/15 border border-violet-500/10" />
      </div>
      {/* Lock icon for encryption */}
      <div className="absolute bottom-12 left-8">
        <div className="w-5 h-6 rounded-t-full border-2 border-fuchsia-400/25 border-b-0" />
        <div className="w-7 h-5 -ml-1 rounded-sm bg-fuchsia-400/15 border border-fuchsia-400/15" />
      </div>
    </>
  ),
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

/* ── Featured project card (full-width, horizontal layout) ─────────── */
export const FeaturedProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
}) => {
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
      <SpotlightCard className="group overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-colors duration-500">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: App branding showcase */}
          <div className="relative h-72 md:h-auto md:min-h-[420px] bg-gradient-to-br from-[#0c1220] via-[#0f1a2e] to-[#0a0f1a] overflow-hidden">
            {/* Subtle radial glow behind logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 rounded-full bg-orange-500/8 blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-40 h-40 rounded-full bg-amber-400/6 blur-[60px]" />

            {/* Star particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[
                { top: "15%", left: "20%", size: 2, opacity: 0.3 },
                { top: "25%", left: "75%", size: 1.5, opacity: 0.2 },
                { top: "60%", left: "15%", size: 1, opacity: 0.25 },
                { top: "70%", left: "80%", size: 2, opacity: 0.2 },
                { top: "40%", left: "90%", size: 1.5, opacity: 0.15 },
                { top: "80%", left: "40%", size: 1, opacity: 0.2 },
              ].map((star, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/80 animate-pulse"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    opacity: star.opacity,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
            </div>

            {/* App icon + branding */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-12">
              {/* App icon with glow ring */}
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-3 rounded-[28px] bg-white/5 blur-xl" />
                <div className="relative w-20 h-20 rounded-[22px] overflow-hidden bg-white shadow-lg shadow-orange-500/10">
                  <Image
                    src="/images/anchor-logo.png"
                    alt="Anchor app icon"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </motion.div>

              {/* App name */}
              <h3 className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-300 via-orange-400 to-orange-500 mb-2 tracking-tight">
                {project.title}
              </h3>

              {/* Tagline */}
              {project.tagline && (
                <p className="text-orange-300/60 text-base font-body tracking-wide">
                  {project.tagline}
                </p>
              )}

              {/* Metrics as badges below tagline */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {project.metrics.split(" | ").map((metric, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-orange-400/10 text-orange-300/80 border border-orange-400/10"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            {/* Number overlay */}
            <span className="absolute top-4 left-4 text-orange-400/40 text-xs font-body tracking-wider">
              01
            </span>
          </div>

          {/* Right: App screenshot + content */}
          <div className="flex flex-col">
            {/* Screenshot area */}
            {project.image && (
              <div className="relative h-56 md:h-64 bg-[var(--bg-secondary)] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-glass)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[var(--bg-primary)]/20" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + techIndex * 0.05,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

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
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

/* ── Standard project card (for non-featured projects) ─────────────── */
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
        {/* Visual header — taller for better presence */}
        <div className="h-56 w-full bg-[var(--bg-secondary)] relative overflow-hidden">
          {/* Base grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />

          {/* Dynamic gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${projectAccentColors[project.title] ?? "from-[var(--accent-gold)]/20 via-transparent"} to-transparent`}
          />

          {/* Animated orbs */}
          <motion.div
            className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[var(--accent-gold)]/8 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[var(--accent-gold)]/6 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Project-specific decorations */}
          <div className="absolute inset-0 overflow-hidden">
            {projectDecorations[project.title] ?? (
              <>
                <div className="absolute top-8 right-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-gold)]/20 to-transparent" />
                <div className="absolute bottom-12 left-8 w-16 h-[1px] bg-gradient-to-r from-[var(--accent-gold)]/20 to-transparent" />
                <div className="absolute top-12 left-12 w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--accent-gold)]/15 to-transparent" />
              </>
            )}
          </div>

          {/* Center icon with glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[var(--accent-gold)]/20 blur-xl rounded-full scale-150 group-hover:bg-[var(--accent-gold)]/30 transition-colors duration-500" />
              <div className="relative p-4 rounded-2xl border border-[var(--accent-gold)]/20 bg-[var(--bg-primary)]/40 backdrop-blur-sm group-hover:border-[var(--accent-gold)]/40 transition-colors duration-500">
                <div className="text-[var(--accent-gold)]/60 group-hover:text-[var(--accent-gold)]/90 transition-colors duration-500">
                  {projectIcons[project.title] ?? (
                    <Code className="w-10 h-10" strokeWidth={1.5} />
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />

          {/* Project number overlay */}
          <span className="absolute top-4 left-4 text-[var(--accent-gold)] text-xs font-body tracking-wider opacity-60">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 relative flex flex-col flex-1">
          <h3 className="project-title text-xl mb-3 group-hover:text-[var(--accent-gold)] transition-colors duration-500">
            {project.title}
          </h3>

          <p className="project-description text-sm mb-4 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
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

          <div className="flex items-center gap-4 pt-4 mt-auto border-t border-[var(--border-subtle)]">
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
