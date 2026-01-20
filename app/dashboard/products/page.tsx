"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import {
  AiOutlineLoading3Quarters,
  AiOutlineEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import ProductForm from "@/app/components/forms/ProductForm";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
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
  const { data: session } = useSession();
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
    if (products.length === 0) setLoading(true);
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
    }
    setLoading(false);
  }

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session, filter]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isAdmin ? "Gerenciar Produtos" : "Meus Produtos"}
        </h1>
        {!isAdmin && companyApproved && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-medium transition-colors"
          >
            <HiPlus className="text-lg" />
            Novo produto
          </button>
        )}
      </div>

      {isAdmin && (
        <div className="mb-6">
          <div className="flex gap-2">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-primary text-white"
                    : "bg-surface text-text hover:bg-surface-strong"
                }`}
              >
                {status === "ALL"
                  ? "Todos"
                  : status === "PENDING"
                    ? "Pendentes"
                    : status === "APPROVED"
                      ? "Aprovados"
                      : "Rejeitados"}
              </button>
            ))}
          </div>
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

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-strong">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <HiPlus className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                {isAdmin
                  ? "Nenhum produto encontrado"
                  : "Nenhum produto cadastrado"}
              </h2>
              <p className="text-sm text-text-muted">
                {isAdmin
                  ? "Não há produtos com este filtro"
                  : "Comece criando seu primeiro produto no sistema."}
              </p>
            </div>

            {!isAdmin && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="mt-2 rounded-xl bg-primary px-4 py-2 text-white"
              >
                Criar primeiro produto
              </button>
            )}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface text-text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-left">Preço</th>
                {isAdmin && <th className="px-4 py-3 text-left">Status</th>}
                {isAdmin && <th className="px-4 py-3 text-left">Empresa</th>}
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border">
                        <Image
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-text-muted">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">R$ {product.price.toFixed(2)}</td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                      >
                        {product.status === "PENDING"
                          ? "Pendente"
                          : product.status === "APPROVED"
                            ? "Aprovado"
                            : "Rejeitado"}
                      </span>
                    </td>
                  )}
                  {isAdmin && (
                    <td className="px-4 py-3 text-xs text-text-muted">
                      {product.user?.company?.name || "N/A"}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {isAdmin ? (
                        <>
                          {product.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  updateProductStatus(product.id, "APPROVED")
                                }
                                className="rounded-lg border p-2 text-green-600 hover:bg-green-50"
                                title="Aprovar"
                              >
                                <AiOutlineCheck />
                              </button>
                              <button
                                onClick={() =>
                                  updateProductStatus(product.id, "REJECTED")
                                }
                                className="rounded-lg border p-2 text-red-600 hover:bg-red-50"
                                title="Rejeitar"
                              >
                                <AiOutlineClose />
                              </button>
                            </>
                          )}
                          <Link
                            href={`/dashboard/products/${product.id}`}
                            className="rounded-lg border p-2 text-blue-600 hover:bg-blue-50"
                            title="Ver detalhes"
                          >
                            <AiOutlineEye />
                          </Link>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setShowForm(true);
                            }}
                            className="rounded-lg border p-2"
                            title="Editar"
                          >
                            <HiPencil />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg border p-2 text-red-600"
                            title="Excluir"
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
        )}
      </div>
    </div>
  );
}
