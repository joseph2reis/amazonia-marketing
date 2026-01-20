"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  AiOutlineCheck, 
  AiOutlineClose, 
  AiOutlineArrowLeft, 
  AiOutlineLoading3Quarters,
  AiOutlineShop
} from "react-icons/ai";

export default function ProductViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  async function fetchProduct() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/products/${id}`);
      if (!res.ok) throw new Error("Produto não encontrado");
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: "APPROVED" | "REJECTED") {
    try {
      setUpdating(status);
      const res = await fetch(`/api/admin/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    } finally {
      setUpdating(null);
    }
  }

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-primary" />
        <span className="text-text-muted font-medium">Carregando detalhes...</span>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <AiOutlineArrowLeft /> Voltar
        </button>
        
        <div className={`px-4 py-1 rounded-full border border-border text-xs font-bold uppercase ${
          product.status === 'PENDING' ? 'bg-secondary-soft text-secondary border-secondary/20' : 
          product.status === 'APPROVED' ? 'bg-primary-soft text-primary border-primary/20' : 
          'bg-red-500/10 text-red-500 border-red-500/20'
        }`}>
          {product.status === 'PENDING' ? 'Aguardando aprovação' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Galeria */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-border bg-surface-strong shadow-sm">
            {product.images?.length > 0 ? (
              <Image 
                src={product.images[activeImg].url} 
                alt={product.name} 
                fill 
                className="object-contain p-4"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted">Sem imagens</div>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {product.images?.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-primary shadow-md' : 'border-border opacity-60'}`}
              >
                <Image src={img.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-surface-strong p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-text leading-tight">{product.name}</h1>
              <p className="text-text-muted text-sm">{product.slug}</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border">
              <div>
                <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Preço do Produto</span>
                <p className="text-3xl font-black text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-muted uppercase font-bold tracking-wider">Categoria</span>
                <p className="text-text font-medium">{product.category}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-text uppercase flex items-center gap-2">
                <AiOutlineShop className="text-primary" /> Vendido por
              </h3>
              <p className="text-text-muted">{product.user?.company?.name || "Empresa não identificada"}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-text uppercase">Descrição</h3>
              <div className="p-4 rounded-xl bg-surface border border-border text-text-muted text-sm leading-relaxed max-h-40 overflow-y-auto">
                {product.description || "O vendedor não incluiu uma descrição para este item."}
              </div>
            </div>

            {/* Ações de Admin */}
            {product.status === "PENDING" && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  disabled={!!updating}
                  onClick={() => updateStatus("APPROVED")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary hover:opacity-90 py-4 text-white font-bold transition-all disabled:opacity-50"
                >
                  {updating === "APPROVED" ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlineCheck />}
                  Aprovar
                </button>
                
                <button
                  disabled={!!updating}
                  onClick={() => updateStatus("REJECTED")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-surface border border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 py-4 text-text font-bold transition-all disabled:opacity-50"
                >
                  {updating === "REJECTED" ? <AiOutlineLoading3Quarters className="animate-spin" /> : <AiOutlineClose />}
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}