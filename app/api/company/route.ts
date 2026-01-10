import { NextResponse } from "next/server";
import { CompanyService } from "@/app/services/UserService";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, name, cnpj, cpf, phone, description } = body;

        if (!userId || !name || !cnpj || !cpf || !phone || !description) {
            return NextResponse.json(
                { message: "Dados inválidos" },
                { status: 400 }
            );
        }

        const companyExists = await CompanyService.findByUserId(userId);

        if (companyExists) {
            return NextResponse.json(
                { message: "Empresa já cadastrada para este usuário." },
                { status: 409 }
            );
        }

        await CompanyService.create({
            userId,
            name,
            cnpj,
            cpf,
            phone,
            description,
        });

        return NextResponse.json(
            { message: "Empresa cadastrada com sucesso" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Erro interno do servidor", error },
            { status: 500 }
        );
    }
}