"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg-primary)]">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[var(--accent-gold)] text-sm font-body tracking-widest uppercase mb-6">
          Something went wrong
        </p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">
          Unexpected error
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto">
          Something didn&apos;t work as expected. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--accent-gold)] text-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[var(--bg-primary)] transition-colors duration-300 font-body text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-medium)] text-[var(--text-primary)] hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors duration-300 font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
