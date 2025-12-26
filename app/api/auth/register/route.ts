
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/Lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Dados inválidos" },
                { status: 400 }
            );
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return NextResponse.json(
                { message: "Este e-mail já está cadastrado." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "Conta criada com sucesso" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Erro interno do servidor", error },
            { status: 500 }
        );
    }
}
