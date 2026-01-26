import { prisma } from "../Lib/prisma";
import { CreateCompanyInput } from "../types/company/company";

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

    static async findAll() {
        return prisma.company.findMany({
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
    }
}
