// app/dashboard/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  // Proteção de rota a nível de layout
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Passamos a sessão para a Sidebar se ela precisar mostrar nome/email */}
      <Sidebar user={session.user} />

      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
