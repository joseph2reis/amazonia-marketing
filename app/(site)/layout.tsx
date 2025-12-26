import AgroNavbar from "../components/AgroNavBar";
import AgroFooter from "../components/AgroFooter";

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
