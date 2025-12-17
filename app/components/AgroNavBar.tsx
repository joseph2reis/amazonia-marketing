"use client";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function AgroNavbar() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");

  return (
    <header className="w-full border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo + Search */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary" />
            <span className="text-lg font-semibold text-primary">
              AgroAmazônia
            </span>
          </div>

          {/* Search Input */}
          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos, sementes..."
              className="w-64 rounded-full border border-border bg-surface-strong py-2 pl-9 pr-9 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = active === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                className="relative text-sm font-medium text-text hover:text-primary"
              >
                {item.label}

                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-secondary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition cursor-pointer">
            Login
          </button>

          <button className="rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition cursor-pointer">
            Registrar
          </button>
        </div>
      </div>
    </header>
  );
}
