import { prisma } from "../Lib/prisma";

type CreateUserInput = {
    email: string;
    password: string;
    role: "USER" | "ADMIN";
};

type CreateCompanyInput = {
    userId: string;
    name: string;
    cnpj: string;
    cpf: string;
    phone: string;
    description: string;
};

export class UserService {
    static async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            }
        });
    }

    static async create(data: CreateUserInput) {
        return prisma.user.create({
            data,
        });
    }
}

export class CompanyService {
    static async create(data: CreateCompanyInput) {
        return prisma.company.create({
            data: {
                ...data,
                approved: false,
            },
        });
    }

    static async findByUserId(userId: string) {
        return prisma.company.findUnique({
            where: { userId },
        });
    }

    static async findPending() {
        return prisma.company.findMany({
            where: { approved: false },
            include: { user: true },
        });
    }

    static async approve(id: string) {
        return prisma.company.update({
            where: { id },
            data: { approved: true },
        });
    }

    static async isApproved(userId: string): Promise<boolean> {
        const company = await prisma.company.findUnique({
            where: { userId },
            select: { approved: true },
        });
        return company?.approved ?? false;
    }
}
