"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  sanitizeInput, 
  validateCommandArgs, 
  securityLogger, 
  terminalStorage, 
  rateLimiter 
} from '@/utils/terminalSecurity';

// Define the command history interface
interface CommandEntry {
  command: string;
  response: string | React.ReactNode;
  isError?: boolean;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Commands available in the terminal
const AVAILABLE_COMMANDS: Record<string, { description: string, action?: (args?: string) => string | React.ReactNode }> = {
  'help': { 
    description: 'Shows available commands',
    action: () => {
      return (
        <div className="space-y-1">
          <p className="text-green-400">Available commands:</p>
          {Object.entries(AVAILABLE_COMMANDS)
            .filter(([cmd]) => cmd !== 'matrix' && cmd !== 'find-vulnerability') // Hide easter eggs from help
            .map(([cmd, details]) => (
              <p key={cmd} className="pl-4">
                <span className="text-yellow-300">{cmd}</span> - {details.description}
              </p>
            ))}
        </div>
      );
    }
  },
  'clear': { description: 'Clears the terminal screen' },
  'about': { 
    description: 'Displays information about me',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Ethan Sam ==</p>
          <p>Cybersecurity engineer specializing in AI security and CTF competitions.</p>
          <p>Based in New York, currently pursuing an M.S. in Cybersecurity at NYU.</p>
          <p>Type <span className="text-yellow-300">skills</span> to see my technical expertise.</p>
        </div>
      );
    }
  },
  'skills': { 
    description: 'Lists my technical skills',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-green-400">Technical Skills:</p>
          <div className="pl-4">
            <p><span className="text-blue-400">Languages:</span> Python, JavaScript, C++, SQL, Bash, HTML/CSS</p>
            <p><span className="text-blue-400">Security Tools:</span> CrowdStrike Falcon, IBM QRadar, Splunk, Cortex XSoar, EnCase, Wireshark</p>
            <p><span className="text-blue-400">Frameworks:</span> React Native, MERN Stack, Docker, Git, Azure, Firebase/Firestore</p>
            <p><span className="text-blue-400">ML/AI:</span> TensorFlow, PyTorch, Generative AI, LLM Integration, Computer Vision</p>
            <p><span className="text-blue-400">Standards:</span> NIST CSF, NIST SP-800-53</p>
            <p><span className="text-blue-400">Other:</span> Digital Forensics, Vulnerability Management, Operating Systems, Computer Networking</p>
          </div>
        </div>
      );
    }
  },
  'projects': { 
    description: 'Shows my top projects',
    action: () => {
      return (
        <div className="space-y-3">
          <p className="text-green-400">Featured Projects:</p>
          <div className="pl-4 border-l border-green-800">
            <p className="text-yellow-300">CSAW Phishing Detection Game</p>
            <p>Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot.</p>
            <p className="text-gray-400">Result: Best Challenge Award, 300+ participants</p>
          </div>
          <div className="pl-4 border-l border-green-800">
            <p className="text-yellow-300">Roomies App</p>
            <p>Co-founded and led development of a mobile application for roommate coordination.</p>
            <p className="text-gray-400">Result: Implemented LLM module for task aggregation, improved user engagement</p>
          </div>
          <div className="pl-4 border-l border-green-800">
            <p className="text-yellow-300">Collegiate Elo Ranking System</p>
            <p>Engineered a comprehensive ranking system for collegiate esports competitions.</p>
            <p className="text-gray-400">Result: 27% user engagement boost, 50% competition participation increase</p>
          </div>
          <p className="italic text-gray-400">Type <span className="text-yellow-300">project [name]</span> for more details</p>
        </div>
      );
    }
  },
  'project': { 
    description: 'Get details about a specific project',
    action: (args) => {
      if (!args) return "Error: Please specify a project name. Example: project phishing";
      
      const projectMap: Record<string, React.ReactNode> = {
        "phishing": (
          <div className="space-y-2">
            <p className="text-yellow-300 text-lg">CSAW Phishing Detection Game</p>
            <p>Created an interactive educational tool to train users to identify sophisticated phishing attempts.</p>
            <p>Combined CNN-based image analysis with GPT-3 powered chatbot to simulate realistic phishing scenarios.</p>
            <p><span className="text-blue-400">Tech:</span> TensorFlow, PyTorch, Docker, GPT-3</p>
            <p><span className="text-green-400">Outcome:</span> Best Challenge Award, used by 300+ participants</p>
            <p className="text-gray-400 italic mt-2">GitHub: github.com/yourusername/phishing-detection</p>
          </div>
        ),
        "roomies": (
          <div className="space-y-2">
            <p className="text-yellow-300 text-lg">Roomies App</p>
            <p>Mobile application for roommate coordination with robust security and AI integration.</p>
            <p>Implemented cryptography techniques and consensus-driven AI framework for household challenges.</p>
            <p><span className="text-blue-400">Tech:</span> React Native, Firestore, Firebase, AI/ML</p>
            <p><span className="text-green-400">Outcome:</span> Enhanced user engagement, improved communication among users</p>
            <p className="text-gray-400 italic mt-2">GitHub: github.com/yourusername/roomies-app</p>
          </div>
        ),
        "elo": (
          <div className="space-y-2">
            <p className="text-yellow-300 text-lg">Collegiate Elo Ranking System</p>
            <p>Comprehensive ranking system for collegiate esports competitions using MERN stack.</p>
            <p>Enhanced security and scalability using SaaS and Azure services.</p>
            <p><span className="text-blue-400">Tech:</span> MongoDB, Express, React, Node.js, SaaS, Azure</p>
            <p><span className="text-green-400">Outcome:</span> 27% user engagement boost, 50% increase in competition participation</p>
            <p className="text-gray-400 italic mt-2">GitHub: github.com/yourusername/elo-ranking</p>
          </div>
        )
      };
      
      // More flexible matching for project names
      const normalizedArg = args.toLowerCase().trim();
      
      // Check for partial matches in project names
      if (normalizedArg.includes("phish") || normalizedArg.includes("detection") || normalizedArg.includes("game") || normalizedArg.includes("csaw")) {
        return projectMap["phishing"];
      } else if (normalizedArg.includes("room") || normalizedArg.includes("app")) {
        return projectMap["roomies"];
      } else if (normalizedArg.includes("elo") || normalizedArg.includes("rank") || normalizedArg.includes("college")) {
        return projectMap["elo"];
      }
      
      return `Error: Project "${args}" not found. Try: phishing, roomies, or elo`;
    }
  },
  'contact': { 
    description: 'Shows my contact information',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-green-400">Contact Information:</p>
          <p><span className="text-blue-400">Email:</span> es5888@nyu.edu</p>
          <p><span className="text-blue-400">GitHub:</span> github.com/yourusername</p>
          <p><span className="text-blue-400">LinkedIn:</span> linkedin.com/in/ethansam</p>
          <p className="mt-3 text-yellow-300">Feel free to reach out! I'm always open to discussing new opportunities.</p>
        </div>
      );
    }
  },
  'hack': { 
    description: 'Try to hack into the system',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-red-500">ACCESS DENIED</p>
          <p>Nice try! But my defenses are stronger than that.</p>
          <p>If you're interested in cybersecurity, let's chat about ethical hacking instead.</p>
          <p className="text-gray-400">Hint: Try running <span className="text-yellow-300">ctf</span> to see my capture-the-flag experience.</p>
        </div>
      );
    }
  },
  'ctf': { 
    description: 'Shows my Capture The Flag experience',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-green-400">CTF Experience:</p>
          <p>I regularly participate in cybersecurity Capture The Flag competitions:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>CSAW Phishing Detection Game – Best Challenge Award</li>
            <li>ISACA/National Cyber League CTF – Scholarship Awardee</li>
            <li>HackTheBox – Top 5% global ranking</li>
            <li>TryHackMe – Completed over 50 rooms</li>
          </ul>
          <p className="mt-2">CTF competitions have been critical in developing my practical security skills and staying current with emerging threats.</p>
        </div>
      );
    }
  },
  'flag': { 
    description: 'Find the hidden flag',
    action: () => {
      return (
        <div className="space-y-2">
          <p>Searching for flag...</p>
          <p className="text-yellow-300">Congratulations! You found an Easter egg!</p>
          <p>Flag: CTF{"y0u_f0und_m3_n1c3_w0rk_h4ck3r"}</p>
          <p className="mt-2 text-gray-400">This is just one of several hidden features in this terminal. Keep exploring!</p>
        </div>
      );
    }
  },
  'resume': { 
    description: 'Download my resume',
    action: () => {
      // In a real implementation, you could trigger a download here
      return (
        <div className="space-y-2">
          <p>Initiating download of resume.pdf...</p>
          <p className="text-green-400">Download complete!</p>
          <p className="text-gray-400">(This is a simulation - the actual download would happen on your site)</p>
        </div>
      );
    }
  },
  'exit': { description: 'Close the terminal' },
  'whoami': { 
    description: 'Shows the current user',
    action: () => "visitor@ethansam-portfolio:~$"
  },
  'date': { 
    description: 'Shows the current date and time',
    action: () => `Current date: ${new Date().toLocaleString()}`
  },
  'portfolio': { 
    description: 'Shows my portfolio summary',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Portfolio Summary ==</p>
          <p><span className="text-green-400">Education:</span> M.S. Cybersecurity (NYU), B.S. Computer Science (CUNY)</p>
          <p><span className="text-green-400">Experience:</span> AI & Cybersecurity Intern (NYU Langone), Cybersecurity Auditor (NYC Cyber Command)</p>
          <p><span className="text-green-400">Projects:</span> CSAW Phishing Detection Game, Roomies App, Collegiate Elo Ranking System</p>
          <p><span className="text-green-400">Skills:</span> Python, ML/AI, Cybersecurity Tools, React</p>
          <p className="text-gray-400 mt-2">Type <span className="text-yellow-300">projects</span> to see more details about my work.</p>
        </div>
      );
    }
  },
  'education': {
    description: 'Shows my educational background',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Education ==</p>
          <div className="pl-4 border-l border-blue-800 mb-4">
            <p className="text-yellow-300">New York University, Tandon School of Engineering</p>
            <p>M.S. Cybersecurity</p>
            <p className="text-gray-400">August 2022 - June 2025</p>
            <ul className="list-disc pl-5 mt-1 text-blue-200">
              <li>GPA: 3.96</li>
              <li>Key Coursework: Network Security, Digital Forensics, Cloud Security, Applied Cryptography</li>
            </ul>
          </div>
          <div className="pl-4 border-l border-blue-800">
            <p className="text-yellow-300">City University of New York: Hunter College</p>
            <p>B.S. Computer Science</p>
            <p className="text-gray-400">August 2017 - June 2021</p>
            <p className="text-blue-200">GPA: 3.76</p>
          </div>
        </div>
      );
    }
  },
  'experience': {
    description: 'Shows my professional experience',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Professional Experience ==</p>
          <div className="pl-4 border-l border-green-800 mb-4">
            <p className="text-yellow-300">Roomies</p>
            <p>Co-Founder & Lead Developer</p>
            <p className="text-gray-400">February 2024 - Present</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Implemented cryptography techniques to secure user data</li>
              <li>Developed consensus-driven AI framework for household challenges</li>
              <li>Created LLM-powered module for task aggregation</li>
            </ul>
          </div>
          <div className="pl-4 border-l border-green-800 mb-4">
            <p className="text-yellow-300">NYU Langone Medical Center</p>
            <p>AI & Cybersecurity Intern</p>
            <p className="text-gray-400">May 2024 - August 2024</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Developed AI Chatbot reducing manual policy queries by 30%</li>
              <li>Enhanced threat detection by 40% using Crowdstrike Falcon & IBM QRadar</li>
              <li>Optimized Cortex XSoar playbooks and integrated EnCase forensics</li>
            </ul>
          </div>
          <div className="pl-4 border-l border-green-800">
            <p className="text-yellow-300">NYC Cyber Command</p>
            <p>Cybersecurity Auditor</p>
            <p className="text-gray-400">December 2021 - August 2023</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Administered ICS security assessments across 50+ mission-critical systems</li>
              <li>Identified and remediated 100+ cybersecurity vulnerabilities</li>
              <li>Improved compliance by 20% through standardized processes</li>
            </ul>
          </div>
          <p className="text-gray-400 mt-2">Type <span className="text-yellow-300">nyc-cyber</span> for more details about my NYC Cyber Command experience.</p>
        </div>
      );
    }
  },
  'debug': {
    description: 'Shows debugging information',
    action: () => {
      // Check if terminal storage is working
      const hasHistory = terminalStorage.getCommandHistory().length > 0;
      const commands = Object.keys(AVAILABLE_COMMANDS).join(', ');
      
      return (
        <div className="space-y-2">
          <p className="text-red-400">== Terminal Debug Information ==</p>
          <p><span className="text-blue-400">Command History Working:</span> {hasHistory ? 'Yes' : 'No'}</p>
          <p><span className="text-blue-400">Available Commands:</span> {commands}</p>
          <p><span className="text-blue-400">Rate Limiter Status:</span> {rateLimiter ? 'Active' : 'Inactive'}</p>
          <p><span className="text-blue-400">Browser:</span> {typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown'}</p>
        </div>
      );
    }
  },
  'cybersecurity': { 
    description: 'Shows my cybersecurity expertise',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Cybersecurity Expertise ==</p>
          <p><span className="text-green-400">Defensive Security:</span> CrowdStrike Falcon, IBM QRadar, Splunk, Cortex XSoar, EnCase, Wireshark</p>
          <p><span className="text-green-400">Compliance:</span> NIST CSF, NIST SP-800-53, ICS Security Assessment</p>
          <p><span className="text-green-400">Notable Achievements:</span> Identified 100+ vulnerabilities, Reduced non-compliance by 20%</p>
          <p className="text-gray-400 mt-2">Type <span className="text-yellow-300">security-tools</span> for details on specific tools I've used.</p>
        </div>
      );
    }
  },
  'security-tools': { 
    description: 'List security tools I\'ve worked with',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Security Tools Experience ==</p>
          <div className="pl-4 border-l border-blue-800 mb-3">
            <p className="text-yellow-300">CrowdStrike Falcon</p>
            <p>Used for endpoint detection and response, improving threat detection by 40%</p>
          </div>
          <div className="pl-4 border-l border-blue-800 mb-3">
            <p className="text-yellow-300">IBM QRadar</p>
            <p>Implemented for SIEM capabilities, enhancing detection accuracy by 20%</p>
          </div>
          <div className="pl-4 border-l border-blue-800 mb-3">
            <p className="text-yellow-300">Cortex XSoar</p>
            <p>Refined playbooks for automated incident response, improving efficiency by 15%</p>
          </div>
          <div className="pl-4 border-l border-blue-800 mb-3">
            <p className="text-yellow-300">EnCase</p>
            <p>Utilized for digital forensics and security investigations</p>
          </div>
          <div className="pl-4 border-l border-blue-800">
            <p className="text-yellow-300">Wireshark</p>
            <p>Applied for network traffic analysis and security monitoring</p>
          </div>
        </div>
      );
    }
  },
  'ai-security': { 
    description: 'Information about my AI security experience',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== AI Security Experience ==</p>
          <p>My work combines cybersecurity with artificial intelligence:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Developed AI-driven chatbot for vulnerability management (30% reduction in manual queries)</li>
            <li>Created CNN-based phishing detection system with GPT-3 integration</li>
            <li>Implemented LLM-powered module for secure task management in Roomies app</li>
            <li>Facilitated consensus-driven AI framework for collaborative decision-making</li>
          </ul>
          <p className="mt-2 text-gray-400">Type <span className="text-yellow-300">roomies</span> for more details on my latest AI project.</p>
        </div>
      );
    }
  },
  'roomies': { 
    description: 'Details about my Roomies application',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400 text-lg">Roomies - Co-founded Project</p>
          <p>A mobile application for roommate coordination with robust security and AI integration:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Implemented cryptography techniques to secure sensitive user data</li>
            <li>Developed consensus-driven AI framework inspired by Waze for household challenges</li>
            <li>Created LLM-powered module for task aggregation and anonymous proposal submission</li>
            <li>Built "Task Transform" feature to demonstrate AI's practical value to non-technical users</li>
          </ul>
          <p className="text-gray-400 italic mt-2">Current status: Preparing for beta launch with data-driven iterations</p>
        </div>
      );
    }
  },
  'nyu': { 
    description: 'Information about my NYU experience',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== NYU Experience ==</p>
          <p><span className="text-green-400">Degree:</span> M.S. Cybersecurity at NYU Tandon School of Engineering (GPA: 3.96)</p>
          <p><span className="text-green-400">Timeline:</span> August 2022 - June 2025 (Expected)</p>
          <p><span className="text-green-400">Key Coursework:</span> Network Security, Digital Forensics, Cloud Security, Applied Cryptography</p>
          <p><span className="text-green-400">Projects:</span> Co-developed CNN-based phishing detection system at CSAW (Best Challenge Award)</p>
          
          <p className="mt-3"><span className="text-yellow-300">NYU Langone Internship:</span></p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Developed AI-driven chatbot for vulnerability management</li>
            <li>Enhanced threat detection using CrowdStrike Falcon & IBM QRadar</li>
            <li>Optimized incident response with Cortex XSoar playbooks</li>
          </ul>
        </div>
      );
    }
  },
  'csaw': { 
    description: 'Information about my CSAW project',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400 text-lg">CSAW Phishing Detection Game</p>
          <p>Award-winning project developed for Cyber Security Awareness Week at NYU:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Co-developed CNN-based phishing detection simulation</li>
            <li>Integrated GPT-3 powered chatbot for realistic security scenarios</li>
            <li>Used TensorFlow/PyTorch for image analysis of phishing attempts</li>
            <li>Deployed with Docker for consistent performance</li>
          </ul>
          <p className="text-green-400 mt-2">Achievements:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Won 'Best Challenge' award</li>
            <li>Engaged over 300 participants</li>
            <li>Earned scholarship to Black Hat briefings</li>
          </ul>
        </div>
      );
    }
  },
  'nyc-cyber': { 
    description: 'Information about my NYC Cyber Command experience',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400 text-lg">NYC Cyber Command Experience</p>
          <p><span className="text-green-400">Role:</span> Cybersecurity Auditor (Dec 2021 - Aug 2023)</p>
          <p>Key responsibilities and achievements:</p>
          <ul className="list-disc pl-8 space-y-1">
            <li>Administered ICS security assessments across 50+ mission-critical OT/ICS systems</li>
            <li>Identified and remediated 100+ cybersecurity vulnerabilities</li>
            <li>Reduced non-compliance issues by 20% using NIST frameworks</li>
            <li>Developed internal Audit Guide reducing audit time by 20%</li>
            <li>Enhanced agency preparedness through mock trials and feedback sessions</li>
          </ul>
          <p className="text-gray-400 italic mt-2">This role provided foundational experience in security compliance and vulnerability management.</p>
        </div>
      );
    }
  },
  'scan': { 
    description: 'Run a security scan simulation',
    action: () => {
      return (
        <div className="space-y-1 font-mono">
          <p className="text-green-400">Starting security scan...</p>
          <p className="text-gray-400">Scanning network endpoints... [==============] 100%</p>
          <p className="text-gray-400">Analyzing firewall configurations... [==============] 100%</p>
          <p className="text-gray-400">Checking for vulnerabilities... [==============] 100%</p>
          <p className="text-yellow-300">Scan complete. Results:</p>
          <div className="pl-4 mt-2">
            <p>- <span className="text-green-400">Endpoints:</span> 24 scanned, 0 critical issues</p>
            <p>- <span className="text-green-400">Firewall:</span> Properly configured</p>
            <p>- <span className="text-yellow-300">Vulnerabilities:</span> 2 medium severity findings</p>
            <p className="pl-4 text-gray-400">• CVE-2023-1234: jQuery component outdated</p>
            <p className="pl-4 text-gray-400">• SSL certificate expires in 30 days</p>
          </div>
          <p className="text-green-400 mt-2">Recommendations:</p>
          <p className="pl-4">1. Update jQuery to version 3.6.4 or later</p>
          <p className="pl-4">2. Renew SSL certificate before expiration</p>
          <p className="text-blue-400 mt-3">Note: This is a simulated scan for demonstration purposes.</p>
        </div>
      );
    }
  },
  'vulnscan': {
    description: 'Run a vulnerability scan simulation',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-yellow-300">Running vulnerability scan...</p>
          <div className="my-2 w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-full"></div>
          </div>
          <p className="text-green-400">Scan complete!</p>
          <div className="mt-3 space-y-3">
            <div className="border border-red-800 rounded-md p-3 bg-red-900/30">
              <p className="text-red-400 font-bold">Critical Vulnerability</p>
              <p>CVE-2023-45678: Log4j vulnerable version detected</p>
              <p className="text-gray-400 text-sm mt-1">Recommendation: Update to version 2.17.1 or later</p>
            </div>
            <div className="border border-yellow-800 rounded-md p-3 bg-yellow-900/30">
              <p className="text-yellow-400 font-bold">Medium Vulnerability</p>
              <p>CVE-2023-32165: OpenSSL vulnerable to DoS attacks</p>
              <p className="text-gray-400 text-sm mt-1">Recommendation: Patch to latest version</p>
            </div>
            <div className="border border-blue-800 rounded-md p-3 bg-blue-900/30">
              <p className="text-blue-400 font-bold">Information</p>
              <p>Server headers reveal version information</p>
              <p className="text-gray-400 text-sm mt-1">Recommendation: Configure headers to hide version details</p>
            </div>
          </div>
          <p className="text-gray-400 italic mt-3">Note: This is a simulated scan for demonstration purposes.</p>
        </div>
      );
    }
  },
  'achievements': {
    description: 'List my key achievements',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-blue-400">== Key Achievements ==</p>
          <ul className="list-disc pl-8 space-y-2">
            <li><span className="text-yellow-300">Best Challenge Award</span> - Cyber Security Awareness Week @ NYU</li>
            <li><span className="text-yellow-300">Black Hat Briefings Scholarship</span> recipient for cybersecurity work</li>
            <li>Led Codepath.org cybersecurity program with <span className="text-yellow-300">70% placement rate</span></li>
            <li>Identified and remediated <span className="text-yellow-300">100+ vulnerabilities</span> across NYC agencies</li>
            <li>Enhanced threat detection by <span className="text-yellow-300">40%</span> with custom security solutions</li>
            <li>President of 180 Christian Fellowship (Fall 2024)</li>
          </ul>
        </div>
      );
    }
  },
};

// Easter egg commands that are not listed in help
AVAILABLE_COMMANDS['matrix'] = {
  description: 'Hidden command',
  action: () => {
    return (
      <div className="space-y-2">
        <p className="text-green-500">Entering the Matrix...</p>
        <p className="font-mono">01001000 01100001 01100011 01101011 01100101 01110010</p>
        <p className="font-mono">01101101 01100001 01101110</p>
        <p className="text-green-300">Follow the white rabbit.</p>
      </div>
    );
  }
};

AVAILABLE_COMMANDS['find-vulnerability'] = {
  description: 'Hidden command',
  action: () => {
    return (
      <div className="space-y-2">
        <p className="text-red-400">Scanning system for vulnerabilities...</p>
        <p className="text-yellow-300">Congratulations! You've found another easter egg!</p>
        <pre className="bg-black p-2 rounded mt-2 text-green-400 text-sm">
{`
  ___ ___ ___ ___ ___ ___ _____ ___ ___ ___ ___ ___ 
 / __| _ \\ __|   \\_ _| _ \\_   _| | | | _ \\ __/ __|
 \\__ \\  _/ _|| |) | || | | || | | |_| |   / _|\\__ \\
 |___/_| |___|___/___|___/ |_|  \\___/|_|_\\___|___/
                                                  
`}
        </pre>
        <p className="text-gray-300">You've demonstrated excellent security instincts! Keep exploring for more hidden commands.</p>
        <p className="text-gray-400 italic mt-2">Hint: Try "hack" or "ctf" commands for more security content.</p>
      </div>
    );
  }
};

// Terminal component
const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
    { 
      command: '', 
      response: (
        <div className="space-y-1">
          <p className="text-green-400 font-bold">Welcome to Ethan Sam's Terminal v1.0</p>
          <p>Type <span className="text-yellow-300">help</span> to see available commands</p>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [typedCommands, setTypedCommands] = useState<string[]>([]);
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load command history just once on mount
  useEffect(() => {
    try {
      const savedHistory = terminalStorage.getCommandHistory();
      setTypedCommands(savedHistory);
    } catch (error) {
      console.warn("Failed to load terminal history:", error);
    }
  }, []);

  // Always scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus input when terminal opens with a small delay to ensure it works
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Process command with security measures
  const processCommand = (cmd: string) => {
    // Don't process empty commands
    if (!cmd.trim()) return;
    
    // Sanitize input to prevent XSS
    const sanitizedCmd = sanitizeInput(cmd);
    
    // Check rate limiting
    if (!rateLimiter.canExecuteCommand()) {
      setRateLimited(true);
      
      // Add rate limit warning to command history
      setCommandHistory(prev => [
        ...prev, 
        { 
          command: sanitizedCmd, 
          response: (
            <div className="space-y-2">
              <div className="flex items-center text-amber-500">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Rate limit exceeded. Please slow down your command execution.</span>
              </div>
              <p>Remaining commands in this time window: 0</p>
              <p>The rate limit will reset in a few seconds.</p>
            </div>
          ),
          isError: true
        }
      ]);
      
      // Reset rate limited status after 5 seconds
      setTimeout(() => {
        setRateLimited(false);
      }, 5000);
      
      return;
    }
    
    // Log potentially suspicious commands
    const isSuspicious = securityLogger.logCommand(sanitizedCmd);
    
    // Parse command and arguments
    const [command, ...args] = sanitizedCmd.trim().toLowerCase().split(' ');
    const argString = validateCommandArgs(command, args.join(' '));
    
    // Add to typed commands history for up/down navigation
    // Don't add duplicates in a row
    const updatedHistory = typedCommands.length > 0 && typedCommands[typedCommands.length - 1] === sanitizedCmd
      ? [...typedCommands]
      : [...typedCommands, sanitizedCmd];
    
    setTypedCommands(updatedHistory);
    
    // Save to storage with error handling
    try {
      terminalStorage.saveCommandHistory(updatedHistory);
    } catch (e) {
      console.warn("Failed to save terminal history:", e);
    }
    
    setHistoryIndex(-1);
    
    // Handle special cases
    if (command === 'clear') {
      setCommandHistory([]);
      return;
    }
    
    if (command === 'exit') {
      onClose();
      return;
    }

    // Process the command
    let response: string | React.ReactNode = `Command not found: ${command}. Type 'help' for available commands.`;
    let isError = true;

    if (AVAILABLE_COMMANDS[command]) {
      isError = false;
      if (AVAILABLE_COMMANDS[command].action) {
        try {
          response = AVAILABLE_COMMANDS[command].action!(argString);
        } catch (error) {
          console.error(`Error executing command ${command}:`, error);
          response = `Error executing command: ${command}`;
          isError = true;
        }
      } else {
        response = `Command '${command}' executed successfully.`;
      }
    }

    // If the command was suspicious, add a warning
    if (isSuspicious) {
      const originalResponse = response;
      response = (
        <div className="space-y-2">
          <div className="flex items-center text-amber-500">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <span>Warning: Potentially suspicious command detected</span>
          </div>
          <div className="mt-2">
            {originalResponse}
          </div>
        </div>
      );
    }

    // Add to command history
    setCommandHistory(prev => [
      ...prev, 
      { 
        command: sanitizedCmd, 
        response,
        isError
      }
    ]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      // Don't process if rate limited
      if (!rateLimited) {
        processCommand(inputValue);
      } else {
        // Show rate limit message
        setCommandHistory(prev => [
          ...prev, 
          { 
            command: inputValue, 
            response: "Command not processed: Rate limit in effect. Please wait...",
            isError: true
          }
        ]);
      }
      setInputValue('');
    }
  };

  // Handle keyboard navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < typedCommands.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(typedCommands[typedCommands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(typedCommands[typedCommands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const input = inputValue.toLowerCase();
      if (input) {
        const matchingCommands = Object.keys(AVAILABLE_COMMANDS)
          .filter(cmd => cmd !== 'matrix' && cmd !== 'find-vulnerability') // Don't show hidden commands in tab completion
          .filter(cmd => cmd.startsWith(input));
        
        if (matchingCommands.length === 1) {
          setInputValue(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Show possible completions
          setCommandHistory(prev => [
            ...prev, 
            { 
              command: inputValue, 
              response: (
                <div>
                  <p>Possible completions:</p>
                  <p className="pl-4">{matchingCommands.join(' ')}</p>
                </div>
              )
            }
          ]);
        }
      }
    }
  };

  // Render the terminal
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-black border border-green-500 rounded-md w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-green-900 border-b border-green-500">
              <div className="flex items-center space-x-2">
                <TerminalIcon className="w-4 h-4 text-green-400" />
                <span className="text-green-200 font-mono text-sm">visitor@ethansam-portfolio:~$</span>
              </div>
              <button 
                onClick={onClose}
                className="text-green-300 hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Terminal Content */}
            <div 
              ref={terminalRef}
              className="flex-1 p-4 font-mono text-sm text-green-300 overflow-y-auto bg-black"
              tabIndex={-1}
            >
              {commandHistory.map((entry, index) => (
                <div key={index} className="mb-3">
                  {/* Only show command prompt for actual commands, not the initial welcome message */}
                  {entry.command && (
                    <div className="flex items-start mb-1">
                      <span className="text-blue-400 mr-2">$</span>
                      <span>{entry.command}</span>
                    </div>
                  )}
                  <div className={`pl-4 ${entry.isError ? 'text-red-400' : ''}`}>
                    {entry.response}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="border-t border-green-800 bg-black px-4 py-2 flex items-center">
              <span className="text-blue-400 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono"
                placeholder="Type a command..."
                autoComplete="off"
                aria-label="Terminal input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;