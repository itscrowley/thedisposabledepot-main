"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        relative w-14 h-8 rounded-full
        bg-gray-200 dark:bg-gray-900
        shadow-[inset_4px_4px_8px_rgba(0,0,0,0.25),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]
        dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.7),inset_-4px_-4px_8px_rgba(255,255,255,0.05)]
        transition-all
      "
      aria-label="Toggle theme"
    >
      <span
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full
          flex items-center justify-center
          bg-gray-200 dark:bg-gray-800
          shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.7)]
          dark:shadow-[4px_4px_8px_rgba(0,0,0,0.7),-4px_-4px_8px_rgba(255,255,255,0.05)]
          transition-transform duration-300
          ${theme === "dark" ? "translate-x-6" : ""}
        `}
      >
        {theme === "dark" ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}
