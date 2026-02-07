"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { TimelineItem } from "@/components/TimelineItem";
import { education } from "@/lib/data";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-32">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <GraduationCap className="section-icon" />
          Education
        </motion.h2>

        <div className="relative">
          {education.map((edu, index) => (
            <TimelineItem
              key={edu.school}
              title={edu.school}
              subtitle={edu.degree}
              date={edu.date}
              location={edu.gpa ? `GPA: ${edu.gpa}` : undefined}
              credentials={edu.credentials}
              highlights={edu.highlights}
              index={index}
              icon={<GraduationCap className="w-4 h-4" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
