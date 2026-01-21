"use client";

import { usePathname } from "next/navigation"; // 1. Importamos o hook de navegação
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

export default function BackToTop() {
  const pathname = usePathname(); // 2. Pegamos o endereço atual
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 3. BLOQUEIO DE SEGURANÇA:
  // Se estiver em qualquer página que comece com "/auth" (Login ou Registro),
  // o componente retorna "null" (não renderiza nada).
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className=" cursor-pointer fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
          aria-label="Voltar ao topo"
        >
          <HiArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}