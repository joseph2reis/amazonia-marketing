import { products } from "@/app/database/products";
import AgroProductDetails from "@/app/components/AgroProductDetails";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params; 

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="py-24 text-center text-text">Produto não encontrado</div>
    );
  }

  return <AgroProductDetails product={product} />;
}
