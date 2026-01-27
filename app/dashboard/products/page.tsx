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

  async function checkCompanyStatus() {
    try {
      const res = await fetch("/api/company/check");
      const data = await res.json();
      setCompanyApproved(data.approved ?? false);
    } catch {
      setCompanyApproved(false);
    }
  }

  useEffect(() => {
    if (!isAdmin && session) checkCompanyStatus();
  }, [session, isAdmin]);

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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status !== "loading") fetchProducts();
  }, [filter, status]);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente remover este produto?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  const updateProductStatus = async (
    id: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    await fetch(`/api/admin/products/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchProducts();
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
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-text">
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

      {/* FILTRO */}
      {isAdmin && (
        <div className="flex flex-wrap gap-2 p-1 bg-surface-strong rounded-xl border border-border w-fit">
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as any)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                filter === s
                  ? "bg-primary text-white"
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
        <ProductForm
          productId={editingProduct?.id}
          initialData={editingProduct ?? undefined}
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
      )}

      {/* LISTAGEM */}
      {products.length === 0 ? (
        <div className="p-10 text-center text-text-muted">
          Nenhum produto encontrado.
        </div>
      ) : (
        <>
          {/* MOBILE CARDS */}
          <div className="grid sm:hidden gap-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-surface-strong p-3 flex gap-3"
              >
                <div className="relative w-20 h-20 border border-border rounded-lg overflow-hidden bg-white shrink-0">
                  <Image
                    src={p.images[0]?.url || "/placeholder.png"}
                    alt={p.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex flex-col justify-between w-full">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-text-muted">{p.category}</p>

                  <div className="flex justify-between text-xs">
                    <span
                      className={`${
                        p.stock <= 5 && "text-red-500 font-bold"
                      }`}
                    >
                      {p.stock} un.
                    </span>
                    <span className="font-bold">
                      R$ {p.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {!isAdmin ? (
                      <>
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setShowForm(true);
                          }}
                          className="p-2 rounded-lg bg-primary/10 text-primary"
                        >
                          <HiPencil />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-600"
                        >
                          <HiTrash />
                        </button>
                      </>
                    ) : (
                      <>
                        {p.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                updateProductStatus(p.id, "APPROVED")
                              }
                              className="p-2 rounded-lg bg-green-500/10 text-green-600"
                            >
                              <AiOutlineCheck />
                            </button>
                            <button
                              onClick={() =>
                                updateProductStatus(p.id, "REJECTED")
                              }
                              className="p-2 rounded-lg bg-red-500/10 text-red-600"
                            >
                              <AiOutlineClose />
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-border">
            <table className="min-w-175 w-full text-sm">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Produto</th>
                  <th className="px-4 py-4 text-left font-bold">Estoque</th>
                  <th className="px-4 py-4 text-left font-bold">Preço</th>
                  {isAdmin && (
                    <th className="px-4 py-4 text-left font-bold">Status</th>
                  )}
                  <th className="px-6 py-4 text-right font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 border border-border rounded-lg bg-white overflow-hidden">
                          <Image
                            src={p.images[0]?.url || "/placeholder.png"}
                            alt={p.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{p.name}</p>
                          <p className="text-xs text-text-muted">{p.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`${p.stock <= 5 ? "text-red-500 font-bold" : ""}`}
                      >
                        {p.stock} un.
                      </span>
                    </td>

                    <td className="px-4 py-4 font-bold">
                      R$ {p.price.toFixed(2)}
                    </td>

                    {isAdmin && (
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(
                            p.status
                          )}`}
                        >
                          {p.status === "PENDING"
                            ? "Pendente"
                            : p.status === "APPROVED"
                            ? "Aprovado"
                            : "Rejeitado"}
                        </span>
                      </td>
                    )}

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {!isAdmin ? (
                          <>
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setShowForm(true);
                              }}
                              className="p-2 rounded-lg bg-primary/10 text-primary"
                            >
                              <HiPencil />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-600"
                            >
                              <HiTrash />
                            </button>
                          </>
                        ) : (
                          <>
                            {p.status === "PENDING" && (
                              <>
                                <button
                                  onClick={() =>
                                    updateProductStatus(p.id, "APPROVED")
                                  }
                                  className="p-2 rounded-lg bg-green-500/10 text-green-600"
                                >
                                  <AiOutlineCheck />
                                </button>
                                <button
                                  onClick={() =>
                                    updateProductStatus(p.id, "REJECTED")
                                  }
                                  className="p-2 rounded-lg bg-red-500/10 text-red-600"
                                >
                                  <AiOutlineClose />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
