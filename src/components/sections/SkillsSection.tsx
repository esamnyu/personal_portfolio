"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Shield, Code } from "lucide-react";

const skillClusters = [
  {
    icon: Brain,
    label: "AI / ML",
    skills: [
      "LLMs & RAG",
      "TensorFlow.js",
      "Prompt Engineering",
      "AI Agents",
      "Adversarial ML",
      "Fine-tuning",
    ],
  },
  {
    icon: Shield,
    label: "Security",
    skills: [
      "Network Security",
      "ICS/OT Security",
      "Cryptography",
      "Digital Forensics",
      "NIST Frameworks",
      "Cloud Security",
    ],
  },
  {
    icon: Code,
    label: "Engineering",
    skills: [
      "TypeScript",
      "React / Next.js",
      "Python",
      "React Native",
      "Supabase",
      "Firebase",
    ],
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skillClusters.map((cluster, clusterIndex) => (
            <motion.div
              key={cluster.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: clusterIndex * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <cluster.icon className="w-5 h-5 text-[var(--accent-gold)] mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="text-xs font-body uppercase tracking-widest text-[var(--accent-gold)] mb-4">
                {cluster.label}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {cluster.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-[var(--text-secondary)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
