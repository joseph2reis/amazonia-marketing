import AgroNavbar from "../components/layout/NavBar";
import AgroFooter from "../components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AgroNavbar />
      {children}
      <AgroFooter />
    </>
  );
}
