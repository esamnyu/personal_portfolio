// src/utils/terminalSecurity.ts

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input User input string
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
    if (!input) return '';
    
    // Remove HTML tags to prevent XSS
    const sanitized = input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Limit command length
    return sanitized.slice(0, 100);
  };
  
  /**
   * Rate limiting for command execution
   */
  export class CommandRateLimiter {
    private lastCommandTime: number = 0;
    private commandCount: number = 0;
    private readonly resetTime: number = 10000; // 10 seconds
    private readonly maxCommands: number = 20; // Max 20 commands per 10 seconds
    
    /**
     * Checks if a command can be executed based on rate limits
     * @returns boolean indicating if command execution is allowed
     */
    canExecuteCommand(): boolean {
      const now = Date.now();
      
      // Reset counter if resetTime has passed
      if (now - this.lastCommandTime > this.resetTime) {
        this.commandCount = 0;
        this.lastCommandTime = now;
        return true;
      }
      
      // Increment counter and check if over limit
      this.commandCount++;
      if (this.commandCount > this.maxCommands) {
        return false;
      }
      
      this.lastCommandTime = now;
      return true;
    }
    
    /**
     * Get remaining commands allowed in current time window
     */
    getRemainingCommands(): number {
      // Reset if time window has passed
      if (Date.now() - this.lastCommandTime > this.resetTime) {
        this.commandCount = 0;
        return this.maxCommands;
      }
      return Math.max(0, this.maxCommands - this.commandCount);
    }
  }
  
  /**
   * Secure storage for terminal state
   */
  export class SecureTerminalStorage {
    private readonly visitedKey = 'terminal_has_visited';
    private readonly historyKey = 'terminal_command_history';
    
    /**
     * Safely checks if user has visited before
     */
    hasVisitedBefore(): boolean {
      try {
        return localStorage.getItem(this.visitedKey) === 'true';
      } catch (error) {
        // In case of private browsing mode or localStorage errors
        console.warn('Unable to access localStorage', error);
        return false;
      }
    }
    
    /**
     * Safely marks user as having visited
     */
    markAsVisited(): void {
      try {
        localStorage.setItem(this.visitedKey, 'true');
      } catch (error) {
        console.warn('Unable to write to localStorage', error);
      }
    }
    
    /**
     * Safely stores command history (limited to prevent localStorage abuse)
     */
    saveCommandHistory(commands: string[]): void {
      try {
        // Only store the last 20 commands to prevent storage abuse
        const limitedCommands = commands.slice(-20);
        localStorage.setItem(this.historyKey, JSON.stringify(limitedCommands));
      } catch (error) {
        console.warn('Unable to write command history to localStorage', error);
      }
    }
    
    /**
     * Safely retrieves command history
     */
    getCommandHistory(): string[] {
      try {
        const history = localStorage.getItem(this.historyKey);
        return history ? JSON.parse(history) : [];
      } catch (error) {
        console.warn('Unable to read command history from localStorage', error);
        return [];
      }
    }
    
    /**
     * Clears all terminal-related data
     */
    clearTerminalData(): void {
      try {
        localStorage.removeItem(this.visitedKey);
        localStorage.removeItem(this.historyKey);
      } catch (error) {
        console.warn('Unable to clear localStorage', error);
      }
    }
  }
  
  /**
   * Validates command arguments to ensure they meet expected format
   * @param command The command being executed
   * @param args The arguments for the command
   * @returns Validated and normalized arguments
   */
  export const validateCommandArgs = (command: string, args: string): string => {
    // Trim and lowercase for consistent handling
    const normalizedArgs = args.trim();
    
    // Command-specific validation
    switch (command) {
      case 'project':
        // Only allow alphanumeric chars, spaces, and hyphens in project names
        return normalizedArgs.replace(/[^a-zA-Z0-9\s-]/g, '');
      case 'email':
        // Only allow email-like formats
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(normalizedArgs)) {
          return '';
        }
        return normalizedArgs;
      default:
        return normalizedArgs;
    }
  };
  
  /**
   * Security logger for tracking suspicious terminal activity
   */
  export class SecurityLogger {
    private suspiciousCommands: string[] = [
      'sudo', 'rm', 'chmod', 'ssh', 'curl', 'wget', 'eval', 'exec', 'command injection'
    ];
    
    /**
     * Checks if a command is suspicious and logs it
     * @param command The command to check
     * @returns Whether the command is suspicious
     */
    logCommand(command: string): boolean {
      const lowerCommand = command.toLowerCase();
      
      // Check for suspicious commands
      const isSuspicious = this.suspiciousCommands.some(cmd => lowerCommand.includes(cmd));
      
      if (isSuspicious) {
        console.warn(`Suspicious terminal command detected: ${command}`);
        
        // In a real implementation, you might want to log this to your analytics
        // or security monitoring system
        this.trackSuspiciousActivity(command);
      }
      
      return isSuspicious;
    }
    
    /**
     * Tracks suspicious activity (would integrate with your analytics in production)
     */
    private trackSuspiciousActivity(command: string): void {
      // In a production environment, this could send data to your analytics or security monitoring
      // For now, we'll just log to console
      console.info('Security event tracked', {
        type: 'suspicious_terminal_command',
        command,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  // Export a single instance for use throughout the app
  export const securityLogger = new SecurityLogger();
  export const terminalStorage = new SecureTerminalStorage();
  export const rateLimiter = new CommandRateLimiter();
