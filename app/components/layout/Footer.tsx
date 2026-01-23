"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// 1. IMPORTANTE: Importar o Carrossel (ajuste o caminho se necessário)
import HeroCarousel from "../marketing/HeroCarousel";

function AnimatedNumber({
  value,
  duration = 1200,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setDisplay(current);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{display.toLocaleString("pt-BR")}</span>;
}

export default function AgroFooter() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    console.log("Newsletter inscrita:", email);
    alert("Obrigado por se inscrever! 🌱");
    setEmail("");
  }

  return (
    <footer id="contato" className="bg-surface-strong border-t border-border">

      {/* Esta seção contém os DADOS e agora o CARROSSEL.
          Ela só aparece se NÃO estiver nas páginas de auth/produto 
      */}
      {!pathname?.startsWith("/auth") && !pathname?.startsWith("/produto") && !pathname?.startsWith("/produtos") && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-primary/2 py-16"
        >
          <div className="mx-auto max-w-7xl px-6">

            {/* GRID DOS NÚMEROS (3 Colunas) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-4xl font-bold text-primary">
                  <AnimatedNumber value={1200} />+
                </p>
                <p className="mt-2 text-text-muted">Produtores parceiros</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-4xl font-bold text-secondary">
                  <AnimatedNumber value={85000} /> ha
                </p>
                <p className="mt-2 text-text-muted">Área preservada</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-4xl font-bold text-primary">
                  <AnimatedNumber value={320} />
                </p>
                <p className="mt-2 text-text-muted">Comunidades atendidas</p>
              </motion.div>
            </div>
            {/* FIM DO GRID DE NÚMEROS */}
          </div>
        </motion.div>
      )}
      
      {/* Carrossel - Não aparecer em outras páginas */}
      {!pathname?.startsWith("/auth") && !pathname?.startsWith("/produto") && !pathname?.startsWith("/produtos") && (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="border-t border-primary/10"
          >
            <HeroCarousel />
          </motion.div>
        </div>
      )}
      
      {/* Footer Principal (Newsletter e Links) */}
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 rounded-3xl bg-linear-to-r from-primary to-secondary p-10 text-white shadow-2xl"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Receba novidades do agro sustentável 🌱
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/90">
                Conteúdos exclusivos, novos produtos e soluções que valorizam a
                agricultura amazônica e a produção responsável.
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
                  w-full rounded-full bg-white px-6 py-4 text-sm md:text-base
                  text-slate-800 placeholder:text-slate-500
                  focus:outline-none focus:ring-4 focus:ring-white/30
                  transition
                "
              />
              <button
                type="submit"
                className="
                  rounded-full bg-slate-900 px-8 py-4 text-sm md:text-base
                  font-semibold text-white hover:bg-slate-800
                  transition whitespace-nowrap
                "
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </motion.div>

        {/* Grid de informações */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid gap-12 md:grid-cols-4"
        >
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-ver.png"
                alt="Logo AgroAmazônia"
                width={40}
                height={40}
                className="h-15 w-auto object-contain"
              />
              <span className="text-xl font-bold text-text" style={{ fontFamily: 'Calibri, sans-serif', fontWeight: 'bold' }}>Amazônia <span className="text-primary">Marketing</span></span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Conectando inovação, sustentabilidade e agricultura responsável no
              coração da Amazônia.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-text">
              Navegação
            </h4>
            <ul className="space-y-3">
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
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-text">
              Categorias
            </h4>
            <ul className="space-y-3">
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
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-text">
              Contato
            </h4>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center gap-2">
                <span>📍</span> Pará, Brasil
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> contato@amazoniamarketing.com
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> (00) 00000-0000
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider + Bottom */}
        <div className="mt-16 pt-10 border-t border-border">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-xs text-text-muted">
              © {new Date().getFullYear()} Amazônia Marketing. Todos os direitos
              reservados.
            </p>

            <div className="flex items-center gap-6 text-xs">
              <a
                href={`/terms?from=${encodeURIComponent(pathname)}`}
                className="text-text-muted hover:text-primary transition"
              >
                Termos de Uso
              </a>
              <a
                href={`/privacy?from=${encodeURIComponent(pathname)}`}
                className="text-text-muted hover:text-primary transition"
              >
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}