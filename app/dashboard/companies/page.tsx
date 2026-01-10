"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";

type Company = {
  id: string;
  name: string;
  cnpj: string;
  cpf: string;
  phone: string;
  description: string;
  user: {
    email: string;
  };
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
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

  const approveCompany = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/companies/${id}/approve`, {
        method: "POST",
      });
      if (res.ok) {
        setCompanies(companies.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error("Erro ao aprovar empresa:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
      </div>
    );
  }

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-text">Empresas Pendentes</h1>
        <p className="mt-1 text-sm text-text-muted">
          Aprove empresas cadastradas
        </p>
      </header>

      <div className="bg-surface-strong rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-text">
                Nome
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text">
                CNPJ
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text">
                Telefone
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text">
                E-mail
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-text">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-t border-border">
                <td className="px-4 py-3 text-sm text-text">{company.name}</td>
                <td className="px-4 py-3 text-sm text-text">{company.cnpj}</td>
                <td className="px-4 py-3 text-sm text-text">{company.phone}</td>
                <td className="px-4 py-3 text-sm text-text">
                  {company.user.email}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => approveCompany(company.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                  >
                    <AiOutlineCheck className="mr-1" />
                    Aprovar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && (
          <div className="px-4 py-8 text-center text-text-muted">
            Nenhuma empresa pendente
          </div>
        )}
      </div>
    </section>
  );
}