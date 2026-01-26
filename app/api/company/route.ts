import { NextResponse } from "next/server";
import { CompanyService } from "@/app/services/CompanyService"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/Lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Extraindo todos os campos, garantindo o uso de 'cel'
        const {
            userId,
            name,
            cnpj,
            cel, // Campo que você mudou no formulário
            phone,
            description,
            logradouro,
            bairro,
            cep,
            cidade
        } = body;

        // 2. Validação básica de presença (incluindo o cel)
        if (!userId || !name || !cnpj || !cel || !phone || !description) {
            return NextResponse.json(
                { message: "Dados obrigatórios ausentes (Nome, CNPJ, Celular, Telefone ou Descrição)." },
                { status: 400 }
            );
        }

        // 3. Verifica se o usuário já possui uma empresa
        const companyExists = await CompanyService.findByUserId(userId);

        if (companyExists) {
            return NextResponse.json(
                { message: "Empresa já cadastrada para este usuário." },
                { status: 409 }
            );
        }

        // 4. Chamada ao Service
        // IMPORTANTE: Dentro do CompanyService.create, você deve mapear 'cel' para 'whatssap'
        await CompanyService.create({
            userId,
            name,
            cnpj,
            cel,
            phone,
            description,
            logradouro,
            bairro,
            cep,
            cidade,
        });

        return NextResponse.json(
            { message: "Empresa cadastrada com sucesso! Aguarde aprovação." },
            { status: 201 }
        );
    } catch (error) {
        console.error("ERRO_CADASTRO_EMPRESA:", error);
        return NextResponse.json(
            { message: "Erro interno do servidor ao processar o cadastro." },
            { status: 500 }
        );
    }

}

export async function GET() {
    try {
        // 1. Verificação de segurança: Apenas ADMIN pode listar todas as empresas
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
        }

        // 2. BUSCA TODAS: Note que não usamos "where: { approved: false }"
        // Queremos todas para que as abas "Pendentes" e "Ativas" funcionem no front
        const companies = await prisma.company.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(companies);
    } catch (error) {
        console.error("ERRO_GET_COMPANIES:", error);
        return NextResponse.json(
            { message: "Erro ao buscar empresas" },
            { status: 500 }
        );
    }
}