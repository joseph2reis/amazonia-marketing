"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaBuilding,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { products } from "../database/products";

type StatsItem = {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color?: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<StatsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchAdminStats();
    } else {
      setStats([
        {
          title: "Meus Produtos",
          value: products.length,
          icon: FaBoxOpen,
          color: "text-blue-500",
        },
        {
          title: "Pedidos",
          value: "12",
          icon: FaShoppingCart,
          color: "text-green-500",
        },
        {
          title: "Faturamento",
          value: "R$ 2.340",
          icon: FaDollarSign,
          color: "text-yellow-500",
        },
        {
          title: "Avaliacoes",
          value: "4.8",
          icon: FaUsers,
          color: "text-purple-500",
        },
      ]);
      setLoading(false);
    }
  }, [session]);

  const fetchAdminStats = async () => {
    try {
      const [companiesRes, productsRes] = await Promise.all([
        fetch("/api/admin/stats/companies"),
        fetch("/api/admin/stats/products"),
      ]);

      const companiesData = companiesRes.ok ? await companiesRes.json() : { pending: 0, approved: 0 };
      const productsData = productsRes.ok ? await productsRes.json() : { total: 0 };

      setStats([
        {
          title: "Empresas Pendentes",
          value: companiesData.pending,
          icon: FaClock,
          color: "text-orange-500",
        },
        {
          title: "Empresas Aprovadas",
          value: companiesData.approved,
          icon: FaCheckCircle,
          color: "text-green-500",
        },
        {
          title: "Produtos Totais",
          value: productsData.total,
          icon: FaBoxOpen,
          color: "text-blue-500",
        },
        {
          title: "Empresas Ativas",
          value: companiesData.approved,
          icon: FaBuilding,
          color: "text-indigo-500",
        },
      ]);
    } catch (error) {
      console.error("Erro ao buscar estatisticas:", error);
      setStats([
        {
          title: "Empresas Pendentes",
          value: 0,
          icon: FaClock,
          color: "text-orange-500",
        },
        {
          title: "Empresas Aprovadas",
          value: 0,
          icon: FaCheckCircle,
          color: "text-green-500",
        },
        {
          title: "Produtos Totais",
          value: 0,
          icon: FaBoxOpen,
          color: "text-blue-500",
        },
        {
          title: "Empresas Ativas",
          value: 0,
          icon: FaBuilding,
          color: "text-indigo-500",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-surface px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface-strong p-6 rounded-xl">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          Dashboard {session?.user?.role === "ADMIN" ? "Administrativo" : ""}
        </h1>
        <p className="mt-1 text-sm sm:text-base text-text-muted">
          {session?.user?.role === "ADMIN"
            ? "Gerencie empresas e produtos da plataforma"
            : "Visao geral da sua loja"}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-surface-strong p-6 rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-muted">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-text mt-1">
                    {item.value}
                  </p>
                </div>
                <div className={`text-2xl ${item.color || "text-primary"}`}>
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {session?.user?.role === "ADMIN" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text mb-4">Acoes Rapidas</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/dashboard/companies"
              className="bg-surface-strong p-6 rounded-xl border border-border hover:shadow-md transition-shadow block"
            >
              <div className="flex items-center">
                <FaBuilding className="text-2xl text-orange-500 mr-3" />
                <div>
                  <h3 className="font-medium text-text">Gerenciar Empresas</h3>
                  <p className="text-sm text-text-muted">Aprove ou visualize empresas</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/products"
              className="bg-surface-strong p-6 rounded-xl border border-border hover:shadow-md transition-shadow block"
            >
              <div className="flex items-center">
                <FaBoxOpen className="text-2xl text-blue-500 mr-3" />
                <div>
                  <h3 className="font-medium text-text">Produtos</h3>
                  <p className="text-sm text-text-muted">Gerencie produtos da plataforma</p>
                </div>
              </div>
            </Link>

            <div className="bg-surface-strong p-6 rounded-xl border border-border">
              <div className="flex items-center">
                <FaUsers className="text-2xl text-green-500 mr-3" />
                <div>
                  <h3 className="font-medium text-text">Usuarios</h3>
                  <p className="text-sm text-text-muted">Em breve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
