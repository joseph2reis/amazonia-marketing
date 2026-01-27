"use client";

import Image from "next/image";
import Link from "next/link";
import imageHero from "@/public/hero/hero.webp";

import { motion } from "framer-motion";

export default function AgroHeroWithStats() {
  return (
    <section className="relative overflow-hidden bg-surface h-[calc(100vh-160px)] mt-10">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-105 w-105 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-105 w-105 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="mx-auto text-center xl:text-left grid max-w-7xl grid-cols-1 items-center gap-5 px-6 py-24 md:grid-cols-2">
        {/* Content - Animações da esquerda */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center rounded-full bg-primary-soft px-4 py-1 text-sm font-medium text-primary"
          >
            🌱 Sua Produção. Nossa Vitrine
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold tracking-tight leading-tight text-text sm:text-5xl lg:text-7xl"
          >
            Conecte Seu <br /> Produto{" "}
            <span className=" text-primary">ao Mundo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-md text-base leading-relaxed text-text-muted sm:text-lg"
          >
            A plataforma da Amazônia Marketing conecta produtores e abre portas
            para o comércio justo. Anuncie seus produtos, conte sua história e
            alcance novos mercados na Amazônia Paraense.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 justify-center xl:justify-start"
          >
            <Link
              href="/auth/register"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
              Começar a Vender agora
            </Link>

            <Link
              href="#marketplace"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-text hover:border-primary hover:text-primary transition"
            >
              Explorar Vitrine de Produtos
            </Link>
          </motion.div>
        </motion.div>

        {/* Image - Animação da direita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:block relative mx-auto h-150 w-full"
        >
          <Image
            src={imageHero}
            alt="Impacto da agricultura sustentável na Amazônia"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
