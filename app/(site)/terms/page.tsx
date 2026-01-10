"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function TermsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [backUrl, setBackUrl] = useState("/auth/register");

  useEffect(() => {
    // Primeiro, verifica se há um parâmetro 'from' na URL
    const fromParam = searchParams.get("from");
    if (fromParam) {
      setBackUrl(fromParam);
      return;
    }

    // Se não há parâmetro, usa o referrer se for válido
    if (typeof window !== "undefined" && document.referrer) {
      const referrer = new URL(document.referrer);
      // Só usa o referrer se for do mesmo domínio
      if (referrer.hostname === window.location.hostname) {
        setBackUrl(referrer.pathname + referrer.search);
        return;
      }
    }

    // Fallback para register
    setBackUrl("/auth/register");
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-background">
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
            Termos de Uso
          </h1>
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
              Ao acessar e usar a plataforma Amazonia, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com estes termos, por favor, não use nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              2. Descrição do Serviço
            </h2>
            <p className="mb-4">
              A Amazonia é uma plataforma de e-commerce que conecta produtores e fornecedores de produtos amazônicos com compradores interessados. Oferecemos ferramentas para cadastro de produtos, gerenciamento de vendas e facilitação de transações comerciais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              3. Cadastro e Conta do Usuário
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Para usar nossa plataforma, você deve criar uma conta fornecendo informações precisas e atualizadas.</li>
              <li>Você é responsável por manter a confidencialidade de sua senha e conta.</li>
              <li>Você deve notificar imediatamente qualquer uso não autorizado de sua conta.</li>
              <li>Usuários podem ser vendedores ou compradores, com diferentes níveis de acesso.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              4. Produtos e Vendas
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Todos os produtos devem ser originários da Amazônia ou relacionados à região.</li>
              <li>As descrições dos produtos devem ser precisas e não enganosas.</li>
              <li>A Amazonia reserva-se o direito de aprovar ou rejeitar produtos antes da publicação.</li>
              <li>Os vendedores são responsáveis pela qualidade e entrega dos produtos.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              5. Pagamentos e Transações
            </h2>
            <p className="mb-4">
              A Amazonia pode facilitar pagamentos através de terceiros, mas não se responsabiliza por disputas relacionadas a transações. Os usuários são responsáveis por resolver questões de pagamento diretamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              6. Propriedade Intelectual
            </h2>
            <p className="mb-4">
              Todo o conteúdo da plataforma Amazonia, incluindo textos, imagens, logos e software, é protegido por direitos autorais e outras leis de propriedade intelectual. Você não pode copiar, distribuir ou usar nosso conteúdo sem autorização expressa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              7. Limitação de Responsabilidade
            </h2>
            <p className="mb-4">
              A Amazonia não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso da plataforma. Usamos nosso melhor esforço para manter a plataforma segura e funcional, mas não garantimos ausência de erros ou interrupções.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              8. Modificações dos Termos
            </h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma constitui aceitação dos termos modificados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              9. Lei Aplicável
            </h2>
            <p className="mb-4">
              Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              10. Contato
            </h2>
            <p className="mb-4">
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: contato@amazonia.com.br
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}