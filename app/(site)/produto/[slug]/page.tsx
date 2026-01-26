import { ProductService } from "@/app/services/ProductService";
import ProductDetails from "@/app/components/ecommerce/ProductDetails";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await ProductService.findBySlug(slug);

  if (!product || !product.company) {
    notFound();
  }

  const formattedProduct = {
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    images: product.images.map((img: any) => img.url),
    company: {
      name: product.company.name ?? "Empresa Parceira",
      cel: product.company.cel ?? "",
      phone: product.company.phone ?? "",
    },
  };

  return (
    <main className="min-h-screen bg-surface">
      <ProductDetails product={formattedProduct} />
    </main>
  );
}
