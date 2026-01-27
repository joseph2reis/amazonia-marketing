"use client";
import { HiPaperClip } from "react-icons/hi";
import { useEffect, useState } from "react";

interface ProductFormProps {
  productId?: number;
  initialData?: {
    name: string;
    slug: string;
    price: number;
    stock: number;
    category: string;
    description: string;
    images?: { url: string }[];
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  productId,
  initialData,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setDescription(initialData.description);
      setPrice(String(initialData.price));
      setStock(String(initialData.stock || 0));
      setCategory(initialData.category);

      const urls = initialData.images?.map((img) => img.url) ?? [];
      setImages(urls);
      setMainImage(urls[0] ?? null);
    }
  }, [initialData]);

  // Função para gerar slug automaticamente
  function handleNameChange(value: string) {
    setName(value);

    if (!productId) {
      const generatedSlug = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      setSlug(generatedSlug);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const orderedImages = mainImage
      ? [mainImage, ...images.filter((img) => img !== mainImage)]
      : images;

    const payload = {
      name,
      slug,
      description,
      price: Number(price),
      stock: Number(stock), // Enviando como número para o Prisma
      category,
      images: orderedImages,
    };

    const res = await fetch(
      productId ? `/api/products/${productId}` : "/api/products",
      {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setSaving(false);

    if (!res.ok) {
      alert("Erro ao salvar produto");
      return;
    }

    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
    rounded-2xl border border-border bg-surface-strong 
    p-3 sm:p-6 
    space-y-4 
    shadow-md 
    w-full
  "
    >
      <h2 className="text-lg sm:text-xl font-bold text-text">
        {productId ? "Editar produto" : "Cadastrar Novo Produto"}
      </h2>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs sm:text-sm font-bold text-text">
            Nome do Produto
          </label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: Seu Produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-bold text-text">
            Slug (URL)
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex-seu-produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm font-bold text-text">
            Descrição Detalhada
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-bold text-text">
            Preço (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs sm:text-sm font-bold text-text">
            Quantidade em Estoque
          </label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs sm:text-sm font-bold text-text">
            Categoria
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Ex: Eletronicos, Ferramentas..."
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Imagens */}
      <div className="space-y-2 pt-1">
        <label className="text-xs sm:text-sm font-bold flex items-center gap-2 text-text">
          <HiPaperClip className="text-primary" /> Imagens do Produto
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full text-sm text-text-muted border border-border rounded-lg cursor-pointer bg-surface
      file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0
      file:text-xs file:font-semibold file:bg-primary file:text-white"
        />

        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-3 pt-1">
            {images.map((url) => (
              <div
                key={url}
                className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg border border-border bg-white p-1"
              >
                <img
                  src={url}
                  className="w-full h-full rounded object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-bold text-text"
        >
          Descartar
        </button>

        <button
          type="submit"
          className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          {productId ? "Atualizar Produto" : "Publicar Produto"}
        </button>
      </div>
    </form>
  );
}
