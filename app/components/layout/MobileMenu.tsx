"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão hambúrguer */}
      <button
        onClick={() => setOpen(true)}
        className="xl:hidden text-text hover:text-primary transition-colors"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer LEFT */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85%] z-50 bg-surface border-r border-border shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/logo-ver.png"
              alt="logo"
              width={34}
              height={34}
              className="object-contain"
            />
            <span
              className="text-lg font-bold text-text"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Amazônia <span className="text-primary">Marketing</span>
            </span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-text-muted hover:text-primary transition-colors"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-text hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-2 w-full h-px bg-border" />

        {/* Theme + auth */}
        <div className="flex flex-col gap-3 px-5 py-4">
          <Link
            href="/auth/login"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-text border border-border rounded-full px-5 py-2 text-center hover:text-primary hover:border-primary transition-all"
          >
            Entrar
          </Link>

          <Link
            href="/auth/register"
            onClick={() => setOpen(false)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90 active:scale-95 transition-all text-center"
          >
            Começar
          </Link>
        </div>
      </div>
    </>
  );
}
