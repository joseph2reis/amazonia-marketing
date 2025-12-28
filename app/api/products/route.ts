import { ProductService } from "@/app/services/product.service";
import { NextResponse } from "next/server";


export async function GET() {
  const products = await ProductService.findAll();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await ProductService.create(body);
  return NextResponse.json(product, { status: 201 });
}
