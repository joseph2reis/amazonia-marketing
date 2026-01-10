import { withAuth } from "@/app/Lib/with-auth";
import { ProductService } from "@/app/services/ProductService";
import { NextResponse } from "next/server";


export const GET = withAuth(async (req) => {
  const products = await ProductService.findAll();
  return NextResponse.json(products);
});

export const POST = withAuth(async (req, _, user) => {
  const body = await req.json();
  const product = await ProductService.create(body, user.id);
  console.log(user.id)
  return NextResponse.json(product, { status: 201 });
});