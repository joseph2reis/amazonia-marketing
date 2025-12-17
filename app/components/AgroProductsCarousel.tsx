"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { JSX } from "react";
import AgroCard from "./AgroCard";
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

export default function AgroProductsCarousel(): JSX.Element {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-text">Produtos em destaque</h2>

          {/* Custom navigation */}
          <div className="flex items-center gap-3">
            <button className="agro-prev text-white rounded-full border border-white p-2 hover:border-primary hover:text-primary transition">
              ←
            </button>
            <button className="agro-next text-white rounded-full border border-white p-2 hover:border-primary hover:text-primary transition">
              →
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper {...swiperConfig} className="pb-14">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <AgroCard
                title={product.name}
                description={product.description}
                image={product.image}
                href={product.href}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
