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
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-black border-2 border-green-500 text-green-400 shadow-lg hover:bg-green-900 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Open Terminal"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        delay: 1 // Delay entry to let the page load first
      }}
    >
      <Terminal className="w-5 h-5" />
      
      {/* Pulsing effect */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-green-500"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </motion.button>
  );
};

export default TerminalButton;