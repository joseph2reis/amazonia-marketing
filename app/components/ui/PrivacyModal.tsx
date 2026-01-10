"use client";

import Modal from "./Modal";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Política de Privacidade" size="xl">
      <div className="prose prose-sm max-w-none text-text">
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            1. Introdução
          </h3>
          <p className="mb-3 text-sm">
            A Amazonia valoriza sua privacidade e está comprometida em proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você usa nossa plataforma.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            2. Informações que Coletamos
          </h3>
          <h4 className="text-base font-medium text-text mb-2">2.1 Informações Fornecidas por Você</h4>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Email e senha para criação de conta</li>
            <li>Informações da empresa (nome, CNPJ, endereço, etc.)</li>
            <li>Informações de produtos (nome, descrição, preço, imagens)</li>
            <li>Informações de contato para suporte</li>
          </ul>

          <h4 className="text-base font-medium text-text mb-2">2.2 Informações Coletadas Automaticamente</h4>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Endereço IP e localização aproximada</li>
            <li>Tipo de dispositivo e navegador</li>
            <li>Dados de uso da plataforma (páginas visitadas, tempo de navegação)</li>
            <li>Cookies e tecnologias similares</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            3. Como Usamos suas Informações
          </h3>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li><strong>Fornecer nossos serviços:</strong> Processar cadastros, gerenciar produtos e facilitar transações</li>
            <li><strong>Comunicação:</strong> Enviar notificações sobre aprovação de produtos, atualizações da conta e suporte</li>
            <li><strong>Segurança:</strong> Proteger contra fraudes, abusos e atividades ilegais</li>
            <li><strong>Melhorias:</strong> Analisar uso da plataforma para melhorar nossos serviços</li>
            <li><strong>Conformidade legal:</strong> Cumprir obrigações legais e regulatórias</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            4. Compartilhamento de Informações
          </h3>
          <p className="mb-3 text-sm">
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Com seu consentimento explícito</li>
            <li>Para cumprir obrigações legais ou ordens judiciais</li>
            <li>Para proteger direitos, propriedade ou segurança da Amazonia ou de terceiros</li>
            <li>Com provedores de serviços que nos ajudam a operar a plataforma (sob acordos de confidencialidade)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            5. Cookies e Tecnologias de Rastreamento
          </h3>
          <p className="mb-3 text-sm">
            Usamos cookies e tecnologias similares para melhorar sua experiência na plataforma. Você pode controlar o uso de cookies através das configurações do seu navegador, mas isso pode afetar algumas funcionalidades.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            6. Segurança das Informações
          </h3>
          <p className="mb-3 text-sm">
            Implementamos medidas de segurança técnicas, administrativas e físicas apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            7. Retenção de Dados
          </h3>
          <p className="mb-3 text-sm">
            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            8. Seus Direitos
          </h3>
          <p className="mb-3 text-sm">
            De acordo com a legislação aplicável, você tem os seguintes direitos:
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Acessar suas informações pessoais</li>
            <li>Corrigir informações imprecisas ou incompletas</li>
            <li>Excluir suas informações pessoais (sujeito a limitações legais)</li>
            <li>Restringir ou opor-se ao processamento</li>
            <li>Portabilidade dos dados</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            9. Privacidade de Menores
          </h3>
          <p className="mb-3 text-sm">
            Nossa plataforma não é destinada a menores de 18 anos. Não coletamos intencionalmente informações pessoais de menores. Se descobrirmos que coletamos informações de um menor, tomaremos medidas para excluir essas informações.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            10. Alterações nesta Política
          </h3>
          <p className="mb-3 text-sm">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas através de email ou aviso na plataforma. O uso continuado da plataforma após alterações constitui aceitação da política atualizada.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            11. Contato
          </h3>
          <p className="mb-3 text-sm">
            Para questões sobre esta Política de Privacidade ou exercer seus direitos, entre em contato:
          </p>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Email: privacidade@amazonia.com.br</li>
            <li>Endereço: [Endereço da empresa]</li>
            <li>Telefone: [Telefone de contato]</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            12. Lei Aplicável
          </h3>
          <p className="mb-3 text-sm">
            Esta Política de Privacidade é regida pelas leis brasileiras, incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>
      </div>
    </Modal>
  );
}