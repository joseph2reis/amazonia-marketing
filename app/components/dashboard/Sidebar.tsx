// app/components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineLogout,
  HiArrowRight,
} from "react-icons/hi";

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Início", href: "/dashboard", icon: HiOutlineHome },
    { name: "Relatórios", href: "/dashboard/reports", icon: HiOutlineChartBar },
    { name: "Equipe", href: "/dashboard/team", icon: HiOutlineUserGroup },
  ];

  return (
    <aside className="w-64 bg-surface-strong border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 text-primary">
        <HiArrowRight size={28} />
        <span className="font-bold text-lg tracking-tight">AgroAmazônia</span>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-muted hover:bg-surface hover:text-text"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Perfil e Logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-text truncate">
              {user?.name}
            </p>
            <p className="text-xs text-text-muted truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <HiOutlineLogout size={20} />
          Sair da conta
        </button>
      </div>
    </aside>
  );
}
