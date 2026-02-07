"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { IdeaCard } from "@/components/IdeaCard";
import { ideas } from "@/lib/data";

export default function IdeasPage() {
  return (
    <div className="relative min-h-screen">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-body">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Page header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 flex items-center gap-4">
              <Lightbulb className="w-10 h-10 text-[var(--accent-gold)] opacity-80" />
              Ideas
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
              I publish when I learn something worth sharing. Thoughts on AI,
              security, building products, and navigating a career in tech.
            </p>
          </motion.div>

          {/* Ideas list */}
          <div className="space-y-6">
            {ideas.map((idea, index) => (
              <IdeaCard key={idea.slug} idea={idea} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {ideas.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[var(--text-muted)]">
                More ideas coming soon.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-[var(--text-muted)] text-sm text-center">
            &copy; 2026 Ethan Sam. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
