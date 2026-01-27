"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiArrowLeft,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlinePhone,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";

type Product = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  company: {
    name: string;
    cel: string;
    phone: string;
  };
};

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const isOutOfStock = product.stock <= 0;

  // Formata o link do WhatsApp
  const whatsappUrl = `https://wa.me/55${product.company.cel.replace(/\D/g, "")}?text=Olá! Vi o produto ${product.name} na Amazônia Marketing e gostaria de mais informações.`;

  // 1. Remove tudo que não for número
  const rawPhone = product.company?.phone?.replace(/\D/g, "") ?? "";

  // 2. Monta o link internacional (tel:+55...)
  // Verificamos se o número já começa com 55, se não, adicionamos.
  const formattedPhoneLink = rawPhone.startsWith("55")
    ? `tel:+${rawPhone}`
    : `tel:+55${rawPhone}`;

  // Se você quiser garantir o DDD 91 caso o usuário tenha esquecido de digitar:
  const finalPhoneLink =
    rawPhone.length === 9 ? `tel:+5591${rawPhone}` : formattedPhoneLink;

  return (
    <section className="bg-surface min-h-screen py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <button
          onClick={() => router.back()}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Voltar para a loja
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Galeria */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex flex-row gap-3 md:flex-col">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-16 w-16 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === img
                      ? "border-primary shadow-md"
                      : "border-border hover:border-text-muted"
                  }`}
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

            <div className="relative flex-1 aspect-square overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-sm">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-4 transition-opacity duration-500"
                priority
              />
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-bold/40 backdrop-blur-[2px]">
                  <span className="rounded-full bg-white px-6 py-2 text-sm font-bold uppercase tracking-widest text-bold">
                    Esgotado
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                {product.category}
              </span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Vendido por:{" "}
                <span className="text-text">{product.company.name}</span>
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-text sm:text-5xl tracking-tight">
              {product.name}
            </h1>

            <div className="mt-6 space-y-4">
              <p className="text-lg leading-relaxed text-text-muted">
                {product.description}
              </p>

              <div className="flex flex-col gap-3 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-sm text-text">
                  <HiOutlineTruck className="text-primary text-xl" />
                  <span>Envio imediato direto do produtor</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-text">
                  <HiOutlineShieldCheck className="text-primary text-xl" />
                  <span>Compra segura com verificação Amazônia Marketing</span>
                </div>
              </div>
            </div>

            {/* Preço e Contatos */}
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-muted">
                  Valor do investimento
                </span>
                <span className="text-4xl font-bold text-primary">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>

              {/* Botões de Ação Direta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all shadow-lg hover:bg-[#20ba5a] active:scale-95"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp
                </a>

                <a
                  href={finalPhoneLink}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-surface-strong border border-border px-8 py-4 text-sm font-bold uppercase tracking-widest text-text transition-all shadow-sm hover:bg-border active:scale-95"
                >
                  <HiOutlinePhone size={20} className="text-primary" />
                  Ligar Agora
                </a>
              </div>

              {isOutOfStock && (
                <p className="text-center text-xs font-bold text-red-500 uppercase">
                  Este produto está temporariamente sem estoque.
                </p>
              )}
            </div>

            <footer className="mt-10 rounded-2xl bg-surface-strong p-6 border border-border">
              <p className="text-xs font-medium text-text-muted leading-relaxed">
                🌱 <strong className="text-text">Negociação Direta:</strong> A
                Amazônia Marketing facilita o contato entre você e o produtor.
                Toda a logística e pagamento são combinados diretamente com a{" "}
                <span className="text-primary font-bold">
                  {product.company.name}
                </span>
                .
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
