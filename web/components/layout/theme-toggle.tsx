"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ onBrand = false }: { onBrand?: boolean }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(document.documentElement.classList.contains("theme-dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = !dark;
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(next ? "theme-dark" : "theme-light");
    document.cookie = `in2it-theme=${next ? "dark" : "light"}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      aria-pressed={dark}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-control transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
        onBrand
          ? "text-on-brand hover:bg-on-brand/10 focus-visible:ring-offset-brand"
          : "text-foreground-muted hover:bg-surface-subtle hover:text-foreground focus-visible:ring-offset-surface",
      )}
    >
      {dark ? <Sun aria-hidden size={18} strokeWidth={1.75} /> : <Moon aria-hidden size={18} strokeWidth={1.75} />}
    </button>
  );
}
