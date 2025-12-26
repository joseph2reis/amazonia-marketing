"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FiMoon, FiSun } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineLogout,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { useTheme } from "next-themes";

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const menuItems = [
    { name: "Início", href: "/dashboard", icon: HiOutlineHome },
    { name: "Relatórios", href: "/dashboard/reports", icon: HiOutlineChartBar },
    { name: "Equipe", href: "/dashboard/team", icon: HiOutlineUserGroup },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <aside
      className={`h-screen bg-surface-strong border-r border-border flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo + Collapse */}
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <span className="font-bold text-lg tracking-tight text-primary">
            AgroAmazônia
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-surface transition text-text"
        >
          {collapsed ? (
            <HiChevronRight size={20} />
          ) : (
            <HiChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-surface hover:text-text"
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Perfil e Configurações */}
      <div className="p-3 border-t border-border space-y-1">
        <div className="flex items-center gap-3 mb-3 p-2">
          <div className="w-10 h-10 min-w-[40px] rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>

          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-text truncate">
                {user?.name}
              </p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          )}
        </div>

        {/* Botão de Tema */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-text hover:bg-surface transition"
        >
          <div className="flex items-center justify-center">
            {isDark ? (
              <FiSun size={20} className="text-yellow-500" />
            ) : (
              <FiMoon size={20} className="text-primary" />
            )}
          </div>

          {!collapsed && <span>{isDark ? "Modo Claro" : "Modo Escuro"}</span>}
        </button>

        {/* Botão de Sair */}
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
        >
          <HiOutlineLogout size={20} />
          {!collapsed && <span>Sair da conta</span>}
        </button>
      </div>
    </aside>
  );
}
