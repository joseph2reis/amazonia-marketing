"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type CompanyFormData = {
  name: string;
  cnpj: string;
  cpf: string;
  phone: string;
  description: string;
};

export default function CompleteCompanyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: "error" | "success" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>();

  useEffect(() => {
    if (status === "loading") return; // Ainda carregando
    if (!session) {
      router.push("/auth/login");
      return;
    }
    // Verificar se já tem empresa
    fetch("/api/company/check", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasCompany) {
          if (data.approved) {
            router.push("/dashboard");
          } else {
            router.push("/pending-approval");
          }
        }
      })
      .catch(() => {
        // Ignorar erro, assumir que não tem
      });
  }, [session, status, router]);

  const onSubmit = async (data: CompanyFormData) => {
    if (!session?.user?.id) {
      setMsg({ type: "error", text: "Sessão inválida. Faça login novamente." });
      return;
    }

    setIsLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          ...data,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setMsg({ type: "error", text: result.message });
        return;
      }

      setMsg({
        type: "success",
        text: "Empresa cadastrada com sucesso! Aguarde aprovação do administrador.",
      });

      setTimeout(() => {
        router.push("/pending-approval");
      }, 2000);
    } catch {
      setMsg({
        type: "error",
        text: "Erro ao cadastrar empresa. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return null; // Redirecionará
  }

  return (
    <section className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text">Completar Cadastro</h1>
          <p className="mt-2 text-sm text-text-muted">
            Informe os dados da sua empresa
          </p>
        </div>

        {msg.text && (
          <div
            className={`mb-4 p-3 text-xs rounded-xl border ${
              msg.type === "error"
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-green-50 text-green-600 border-green-200"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Nome da Empresa
            </label>
            <input
              type="text"
              {...register("name", { required: "Nome é obrigatório" })}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              CNPJ
            </label>
            <input
              type="text"
              {...register("cnpj", { required: "CNPJ é obrigatório" })}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.cnpj && (
              <p className="text-red-500 text-xs mt-1">{errors.cnpj.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              CPF
            </label>
            <input
              type="text"
              {...register("cpf", { required: "CPF é obrigatório" })}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.cpf && (
              <p className="text-red-500 text-xs mt-1">{errors.cpf.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Telefone
            </label>
            <input
              type="text"
              {...register("phone", { required: "Telefone é obrigatório" })}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Descrição
            </label>
            <textarea
              {...register("description", { required: "Descrição é obrigatória" })}
              className="w-full px-3 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : null}
            Cadastrar Empresa
          </button>
        </form>
      </div>
    </section>
  );
}