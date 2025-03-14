"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, ChevronRight, AlertTriangle } from 'lucide-react';
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
          {Object.entries(AVAILABLE_COMMANDS).map(([cmd, details]) => (
            <p key={cmd} className="pl-4">
              <span className="text-yellow-300">{cmd}</span> - {details.description}
            </p>
          ))}
        </div>
      );
    }
  },
  'clear': { 
    description: 'Clears the terminal screen'
  },
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
            <p><span className="text-blue-400">Languages:</span> Python, JavaScript, C++, SQL, Bash</p>
            <p><span className="text-blue-400">Security Tools:</span> CrowdStrike Falcon, IBM QRadar, Splunk, Cortex XSoar, EnCase, Wireshark</p>
            <p><span className="text-blue-400">Frameworks:</span> React Native, TensorFlow, PyTorch, Docker, Firestore</p>
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
            <p className="text-yellow-300">CSAW LLM Attack CTF</p>
            <p>Led the team in developing advanced attack vectors for LLM security testing.</p>
            <p className="text-gray-400">Result: 2nd Place Winner</p>
          </div>
          <div className="pl-4 border-l border-green-800">
            <p className="text-yellow-300">CSAW Phishing Detection Game</p>
            <p>Co-developed CNN-based phishing detection simulator with GPT-3 powered chatbot.</p>
            <p className="text-gray-400">Result: Best Challenge Award, 300+ participants</p>
          </div>
          <p className="italic text-gray-400">Type <span className="text-yellow-300">project [name]</span> for more details</p>
        </div>
      );
    }
  },
  'project': { 
    description: 'Get details about a specific project',
    action: (args) => {
      if (!args) return "Error: Please specify a project name. Example: project llm-attack";
      
      const projectMap: Record<string, React.ReactNode> = {
        "llm-attack": (
          <div className="space-y-2">
            <p className="text-yellow-300 text-lg">CSAW LLM Attack CTF</p>
            <p>Developed advanced techniques to test the security boundaries of large language models.</p>
            <p>Our approach combined prompt engineering with adversarial machine learning to create novel attack vectors.</p>
            <p><span className="text-blue-400">Tech:</span> Python, PyTorch, Transformers, RLHF techniques</p>
            <p><span className="text-green-400">Outcome:</span> 2nd Place among 50+ teams from around the world</p>
            <p className="text-gray-400 italic mt-2">GitHub: github.com/yourusername/llm-attack-ctf</p>
          </div>
        ),
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
            <p>Mobile application for roommate coordination, expense tracking, and conflict resolution.</p>
            <p>Implemented real-time data synchronization and intuitive UX to improve roommate communication.</p>
            <p><span className="text-blue-400">Tech:</span> React Native, Firestore, Firebase</p>
            <p><span className="text-green-400">Outcome:</span> 40% dispute reduction, 30% task completion improvement</p>
            <p className="text-gray-400 italic mt-2">GitHub: github.com/yourusername/roomies-app</p>
          </div>
        )
      };
      
      const normalizedArg = args.toLowerCase().trim();
      if (normalizedArg === "llm-attack" || normalizedArg === "llm" || normalizedArg === "csaw llm") {
        return projectMap["llm-attack"];
      } else if (normalizedArg === "phishing" || normalizedArg === "phishing detection" || normalizedArg === "csaw phishing") {
        return projectMap["phishing"];
      } else if (normalizedArg === "roomies" || normalizedArg === "roomies app") {
        return projectMap["roomies"];
      }
      
      return `Error: Project "${args}" not found. Try: llm-attack, phishing, or roomies`;
    }
  },
  'contact': { 
    description: 'Shows my contact information',
    action: () => {
      return (
        <div className="space-y-2">
          <p className="text-green-400">Contact Information:</p>
          <p><span className="text-blue-400">Email:</span> your.email@example.com</p>
          <p><span className="text-blue-400">GitHub:</span> github.com/yourusername</p>
          <p><span className="text-blue-400">LinkedIn:</span> linkedin.com/in/yourusername</p>
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
            <li>CSAW LLM Attack CTF – 2nd Place Winner</li>
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
          <p>Flag: CTF{y0u_f0und_m3_n1c3_w0rk_h4ck3r}</p>
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
  'exit': { 
    description: 'Close the terminal'
  },
  'whoami': { 
    description: 'Shows the current user',
    action: () => "visitor@ethansam-portfolio:~$"
  },
  'date': { 
    description: 'Shows the current date and time',
    action: () => `Current date: ${new Date().toLocaleString()}`
  },
};

// Easter egg command that's not listed in help
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
  const [typedCommands, setTypedCommands] = useState<string[]>(terminalStorage.getCommandHistory());
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Always scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Process command with security measures
  const processCommand = (cmd: string) => {
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
    const updatedHistory = [...typedCommands, sanitizedCmd];
    setTypedCommands(updatedHistory);
    terminalStorage.saveCommandHistory(updatedHistory);
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
        response = AVAILABLE_COMMANDS[command].action!(argString);
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
        const matchingCommands = Object.keys(AVAILABLE_COMMANDS).filter(cmd => 
          cmd.startsWith(input)
        );
        
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