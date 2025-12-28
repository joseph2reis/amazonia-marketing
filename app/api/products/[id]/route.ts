import { ProductService } from "@/app/services/product.service";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);
    const body = await req.json();

    if (isNaN(productId)) {
      console.log("ID inválido recebido:", id);
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    const product = await ProductService.update(productId, body);

    return NextResponse.json(product);
  } catch (error) {
    console.error("ERRO AO EDITAR PRODUTO:", error);
    return NextResponse.json(
      { error: "Erro ao editar produto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      console.log("ID inválido recebido no DELETE:", id);
      return NextResponse.json(
        { error: "ID inválido" },
        { status: 400 }
      );
    }

    await ProductService.delete(productId);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERRO AO DELETAR PRODUTO:", error);
    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}

