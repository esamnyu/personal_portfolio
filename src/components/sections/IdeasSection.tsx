"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IdeaCard } from "@/components/IdeaCard";
import { ideas } from "@/lib/data";

export const IdeasSection: React.FC = () => {
  const featuredIdeas = ideas.filter((idea) => idea.featured).slice(0, 3);

  if (featuredIdeas.length === 0) return null;

  return (
    <section id="ideas" className="py-16 md:py-24 relative">
      <div className="section-container">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="section-title mb-0">
            <Lightbulb className="section-icon" />
            Ideas
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-[var(--text-muted)] text-sm mb-8 -mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I publish when I learn something worth sharing.
        </motion.p>

        {/* Ideas grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredIdeas.map((idea, index) => (
            <IdeaCard key={idea.slug} idea={idea} index={index} />
          ))}
        </div>

        {/* View all link */}
        {ideas.length > 3 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/ideas"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <span>View all ideas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
