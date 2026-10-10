"use client";

import { useState } from "react";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Job opportunity",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("error");
      setFormError("Form submission is currently not connected to a backend. Please reach out via email directly.");
      setStatus("idle");
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-8 lg:px-16 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono text-foreground-meta">06</span>
          <div className="h-[1px] w-12 bg-border-strong"></div>
          <span className="text-xs font-mono text-foreground-meta tracking-widest uppercase">Contact</span>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight max-w-3xl leading-[1.1]">
            Let's work together.
          </h2>
          <div className="text-xs font-mono text-foreground-meta tracking-widest uppercase lg:pb-2 text-right">
            BASED IN {portfolioConfig.location.split(',')[0]}<br/>
            {portfolioConfig.availability}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-border-strong pt-16">
        
        {/* Contact Info */}
        <div className="space-y-12">
          <p className="text-xl text-foreground-muted leading-relaxed">
            Whether you're building a team, planning a complex backend migration, or designing a product with LLMs, I'd love to hear what you're working on.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-border pt-8">
            <a 
              href={portfolioConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h3 className="text-xs font-mono tracking-widest uppercase text-foreground-meta mb-2">Social</h3>
              <p className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">LinkedIn</p>
            </a>
            
            <a 
              href={portfolioConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <h3 className="text-xs font-mono tracking-widest uppercase text-foreground-meta mb-2">Code</h3>
              <p className="text-xl font-medium text-foreground group-hover:text-accent transition-colors">GitHub</p>
            </a>

            <a 
              href={portfolioConfig.socials.email}
              className="group block sm:col-span-2 mt-4"
            >
              <h3 className="text-xs font-mono tracking-widest uppercase text-foreground-meta mb-2">Direct</h3>
              <p className="text-2xl font-medium text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                {portfolioConfig.socials.email.replace('mailto:', '')}
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </p>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-surface p-8 md:p-10 border border-border">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="border-b border-border pb-2">
                <label htmlFor="contact-name" className="block text-xs font-mono text-foreground-meta tracking-widest uppercase mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent text-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div className="border-b border-border pb-2">
                <label htmlFor="contact-email" className="block text-xs font-mono text-foreground-meta tracking-widest uppercase mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent text-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="border-b border-border pb-2">
                <label htmlFor="contact-message" className="block text-xs font-mono text-foreground-meta tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent text-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            {formError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 flex items-start text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-between px-6 py-4 bg-foreground text-background font-mono tracking-widest uppercase text-xs hover:bg-accent hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {status === "submitting" ? "Sending..." : "Submit Enquiry"}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
