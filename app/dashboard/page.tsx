"use client";

import Link from "next/link";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { products } from "../database/products";

const stats = [
  {
    title: "Produtos",
    value: products.length,
    icon: FaBoxOpen,
  },
  {
    title: "Pedidos",
    value: "34",
    icon: FaShoppingCart,
  },
  {
    title: "Faturamento",
    value: "R$ 8.420",
    icon: FaDollarSign,
  },
  {
    title: "Clientes",
    value: "58",
    icon: FaUsers,
  },
];

export default function DashboardPage() {
  return (
    <section className="bg-surface px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          Dashboard
        </h1>
        <p className="mt-1 text-sm sm:text-base text-text-muted">
          Visão geral da sua loja 🌱
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-surface-strong p-4 sm:p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted">{item.title}</p>
                  <p className="mt-1 text-xl sm:text-2xl font-bold text-text">
                    {item.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={20} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-10 sm:mt-12">
        <h2 className="mb-4 text-lg sm:text-xl font-semibold text-text">
          Ações rápidas
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard/products"
            className="rounded-2xl border border-border bg-surface-strong p-4 sm:p-5 transition hover:border-primary active:scale-[0.98]"
          >
            <h3 className="font-semibold text-base sm:text-lg text-text">
              Gerenciar produtos
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Adicionar, editar ou remover produtos
            </p>
          </Link>

          <Link
            href="/dashboard/orders"
            className="rounded-2xl border border-border bg-surface-strong p-4 sm:p-5 transition hover:border-primary active:scale-[0.98]"
          >
            <h3 className="font-semibold text-base sm:text-lg text-text">
              Ver pedidos
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Acompanhe os pedidos realizados
            </p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="rounded-2xl border border-border bg-surface-strong p-4 sm:p-5 transition hover:border-primary active:scale-[0.98]"
          >
            <h3 className="font-semibold text-base sm:text-lg text-text">
              Perfil
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Atualize suas informações
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
