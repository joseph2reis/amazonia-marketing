export default function AgroFooter() {
  return (
    <footer className="bg-surface-strong border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary" />
              <span className="text-lg font-semibold text-text">
                AgroAmazônia
              </span>
            </div>

            <p className="text-sm text-text-muted leading-relaxed">
              Conectando inovação, sustentabilidade e agricultura responsável no
              coração da Amazônia.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">Navegação</h4>

            <ul className="space-y-2 text-sm">
              {["Home", "Sobre", "Produtos", "Contato"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-muted hover:text-primary transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">Categorias</h4>

            <ul className="space-y-2 text-sm">
              {[
                "Sementes & Mudas",
                "Bioinsumos",
                "Tecnologia no Campo",
                "Cooperativas",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-muted hover:text-primary transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">Contato</h4>

            <ul className="space-y-2 text-sm text-text-muted">
              <li>📍 Amazônia, Brasil</li>
              <li>✉️ joseph2reis@gmail.com</li>
              <li>📞 (91) 98864-9565</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} AgroAmazônia. Todos os direitos
            reservados.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="#"
              className="text-text-muted hover:text-primary transition"
            >
              Termos
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-primary transition"
            >
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
