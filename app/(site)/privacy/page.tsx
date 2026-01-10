"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function PrivacyPage() {
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
              A Amazonia valoriza sua privacidade e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você usa nossa plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              2. Informações que Coletamos
            </h2>
            <h3 className="text-xl font-medium text-text mb-3">2.1 Informações Fornecidas por Você</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email e senha para criação de conta</li>
              <li>Informações da empresa (nome, CNPJ, endereço, etc.)</li>
              <li>Informações de produtos (nome, descrição, preço, imagens)</li>
              <li>Informações de contato para suporte</li>
            </ul>

            <h3 className="text-xl font-medium text-text mb-3">2.2 Informações Coletadas Automaticamente</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Endereço IP e localização aproximada</li>
              <li>Tipo de dispositivo e navegador</li>
              <li>Dados de uso da plataforma (páginas visitadas, tempo de navegação)</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              3. Como Usamos suas Informações
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Fornecer nossos serviços:</strong> Processar cadastros, gerenciar produtos e facilitar transações</li>
              <li><strong>Comunicação:</strong> Enviar notificações sobre aprovação de produtos, atualizações da conta e suporte</li>
              <li><strong>Segurança:</strong> Proteger contra fraudes, abusos e atividades ilegais</li>
              <li><strong>Melhorias:</strong> Analisar uso da plataforma para melhorar nossos serviços</li>
              <li><strong>Conformidade legal:</strong> Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              4. Compartilhamento de Informações
            </h2>
            <p className="mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais ou ordens judiciais</li>
              <li>Para proteger direitos, propriedade ou segurança da Amazonia ou de terceiros</li>
              <li>Com provedores de serviços que nos ajudam a operar a plataforma (sob acordos de confidencialidade)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              5. Cookies e Tecnologias de Rastreamento
            </h2>
            <p className="mb-4">
              Usamos cookies e tecnologias similares para melhorar sua experiência na plataforma. Você pode controlar o uso de cookies através das configurações do seu navegador, mas isso pode afetar algumas funcionalidades.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              6. Segurança das Informações
            </h2>
            <p className="mb-4">
              Implementamos medidas de segurança técnicas, administrativas e físicas apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              7. Retenção de Dados
            </h2>
            <p className="mb-4">
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              8. Seus Direitos
            </h2>
            <p className="mb-4">
              De acordo com a legislação aplicável, você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações imprecisas ou incompletas</li>
              <li>Excluir suas informações pessoais (sujeito a limitações legais)</li>
              <li>Restringir ou opor-se ao processamento</li>
              <li>Portabilidade dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              9. Privacidade de Menores
            </h2>
            <p className="mb-4">
              Nossa plataforma não é destinada a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se descobrirmos que coletamos informações de um menor, tomaremos medidas para excluir essas informações.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              10. Alterações nesta Política
            </h2>
            <p className="mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas através de email ou aviso na plataforma. O uso continuado da plataforma após alterações constitui aceitação da política atualizada.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              11. Contato
            </h2>
            <p className="mb-4">
              Para questões sobre esta Política de Privacidade ou exercer seus direitos, entre em contato:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email: privacidade@amazonia.com.br</li>
              <li>Endereço: [Endereço da empresa]</li>
              <li>Telefone: [Telefone de contato]</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-text mb-4">
              12. Lei Aplicável
            </h2>
            <p className="mb-4">
              Esta Política de Privacidade é regida pelas leis brasileiras, incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}