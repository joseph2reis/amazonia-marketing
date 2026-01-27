import { withAuth } from "@/app/Lib/with-auth";
import { ProductService } from "@/app/services/ProductService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/Lib/prisma";


export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        userId: session.user.id, 
      },
      include: {
        images: true,
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export const POST = withAuth(async (req, ctx, user) => {
  try {
    console.log("User from withAuth:", user);
    const body = await req.json();
    const product = await ProductService.create(body, user.id);
    console.log(user.id)
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar produto" },
      { status: 400 }
    );
  }
});