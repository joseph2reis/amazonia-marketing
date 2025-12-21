"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imageHero from "@/public/hero/image-hero.png";

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
        {/* Content */}
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-soft px-4 py-1 text-sm font-medium text-primary">
            🌱 Agro sustentável da Amazônia
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Impacto real no campo e na
            <span className="block text-primary"> floresta amazônica</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Fortalecemos a agricultura sustentável conectando tecnologia,
            produtores locais e preservação ambiental.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#produtos"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition"
            >
              Explorar soluções
            </Link>

            <Link
              href="#impacto"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-text hover:border-primary hover:text-primary transition"
            >
              Nosso impacto
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-strong p-4">
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={1200} />+
              </p>
              <p className="text-sm text-text-muted">Produtores parceiros</p>
            </div>

            <div className="rounded-xl border border-border bg-surface-strong p-4">
              <p className="text-2xl font-bold text-secondary">
                <AnimatedNumber value={85000} /> ha
              </p>
              <p className="text-sm text-text-muted">Área preservada</p>
            </div>

            <div className="rounded-xl border border-border bg-surface-strong p-4">
              <p className="text-2xl font-bold text-primary">
                <AnimatedNumber value={320} />
              </p>
              <p className="text-sm text-text-muted">Comunidades atendidas</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative mx-auto h-110 w-full max-w-md">
          <Image
            src={imageHero}
            alt="Impacto da agricultura sustentável na Amazônia"
            fill
            priority
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
