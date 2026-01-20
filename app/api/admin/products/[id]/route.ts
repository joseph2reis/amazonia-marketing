// app/api/admin/products/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/Lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { 
      images: true, 
      user: { include: { company: true } } 
    }
  });

  if (!product) return NextResponse.json({ message: "Não encontrado" }, { status: 404 });
  return NextResponse.json(product);
}