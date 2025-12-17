"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
};

type Props = {
  product: Product;
};

export default function AgroProductDetails({ product }: Props) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition"
        >
          ← Voltar
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.images.map((img) => (
                <button
                  key={img}
                  onMouseEnter={() => setActiveImage(img)}
                  className={`
                    relative h-20 w-20 overflow-hidden rounded-xl border
                    ${
                      activeImage === img
                        ? "border-primary"
                        : "border-border"
                    }
                  `}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-square overflow-hidden rounded-3xl border border-border bg-white">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover transition-opacity"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold text-text sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Price + CTA */}
            <div className="mt-8 flex items-center gap-6">
              <span className="text-2xl font-bold text-primary">
                {product.price}
              </span>

              <button className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition">
                Comprar
              </button>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              🌱 Produto alinhado com práticas sustentáveis e preservação do
              bioma amazônico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
