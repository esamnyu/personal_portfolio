import React from 'react';
import { Github, Linkedin, Mail, Shield, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ParticlesBackground from './ParticlesBackground';

const Portfolio = () => {
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
      <ParticlesBackground />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-transparent"></div>
        
        <header className="relative section-container text-center py-24">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Ethan Sam</h1>
            <p className="text-xl md:text-2xl text-blue-300">AI & Cybersecurity Engineer</p>
            <div className="flex justify-center gap-6 pt-4">
              <a href="https://github.com/esamnyu" 
                className="text-blue-300 hover:text-blue-400 transition-colors" 
                target="_blank" 
                rel="noopener noreferrer">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/ethansam" 
                className="text-blue-300 hover:text-blue-400 transition-colors" 
                target="_blank" 
                rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:es5888@nyu.edu" 
                className="text-blue-300 hover:text-blue-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </header>

        <section className="relative px-6 md:px-12 lg:px-24 mb-24">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-8">
            <Shield className="w-6 h-6 text-blue-400" />
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-slate-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-blue-400">{project.metrics}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="relative px-6 md:px-12 lg:px-24 pb-24">
          <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-8">
            <Brain className="w-6 h-6 text-blue-400" />
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-white">{exp.company}</CardTitle>
                  <CardDescription className="text-slate-300">
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