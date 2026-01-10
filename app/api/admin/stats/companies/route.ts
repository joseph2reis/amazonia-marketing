import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/Lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }

    const [pendingCount, approvedCount] = await Promise.all([
      prisma.company.count({ where: { approved: false } }),
      prisma.company.count({ where: { approved: true } }),
    ]);

    return NextResponse.json({
      pending: pendingCount,
      approved: approvedCount,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}