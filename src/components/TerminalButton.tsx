"use client";

import React from 'react';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface TerminalButtonProps {
  onClick: () => void;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-sm border border-green-500/50 text-green-400 shadow-2xl hover:from-green-800 hover:to-emerald-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open Terminal"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        delay: 1
      }}
    >
      <Terminal className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Multiple pulsing rings for depth */}
      <motion.span
        className="absolute inset-0 rounded-full border border-green-400/60"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-green-400/40"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5
        }}
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl group-hover:bg-green-400/30 transition-colors duration-300"></div>
    </motion.button>
  );
};

export default TerminalButton;