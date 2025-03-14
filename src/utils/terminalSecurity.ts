// Utility functions for Terminal security and functionality

/**
 * Sanitizes input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
    // Simple sanitization - remove script tags and other potential XSS vectors
    return input
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/<.*?on\w+=".*?"/gi, '')
      .replace(/<iframe.*?>.*?<\/iframe>/gi, '');
  };
  
  /**
   * Validates command arguments based on command type
   */
  export const validateCommandArgs = (command: string, args: string): string => {
    // Implement simple validation logic
    // For now, just a basic trim and limit to reasonable length
    if (!args) return '';
    
    const trimmed = args.trim();
    // Limit to 100 characters as a basic precaution
    return trimmed.length > 100 ? trimmed.substring(0, 100) + '...' : trimmed;
  };
  
  /**
   * Logger for potentially suspicious commands
   */
  export const securityLogger = {
    // List of potentially suspicious patterns
    suspiciousPatterns: [
      /rm\s+-rf/i,
      /sudo/i,
      /chmod/i,
      /eval\(/i,
      /system\(/i,
      /exec\(/i,
      /\bdrop\b/i,
      /\bdelete\b/i,
      /\bshutdown\b/i,
      /\breboot\b/i,
    ],
  
    /**
     * Log command and check if it's suspicious
     */
    logCommand(command: string): boolean {
      if (!command) return false;
      
      // Check against suspicious patterns
      const isSuspicious = this.suspiciousPatterns.some(pattern => 
        pattern.test(command)
      );
      
      // In a real app, you'd log this to a service or analytics
      if (isSuspicious) {
        console.warn(`Potentially suspicious command detected: ${command}`);
      }
      
      return isSuspicious;
    }
  };
  
  /**
   * Storage utility for terminal command history using localStorage
   */
  export const terminalStorage = {
    STORAGE_KEY: 'terminal_command_history',
    MAX_HISTORY: 50,
    
    /**
     * Get saved command history
     */
    getCommandHistory(): string[] {
      if (typeof window === 'undefined') return [];
      
      try {
        const storedHistory = localStorage.getItem(this.STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
      } catch (error) {
        console.error('Error reading terminal history from storage:', error);
        return [];
      }
    },
    
    /**
     * Save command history
     */
    saveCommandHistory(commands: string[]): void {
      if (typeof window === 'undefined') return;
      
      try {
        // Keep only the most recent commands up to MAX_HISTORY
        const limitedCommands = commands.slice(-this.MAX_HISTORY);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedCommands));
      } catch (error) {
        console.error('Error saving terminal history to storage:', error);
      }
    },
    
    /**
     * Clear all command history
     */
    clearCommandHistory(): void {
      if (typeof window === 'undefined') return;
      
      try {
        localStorage.removeItem(this.STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing terminal history from storage:', error);
      }
    }
  };
  
  /**
   * Simple rate limiter to prevent too many commands in quick succession
   */
  export const rateLimiter = {
    MAX_COMMANDS: 10,
    TIME_WINDOW_MS: 5000, // 5 seconds
    commandTimes: [] as number[],
    
    /**
     * Check if a command can be executed based on rate limiting rules
     */
    canExecuteCommand(): boolean {
      const now = Date.now();
      
      // Remove commands outside the time window
      this.commandTimes = this.commandTimes.filter(
        time => now - time < this.TIME_WINDOW_MS
      );
      
      // If we're under the limit, allow the command
      if (this.commandTimes.length < this.MAX_COMMANDS) {
        this.commandTimes.push(now);
        return true;
      }
      
      return false;
    },
    
    /**
     * Reset the rate limiter
     */
    reset(): void {
      this.commandTimes = [];
    }
  };