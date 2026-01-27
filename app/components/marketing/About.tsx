"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-surface">
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
            Sobre a Amazônia <span className="text-primary">Marketing</span>
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
        {/* --- Titulo Quem Somos --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8}}
          className="mt-10 flex justify-center"
        >
          <h3 className="text-3xl font-bold text-text border-primary pb-2">
            Quem <span className="text-primary">somos</span>
          </h3>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Imagem principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className=" mb-10 relative rounded-2xl overflow-hidden border border-border shadow-lg group"
          >
            <Image
              src="/about/imagem-sobre.webp"
              alt="Paisagem de lavoura sustentável ao pôr do sol"
              width={1200}
              height={800}
              className="object-cover w-full h-95 lg:h-115 transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm font-medium opacity-90">
                
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
              <p className="mt-4 text-text-muted leading-relaxed text-justify">
                Fundada em 20 de setembro de 2007, em Salinópolis-PA, a <span className="font-semibold text-primary">
                Amazônia Marketing
              </span> nasceu com a missão de criar informações inteligentes que impulsionam o desenvolvimento regional. Especializada em consultoria de gestão empresarial, transformamos conhecimento em soluções práticas para quem vive e produz na Amazônia.
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
                <div className="text-primary text-3xl mb-3 font-bold">+35%</div>
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
                <div className="text-primary text-3xl mb-3 font-bold">2026</div>
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
              className="text-text-muted leading-relaxed text-justify"
            >
              Nossa prioridade é o crescimento em{" "}
              <span className="font-semibold text-primary">
                excelência
              </span>
              , alinhados aos objetivos de cada parceiro. Aceitamos desafios baseados no compromisso real com o desenvolvimento regional, garantindo que cada conexão gerada entregue valor direto ao produtor e à empresa.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-4 flex justify-center"
            >
              <a
                href="/contato"
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md"
              >
                Falar com um Consultor →
              </a>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
