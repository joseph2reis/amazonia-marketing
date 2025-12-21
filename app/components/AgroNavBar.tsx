"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiSearch, FiX, FiMoon, FiSun } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function AgroNavbar() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);

  // Inicializa o tema baseado no localStorage ou preferência do sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="w-full border-b border-border bg-surface transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo + Pesquisa */}
        <div className="flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-full bg-primary transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold text-primary tracking-tight">
              AgroAmazônia
            </span>
          </Link>

          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-64 rounded-full border border-border bg-surface-strong py-2 pl-9 pr-9 text-sm text-text placeholder:text-text-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-secondary"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navegação Central */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                active === item.label ? "text-primary" : "text-text"
              }`}
            >
              {item.label}
              {active === item.label && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-secondary animate-in fade-in zoom-in duration-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Ações e Toggle de Tema */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-strong text-text transition-all hover:border-primary hover:text-primary"
            title="Mudar tema"
          >
            {darkMode ? (
              <FiSun className="h-5 w-5 rotate-0 transition-transform duration-500 dark:-rotate-90" />
            ) : (
              <FiMoon className="h-5 w-5 rotate-0 transition-transform duration-500" />
            )}
          </button>

          <div className="h-6 w-[1px] bg-border mx-1" />

          <Link
            href="/auth/login"
            className="text-sm font-semibold text-text hover:text-primary transition-colors"
          >
            Entrar
          </Link>

          <Link
            href="/auth/register"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm"
          >
            Começar
          </Link>
        </div>
      </div>
    </header>
  );
}
