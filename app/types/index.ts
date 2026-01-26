// Exemplo de como usar o tipo gerado pelo Prisma no seu componente
import { Product as PrismaProduct, Company, ProductImage } from "@prisma/client";

interface ProductWithRelations extends PrismaProduct {
    company: Company;
    images: ProductImage[];
}