"use client";

import Modal from "./Modal";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Termos de Uso" size="xl">
      <div className="prose prose-sm max-w-none text-text">
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            1. Aceitação dos Termos
          </h3>
          <p className="mb-3 text-sm">
            Ao acessar e usar a plataforma Amazonia, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com estes termos, por favor, não use nossa plataforma.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            2. Descrição do Serviço
          </h3>
          <p className="mb-3 text-sm">
            A Amazonia é uma plataforma de e-commerce que conecta produtores e fornecedores de produtos amazônicos com compradores interessados. Oferecemos ferramentas para cadastro de produtos, gerenciamento de vendas e facilitação de transações comerciais.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            3. Cadastro e Conta do Usuário
          </h3>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Para usar nossa plataforma, você deve criar uma conta fornecendo informações precisas e atualizadas.</li>
            <li>Você é responsável por manter a confidencialidade de sua senha e conta.</li>
            <li>Você deve notificar imediatamente qualquer uso não autorizado de sua conta.</li>
            <li>Usuários podem ser vendedores ou compradores, com diferentes níveis de acesso.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            4. Produtos e Vendas
          </h3>
          <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">
            <li>Todos os produtos devem ser originários da Amazônia ou relacionados à região.</li>
            <li>As descrições dos produtos devem ser precisas e não enganosas.</li>
            <li>A Amazonia reserva-se o direito de aprovar ou rejeitar produtos antes da publicação.</li>
            <li>Os vendedores são responsáveis pela qualidade e entrega dos produtos.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            5. Pagamentos e Transações
          </h3>
          <p className="mb-3 text-sm">
            A Amazonia pode facilitar pagamentos através de terceiros, mas não se responsabiliza por disputas relacionadas a transações. Os usuários são responsáveis por resolver questões de pagamento diretamente.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            6. Propriedade Intelectual
          </h3>
          <p className="mb-3 text-sm">
            Todo o conteúdo da plataforma Amazonia, incluindo textos, imagens, logos e software, é protegido por direitos autorais e outras leis de propriedade intelectual. Você não pode copiar, distribuir ou usar nosso conteúdo sem autorização expressa.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            7. Limitação de Responsabilidade
          </h3>
          <p className="mb-3 text-sm">
            A Amazonia não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso da plataforma. Usamos nosso melhor esforço para manter a plataforma segura e funcional, mas não garantimos ausência de erros ou interrupções.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            8. Modificações dos Termos
          </h3>
          <p className="mb-3 text-sm">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma constitui aceitação dos termos modificados.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            9. Lei Aplicável
          </h3>
          <p className="mb-3 text-sm">
            Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">
            10. Contato
          </h3>
          <p className="mb-3 text-sm">
            Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do email: contato@amazonia.com.br
          </p>
        </section>
      </div>
    </Modal>
  );
}