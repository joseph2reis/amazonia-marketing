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
      className="rounded-2xl border border-border bg-surface-strong p-4 sm:p-6 space-y-4 shadow-md"
    >
      <h2 className="text-xl font-bold text-text">
        {productId ? "Editar produto" : "Cadastrar Novo Produto"}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="text-sm font-bold text-text">Nome do Produto</label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ex: Seu Produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-text">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex-seu-produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-bold text-text">
            Descrição Detalhada
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Descreva as características técnicas e benefícios do produto..."
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-text">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* CAMPO DE ESTOQUE ADICIONADO */}
        <div>
          <label className="text-sm font-bold text-text">
            Quantidade em Estoque
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Ex: 50"
            required
            min="0"
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-bold text-text">Categoria</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Separado, Por, Virgulas"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* SEÇÃO DE IMAGENS */}
      <div className="space-y-3 pt-2">
        <label className="text-sm font-bold text-text flex items-center gap-2">
          <HiPaperClip className="text-primary" />
          Imagens do Produto
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            if (!files.length) return;

            setUploadError(null);
            const MAX_SIZE = 1 * 1024 * 1024; // 1MB

            const oversized = files.filter((f) => f.size > MAX_SIZE);
            if (oversized.length) {
              setUploadError(
                `Arquivos excedem 1MB: ${oversized.map((f) => f.name).join(", ")}`,
              );
              e.target.value = "";
              return;
            }

            setUploading(true);
            setUploadProgress(0);
            const uploaded: string[] = [];

            for (let i = 0; i < files.length; i++) {
              const formData = new FormData();
              formData.append("file", files[i]);
              try {
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (res.ok) uploaded.push(data.url);
              } catch (err) {
                console.error("Erro upload", err);
              }
              setUploadProgress(Math.round(((i + 1) / files.length) * 100));
            }

            setImages((prev) => {
              const merged = [...prev, ...uploaded];
              setMainImage((old) => old ?? merged[0]);
              return merged;
            });
            setUploading(false);
          }}
          className="w-full text-sm text-text-muted border border-border rounded-lg cursor-pointer bg-surface
          file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
          file:text-sm file:font-semibold file:bg-primary file:text-white
          hover:file:opacity-90 disabled:opacity-50"
        />

        {uploadError && (
          <div className="text-xs text-red-500 font-medium">
            ⚠ {uploadError}
          </div>
        )}

        {uploading && (
          <div className="space-y-1">
            <div className="h-2 w-full rounded-full bg-surface border border-border overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
              Enviando: {uploadProgress}%
            </p>
          </div>
        )}

        {images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-4 pt-2">
            {images.map((url) => (
              <div
                key={url}
                onClick={() => setMainImage(url)}
                className={`relative w-24 h-24 shrink-0 rounded-xl border-2 transition-all p-1 bg-white cursor-pointer ${
                  mainImage === url
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-text-muted"
                }`}
              >
                <img
                  src={url}
                  alt="Produto"
                  className="h-full w-full object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImages((prev) => prev.filter((img) => img !== url));
                    if (mainImage === url) setMainImage(null);
                  }}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-600 shadow-md"
                >
                  ✕
                </button>
                {mainImage === url && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                    CAPA
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-border px-4 py-3 text-text font-bold hover:bg-surface transition-colors"
        >
          Descartar
        </button>

        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving
            ? "Salvando Alterações..."
            : productId
              ? "Atualizar Produto"
              : "Publicar Produto"}
        </button>
      </div>
    </form>
  );
}
