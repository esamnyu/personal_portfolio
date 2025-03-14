"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalIntroProps {
  onComplete: () => void;
  onSkip: () => void;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  
  // Refs for tracking timeouts and intervals
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // The text content to type out
  const introSteps = [
    "INITIALIZING SECURE CONNECTION...",
    "ACCESS GRANTED. WELCOME TO ETHAN'S PORTFOLIO.",
    "I'VE DETECTED YOU'RE NEW HERE.",
    "WOULD YOU LIKE TO TRY MY INTERACTIVE TERMINAL?",
    "YOU CAN DISCOVER HIDDEN INFO ABOUT MY PROJECTS AND SKILLS...",
    "FIND EASTER EGGS OR EVEN CAPTURE THE FLAG!",
    "CLICK 'START HACKING' TO CONTINUE OR 'SKIP' TO BROWSE NORMALLY."
  ];

  // Typing effect with better cleanup
  useEffect(() => {
    // Clear any existing intervals when step changes
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    
    if (stepTimeoutRef.current) {
      clearTimeout(stepTimeoutRef.current);
    }
    
    // Always reset display text when step changes
    setDisplayText('');
    setIsTyping(true);
    
    if (currentStep < introSteps.length) {
      const text = introSteps[currentStep];
      let index = 0;
      
      // Show skip button after first step
      if (currentStep === 1) {
        setShowSkip(true);
      }
      
      // Create new typing interval for current step
      typingIntervalRef.current = setInterval(() => {
        if (index < text.length) {
          setDisplayText(prev => prev + text.charAt(index));
          index++;
        } else {
          // Clear this interval when typing is complete
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          
          setIsTyping(false);
          
          // Move to next step after a delay
          if (currentStep < introSteps.length - 1) {
            stepTimeoutRef.current = setTimeout(() => {
              setCurrentStep(prev => prev + 1);
            }, 1200); // Pause between steps
          }
        }
      }, 30); // Slightly slower typing speed for better readability
    }
    
    // Cleanup function
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      
      if (stepTimeoutRef.current) {
        clearTimeout(stepTimeoutRef.current);
        stepTimeoutRef.current = null;
      }
    };
  }, [currentStep, introSteps]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-lg w-full mx-4 p-8 rounded-lg border-2 border-green-500 bg-black relative overflow-hidden">
        {/* Terminal header design */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-green-900 flex items-center px-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="absolute inset-x-0 text-center text-xs text-green-300 font-mono">secure-connection</div>
        </div>
        
        <div className="mt-6">
          {/* Terminal icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-2 border-green-500 rounded-full flex items-center justify-center">
              <Terminal className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          {/* Terminal content */}
          <div className="font-mono text-green-400 min-h-[150px]">
            <p className="mb-4">$ {displayText}{isTyping && <span className="animate-pulse">_</span>}</p>
            
            {/* Only show buttons when we reach the last step and typing is complete */}
            {currentStep === introSteps.length - 1 && !isTyping && (
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={onComplete}
                  className="px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Terminal className="w-4 h-4" />
                  Start Hacking
                </button>
                
                {showSkip && (
                  <button
                    onClick={onSkip}
                    className="px-6 py-3 bg-transparent hover:bg-slate-800 border border-slate-600 text-slate-300 font-medium rounded-md transition-colors"
                  >
                    Skip Intro
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Skip button always available at bottom right */}
        {currentStep > 0 && currentStep < introSteps.length - 1 && (
          <button
            onClick={onSkip}
            className="absolute bottom-3 right-4 text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            skip intro
          </button>
        )}
        
        {/* Blinking cursor animation at bottom of screen (decorative) */}
        <div className="absolute bottom-3 left-4 font-mono text-green-400 text-sm opacity-70">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalIntro;