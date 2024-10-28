"use client";

import React, { useRef } from 'react';
import { Github, Linkedin, Mail, Shield, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ParticlesBackground from './ParticlesBackground';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// Define interfaces for data structures
interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string;
}

interface Experience {
  company: string;
  role: string;
  date: string;
  highlights: string[];
}

interface Education {
  school: string;
  degree: string;
  date: string;
  highlights: string[];
}

interface Skills {
  languages: string[];
  security_tools: string[];
  frameworks: string[];
  standards: string[];
}

// Define AnimatedCard props interface
interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
}

// Animated card component with proper TypeScript typing
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, index = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  // Project data
  const projects: Project[] = [
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

  // Experience data
  const experiences: Experience[] = [
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
    },
    {
      company: "NYC Cyber Command",
      role: "Cybersecurity Analyst Intern",
      date: "June 2021 - August 2021",
      highlights: [
        "Evaluated 10+ NYC agencies' cybersecurity programs, improving compliance by 15%",
        "Developed internal Audit Guide reducing audit time by 20% and enhancing compliance by 10%",
        "Contributed to privacy and data protection discussions, participating in mock trials for agency responses"
      ]
    }
  ];

  // Education data
  const education: Education[] = [
    {
      school: "New York University, Tandon School of Engineering",
      degree: "M.S. Cybersecurity",
      date: "Expected December 2024",
      highlights: [
        "GPA: 3.96",
        "Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography",
        "Advanced Studies: Penetration Testing, Vulnerability Analysis, Threat Intelligence, AI & ML"
      ]
    },
    {
      school: "City University of New York: Hunter College",
      degree: "B.S. Computer Science",
      date: "May 2021",
      highlights: []
    }
  ];

  // Skills data
  const skills: Skills = {
    languages: ["Python", "JavaScript", "C++", "SQL", "Bash"],
    security_tools: ["CrowdStrike Falcon", "IBM QRadar", "Splunk", "Cortex XSoar", "EnCase", "Wireshark"],
    frameworks: ["React Native", "TensorFlow", "PyTorch", "Docker", "Firestore"],
    standards: ["NIST CSF", "NIST SP-800-53"]
  };

  const achievements: string[] = [
    "CSAW LLM Attack CTF – 2nd Place Winner",
    "ISACA/National Cyber League CTF Scholarship Awardee",
    "180 Christian Fellowship – President (Fall 2024)"
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ParticlesBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Ethan Sam
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">   
              Cybersecurity Engineer | AI Enthusiast | CTF Player
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/yourusername" className="text-gray-300 hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-300 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-white">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AnimatedCard key={project.title} index={index}>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300">{project.metrics}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <AnimatedCard key={experience.company + experience.role} index={index}>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{experience.company}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {experience.role}
                        </CardDescription>
                      </div>
                      <span className="text-gray-400">{experience.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {experience.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <AnimatedCard key={edu.school} index={index}>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{edu.school}</CardTitle>
                        <CardDescription className="text-gray-300">
                          {edu.degree}
                        </CardDescription>
                      </div>
                      <span className="text-gray-400">{edu.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {edu.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard index={0}>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" /> Languages & Frameworks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...skills.languages, ...skills.frameworks].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>

            <AnimatedCard index={1}>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5" /> Security Tools & Standards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[...skills.security_tools, ...skills.standards].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <AnimatedCard key={achievement} index={index}>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{achievement}</CardTitle>
                  </CardHeader>
                </Card>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;