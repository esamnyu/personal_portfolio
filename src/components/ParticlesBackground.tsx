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
    // Particles loaded
  }, []);

  // If motion is disabled, return nothing
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
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: ["#c9a962", "#e8d5b7", "#f5f2eb"],
          },
          links: {
            color: "#c9a962",
            distance: 180,
            enable: true,
            opacity: 0.08,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 30,
          },
          opacity: {
            value: 0.12,
            random: true,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.03,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
            random: true,
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticlesBackground;
