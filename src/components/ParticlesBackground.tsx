"use client";

import React, { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
}

const PARTICLE_COUNT = 30;
const LINK_DISTANCE = 180;
const LINK_OPACITY = 0.08;
const PARTICLE_SPEED = 0.3;
const COLORS = ["#c9a962", "#e8d5b7", "#f5f2eb"];

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
        size: 1 + Math.random(),
        opacity: 0.03 + Math.random() * 0.09,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.0005,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (prefersReducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      if (particlesRef.current.length === 0) {
        initParticles(window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w * dpr, h * dpr);

      const particles = particlesRef.current;

      // Draw links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * LINK_OPACITY;
            ctx.strokeStyle = `rgba(201, 169, 98, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Subtle opacity breathing
        p.opacity += p.opacityDir;
        if (p.opacity > 0.12 || p.opacity < 0.03) {
          p.opacityDir *= -1;
        }

        const color = COLORS[Math.floor(p.x * 3) % COLORS.length];
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    prefersReducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      prefersReducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: 0.4 }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
