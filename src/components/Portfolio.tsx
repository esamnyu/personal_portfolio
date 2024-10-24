"use client";

import React, { useCallback } from 'react';
import { Github, Linkedin, Mail, Shield, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const Portfolio = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded", container);
  }, []);

  const projects = [
    {
      title: "CSAW LLM Attack CTF",
      description: "Led the team in developing advanced attack vectors using machine learning techniques for LLM security testing",
      tech: ["LLMs", "Machine Learning", "Security Testing", "Python"],
      metrics: "2nd Place Winner"
    },
    {
      title: "CSAW Phishing Detection Game",
      description: "Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot for cybersecurity CTF",
      tech: ["TensorFlow", "PyTorch", "Docker", "GPT-3"],
      metrics: "Best Challenge Award, 300+ participants"
    },
    {
      title: "Roomies App",
      description: "Led development of mobile application addressing real-time data synchronization and user experience design challenges",
      tech: ["React Native", "Firestore", "Firebase"],
      metrics: "40% dispute reduction, 30% task completion improvement"
    }
  ];

  const experiences = [
    {
      company: "NYU Langone Health",
      role: "AI & Cybersecurity Intern",
      date: "May 2024 - August 2024",
      highlights: [
        "Developed AI Chatbot reducing manual policy queries by 30% and enhancing infrastructure security by 25%",
        "Enhanced threat detection by 40% using Crowdstrike Falcon & IBM QRadar, improving accuracy by 20%",
        "Optimized Cortex XSoar playbooks and integrated EnCase forensics, improving response efficiency by 15%"
      ]
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Auditor",
      date: "December 2021 - August 2023",
      highlights: [
        "Administered ICS security assessments across 50+ mission-critical OT/ICS systems using NIST frameworks",
        "Identified and remediated 100+ cybersecurity vulnerabilities across NYC agencies",
        "Improved compliance by 20% and reduced audit time by 20% through standardized processes"
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 150,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#60A5FA",
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
              random: false,
              speed: 1.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 80,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      <div className="relative z-10">
        <header className="section-container text-center py-24">
          <h1 className="hero-title animate-fade-in">Ethan Sam </h1>
          <p className="hero-subtitle animate-fade-in-delay">AI & Cybersecurity Engineer</p>
          <div className="flex justify-center gap-6 animate-fade-in-delay-2">
            <a href="https://github.com/yourusername" className="social-link" target="_blank" rel="noopener noreferrer">
              <Github className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/yourusername" className="social-link" target="_blank" rel="noopener noreferrer">
              <Linkedin className="social-icon" />
            </a>
            <a href="mailto:your.email@example.com" className="social-link">
              <Mail className="social-icon" />
            </a>
          </div>
        </header>

        <section className="section-container mb-24">
          <h2 className="section-title">
            <Shield className="section-icon" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="project-card border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="project-title">{project.title}</CardTitle>
                  <CardDescription className="project-description">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <p className="metric-text">{project.metrics}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="section-container pb-24">
          <h2 className="section-title">
            <Brain className="section-icon" />
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="project-card border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="project-title">{exp.company}</CardTitle>
                  <CardDescription className="project-description">
                    {exp.role} • {exp.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-slate-300">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-blue-400">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;