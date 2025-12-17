
type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    href: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Sementes Nativas",
        description: "Variedades adaptadas ao...",
        price: "R$ 49,90",
        image: "/products/sementes-nativas.png",
        href: "#produto-1",
    },
    {
        id: 2,
        name: "Biofertilizante",
        description: "Nutrição natural para o solo",
        price: "R$ 89,90",
        image: "/products/biofertilizante.png",
        href: "#produto-2",
    },
    {
        id: 3,
        name: "Sensor Agrícola",
        description: "Monitoramento inteligente do cultivo",
        price: "R$ 299,90",
        image: "/products/sensor.png",
        href: "#produto-3",
    },
    {
        id: 4,
        name: "Kit Mudas",
        description: "Produção sustentável desde o início",
        price: "R$ 129,90",
        image: "/products/mudas.png",
        href: "#produto-4",
    },
];