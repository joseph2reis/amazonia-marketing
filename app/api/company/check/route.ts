import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CompanyService } from "@/app/services/CompanyService"; 

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Se não houver sessão, não retornamos erro 401 para evitar quebras no front,
    // apenas informamos que não há empresa vinculada.
    if (!session?.user?.id) {
      return NextResponse.json({ hasCompany: false });
    }

    const company = await CompanyService.findByUserId(session.user.id);

    if (!company) {
      return NextResponse.json({ hasCompany: false });
    }

    // Retornamos um objeto mais completo para o front-end
    // Isso ajuda a evitar chamadas extras se você precisar do nome da empresa ou ID
    return NextResponse.json({
      hasCompany: true,
      approved: company.approved,
      companyId: company.id,
      companyName: company.name,
      // Se a empresa foi rejeitada, você pode adicionar uma lógica aqui futuramente
    });
  } catch (error) {
    console.error("CHECK_COMPANY_ERROR:", error);
    return NextResponse.json(
      { message: "Erro ao verificar status da empresa", hasCompany: false },
      { status: 500 }
    );
  }
}