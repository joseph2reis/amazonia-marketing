"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imageHero from "@/public/hero/image-hero.png";
import { motion } from "framer-motion";
import HeroCarousel from "./HeroCarousel";

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

export default function AgroHeroWithStats() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Decorative gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-105 w-105 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-105 w-105 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-2">
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
            className="text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl"
          >
            Anuncie seus produtos na nossa plataforma. Conecte a <span className=" text-primary">Amazônia ao mundo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
          >
            A plataforma da Amazônia Marketing conecta produtores e abre portas para o comércio justo. Anuncie seus produtos, conte sua história e alcance novos mercados na Amazônia Paraense.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#produtos"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
              Começar a Vender agora
            </Link>

            <Link
              href="#impacto"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-text hover:border-primary hover:text-primary transition"
            >
              Explorar Vitrine de Produtos
            </Link>
          </motion.div>

          {/* Stats - com stagger */}
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
                },
              },
            }}
            className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-surface-strong p-4"
            >
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={1200} />+
              </p>
              <p className="text-sm text-text-muted">Produtores parceiros</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-surface-strong p-4"
            >
              <p className="text-2xl font-bold text-secondary">
                <AnimatedNumber value={85000} /> ha
              </p>
              <p className="text-sm text-text-muted">Área preservada</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-border bg-surface-strong p-4"
            >
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={320} />
              </p>
              <p className="text-sm text-text-muted">Comunidades atendidas</p>
            </motion.div>
            
          </motion.div>
          
        </motion.div>

        {/* Image - Animação da direita */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:block relative mx-auto h-110 w-full max-w-md"
        >
          <Image
            src={imageHero}
            alt="Impacto da agricultura sustentável na Amazônia"
            fill
            priority
            className="object-cover rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
