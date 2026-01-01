"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Target, ExternalLink } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-32 relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 169, 98, 0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <span className="w-12 h-px bg-[var(--border-medium)]" />
            <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
            <span className="text-[var(--text-muted)] text-sm tracking-[0.2em] uppercase font-body">
              My Journey
            </span>
            <Compass className="w-5 h-5 text-[var(--accent-gold)]" />
            <span className="w-12 h-px bg-[var(--border-medium)]" />
          </motion.div>

          {/* Narrative paragraphs */}
          <div className="space-y-8 text-center">
            {/* Paragraph 1 - The Beginning */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              I still remember when GPT-3.5 first clicked for me. I was a Cybersecurity Auditor at NYC Cyber Command, sifting through compliance reports for city agencies, when it hit me—this wasn't just another tool. This was a{' '}
              <span className="text-[var(--accent-gold)] font-medium">force multiplier</span>
              . AI wasn't going to replace my work; it was going to free me to do more of the work that actually mattered.
            </motion.p>

            {/* Paragraph 2 - The Path */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              That realization sparked a journey I couldn't have predicted. I finished my Master's in Cybersecurity, dove into AI security research at NYU, and built intelligent systems during my internship at NYU Langone Health.
            </motion.p>

            {/* Paragraph 3 - The Interviews */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              Along the way, I interviewed at{' '}
              <span className="text-[var(--text-primary)]">Amazon, Microsoft, SpaceX, FanDuel, and New York Presbyterian</span>
              —for roles spanning Cybersecurity, Software Engineering, and AI. One pattern emerged across every conversation: they didn't just want credentials.{' '}
              <span className="text-[var(--accent-gold)] font-medium">They wanted to see what I'd built</span>
              . Projects that solved real problems. Clear communication of the value I provided. The ability to explain complex work simply.
            </motion.p>

            {/* Paragraph 4 - The Strategy */}
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-6 text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-[var(--accent-gold)]" />
                <span className="text-[var(--accent-gold)] text-sm font-medium uppercase tracking-wider">What Worked</span>
              </div>
              <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-4">
                For my current role as an AI Engineer, I used Claude to research the job posting deeply—analyzing the company's gaps, predicting what product they needed but didn't have yet, and{' '}
                <span className="text-[var(--text-primary)]">building it before we ever spoke</span>
                . I showed up to interviews not just with answers, but with a working solution. The result? I was recognized for initiative, diligence, and communication skills—not because I had the most experience, but because I{' '}
                <span className="text-[var(--accent-gold)] font-medium">showed my work</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://slackbot-puce.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors duration-300 group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="border-b border-[var(--accent-gold)]/30 group-hover:border-[var(--text-primary)] transition-colors">View the Campaign Insights Bot I built</span>
                </a>
                <span className="text-[var(--text-muted)]">|</span>
                <a
                  href="#project-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('project-generator')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="border-b border-[var(--border-subtle)] group-hover:border-[var(--accent-gold)] transition-colors">Try this approach yourself</span>
                </a>
              </div>
            </motion.div>

            {/* Paragraph 5 - The Mission */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              Now, as an AI Engineer in AdTech, I use these tools every single day—not as a shortcut, but as a way to compound what I'm capable of.
            </motion.p>

            {/* Paragraph 6 - North Star */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--text-secondary)] text-lg leading-relaxed"
            >
              My north star is simple: positively impact{' '}
              <span className="text-[var(--accent-gold)] font-medium">one million lives</span>
              . I believe AI's real promise isn't automation—it's{' '}
              <span className="text-[var(--accent-gold)] font-medium">amplification</span>
              . And I want to help people discover how to use these tools to chase their own goals, one person at a time.
            </motion.p>
          </div>

          {/* Closing accent */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-12"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)] to-transparent opacity-50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
