"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Calendar, Image, Trophy, Compass } from 'lucide-react';

const stats = [
  {
    label: "Messages Sent",
    value: "26.21K",
    sublabel: "in 2025",
    icon: MessageSquare,
  },
  {
    label: "Chattiest Day",
    value: "Jun 27",
    sublabel: "2025",
    icon: Calendar,
  },
  {
    label: "Top Percentile",
    value: "1%",
    sublabel: "of users",
    icon: Trophy,
  },
  {
    label: "Images Generated",
    value: "34",
    sublabel: "creations",
    icon: Image,
  },
  {
    label: "Early Adopter",
    value: "0.1%",
    sublabel: "of users",
    icon: Sparkles,
  },
];

const traits = [
  { name: "Explorer", active: true },
  { name: "Specialist", active: false },
  { name: "Learner", active: false },
  { name: "Doer", active: false },
  { name: "Planner", active: true },
  { name: "Practical", active: true },
  { name: "Conceptual", active: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AIStatsSection: React.FC = () => {
  return (
    <section id="ai-stats" className="py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 154, 139, 0.1) 0%, rgba(186, 135, 252, 0.1) 50%, rgba(255, 195, 113, 0.1) 100%)',
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Sparkles className="section-icon" />
          2025 AI Stats
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Grid */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass-card rounded-2xl p-6 text-center hover:border-[var(--border-accent)] transition-all duration-500 group"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-[var(--accent-gold-soft)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 text-[var(--accent-gold)]" />
                  </div>
                  <div className="text-3xl font-display font-bold text-[var(--text-primary)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Archetype Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-2xl p-8 h-full hover:border-[var(--border-accent)] transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[var(--accent-gold)] text-sm font-medium">Your Archetype</span>
                <span className="text-[var(--text-muted)] text-sm">2025</span>
              </div>

              {/* Archetype Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-gold-soft)] to-[var(--bg-elevated)] flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Compass className="w-10 h-10 text-[var(--accent-gold)]" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)] text-center mb-2">
                The Navigator
              </h3>
              <p className="text-[var(--text-muted)] text-sm text-center mb-6">
                22.9% of users share this archetype
              </p>

              {/* Traits */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {traits.map((trait) => (
                  <span
                    key={trait.name}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      trait.active
                        ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)]'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                    }`}
                  >
                    {trait.name}
                  </span>
                ))}
              </div>

              <p className="text-[var(--text-secondary)] text-sm text-center leading-relaxed">
                Quickly orients in new areas and charts next steps. Uses AI to decide what to do next without overanalyzing.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Source attribution */}
        <motion.p
          className="text-center text-[var(--text-muted)] text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Stats from ChatGPT 2025 Wrapped
        </motion.p>
      </div>
    </section>
  );
};
