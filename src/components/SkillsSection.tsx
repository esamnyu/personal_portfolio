"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Shield, Brain, Wrench, Cpu } from 'lucide-react';

const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: <Code className="w-4 h-4" />,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript/TypeScript', level: 90 },
      { name: 'C++', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'Bash', level: 75 },
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: <Shield className="w-4 h-4" />,
    skills: [
      { name: 'CrowdStrike Falcon', level: 90 },
      { name: 'IBM QRadar', level: 85 },
      { name: 'Splunk', level: 85 },
      { name: 'Wireshark', level: 80 },
      { name: 'EnCase', level: 75 },
    ]
  },
  {
    id: 'ai',
    title: 'AI/ML',
    icon: <Brain className="w-4 h-4" />,
    skills: [
      { name: 'TensorFlow', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'LLM Integration', level: 90 },
      { name: 'Computer Vision', level: 75 },
      { name: 'NLP', level: 80 },
    ]
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: <Wrench className="w-4 h-4" />,
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'Git', level: 95 },
      { name: 'Azure', level: 80 },
      { name: 'Firebase', level: 85 },
    ]
  },
];

// Minimal skill bar component
const SkillBar: React.FC<{ skill: { name: string; level: number }; index: number }> = ({ skill, index }) => {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[var(--text-secondary)] text-sm font-body group-hover:text-[var(--text-primary)] transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-[var(--accent-gold)] text-xs font-body opacity-60">
          {skill.level}%
        </span>
      </div>
      <div className="h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent-gold) 0%, var(--accent-warm) 100%)',
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-32 bg-[var(--bg-secondary)]/30">
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Cpu className="section-icon" />
          Technical Skills
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-body tracking-wide transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)]'
            }`}
          >
            All
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-body tracking-wide transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-[var(--accent-gold)] text-[var(--bg-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)]'
              }`}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-xl p-8 hover:border-[var(--border-accent)] transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-gold-soft)] flex items-center justify-center text-[var(--accent-gold)]">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[var(--text-primary)]">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
