"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiLayout, FiLogOut, FiUser } from "react-icons/fi";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; // Adicionado

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function MobileMenu() {
  const { data: session } = useSession(); // Pega a sessão
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão hambúrguer */}
      <button
        onClick={() => setOpen(true)}
        className="xl:hidden text-text hover:text-primary transition-colors p-1"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer LEFT */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 max-w-[85%] z-70 bg-surface border-r border-border shadow-2xl transition-transform duration-500 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header do Drawer */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image
              src="/logo_icon.png"
              alt="logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-base font-medium text-text uppercase tracking-tighter">
              Amazônia <span className="text-primary">Marketing</span>
            </span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-text-muted hover:text-red-500 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Perfil Rápido (Se logado) */}
        {session && (
          <div className="px-6 py-6 bg-surface-strong/50 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-white shadow-lg shadow-primary/20">
                {session.user?.email?.[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Bem-vindo</p>
                <p className="text-sm font-bold text-text truncate">
                  {session.user?.email?.split('@')[0]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navegação Principal */}
        <nav className="flex-1 flex flex-col gap-1 px-4 py-6">
          <p className="px-2 mb-2 text-[9px] font-medium text-text-muted uppercase tracking-[0.2em]">Menu</p>
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-3 text-xs font-medium uppercase tracking-widest text-text hover:bg-surface-strong hover:text-primary rounded-xl transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer / Auth */}
        <div className="p-6 border-t border-border bg-surface-strong/30">
          <div className="flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-4 text-xs font-medium uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  <FiLayout size={18} />
                  Acessar Painel
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-border px-5 py-4 text-xs font-medium uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all"
                >
                  <FiLogOut size={18} />
                  Sair da Conta
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full rounded-xl border border-border px-5 py-4 text-xs font-medium uppercase tracking-widest text-text hover:border-primary hover:text-primary transition-all"
                >
                  Entrar
                </Link>

                <Link
                  href="/auth/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full rounded-xl bg-primary px-5 py-4 text-xs font-medium uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  Começar agora
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}