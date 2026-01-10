import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CompanyService } from "@/app/services/UserService";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ hasCompany: false }, { status: 401 });
    }

    const company = await CompanyService.findByUserId(session.user.id);

    if (!company) {
      return NextResponse.json({ hasCompany: false });
    }

    return NextResponse.json({
      hasCompany: true,
      approved: company.approved,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}