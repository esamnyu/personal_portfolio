"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionEnabled(!mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMotionEnabled(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Removed console.log
  }, []);

  // If motion is disabled, return a static background or nothing
  if (!motionEnabled) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          opacity: 0,
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: false, // Disable click interactions
              mode: "push",
            },
            onHover: {
              enable: false, // Disable hover interactions
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 2,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#3B82F6", "#8B5CF6", "#10B981"],
          },
          links: {
            color: "#60A5FA",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: motionEnabled ? 0.5 : 0,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: motionEnabled ? 50 : 20,
          },
          opacity: {
            value: 0.15,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.05,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 z-0 pointer-events-none" // Changed z-index from z-50 to z-0
    />
  );
};

export default ParticlesBackground;