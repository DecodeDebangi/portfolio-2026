"use client";

import { portfolioConfig } from "@/config/portfolio";
import { Mail } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  return (
    <footer className="bg-surface-secondary py-12 md:py-16 px-5 md:px-8 lg:px-16 mt-20">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-xl font-medium text-foreground tracking-tight">
            {portfolioConfig.wordmark}
          </h2>
          <p className="text-foreground-muted">
            Building thoughtful software, one problem at a time.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-6">
          <div className="flex space-x-6">
            <a 
              href={portfolioConfig.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
              </svg>
            </a>
            <a 
              href={portfolioConfig.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a 
              href={portfolioConfig.socials.email} 
              className="text-foreground-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-sm text-foreground-meta font-mono flex flex-col items-center md:items-end space-y-1">
            <span>&copy; {currentYear} {portfolioConfig.name}</span>
            <span>Built with care.</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
