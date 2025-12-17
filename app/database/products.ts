export type Product = {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: string;
    category: string;
    images: string[];
};

export const products: Product[] = [
    {
        id: 1,
        slug: "sementes-nativas",
        name: "Sementes Nativas",
        description: "Variedades adaptadas ao bioma amazônico",
        price: "R$ 49,90",
        category: "Sementes & Mudas",
        images: [
            "/products/sementes-nativas.png",
            "/products/sementes2.png",
            "/products/sementes3.png",
        ],
    },
    {
        id: 2,
        slug: "biofertilizante-natural",
        name: "Biofertilizante",
        description: "Nutrição natural para o solo",
        price: "R$ 89,90",
        category: "Sementes & Mudas",
        images: ["/products/biofertilizante.png"],
    },
    {
        id: 3,
        slug: "sensor-agricola",
        name: "Sensor Agrícola",
        description: "Monitoramento inteligente do cultivo",
        price: "R$ 299,90",
        category: "Sementes & Mudas",
        images: ["/products/sensor.png"],
    },
    {
        id: 4,
        slug: "kit-mudas",
        name: "Kit Mudas",
        description: "Produção sustentável desde o início",
        price: "R$ 129,90",
        category: "Sementes & Mudas",
        images: ["/products/mudas.png"],
    },
];
