"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title="Mudar tema"
      className="
        group relative flex h-9 w-9 items-center justify-center
        rounded-full border border-border
        bg-surface-strong text-text
        transition-all
        hover:border-primary hover:text-primary cursor-pointer
      "
    >
      {isDark ? (
        <FiSun className="h-5 w-5 rotate-0 transition-transform duration-500 group-hover:rotate-90" />
      ) : (
        <FiMoon className="h-5 w-5 rotate-0 transition-transform duration-500 group-hover:-rotate-90" />
      )}
    </button>
  );
}
