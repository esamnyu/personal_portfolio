"use client";

import React from 'react';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
  maxTilt?: number;
  scale?: number;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  glare = true,
  maxTilt = 10,
  scale = 1.05,
}) => {
  const tiltRef = useTilt({
    maxTilt,
    scale,
    glare,
    speed: 400,
    maxGlare: 0.2,
  });

  return (
    <div
      ref={tiltRef}
      className={cn(
        "relative rounded-lg transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};