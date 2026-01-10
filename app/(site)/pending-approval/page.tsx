"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PendingApprovalPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <section className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-8 shadow-md text-center">
        <h1 className="text-2xl font-bold text-text mb-4">
          Cadastro em Análise
        </h1>
        <p className="text-text-muted mb-6">
          Sua empresa foi cadastrada com sucesso! Estamos analisando os dados e entraremos em contato em breve.
        </p>
        <p className="text-sm text-text-muted">
          Você receberá um e-mail quando o cadastro for aprovado.
        </p>
      </div>
    </section>
  );
}