"use client";

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState<string>('');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
      fontFamily: 'var(--font-mono)',
      flowchart: { useMaxWidth: false },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (e) {
        console.error('Mermaid render error', e);
        setSvg(`<div class="text-red-500">Failed to render diagram</div>`);
      }
    };
    
    renderChart();
  }, [chart, resolvedTheme]);

  if (!svg) {
    return (
      <div className="my-8 p-6 md:p-8 bg-surface-secondary border border-border flex items-center justify-center min-h-[200px] font-mono text-sm text-foreground-muted animate-pulse">
        Rendering diagram...
      </div>
    );
  }

  return (
    <div className="my-8 bg-surface-secondary border border-border overflow-x-auto text-center rounded-lg">
      <div 
        className="p-6 md:p-8 inline-block"
        dangerouslySetInnerHTML={{ __html: svg }} 
      />
    </div>
  );
}
