"use client";

import { useState } from "react";

export default function AgroFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    // depois você pode ligar isso a uma API
    console.log("Newsletter:", email);
    setEmail("");
  }

  return (
    <footer className="bg-surface-strong border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {/* Newsletter */}
        <div className="mb-20 rounded-3xl bg-gradient-to-r from-primary to-secondary p-10 text-white">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-bold">
                Receba novidades do agro sustentável 🌱
              </h3>
              <p className="mt-3 text-sm text-white/90">
                Conteúdos, produtos e soluções que valorizam a agricultura
                amazônica e a produção responsável.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="
                  w-full rounded-full
                  bg-white px-5 py-3
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2 focus:ring-white
                "
              />

              <button
                type="submit"
                className="
                  rounded-full bg-slate-900
                  px-6 py-3
                  text-sm font-semibold
                  text-white
                  hover:bg-slate-800
                  transition
                "
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Conteúdo do Footer */}
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
              Conectando inovação, sustentabilidade e agricultura responsável
              no coração da Amazônia.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-text">
              Navegação
            </h4>
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
            <h4 className="mb-4 text-sm font-semibold text-text">
              Categorias
            </h4>
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
            <h4 className="mb-4 text-sm font-semibold text-text">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>📍 Amazônia, Brasil</li>
              <li>✉️ contato@agroamazonia.com</li>
              <li>📞 (00) 00000-0000</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} AgroAmazônia. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a href="#" className="text-text-muted hover:text-primary transition">
              Termos
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
