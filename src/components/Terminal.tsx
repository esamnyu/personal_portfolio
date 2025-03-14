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

// Commands available in the terminal - same as before
const AVAILABLE_COMMANDS: Record<string, { description: string, action?: (args?: string) => string | React.ReactNode }> = {
  // All existing commands remain the same
  'help': { 
    description: 'Shows available commands',
    action: () => {
      return (
        <div className="space-y-1">
          <p className="text-green-400">Available commands:</p>
          {Object.entries(AVAILABLE_COMMANDS)
            .filter(([cmd]) => cmd !== 'matrix') // Hide easter egg from help
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
  // All other commands remain the same but are omitted for brevity
  'skills': { description: 'Lists my technical skills', action: () => { /* Same as before */ } },
  'projects': { description: 'Shows my top projects', action: () => { /* Same as before */ } },
  'project': { description: 'Get details about a specific project', action: (args) => { /* Same as before */ } },
  'contact': { description: 'Shows my contact information', action: () => { /* Same as before */ } },
  'hack': { description: 'Try to hack into the system', action: () => { /* Same as before */ } },
  'ctf': { description: 'Shows my Capture The Flag experience', action: () => { /* Same as before */ } },
  'flag': { description: 'Find the hidden flag', action: () => { /* Same as before */ } },
  'resume': { description: 'Download my resume', action: () => { /* Same as before */ } },
  'exit': { description: 'Close the terminal' },
  'whoami': { description: 'Shows the current user', action: () => "visitor@ethansam-portfolio:~$" },
  'date': { description: 'Shows the current date and time', action: () => `Current date: ${new Date().toLocaleString()}` },
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
          .filter(cmd => cmd !== 'matrix') // Don't show hidden commands in tab completion
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