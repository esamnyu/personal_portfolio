"use client";

import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded", container);
  }, []);

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
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "connect",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
              particles: {
                opacity: {
                  value: 0.5,
                  animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                    startValue: "max",
                    destroy: "min",
                  },
                },
              },
            },
            connect: {
              distance: 150,
              radius: 200,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
        particles: {
          color: {
            value: ["#60A5FA", "#3B82F6", "#2563EB"],
          },
          links: {
            color: "#60A5FA",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
              bottom: "bounce",
              left: "bounce",
              right: "bounce",
              top: "bounce",
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.3,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
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
              minimumValue: 0.1,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
            lines: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export default ParticlesBackground;