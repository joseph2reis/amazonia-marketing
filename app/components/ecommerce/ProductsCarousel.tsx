"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import AgroCard from "./Card";

// Definimos o tipo esperado baseado no seu Schema do Prisma
interface ProductData {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: { url: string }[];
}

interface Props {
  products: ProductData[];
}

const swiperConfig: SwiperOptions = {
  modules: [Navigation, Pagination],
  spaceBetween: 24,
  loop: true,
  pagination: { clickable: true },
  navigation: {
    nextEl: ".agro-next",
    prevEl: ".agro-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1.1 },
    640: { slidesPerView: 2.1 },
    1024: { slidesPerView: 3.2 },
    1280: { slidesPerView: 4 },
  },
};

export default function AgroProductsCarousel({ products = [] }: Props) {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-3xl font-black text-text tracking-tight uppercase">
            Produtos em destaque
          </h2>

          <div className="flex items-center gap-3">
            <button className="agro-prev flex h-10 w-10 items-center justify-center rounded-full border border-border text-text hover:border-primary hover:text-primary transition-all active:scale-90">
              ←
            </button>
            <button className="agro-next flex h-10 w-10 items-center justify-center rounded-full border border-border text-text hover:border-primary hover:text-primary transition-all active:scale-90">
              →
            </button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          <Swiper {...swiperConfig} className="pb-14">
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <AgroCard
                    title={product.name}
                    description={product.description}
                    image={product.images[0]?.url || "/placeholder.png"}
                    href={`/produto/${product.slug}`} // Rota pública
                    footer={
                      <div className="flex w-full items-center justify-between">
                        <span className="text-lg font-black text-primary">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                          Comprar →
                        </span>
                      </div>
                    }
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
