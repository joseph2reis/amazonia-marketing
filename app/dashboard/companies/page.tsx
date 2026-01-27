"use client";

import { useState, useEffect } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheck,
  AiOutlineShop,
  AiOutlineCloseCircle,
} from "react-icons/ai";

type Company = {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  whatssap: string;
  approved: boolean;
  user: {
    email: string;
  };
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"PENDING" | "ACTIVE">("PENDING");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/companies");
      if (res.ok) {
        const data = await res.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, approve: boolean) => {
    try {
      const endpoint = approve
        ? `/api/admin/companies/${id}/approve`
        : `/api/admin/companies/${id}/reject`;

      const res = await fetch(endpoint, { method: "POST" });

      if (res.ok) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === id ? { ...c, approved: approve } : c)),
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const pendingCompanies = companies.filter((c) => !c.approved);
  const activeCompanies = companies.filter((c) => c.approved);
  const displayList =
    activeTab === "PENDING" ? pendingCompanies : activeCompanies;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-primary">
        <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
      </div>
    );
  }

  return (
    <section className="p-6 bg-surface">
      <header className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-text">
          Gerenciamento de Parceiros
        </h1>
        <p className="text-text-muted text-sm">
          Aprove novas empresas ou gerencie as ativas no marketplace.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-border">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`pb-3 px-2 text-sm font-bold transition-all relative ${
            activeTab === "PENDING" ? "text-primary" : "text-text-muted"
          }`}
        >
          Pendentes
          {pendingCompanies.length > 0 && (
            <span className="ml-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">
              {pendingCompanies.length}
            </span>
          )}
          {activeTab === "PENDING" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("ACTIVE")}
          className={`pb-3 px-2 text-sm font-bold transition-all relative ${
            activeTab === "ACTIVE" ? "text-primary" : "text-text-muted"
          }`}
        >
          Ativas
          <span className="ml-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
            {activeCompanies.length}
          </span>
          {activeTab === "ACTIVE" && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full" />
          )}
        </button>
      </div>

      {/* ========== DESKTOP TABLE ========== */}
      <div className="hidden md:block bg-surface-strong rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/50 text-text-muted text-xs uppercase font-bold">
              <th className="px-6 py-4">Empresa / E-mail</th>
              <th className="px-6 py-4">CNPJ</th>
              <th className="px-6 py-4">Contato</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayList.map((company) => (
              <tr
                key={company.id}
                className="hover:bg-surface/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <AiOutlineShop size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-text">{company.name}</p>
                      <p className="text-xs text-text-muted">
                        {company.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text">{company.cnpj}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text">{company.phone}</p>
                  <p className="text-[10px] font-bold text-primary uppercase">
                    Zap: {company.whatssap}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  {activeTab === "PENDING" ? (
                    <button
                      onClick={() => updateStatus(company.id, true)}
                      className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all"
                    >
                      <AiOutlineCheck /> Aprovar
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(company.id, false)}
                      className="inline-flex items-center gap-2 border border-red-200 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-all"
                    >
                      <AiOutlineCloseCircle /> Desativar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayList.length === 0 && (
          <div className="p-12 text-center text-text-muted italic">
            Nenhuma empresa encontrada nesta categoria.
          </div>
        )}
      </div>

      {/* ========== MOBILE CARDS ========== */}
      <div className="block md:hidden space-y-3">
        {displayList.map((company) => (
          <div
            key={company.id}
            className="bg-surface-strong rounded-2xl border border-border p-3 flex gap-3"
          >
            <div className="p-2 bg-primary/10 text-primary rounded-lg h-fit">
              <AiOutlineShop size={20} />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="font-bold text-text text-sm">{company.name}</p>
              <p className="text-[11px] text-text-muted">
                {company.user.email}
              </p>
              <p className="text-[11px] text-text">CNPJ: {company.cnpj}</p>

              <div className="text-[11px] text-text flex flex-col">
                <span>Fone: {company.phone}</span>
                <span className="text-primary font-bold uppercase">
                  Zap: {company.whatssap}
                </span>
              </div>

              <div className="pt-2">
                {activeTab === "PENDING" ? (
                  <button
                    onClick={() => updateStatus(company.id, true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-3 py-2 rounded-xl text-[12px] font-bold"
                  >
                    <AiOutlineCheck size={16} /> Aprovar
                  </button>
                ) : (
                  <button
                    onClick={() => updateStatus(company.id, false)}
                    className="w-full inline-flex items-center justify-center gap-2 border border-red-300 text-red-600 px-3 py-2 rounded-xl text-[12px] font-medium"
                  >
                    <AiOutlineCloseCircle size={16} /> Desativar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {displayList.length === 0 && (
          <div className="p-8 text-center text-text-muted italic text-xs">
            Nenhuma empresa nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}
