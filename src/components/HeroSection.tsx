"use client";

import { portfolioConfig } from "@/config/portfolio";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto min-h-[90vh] flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-center mt-12 md:mt-0">
        {/* Text Content */}
        <div className="flex flex-col space-y-6 md:space-y-10 order-2 md:order-1 md:col-span-7 lg:col-span-8">
          <div className="space-y-6">
            <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">
              {portfolioConfig.title} · AI & FULL-STACK
            </span>
            <div className="pt-2">
              <h1 className="text-7xl md:text-8xl lg:text-[11rem] leading-[0.9] font-bold text-foreground tracking-tighter mb-6 -ml-1 md:-ml-2">
                {portfolioConfig.name}.
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-[3rem] leading-[1.1] font-medium text-foreground-muted tracking-tight pr-4">
                {portfolioConfig.heroHeadline}
              </h2>
            </div>
            <p className="text-base md:text-xl text-foreground-muted max-w-2xl leading-relaxed pt-2">
              {portfolioConfig.heroSupportingCopy}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore my work
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-surface border border-border text-foreground font-medium rounded-md hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Discuss a project
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 flex items-center space-x-2 text-xs font-mono text-foreground-meta tracking-wide">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
              {portfolioConfig.location}
            </span>
            <span>·</span>
            <span>{portfolioConfig.availability}</span>
          </div>
        </div>

        {/* Portrait */}
        <div className="order-1 md:order-2 md:col-span-5 lg:col-span-4 flex justify-center md:justify-end w-full">
          <div className="relative w-full max-w-[400px] lg:max-w-none aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden bg-surface-secondary border border-border transition-all duration-700">
            {/* The image should be placed at public/images/debangi-portrait.jpg */}
            {/* If missing, this container acts as a graceful placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-foreground-muted text-sm px-6 text-center">
              <p>Image placeholder<br/>Add portrait to: <br/> <code className="text-xs">public/images/debangi-portrait.jpg</code></p>
            </div>
            
            {/* Real Image */}
            {/* Use standard img instead of Next Image to avoid failing if not found in dev, or better yet, since it's a known path, we'll try to render it and fallback naturally. */}
            <img 
              src={portfolioConfig.portraitPath} 
              alt={`Portrait of ${portfolioConfig.name}`}
              className="absolute inset-0 w-full h-full object-cover z-10 text-transparent"
              onError={(e) => {
                // Hide broken image icon, fallback to placeholder background
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center hidden md:flex text-foreground hover:text-accent transition-colors cursor-pointer" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
