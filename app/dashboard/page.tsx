"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaBoxes,
  FaArrowRight,
} from "react-icons/fa";

type StatsItem = {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<StatsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (isAdmin) {
      fetchAdminStats();
    } else {
      fetchUserStats();
    }
  }, [session, isAdmin]);

  const fetchAdminStats = async () => {
    try {
      const [companiesRes, productsRes] = await Promise.all([
        fetch("/api/admin/stats/companies"),
        fetch("/api/admin/stats/products"),
      ]);

      const companiesData = companiesRes.ok
        ? await companiesRes.json()
        : { pending: 0, approved: 0 };
      const productsData = productsRes.ok
        ? await productsRes.json()
        : { total: 0, totalStock: 0 };

      setStats([
        {
          title: "Empresas Pendentes",
          value: companiesData.pending,
          icon: FaClock,
          color: "text-orange-500",
        },
        {
          title: "Empresas Ativas",
          value: companiesData.approved,
          icon: FaCheckCircle,
          color: "text-green-500",
        },
        {
          title: "Modelos de Produtos",
          value: productsData.total,
          icon: FaBoxOpen,
          color: "text-blue-500",
        },
        {
          title: "Total em Estoque",
          value: productsData.totalStock,
          icon: FaBoxes,
          color: "text-primary",
        },
      ]);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    setStats([
      {
        title: "Meus Produtos",
        value: "---",
        icon: FaBoxOpen,
        color: "text-blue-500",
      },
      {
        title: "Vendas Totais",
        value: "0",
        icon: FaShoppingCart,
        color: "text-green-500",
      },
    ]);
    setLoading(false);
  };

  if (loading) return null; // Ou um skeleton simples

  return (
    <section className="bg-surface px-6 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-text tracking-tight">
            Dashboard{" "}
            <span className="text-primary">
              {isAdmin ? "Admin" : "Lojista"}
            </span>
          </h1>
          <p className="text-text-muted font-medium mt-1">
            Controle global da plataforma e parceiros.
          </p>
        </header>

        {/* STATS CARDS - CLEAN DESIGN */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-surface-strong p-6 rounded-2xl border border-border flex items-center gap-5 shadow-sm"
              >
                <div
                  className={`p-4 rounded-xl bg-surface ${item.color} border border-border`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                    {item.title}
                  </p>
                  <p className="text-2xl font-black text-text leading-none mt-1">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NAVEGAÇÃO RÁPIDA - REFEITA */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-1.5 bg-primary rounded-full" />
            <h2 className="text-xl font-black text-text uppercase tracking-wider">
              Navegação Rápida
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isAdmin ? (
              <>
                <QuickActionLink
                  href="/dashboard/companies"
                  title="Gerenciar Empresas"
                  desc="Aprovação e status de parceiros"
                  icon={<FaBuilding className="text-orange-500" />}
                />
                <QuickActionLink
                  href="/dashboard/products"
                  title="Moderação de Produtos"
                  desc="Revisar catálogo da plataforma"
                  icon={<FaBoxOpen className="text-blue-500" />}
                />
                <div className="p-6 rounded-2xl border border-border bg-surface-strong/50 opacity-40 cursor-not-allowed">
                  <p className="font-bold text-text">Base de Clientes</p>
                  <p className="text-xs text-text-muted">
                    Gestão de compradores (Breve)
                  </p>
                </div>
              </>
            ) : (
              <>
                <QuickActionLink
                  href="/dashboard/products"
                  title="Meu Inventário"
                  desc="Cadastrar e gerenciar produtos"
                  icon={<FaBoxOpen className="text-blue-500" />}
                />
                <QuickActionLink
                  href="/dashboard/orders"
                  title="Vendas e Pedidos"
                  desc="Acompanhar fluxo de saída"
                  icon={<FaShoppingCart className="text-green-500" />}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Subcomponente para os Atalhos
function QuickActionLink({
  href,
  title,
  desc,
  icon,
}: {
  href: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-surface-strong p-6 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-surface border border-border group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        <FaArrowRight className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
      </div>
      <div>
        <h3 className="font-black text-text group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-text-muted mt-1">{desc}</p>
      </div>
    </Link>
  );
}
