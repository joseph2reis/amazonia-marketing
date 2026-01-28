import { prisma } from "../Lib/prisma";
import { CreateProductInput } from "../types/Product/product";

export interface UpdateProductDTO extends Partial<CreateProductInput> { }

export class ProductService {

    static async create(data: CreateProductInput, userId: string) {
        const company = await prisma.company.findUnique({
            where: { userId },
        });

        if (!company || !company.approved) {
            throw new Error("Sua empresa não está aprovada para cadastrar produtos");
        }

        return prisma.product.create({
            data: {
                slug: data.slug,
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                status: "PENDING",
                user: { connect: { id: userId } },
                company: { connect: { id: company.id } },
                images: {
                    create: data.images.map(url => ({ url })),
                },
            },
            include: {
                images: true,
                company: true,
            },
        });
    }

    static async findAll() {
        return prisma.product.findMany({
            include: { images: true, company: true },
            orderBy: { createdAt: "desc" },
        });
    }

    // AJUSTADO: Agora traz cel e phone para o contato direto na Home/Carrossel
    static async findPublicFeatured() {
        return prisma.product.findMany({
            where: {
                status: "APPROVED",
            },
            include: {
                images: true,
                company: {
                    select: {
                        name: true,
                        cel: true,   
                        phone: true  
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });
    }

    static async findById(id: number) {
        return prisma.product.findUnique({
            where: { id },
            include: { images: true, company: true },
        });
    }

    // AJUSTADO: Garante que ao abrir a página do produto pelo slug, os contatos venham junto
    static async findBySlug(slug: string) {
        return prisma.product.findUnique({
            where: { slug },
            include: {
                images: true,
                company: true // Traz todos os dados da empresa (name, cel, phone)
            },
        });
    }

    static async update(id: number, data: CreateProductInput) {
        return prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                stock: data.stock,
                category: data.category,
                images: data.images
                    ? {
                        deleteMany: {},
                        create: data.images.map((url) => ({ url })),
                    }
                    : undefined,
            },
            include: { images: true, company: true },
        });
    }

    static async delete(id: number) {
        return prisma.product.delete({
            where: { id },
        });
    }
}