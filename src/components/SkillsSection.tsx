"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Shield, Brain, Cpu, Wrench, Zap } from 'lucide-react';
import { SkillMeter } from './ui/skill-meter';

const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: <Code className="w-5 h-5" />,
    color: 'blue' as const,
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
    title: 'Security Tools',
    icon: <Shield className="w-5 h-5" />,
    color: 'green' as const,
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
    title: 'AI/ML Technologies',
    icon: <Brain className="w-5 h-5" />,
    color: 'purple' as const,
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
    title: 'Frameworks & Tools',
    icon: <Wrench className="w-5 h-5" />,
    color: 'orange' as const,
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Docker', level: 85 },
      { name: 'Git', level: 95 },
      { name: 'Azure', level: 80 },
      { name: 'Firebase', level: 85 },
    ]
  },
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Cpu className="section-icon" />
          Technical Skills
        </motion.h2>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="glass-card rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${
                    category.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                    category.color === 'green' ? 'from-emerald-500/20 to-emerald-600/20' :
                    category.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                    'from-orange-500/20 to-orange-600/20'
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <SkillMeter
                      key={skill.name}
                      skill={skill.name}
                      level={skill.level}
                      color={category.color}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Floating skill icons background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Code, Shield, Brain, Zap].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-slate-800/20"
              style={{
                left: `${20 + index * 20}%`,
                top: `${10 + index * 15}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className="w-20 h-20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};