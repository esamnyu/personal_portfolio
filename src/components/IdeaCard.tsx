"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Idea } from "@/types";

interface IdeaCardProps {
  idea: Idea;
  index: number;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, index }) => {
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
      <Link href={`/ideas/${idea.slug}`}>
        <article className="glass-card rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:border-[var(--border-accent)] transition-all duration-500">
          {/* Gold left accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-gold)] via-[var(--accent-gold)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Number overlay */}
          <span className="absolute top-4 right-4 text-[var(--accent-gold)] text-xs font-body tracking-wider opacity-40 group-hover:opacity-60 transition-opacity duration-500">
            0{index + 1}
          </span>

          {/* Content */}
          <div className="pl-4">
            {/* Category, date, and read time */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-medium text-[var(--accent-gold)] uppercase tracking-wider">
                {idea.category}
              </span>
              <span className="text-[var(--text-muted)] text-xs">
                {new Date(idea.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-[var(--text-muted)] text-xs">
                {idea.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-display font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-gold)] transition-colors duration-500 leading-tight">
              {idea.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
              {idea.excerpt}
            </p>

            {/* Read more link */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors duration-300">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};
