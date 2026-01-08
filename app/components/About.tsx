"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-3xl font-bold tracking-tight text-text sm:text-4xl"
          >
            Sobre o Agro<span className="text-primary"> Amazônia</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg text-text-muted"
          >
            Conectando conhecimento, tecnologia e o campo para um agronegócio
            mais produtivo, sustentável e rentável no Brasil.
          </motion.p>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Imagem principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden border border-border shadow-lg group"
          >
            <Image
              src="/about/image.png"
              alt="Paisagem de lavoura sustentável ao pôr do sol"
              width={1200}
              height={800}
              className="object-cover w-full h-95 lg:h-115 transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm font-medium opacity-90">
                Brasil, safra 2025/26 – Tecnologia e sustentabilidade no campo
              </p>
            </div>
          </motion.div>

          {/* Textos e destaques */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            className="space-y-8"
          >
            {/* Quem somos */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-semibold text-text">Quem somos</h3>
              <p className="mt-4 text-text-muted leading-relaxed">
                Somos uma plataforma dedicada a produtores, cooperativas,
                agrônomos e empresas do agronegócio brasileiro. Nosso objetivo é
                democratizar o acesso a informações técnicas atualizadas,
                análises de mercado, novas tecnologias e boas práticas para
                aumentar a produtividade e a sustentabilidade das lavouras.
              </p>
            </motion.div>

            {/* Cards de destaque */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-border bg-surface-strong p-6 transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="text-primary text-3xl mb-3">+35%</div>
                <h4 className="font-semibold text-text">
                  Aumento médio de produtividade
                </h4>
                <p className="mt-2 text-sm text-text-muted">
                  Relatado por usuários que aplicaram as estratégias
                  compartilhadas aqui.
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-border bg-surface-strong p-6 transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="text-primary text-3xl mb-3">2026</div>
                <h4 className="font-semibold text-text">
                  Conteúdo sempre atualizado
                </h4>
                <p className="mt-2 text-sm text-text-muted">
                  Artigos, guias e análises alinhados com a safra atual.
                </p>
              </motion.div>
            </motion.div>

            {/* Texto final */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="text-text-muted leading-relaxed"
            >
              Acreditamos que o futuro do agro brasileiro passa por{" "}
              <span className="font-medium text-primary">
                conhecimento compartilhado
              </span>
              , adoção de tecnologias de precisão e manejo sustentável. Estamos
              aqui para apoiar essa transformação.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-4"
            >
              <a
                href="/contato"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md"
              >
                Fale com a gente →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
