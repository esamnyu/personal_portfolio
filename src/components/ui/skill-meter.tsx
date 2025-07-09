"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillMeterProps {
  skill: string;
  level: number; // 0-100
  color?: string;
  icon?: React.ReactNode;
}

export const SkillMeter: React.FC<SkillMeterProps> = ({ 
  skill, 
  level, 
  color = "blue",
  icon 
}) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDisplayLevel(level);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, level]);

  const gradientColor = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  }[color] || "from-blue-500 to-blue-600";

  const glowColor = {
    blue: "rgba(59, 130, 246, 0.5)",
    green: "rgba(16, 185, 129, 0.5)",
    purple: "rgba(139, 92, 246, 0.5)",
    orange: "rgba(249, 115, 22, 0.5)",
  }[color] || "rgba(59, 130, 246, 0.5)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium text-white">{skill}</span>
        </div>
        <span className="text-sm text-slate-400">{displayLevel}%</span>
      </div>
      
      <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradientColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${displayLevel}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </motion.div>
        
        {/* Pulse effect at the end */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full`}
          initial={{ left: 0, opacity: 0 }}
          animate={{ 
            left: isInView ? `${displayLevel}%` : 0,
            opacity: isInView ? [0, 1, 1] : 0
          }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          style={{
            boxShadow: `0 0 10px ${glowColor}`,
            marginLeft: '-4px'
          }}
        />
      </div>
    </motion.div>
  );
};