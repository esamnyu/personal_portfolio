"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const ProjectsSection: React.FC = () => {
  return (
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
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
