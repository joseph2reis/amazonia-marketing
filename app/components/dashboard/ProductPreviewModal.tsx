// components/dashboard/ProductPreviewModal.tsx
"use client";
import ProductDetails from "@/app/components/ecommerce/ProductDetails";
import { HiX } from "react-icons/hi";

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    name: string;
    description: string;
    price: string | number;
    stock: string | number;
    category: string;
    images: string[];
    companyName?: string;
  };
}

export default function ProductPreviewModal({ isOpen, onClose, data }: PreviewProps) {
  if (!isOpen) return null;

  // Formata os dados para o formato que o ProductDetails exige
  const formattedProduct = {
    name: data.name || "Nome do Produto",
    description: data.description || "Descrição do produto...",
    price: Number(data.price) || 0,
    stock: Number(data.stock) || 0,
    category: data.category || "Categoria",
    images: data.images.length > 0 ? data.images : ["/placeholder.png"],
    company: {
      name: data.companyName || "Sua Empresa",
      cel: "",
      phone: "",
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-surface rounded-3xl shadow-2xl">
        {/* Header da Modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-surface/80 backdrop-blur-md border-b border-border">
          <h3 className="font-bold text-text uppercase tracking-widest text-sm">
            Visualização Prévia do Produto
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-500/10 text-text-muted hover:text-red-500 rounded-full transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Conteúdo: Reutilizando seu componente de detalhes */}
        <div className="p-4 sm:p-8">
          <ProductDetails product={formattedProduct} />
        </div>
      </div>
    </div>
  );
}