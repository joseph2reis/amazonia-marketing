"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Adicionado Suspense
import { HiOutlineArrowLeft } from "react-icons/hi";

// 1. Criamos um componente interno para isolar o uso do useSearchParams
function PrivacyContent() {
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
        // Erro ao processar URL do referrer
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
        <h1 className="text-3xl font-bold text-text mb-2">
          Política de Privacidade
        </h1>
        <p className="text-text-muted">
          Última atualização: 10 de janeiro de 2026
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none text-text">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">
            1. Introdução
          </h2>
          <p className="mb-4">
            A Amazonia valoriza sua privacidade e está comprometida em proteger
            suas informações pessoais...
          </p>
        </section>

        {/* ... Restante das suas seções (2 a 12) exatamente como estavam ... */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text mb-4">
            12. Lei Aplicável
          </h2>
          <p className="mb-4">
            Esta Política de Privacidade é regida pelas leis brasileiras,
            incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº
            13.709/2018).
          </p>
        </section>
      </div>
    </div>
  );
}

// 2. A página principal apenas envolve o conteúdo no Suspense
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-text-muted animate-pulse">
              Carregando política...
            </p>
          </div>
        }
      >
        <PrivacyContent />
      </Suspense>
    </div>
  );
}
