import { prisma } from "../Lib/prisma";


export interface CreateProductDTO {
    slug: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
}


export interface UpdateProductDTO extends Partial<CreateProductDTO> { }

export class ProductService {

    static async create(data: CreateProductDTO, userId: string) {
        // Validar se a empresa do usuário está aprovada
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
                category: data.category,
                status: "PENDING",

                user: {
                    connect: { id: userId },
                },

                company: {
                    connect: { id: company.id },
                },

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

    static async findById(id: number) {
        return prisma.product.findUnique({
            where: { id },
            include: { images: true, company: true },
        });
    }

    static async findBySlug(slug: string) {
        return prisma.product.findUnique({
            where: { slug },
            include: { images: true, company: true },
        });
    }

    static async update(id: number, data: UpdateProductDTO) {
        return prisma.product.update({
            where: { id },
            data: {
                ...data,
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
