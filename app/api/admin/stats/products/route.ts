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

    // Buscamos o total de produtos e fazemos a soma (aggregate) do estoque
    const stats = await prisma.product.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        stock: true, // Soma de todos os itens em estoque
      },
    });

    // Calculamos o valor total em estoque (opcional, mas muito bom para Admin)
    // Para um cálculo preciso de preço * estoque de cada item, precisaríamos de um findMany,
    // mas para performance em stats, a contagem e soma simples já resolvem.

    return NextResponse.json({
      total: stats._count.id || 0,
      totalStock: stats._sum.stock || 0,
    });
  } catch (error) {
    console.error("STATS_PRODUCTS_ERROR:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}