"use client";

import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];
    
    if (!isDeleting && currentText === fullText) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimer);
    }
    
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    
    const timeout = setTimeout(() => {
      setCurrentText(prev => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        }
        return fullText.substring(0, prev.length + 1);
      });
    }, isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
        {currentText}
      </span>
      <span className="animate-pulse ml-1 text-blue-400">|</span>
    </span>
  );
};