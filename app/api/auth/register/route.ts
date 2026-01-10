
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserService } from "@/app/services/UserService";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, role } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Dados inválidos" },
                { status: 400 }
            );
        }

        const userExists = await UserService.findByEmail(email);

        if (userExists) {
            return NextResponse.json(
                { message: "Este e-mail já está cadastrado." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserService.create(
            {
                email,
                password: hashedPassword,
                role: "USER"
            }
        );

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
