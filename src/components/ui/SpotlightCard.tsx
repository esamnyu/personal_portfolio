"use client";
import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export const SpotlightCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        divRef.current.style.setProperty("--mouse-x", `${x}px`);
        divRef.current.style.setProperty("--mouse-y", `${y}px`);
      });
    },
    []
  );

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-card rounded-xl", className)}
    >
      <div className="spotlight-border rounded-xl" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
