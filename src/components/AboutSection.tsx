"use client";

import { portfolioConfig } from "@/config/portfolio";
import { Code, Dumbbell, Plane } from "lucide-react";

export function AboutSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="w-5 h-5 text-accent" />;
      case "dumbbell":
        return <Dumbbell className="w-5 h-5 text-accent" />;
      case "plane":
        return <Plane className="w-5 h-5 text-accent" />;
      default:
        return <Code className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-foreground-meta">03</span>
          <div className="h-[1px] w-12 bg-border-strong"></div>
          <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">About</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl leading-[1.1]">
            A brief introduction.
          </h2>
          <div className="text-xs font-mono text-foreground-meta tracking-widest uppercase lg:pb-2">
            BEYOND THE CODE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start border-t border-border-strong pt-16">
        {/* Photo Collage */}
        <div className="md:col-span-5 lg:col-span-4 relative aspect-[4/5] w-full">
          {/* Image 1 (Top Left - Working) */}
          <div className="absolute top-0 left-0 w-[65%] aspect-square border-[6px] border-background bg-surface-secondary z-10 overflow-hidden shadow-sm hover:z-40 transition-all duration-300">
            <img 
              src={portfolioConfig.about.images[0]} 
              alt="Working" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          
          {/* Image 2 (Middle Right - Gym) */}
          <div className="absolute top-[20%] right-0 w-[60%] aspect-[4/5] border-[6px] border-background bg-surface-secondary z-20 overflow-hidden shadow-sm hover:z-40 transition-all duration-300">
            <img 
              src={portfolioConfig.about.images[1]} 
              alt="Gymming" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          
          {/* Image 3 (Bottom Center - Travel) */}
          <div className="absolute bottom-0 left-[10%] w-[75%] aspect-[3/2] border-[6px] border-background bg-surface-secondary z-30 overflow-hidden shadow-sm hover:z-40 transition-all duration-300">
            <img 
              src={portfolioConfig.about.images[2]} 
              alt="Travelling" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col space-y-8">
          <div>
            <h3 className="text-2xl font-medium text-foreground mb-8">
              {portfolioConfig.about.headline}
            </h3>
            <div className="text-lg md:text-xl text-foreground-muted leading-relaxed space-y-6 whitespace-pre-wrap">
              {portfolioConfig.about.copy}
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {portfolioConfig.about.interests.map((interest, i) => (
                <div key={i} className="flex flex-col">
                  <div className="flex items-center gap-3 text-foreground mb-3">
                    <span className="text-xs font-mono tracking-widest uppercase">
                      {interest.label}
                    </span>
                  </div>
                  <div className="w-8 h-[1px] bg-accent mb-4"></div>
                  <p className="text-foreground-muted">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
