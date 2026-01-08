"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";
import AgroCard from "./Card";
import { products } from "../database/products";

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

export default function AgroProductsCarousel() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header com animação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 flex items-center justify-between"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold text-text"
          >
            Produtos em destaque
          </motion.h2>

          {/* Botões de navegação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <button className="agro-prev text-white rounded-full border border-white p-2 hover:border-primary hover:text-primary transition">
              ←
            </button>
            <button className="agro-next text-white rounded-full border border-white p-2 hover:border-primary hover:text-primary transition">
              →
            </button>
          </motion.div>
        </motion.div>

        {/* Carousel com stagger nos cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15, // intervalo entre cada card
                delayChildren: 0.3,
              },
            },
          }}
        >
          <Swiper {...swiperConfig} className="pb-14">
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                >
                  <AgroCard
                    title={product.name}
                    description={product.description}
                    image={product.images[0]}
                    href={`/produto/${product.slug}`}
                    footer={
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {product.price}
                        </span>
                        <span className="text-xs font-medium text-text-muted">
                          Ver produto →
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
