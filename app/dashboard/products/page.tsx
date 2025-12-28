"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import ProductForm from "@/app/components/products/ProductForm";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: { url: string }[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente remover este produto?")) return;

    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
        >
          <HiPlus />
          Novo produto
        </button>
      </div>

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
        {loading ? (
          <p className="p-6 text-sm text-text-muted">Carregando...</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
              <HiPlus className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Nenhum produto cadastrado
              </h2>
              <p className="text-sm text-text-muted">
                Comece criando seu primeiro produto no sistema.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="mt-2 rounded-xl bg-primary px-4 py-2 text-white"
            >
              Criar primeiro produto
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-surface text-text-muted">
              <tr>
                <th className="px-4 py-3 text-left">Produto</th>
                <th className="px-4 py-3 text-left">Categoria</th>
                <th className="px-4 py-3 text-left">Preço</th>
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
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="rounded-lg border p-2"
                      >
                        <HiPencil />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg border p-2 text-red-600"
                      >
                        <HiTrash />
                      </button>
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
