"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Award, ExternalLink } from 'lucide-react';
import { Credential } from '@/types';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  credentials?: Credential[];
  highlights: string[];
  index: number;
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  date,
  location,
  credentials,
  highlights,
  index,
  icon
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 pb-16 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Timeline line */}
      <motion.div
        className="absolute left-[7px] top-4 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, var(--accent-gold) 0%, transparent 100%)',
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-1"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.15 + 0.2, type: "spring", stiffness: 300 }}
      >
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-[var(--accent-gold)] shadow-lg" style={{ boxShadow: '0 0 20px var(--accent-gold-glow)' }} />
          {icon && (
            <div className="absolute -top-1 -right-1 text-[var(--accent-gold)]">
              {icon}
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="glass-card rounded-xl p-8 hover:border-[var(--border-accent)] transition-all duration-500"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] mb-1">
              {title}
            </h3>
            <p className="text-[var(--accent-gold)] font-medium">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-[var(--text-muted)] text-sm font-body">{date}</p>
            {location && (
              <p className="text-[var(--text-muted)] text-sm flex items-center gap-1 justify-end mt-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            )}
          </div>
        </div>

        {credentials && credentials.length > 0 && (
          <div className="mb-5 space-y-2">
            {credentials.map((cred, idx) => (
              <motion.a
                key={idx}
                href={cred.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--border-accent)] bg-[var(--accent-gold-soft)] hover:bg-[rgba(201,169,98,0.2)] transition-all duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15 + idx * 0.1 + 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Award className="w-4 h-4 text-[var(--accent-gold)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[var(--text-primary)] text-sm font-medium">
                    {cred.name}
                  </span>
                  <span className="text-[var(--text-muted)] text-xs ml-2">
                    {cred.issuer}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-gold)] transition-colors flex-shrink-0" />
              </motion.a>
            ))}
          </div>
        )}

        <ul className="space-y-3">
          {highlights.map((highlight, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.15 + idx * 0.08 + 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="text-[var(--accent-gold)] mt-1.5 flex-shrink-0 text-xs">
                ◆
              </span>
              <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};
