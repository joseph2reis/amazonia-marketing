export interface CreateProductInput {
    slug: string;
    name: string;
    description: string;
    price: number;
    stock: number; // Adicionado
    category: string;
    images: string[];
}