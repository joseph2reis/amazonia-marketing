"use client";

import AgroBenefitCard from "./AgroBenefitCard";
import { benefits } from "../database/benefits";
import { motion } from "framer-motion";

export default function AgroBenefits() {
  return (
    <section className="py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header com animação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-text"
          >
            Por que escolher a gente?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 text-text-muted"
          >
            Tecnologia, confiança e eficiência para potencializar sua produção.
          </motion.p>
        </motion.div>

        {/* Cards com stagger animation */}
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
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <AgroBenefitCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}