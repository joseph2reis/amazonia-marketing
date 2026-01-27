"use client";
import { HiPaperClip, HiX, HiCheckCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import ProductPreviewModal from "../dashboard/ProductPreviewModal";

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
  // Estados do Formulário
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Estados de Imagens
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Estados de Status
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Carregar dados iniciais em caso de edição
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

  // Gerador de Slug
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

  // Lógica de Upload para Cloudinary
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadError(null);
    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Falha no upload");

        uploadedUrls.push(data.url);
      } catch (err: any) {
        setUploadError(`Erro: ${err.message}`);
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    if (!mainImage && uploadedUrls.length > 0) setMainImage(uploadedUrls[0]);
    setUploading(false);
    e.target.value = ""; // Reset do input
  }

  // Remover imagem
  function removeImage(urlToRemove: string) {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
    if (mainImage === urlToRemove) {
      const remaining = images.filter((url) => url !== urlToRemove);
      setMainImage(remaining.length > 0 ? remaining[0] : null);
    }
  }

  // Salvar Produto
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (images.length === 0) {
      alert("Adicione pelo menos uma imagem.");
      return;
    }

    setSaving(true);

    // Organiza para que a imagem principal seja a primeira no array
    const orderedImages = mainImage
      ? [mainImage, ...images.filter((img) => img !== mainImage)]
      : images;

    const payload = {
      name,
      slug,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      images: orderedImages,
    };

    try {
      const res = await fetch(
        productId ? `/api/products/${productId}` : "/api/products",
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error("Erro ao salvar");
      onSuccess();
    } catch (error) {
      alert("Erro ao salvar produto. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface-strong p-3 sm:p-6 space-y-4 shadow-md w-full"
    >
      <h2 className="text-lg sm:text-xl font-bold text-text">
        {productId ? "Editar produto" : "Cadastrar Novo Produto"}
      </h2>

      {/* BOTÃO DE PREVIEW ADICIONADO AQUI */}
      <button
        type="button"
        onClick={() => setIsPreviewOpen(true)}
        className="flex-1 rounded-xl border border-primary/30 px-4 py-3 text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all"
      >
        Visualizar anúncio
      </button>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {/* Nome */}
        <div className="space-y-1">
          <label className="text-xs sm:text-sm font-bold text-text">
            Nome do Produto
          </label>
          <input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Seu produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-xs sm:text-sm font-bold text-text">
            Slug (URL)
          </label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex: seu-produto"
            required
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Descrição */}
        <div className="md:col-span-2 space-y-1">
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

        {/* Preço */}
        <div className="space-y-1">
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

        {/* Estoque */}
        <div className="space-y-1">
          <label className="text-xs sm:text-sm font-bold text-text">
            Estoque
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

        {/* Categoria */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs sm:text-sm font-bold text-text">
            Categoria
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Ex: frutas, cafe, queijo, mel"
            className="w-full rounded-lg border border-border px-3 py-2 bg-surface text-text text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Seção de Upload */}
      <div className="space-y-3 pt-2">
        <label className="text-xs sm:text-sm font-bold flex items-center justify-between text-text">
          <div className="flex items-center gap-2">
            <HiPaperClip className="text-primary" /> Imagens do Produto
          </div>
          {uploading && (
            <span className="text-primary animate-pulse text-[10px] font-black uppercase">
              Subindo fotos...
            </span>
          )}
        </label>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading || saving}
          className="w-full text-sm text-text-muted border border-border rounded-lg cursor-pointer bg-surface
            file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0
            file:text-xs file:font-semibold file:bg-primary file:text-white disabled:opacity-50"
        />

        {uploadError && (
          <p className="text-red-500 text-xs font-medium">{uploadError}</p>
        )}

        {/* Grid de Previews */}
        {images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar">
            {images.map((url) => (
              <div
                key={url}
                className={`relative group w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl border-2 transition-all shadow-sm
                  ${mainImage === url ? "border-primary bg-primary/5 shadow-primary/20" : "border-border bg-white"}`}
              >
                <img
                  src={url}
                  className="w-full h-full rounded-lg object-cover"
                  alt="Produto"
                />

                {/* Botão Deletar */}
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:scale-110 transition-transform shadow-lg"
                >
                  <HiX size={14} />
                </button>

                {/* Botão Definir Principal */}
                <button
                  type="button"
                  onClick={() => setMainImage(url)}
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase transition-all
                    ${
                      mainImage === url
                        ? "bg-primary text-white scale-100"
                        : "bg-surface border border-border text-text-muted opacity-0 group-hover:opacity-100"
                    }`}
                >
                  {mainImage === url ? "Principal" : "Usar esta"}
                </button>

                {mainImage === url && (
                  <HiCheckCircle
                    className="absolute top-1 left-1 text-primary bg-white rounded-full"
                    size={18}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-6 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving || uploading}
          className="flex-1 rounded-xl border border-border px-4 py-3 text-xs font-black uppercase tracking-widest text-text hover:bg-surface transition-colors disabled:opacity-50"
        >
          Descartar
        </button>

        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : productId ? (
            "Atualizar Produto"
          ) : (
            "Publicar Produto"
          )}
        </button>
      </div>

      {/* Modal de Preview */}
      <ProductPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        data={{
          name,
          description,
          price,
          stock,
          category,
          images,
          companyName: "Minha Empresa", // Você pode pegar do context de auth se quiser
        }}
      />
    </form>
  );
}
