"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { TimelineItem } from "@/components/TimelineItem";
import { experiences } from "@/lib/data";

export const ExperienceSection: React.FC = () => {
  return (
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
              key={exp.company}
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
  );
};
