import { withAuth } from "@/app/Lib/with-auth";
import { ProductService } from "@/app/services/product.service";
import { NextResponse } from "next/server";


export const GET = withAuth(async () => {
  const products = await ProductService.findAll();
  return NextResponse.json(products);
});

export const POST = withAuth(async (req) => {
  const body = await req.json();
  const product = await ProductService.create(body);
  return NextResponse.json(product, { status: 201 });
});
