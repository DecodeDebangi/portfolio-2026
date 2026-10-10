"use client";

import { useState, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { ArrowUpRight, X, Layout, Search, Layers } from "lucide-react";
import { Mermaid } from "./Mermaid";

type Project = typeof portfolioConfig.projects[0];

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-3xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-6rem)] bg-surface border border-border shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="shrink-0 bg-surface border-b border-border p-4 flex items-center justify-between z-10">
          <span className="text-xs font-mono text-foreground-meta tracking-wide">
            CASE STUDY
          </span>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12">
          <header className="space-y-4">
            <h2 id="modal-title" className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {project.caseStudy.title}
            </h2>
            <p className="text-foreground-muted text-sm font-mono tracking-wide">
              {project.caseStudy.category}
            </p>
          </header>

          <section className="space-y-10">
            {project.caseStudy.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-xl font-medium text-foreground">{section.title}</h3>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <div key={pIdx} className="text-foreground-muted leading-relaxed">
                      {paragraph.startsWith('```mermaid') ? (
                        <Mermaid chart={paragraph.replace(/```mermaid\n|\n```/g, '')} />
                      ) : paragraph.startsWith('•') ? (
                        <div className="flex">
                          <span className="mr-3 shrink-0">•</span>
                          <span>{paragraph.replace(/^•\s*/, '')}</span>
                        </div>
                      ) : (
                        <p>{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="pt-8 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-4">Technology stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.caseStudy.stack.map((tech: string) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-surface-secondary text-foreground text-xs font-mono border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
          
          <div className="pt-4 pb-8">
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-surface border border-border text-foreground font-medium hover:bg-surface-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Close case study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 md:py-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-foreground-meta">01</span>
          <div className="h-[1px] w-12 bg-border-strong"></div>
          <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">Work</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl leading-[1.1]">
            Selected work and case studies.
          </h2>
          <div className="text-xs font-mono text-foreground-meta tracking-widest uppercase lg:pb-2 text-right">
            {portfolioConfig.projects.length} PROJECTS · ARCHITECTURE & AI
          </div>
        </div>
      </div>

      <div className="border-t border-border-strong pt-16">
        {portfolioConfig.projects.map((project, index) => (
          <div 
            key={project.id}
            className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mb-24 last:mb-0"
          >
            {/* Visual */}
            <div className={`md:col-span-6 lg:col-span-7 relative aspect-[4/3] md:aspect-video w-full border border-border overflow-hidden order-1 ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface-secondary text-foreground-meta font-mono tracking-widest text-xs uppercase">
                  Preview missing
                </div>
              )}
            </div>

            {/* Details */}
            <div className={`md:col-span-6 lg:col-span-5 flex flex-col justify-center h-full order-2 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
              <span className="text-xs font-mono text-foreground-meta tracking-wide mb-6">
                {(index + 1).toString().padStart(2, "0")} — {project.category.toUpperCase()}
              </span>
              <h3 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight mb-6">
                {project.title}
              </h3>
              <p className="text-foreground-muted mb-8 leading-relaxed">
                {project.shortDescription}
              </p>
              
              <div className="mt-4 md:mt-8">
                <div className="flex flex-wrap gap-4 md:gap-6 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-foreground-muted tracking-widest uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center text-sm font-mono tracking-widest uppercase text-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Explore case study
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeProject && (
        <CaseStudyModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </section>
  );
}
