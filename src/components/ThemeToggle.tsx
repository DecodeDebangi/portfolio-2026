"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 w-9 h-9 flex items-center justify-center rounded-md border border-transparent" aria-label="Toggle theme placeholder">
        <div className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 w-9 h-9 flex items-center justify-center rounded-md transition-colors hover:bg-surface-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-foreground-muted hover:text-foreground" />
      ) : (
        <Moon className="w-4 h-4 text-foreground-muted hover:text-foreground" />
      )}
    </button>
  );
}
