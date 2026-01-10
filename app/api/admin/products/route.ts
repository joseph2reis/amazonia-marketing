import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/Lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where = status && status !== "ALL" && ["PENDING", "APPROVED", "REJECTED"].includes(status) 
      ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } 
      : {};

    const products = await prisma.product.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}