import { portfolioConfig } from "@/config/portfolio";

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-foreground-meta">05</span>
          <div className="h-[1px] w-12 bg-border-strong"></div>
          <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">Process</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl leading-[1.1]">
            From idea to production.
          </h2>
          <div className="text-xs font-mono text-foreground-meta tracking-widest uppercase lg:pb-2">
            METHODOLOGY
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 border-t border-border-strong">
        {portfolioConfig.process.map((step) => (
          <div 
            key={step.step}
            className="py-12 md:py-16 md:px-8 border-b md:border-b-0 md:border-r border-border last:border-0 hover:bg-surface-secondary/20 transition-colors"
          >
            <span className="block text-xs font-mono text-foreground-meta tracking-widest uppercase mb-6">
              STEP 0{step.step}
            </span>
            <h3 className="text-2xl font-medium text-foreground mb-4 tracking-tight">
              {step.title}
            </h3>
            <p className="text-foreground-muted leading-relaxed text-[15px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
