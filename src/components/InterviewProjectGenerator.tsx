"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Loader2,
  Target,
  Lightbulb,
  MessageSquare,
  Code2,
  ChevronRight,
  Clock,
  Building2,
  Zap,
  X
} from 'lucide-react';

interface ProjectIdea {
  title: string;
  description: string;
  whyItWorks: string;
  complexity: string;
  techStack: string[];
}

interface Analysis {
  companyInsights: {
    name: string;
    industry: string;
    stage: string;
    techStack: string[];
  };
  gapAnalysis: {
    identifiedGap: string;
    evidence: string;
    opportunity: string;
  };
  projectIdeas: ProjectIdea[];
  talkingPoints: string[];
  interviewStrategy: string;
}

export const InterviewProjectGenerator: React.FC = () => {
  const [jobPosting, setJobPosting] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const analyzeJobPosting = async () => {
    if (!jobPosting.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobPosting }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job posting');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setJobPosting('');
    setError(null);
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.toLowerCase().includes('weekend')) return 'text-green-400';
    if (complexity.toLowerCase().includes('1-2')) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <section id="project-generator" className="py-16 relative">
      <div className="section-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
              <span className="text-[var(--text-muted)] text-sm tracking-[0.2em] uppercase font-body">
                Try My Approach
              </span>
              <Sparkles className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-[var(--text-primary)] mb-3">
              Interview Project Generator
            </h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Paste a job posting and I'll analyze it to suggest projects you can build to stand out—the same strategy I used to land my AI Engineer role.
            </p>
          </div>

          {/* Main Card */}
          <motion.div
            className="glass-card rounded-2xl overflow-hidden"
            layout
          >
            <AnimatePresence mode="wait">
              {!analysis ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6 md:p-8"
                >
                  {/* Input Area */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Paste the job posting here
                    </label>
                    <textarea
                      value={jobPosting}
                      onChange={(e) => setJobPosting(e.target.value)}
                      placeholder="Copy and paste the full job description..."
                      className="w-full h-48 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors resize-none font-body text-sm"
                    />

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}

                    <motion.button
                      onClick={analyzeJobPosting}
                      disabled={!jobPosting.trim() || isAnalyzing}
                      className="w-full py-4 px-6 bg-[var(--accent-gold)] text-[var(--bg-primary)] font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--accent-gold-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing with AI...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          Generate Project Ideas
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="divide-y divide-[var(--border-subtle)]"
                >
                  {/* Company Insights */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[var(--accent-gold)]" />
                        <h4 className="font-display font-semibold text-[var(--text-primary)]">
                          Company Insights
                        </h4>
                      </div>
                      <button
                        onClick={resetAnalysis}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Company</p>
                        <p className="text-[var(--text-primary)] text-sm">{analysis.companyInsights.name || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Industry</p>
                        <p className="text-[var(--text-primary)] text-sm">{analysis.companyInsights.industry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Stage</p>
                        <p className="text-[var(--text-primary)] text-sm">{analysis.companyInsights.stage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Tech Stack</p>
                        <div className="flex flex-wrap gap-1">
                          {analysis.companyInsights.techStack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gap Analysis */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-[var(--accent-gold)]" />
                      <h4 className="font-display font-semibold text-[var(--text-primary)]">
                        Gap Identified
                      </h4>
                    </div>
                    <div className="glass-card rounded-xl p-4 border-l-2 border-[var(--accent-gold)]">
                      <p className="text-[var(--text-primary)] font-medium mb-2">
                        {analysis.gapAnalysis.identifiedGap}
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm mb-3">
                        <span className="text-[var(--text-muted)]">Evidence:</span> {analysis.gapAnalysis.evidence}
                      </p>
                      <p className="text-[var(--accent-gold)] text-sm">
                        {analysis.gapAnalysis.opportunity}
                      </p>
                    </div>
                  </div>

                  {/* Project Ideas */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-[var(--accent-gold)]" />
                      <h4 className="font-display font-semibold text-[var(--text-primary)]">
                        Project Ideas
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {analysis.projectIdeas.map((project, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-card rounded-xl p-4 hover:border-[var(--border-accent)] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[var(--accent-gold)] font-mono text-sm">0{index + 1}</span>
                              <h5 className="font-medium text-[var(--text-primary)]">{project.title}</h5>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="w-3 h-3" />
                              <span className={getComplexityColor(project.complexity)}>{project.complexity}</span>
                            </div>
                          </div>
                          <p className="text-[var(--text-secondary)] text-sm mb-3">
                            {project.description}
                          </p>
                          <p className="text-[var(--text-muted)] text-xs mb-3">
                            <span className="text-[var(--accent-gold)]">Why it works:</span> {project.whyItWorks}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Talking Points */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageSquare className="w-5 h-5 text-[var(--accent-gold)]" />
                      <h4 className="font-display font-semibold text-[var(--text-primary)]">
                        Interview Talking Points
                      </h4>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {analysis.talkingPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-[var(--text-secondary)] text-sm"
                        >
                          <ChevronRight className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="glass-card rounded-lg p-3 bg-[var(--accent-gold-soft)]">
                      <p className="text-sm text-[var(--text-primary)]">
                        <span className="text-[var(--accent-gold)] font-medium">Strategy: </span>
                        {analysis.interviewStrategy}
                      </p>
                    </div>
                  </div>

                  {/* Try Again Button */}
                  <div className="p-6 md:p-8">
                    <button
                      onClick={resetAnalysis}
                      className="w-full py-3 px-6 border border-[var(--border-subtle)] text-[var(--text-secondary)] font-medium rounded-xl flex items-center justify-center gap-2 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-all duration-300"
                    >
                      <Code2 className="w-4 h-4" />
                      Analyze Another Job Posting
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer Note */}
          <p className="text-center text-[var(--text-muted)] text-xs mt-4">
            Powered by Google Gemini AI
          </p>
        </motion.div>
      </div>
    </section>
  );
};
