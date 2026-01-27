"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FiSearch,
  FiX,
  FiLayout,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/app/components/ui/ThemeToggle";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export default function AgroNavbar() {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("Home");

  return (
    <header className="w-full border-b border-border bg-surface transition-colors duration-300 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        {/* Logo + Pesquisa */}
        <div className="flex items-center gap-6">
          <MobileMenu />

          <Image
            src="/logo_icon.png"
            alt="Logo AgroAmazônia"
            width={40}
            height={40}
            className="w-auto object-contain"
          />

          <Link
            href={"/"}
            className="flex items-center gap-2 group"
            style={{
              fontFamily: "Calibri, sans-serif",
              fontWeight: "bold",
            }}
          >
            <span className="text-sm md:text-xl font-bold text-text xl:block uppercase tracking-tighter">
              Amazônia<span className="text-primary"> Marketing</span>
            </span>
          </Link>

          <div className="relative hidden lg:block">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-64 rounded-full border border-border bg-surface-strong py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-muted transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Navegação Central */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`relative text-xs font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                active === item.label ? "text-primary" : "text-text"
              }`}
            >
              {item.label}
              {active === item.label && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary animate-in fade-in slide-in-from-bottom-1 duration-300" />
              )}
            </Link>
          ))}
        </nav>

        {/* Ações e Sessão */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="hidden lg:block h-6 w-px bg-border mx-1" />

          {session ? (
            /* USUÁRIO LOGADO COM HOVER DROPDOWN */
            <div className="relative group py-2">
              <Link
                href="/dashboard"
                className="hidden xl:flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <FiLayout />
                Painel
                <FiChevronDown className="transition-transform group-hover:rotate-180" />
              </Link>

              {/* Menu que aparece no Hover */}
              <div className="absolute right-0 top-full mt-1 w-48 origin-top-right rounded-2xl border border-border bg-surface-strong p-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">
                    Empresa
                  </p>
                  <p className="text-xs font-bold text-text truncate">
                    {session.user?.email?.split("@")[0]}
                  </p>
                </div>

                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors text-left"
                >
                  <FiLogOut size={14} />
                  Sair
                </button>
              </div>
            </div>
          ) : (
            /* USUÁRIO DESLOGADO */
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="hidden xl:block text-xs font-medium uppercase tracking-widest text-text hover:text-primary transition-colors"
              >
                Entrar
              </Link>

              <Link
                href="/auth/register"
                className="hidden xl:block rounded-full bg-primary px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-all hover:opacity-90 shadow-lg shadow-primary/20"
              >
                Começar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
