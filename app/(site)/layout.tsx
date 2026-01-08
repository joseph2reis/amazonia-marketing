import AgroNavbar from "../components/NavBar";
import AgroFooter from "../components/Footer";

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
