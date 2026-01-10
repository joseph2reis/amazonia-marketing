import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/layout/Sidebar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CompanyService } from "../services/UserService";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Proteção de rota a nível de layout
  if (!session) {
    redirect("/auth/login");
  }

  if (!session.user.id) {
    redirect("/auth/login");
  }

  // Se for admin, permite acesso mesmo sem empresa
  if (session.user.role === "ADMIN") {
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

  // Para usuários normais, verificar empresa
  const company = await CompanyService.findByUserId(session.user.id);
  if (!company) {
    redirect("/complete-company");
  }
  if (!company.approved) {
    // Talvez redirecionar para uma página de "aguardando aprovação"
    redirect("/pending-approval");
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
