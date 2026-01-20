import { withAuth } from "@/app/Lib/with-auth";
import { ProductService } from "@/app/services/ProductService";
import { NextResponse } from "next/server";


export const GET = withAuth(async (req, ctx, user) => {
  try {
    const products = await ProductService.findAll();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao buscar produtos" },
      { status: 400 }
    );
  }
});

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