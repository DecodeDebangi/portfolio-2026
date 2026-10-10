import { portfolioConfig } from "@/config/portfolio";
import { Layout, Server, Brain, Database, Cloud, Code2 } from "lucide-react";

export function SkillsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "layout": return <Layout className="w-5 h-5 text-foreground" />;
      case "server": return <Server className="w-5 h-5 text-foreground" />;
      case "brain": return <Brain className="w-5 h-5 text-foreground" />;
      case "database": return <Database className="w-5 h-5 text-foreground" />;
      case "cloud": return <Cloud className="w-5 h-5 text-foreground" />;
      case "code2": return <Code2 className="w-5 h-5 text-foreground" />;
      default: return <Code2 className="w-5 h-5 text-foreground" />;
    }
  };

  return (
    <section id="skills" className="py-24 md:py-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-foreground-meta">04</span>
          <div className="h-[1px] w-12 bg-border-strong"></div>
          <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">Skills</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl leading-[1.1]">
            Tools I use to build.
          </h2>
          <div className="text-xs font-mono text-foreground-meta tracking-widest uppercase lg:pb-2">
            STACK & TECHNOLOGIES
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 border-t border-border-strong pt-16">
        {portfolioConfig.skills.map((group, index) => (
          <div key={index} className="flex flex-col group">
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
              <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium text-foreground tracking-tight">{group.title}</h3>
            </div>
            
            <ul className="space-y-4">
              {group.tools.map((tool, i) => (
                <li key={i} className="flex items-start gap-4 group/item cursor-default">
                  <span className="text-border-strong mt-0.5 transition-colors duration-300 group-hover/item:text-accent">—</span>
                  <span className="text-foreground-muted text-sm tracking-wide uppercase font-mono transition-all duration-300 group-hover/item:text-foreground group-hover/item:translate-x-2">
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
