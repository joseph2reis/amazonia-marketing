"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

// Importar estilos do Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Dados fictícios das empresas (Depoimentos)
const testimonials = [
    {
        id: 1,
        company: "Cooperativa Verde Vale",
        location: "Tomé-Açu, PA",
        avatar: "/depoimentos/empresa1.png",
        text: "A Amazônia Marketing nos ajudou a eliminar os atravessadores. Hoje vendemos nossa pimenta-do-reino diretamente para indústrias do sul com preço justo.",
    },
    {
        id: 2,
        company: "BioSementes do Xingu",
        location: "Altamira, PA",
        avatar: "/depoimentos/empresa2.png",
        text: "Pela primeira vez conseguimos certificação e visibilidade nacional. A plataforma é intuitiva e valoriza quem preserva a floresta em pé.",
    },
    {
        id: 3,
        company: "Fazenda Santa Clara",
        location: "Paragominas, PA",
        avatar: "/depoimentos/empresa3.png",
        text: "O monitoramento da safra via satélite integrado ao site mudou nossa gestão. Tecnologia de ponta chegando no interior do estado.",
    },
    {
        id: 4,
        company: "Assoc. Ribeirinha do Acará",
        location: "Acará, PA",
        avatar: "/depoimentos/empresa4.png",
        text: "Excelente vitrine para nossos bioinsumos. O suporte técnico deles entende a realidade do pequeno produtor amazônico.",
    },
    {
        id: 5,
        company: "AgroTech Tapajós",
        location: "Santarém, PA",
        avatar: "/depoimentos/empresa5.png",
        text: "Encontramos parceiros comerciais sérios aqui. A segurança nas negociações e a validação das empresas trazem muita confiança.",
    },
];

export default function HeroCarousel() {
    return (
        <div className="w-full mt-16 px-4">
            {/* Texto Introdutório */}
            <div className="mb-8 text-center md:text-left">
                <h3 className="text-3xl font-bold text-text text-center">
                    Quem confia no Amazônia <span className="text-primary">Marketing</span>
                </h3>
                <p className="mt-4 text-text-muted text-center mx-auto max-w-3xl">
                    Veja abaixo os depoimentos de cooperativas e empresas que já estão transformando
                    seus negócios e gerando impacto através da nossa plataforma.
                </p>
            </div>

            {/* Carrossel */}
            <div className="mx-auto max-w-5xl">
                <Swiper
                    spaceBetween={25}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1, // Celular muito pequeno
                        },
                        640: {
                            slidesPerView: 1, // Celular
                        },
                        768: {
                            slidesPerView: 2, // Tablet
                        },
                        1024: {
                            slidesPerView: 2.5, // Laptop pequeno
                        },
                        1280: {
                            slidesPerView: 3, // Desktop
                        },
                        1536: {
                            slidesPerView: 3.5, // Ultra wide
                        },
                    }}
                    className="w-full pb-16"
                >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto">
                        <div className="flex flex-col h-full p-8 border rounded-2xl border-border bg-surface-strong shadow-sm hover:shadow-md transition-shadow duration-300 min-h-70">

                            {/* Cabeçalho do Card: Foto e Nome */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-primary">
                                    <Image
                                        src={item.avatar}
                                        alt={item.company}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-text">{item.company}</h4>
                                    <p className="text-xs text-text-muted">{item.location}</p>
                                </div>
                            </div>

                            {/* Ícone de Aspas */}
                            <div className="mb-2">
                                <FaQuoteLeft className="text-primary/30 text-xl" />
                            </div>

                            {/* Texto do Depoimento */}
                            <p className="italic leading-relaxed text-text-muted grow">
                                "{item.text}"
                            </p>

                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>

            {/* customizar a paginação do Swiper */}
            <style jsx global>{`
        /* Paginação - Bolinhas */
        .swiper-pagination {
          position: relative !important;
          bottom: auto !important;
          margin-top: 24px;
          padding-bottom: 0 !important;
        }
        
        .swiper-pagination-bullet {
          background-color: #6b7280; /* Cor inativa (gray-500) */
          opacity: 0.5;
          margin: 0 4px;
        }
        .swiper-pagination-bullet-active {
          background-color: #10b981 !important; 
          opacity: 1;
          width: 20px;
          border-radius: 4px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #10b981; 
        }
      `}</style>
        </div>
    );
}