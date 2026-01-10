import AboutSection from "../components/marketing/About";
import AgroBenefits from "../components/marketing/AgroBenefits";
import AgroHeroWithStats from "../components/marketing/HeroWithStats";
import AgroProductsCarousel from "../components/ecommerce/ProductsCarousel";

export default function Home() {
  return (
    <>
      <AgroHeroWithStats />
      <AgroBenefits />
      {/* <AgroCategories /> */}
      <AgroProductsCarousel />
      <AboutSection />
    </>
  );
}
