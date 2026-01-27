"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Adicionado Suspense
import { HiOutlineArrowLeft } from "react-icons/hi";

// 1. Componente que isola a lógica de busca de parâmetros
function TermsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [backUrl, setBackUrl] = useState("/auth/register");

  useEffect(() => {
    const fromParam = searchParams.get("from");
    if (fromParam) {
      setBackUrl(fromParam);
      return;
    }

    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrer = new URL(document.referrer);
        if (referrer.hostname === window.location.hostname) {
          setBackUrl(referrer.pathname + referrer.search);
          return;
        }
      } catch (e) {
        // Fallback silencioso se a URL for inválida
      }
    }

    setBackUrl("/auth/register");
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4 bg-transparent border-none cursor-pointer"
        >
          <HiOutlineArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="text-3xl font-bold text-text mb-2">Termos de Uso</h1>
        <p className="text-text-muted">
          Última atualização: 10 de janeiro de 2026
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none text-text">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">
            1. Aceitação dos Termos
          </h2>
          <p className="mb-4">
            Ao acessar e usar a plataforma Amazonia, você concorda em cumprir e
            estar vinculado a estes Termos de Uso. Se você não concordar com
            estes termos, por favor, não use nossa plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">
            2. Descrição do Serviço
          </h2>
          <p className="mb-4">
            A Amazonia é uma plataforma de e-commerce que conecta produtores e
            fornecedores de produtos amazônicos com compradores interessados.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">
            3. Cadastro e Conta do Usuário
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Para usar nossa plataforma, você deve criar uma conta fornecendo
              informações precisas.
            </li>
            <li>Você é responsável pela confidencialidade de sua conta.</li>
          </ul>
        </section>

        {/* ... Restante das suas seções (4 a 10) ... */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">10. Contato</h2>
          <p className="mb-4">
            Para dúvidas sobre estes Termos de Uso, entre em contato conosco
            através do email: contato@amazonia.com.br
          </p>
        </section>
      </div>
    </div>
  );
}

// 2. Componente principal exportado
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
          </div>
        }
      >
        <TermsContent />
      </Suspense>
    </div>
  );
}
