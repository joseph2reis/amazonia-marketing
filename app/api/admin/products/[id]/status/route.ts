import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/Lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }

    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
        user: {
          include: {
            company: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar produto" }, { status: 500 });
  }
}


// ADICIONA O PATCH (Para aprovar ou rejeitar)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Segurança: Só admin aprova
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await req.json(); // Espera "APPROVED" ou "REJECTED"

    // 2. Validação simples do status enviado
    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      return NextResponse.json({ message: "Status inválido" }, { status: 400 });
    }

    // 3. Atualização no Banco de Dados
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { status: status },
    });

    return NextResponse.json({
      message: `Produto ${status === 'APPROVED' ? 'aprovado' : 'rejeitado'} com sucesso!`,
      product: updatedProduct
    });

  } catch (error) {
    console.error("ERRO_PATCH_STATUS:", error);
    return NextResponse.json({ message: "Erro ao atualizar status do produto" }, { status: 500 });
  }
}