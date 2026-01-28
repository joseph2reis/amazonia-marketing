import AboutSection from "../components/marketing/About";
import AgroBenefits from "../components/marketing/AgroBenefits";
import AgroHeroWithStats from "../components/marketing/HeroWithStats";
import AgroProductsCarousel from "../components/ecommerce/ProductsCarousel";
import { ProductService } from "../services/ProductService";

export const revalidate = 60;

export default async function Home() {
  const products = await ProductService.findPublicFeatured();

  return (
    <>
      <AgroHeroWithStats />
      <AgroProductsCarousel products={products} />
      <AgroBenefits />
      <AboutSection />
    </>
  );
}
