"use client";

import React from 'react';
import { Github, Linkedin, Mail, Shield, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ParticlesBackground from './ParticlesBackground';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// Define types for the component props
interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
}

// Define interfaces for your data structures
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

// Animated card component with TypeScript
const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, index = 0 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
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
      {/* Rest of your JSX remains the same */}
    </div>
  );
};

export default Portfolio;