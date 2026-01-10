"use client";
import { HiPaperClip } from "react-icons/hi";
import { useEffect, useState } from "react";

interface ProductFormProps {
  productId?: number;
  initialData?: {
    name: string;
    slug: string;
    price: number;
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
      setCategory(initialData.category);

      const urls = initialData.images?.map((img) => img.url) ?? [];
      setImages(urls);
      setMainImage(urls[0] ?? null);
    }
  }, [initialData]);

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
      category,
      images: orderedImages,
    };

    const res = await fetch(
      productId ? `/api/products/${productId}` : "/api/products",
      {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
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
      className="rounded-2xl border border-border bg-surface p-4 sm:p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {productId ? "Editar produto" : "Novo produto"}
      </h2>

      {/* Campos */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm">Nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm">Preço</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm">Categoria</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      {/* IMAGENS */}
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center gap-2">
          <HiPaperClip className="text-gray-500" />
          Imagens do produto
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
            const MAX_SIZE = 1 * 1024 * 1024;

            const oversized = files.filter((f) => f.size > MAX_SIZE);
            if (oversized.length) {
              setUploadError(
                `Arquivo(s) muito grande(s): ${oversized
                  .map((f) => f.name)
                  .join(", ")}. Limite de 1MB.`
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

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });
              const data = await res.json();

              if (res.ok) uploaded.push(data.url);
              setUploadProgress(Math.round(((i + 1) / files.length) * 100));
            }

            setImages((prev) => {
              const merged = [...prev, ...uploaded];
              setMainImage((old) => old ?? merged[0]);
              return merged;
            });

            setUploading(false);
          }}
          className="w-full text-sm border rounded-lg cursor-pointer
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-gray-100 file:text-gray-700
          hover:file:bg-gray-200
          disabled:opacity-50"
        />

        {uploadError && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border">
            ⚠ {uploadError}
          </div>
        )}

        {uploading && (
          <div className="space-y-2">
            <div className="relative h-5 w-full rounded-full border overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white mix-blend-difference">
                  {uploadProgress}%
                </span>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              Fazendo upload das imagens...
            </p>
          </div>
        )}

        {images.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((url) => (
              <div
                key={url}
                onClick={() => setMainImage(url)}
                className={`relative w-28 sm:w-32 shrink-0 rounded-lg border p-3 cursor-pointer ${
                  mainImage === url ? "ring-2 ring-primary" : ""
                }`}
              >
                <img
                  src={url}
                  alt="Produto"
                  className="h-24 w-full object-contain rounded"
                />

                {mainImage === url && (
                  <p className="mt-1 text-xs text-center">imagem principal</p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setImages((prev) => {
                      const filtered = prev.filter((img) => img !== url);
                      setMainImage(filtered[0] ?? null);
                      return filtered;
                    });
                  }}
                  className="absolute top-1 right-1 rounded bg-white/80 px-2 text-xs text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto rounded-xl border px-4 py-2 text-text-muted hover:bg-surface-strong"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full sm:w-auto rounded-xl bg-primary px-4 py-2 text-white"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
