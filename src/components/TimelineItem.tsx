"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  highlights: string[];
  index: number;
  icon?: React.ReactNode;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  date,
  location,
  highlights,
  index,
  icon
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent" />
      
      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping" />
          {icon && (
            <div className="absolute -top-1 -right-1 text-blue-400">
              {icon}
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="glass-card rounded-lg p-6 ml-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-wrap items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              {title}
            </h3>
            <p className="text-blue-500 font-medium">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-300 text-sm">{date}</p>
            {location && (
              <p className="text-gray-300 text-sm">📍 {location}</p>
            )}
          </div>
        </div>

        <motion.ul className="space-y-2">
          {highlights.map((highlight, idx) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 + 0.3 }}
            >
              <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">▸</span>
              <span className="text-slate-300">{highlight}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};