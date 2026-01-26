"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import {
  AiOutlineLoading3Quarters,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import ProductForm from "@/app/components/forms/ProductForm";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  images: { url: string }[];
  user?: {
    email: string;
    company?: {
      name: string;
    };
  };
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");
  const [companyApproved, setCompanyApproved] = useState(false);

  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    if (!isAdmin && session) {
      checkCompanyStatus();
    }
  }, [session, isAdmin]);

  async function checkCompanyStatus() {
    try {
      const res = await fetch("/api/company/check");
      const data = await res.json();
      setCompanyApproved(data.approved ?? false);
    } catch (error) {
      console.error("Erro ao verificar empresa:", error);
      setCompanyApproved(false);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (isAdmin && filter !== "ALL") params.append("status", filter);

    const endpoint = isAdmin
      ? `/api/admin/products?${params}`
      : "/api/products";
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status !== "loading") {
      fetchProducts();
    }
  }, [filter, status]);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente remover este produto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  const updateProductStatus = async (
    id: number,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      const res = await fetch(`/api/admin/products/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setProducts(products.map((p) => (p.id === id ? { ...p, status } : p)));
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600 bg-green-50";
      case "REJECTED":
        return "text-red-600 bg-red-50";
      default:
        return "text-yellow-600 bg-yellow-50";
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {isAdmin ? "Gerenciar Marketplace" : "Meus Produtos"}
        </h1>
        {!isAdmin && companyApproved && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary hover:opacity-90 px-4 py-2 text-white font-bold transition-all shadow-md"
          >
            <HiPlus className="text-lg" />
            Novo produto
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="flex gap-2 p-1 bg-surface-strong rounded-xl w-fit border border-border">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === s
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {s === "ALL"
                ? "Todos"
                : s === "PENDING"
                  ? "Pendentes"
                  : s === "APPROVED"
                    ? "Aprovados"
                    : "Rejeitados"}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <div className="mb-8">
          <ProductForm
            productId={editingProduct?.id}
            initialData={
              editingProduct
                ? {
                    ...editingProduct,
                    stock: editingProduct.stock || 0, // Garante que o stock passe como número
                  }
                : undefined
            }
            onSuccess={() => {
              setShowForm(false);
              setEditingProduct(null);
              fetchProducts();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-strong">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <HiPlus className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-bold text-text">
              Nenhum produto encontrado
            </h2>
            {!isAdmin && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="rounded-xl bg-primary px-6 py-2 text-white font-bold"
              >
                Criar primeiro produto
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface text-text-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-4 py-4 text-left font-bold uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-4 py-4 text-left font-bold uppercase tracking-wider">
                    Preço
                  </th>
                  {isAdmin && (
                    <th className="px-4 py-4 text-left font-bold uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  <th className="px-6 py-4 text-right font-bold uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-surface-strong">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border bg-white">
                          <Image
                            src={product.images[0]?.url || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-text">{product.name}</p>
                          <p className="text-xs text-text-muted">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`font-medium ${product.stock <= 5 ? "text-red-500 font-bold" : "text-text"}`}
                      >
                        {product.stock} un.
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-text">
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusColor(product.status)}`}
                        >
                          {product.status === "PENDING"
                            ? "Pendente"
                            : product.status === "APPROVED"
                              ? "Aprovado"
                              : "Rejeitado"}
                        </span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {isAdmin ? (
                          <>
                            {product.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateProductStatus(product.id, "APPROVED")
                                  }
                                  className="p-2 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white transition-all"
                                >
                                  <AiOutlineCheck />
                                </button>
                                <button
                                  onClick={() =>
                                    updateProductStatus(product.id, "REJECTED")
                                  }
                                  className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                                >
                                  <AiOutlineClose />
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setShowForm(true);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            >
                              <HiPencil />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <HiTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
