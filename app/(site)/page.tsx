import AgroCategories from "../components/AgroCategories";
import AgroHeroWithStats from "../components/AgroHeroWithStats";
import AgroProductsCarousel from "../components/AgroProductsCarousel";

export default function Home() {
  return (
    <>
      <AgroHeroWithStats />
      {/* <AgroCategories /> */}
      <AgroProductsCarousel />
    </>
  );
}
