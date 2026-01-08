import AboutSection from "../components/About";
import AgroBenefits from "../components/AgroBenefits";
import AgroHeroWithStats from "../components/HeroWithStats";
import AgroProductsCarousel from "../components/ProductsCarousel";

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
