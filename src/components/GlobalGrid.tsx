"use client";

import { useState, useEffect } from "react";

export function GlobalGrid() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Background Grid - Base */}
      <div className="fixed inset-0 -z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] text-foreground transition-opacity duration-1000"  
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
          }} 
        />
      </div>

      {/* Background Grid - Hover Glow */}
      <div className="fixed inset-0 -z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] text-foreground" 
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 100%)`
          }} 
        />
      </div>
    </>
  );
}
