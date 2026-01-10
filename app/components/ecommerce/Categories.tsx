import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Sementes & Mudas",
    description: "Cultivos nativos e adaptados ao bioma amazônico",
    image: "/categories/semente-muda.png",
    href: "#sementes",
  },
  {
    title: "Tecnologia no Campo",
    description: "Soluções digitais para produtividade sustentável",
    image: "/categories/tecnologia.png",
    href: "#tecnologia",
  },
  {
    title: "Bioinsumos",
    description: "Alternativas naturais para o solo e cultivo",
    image: "/categories/bioinsumos.png",
    href: "#bioinsumos",
  },
  {
    title: "Cooperativas",
    description: "Fortalecendo comunidades e produção local",
    image: "/categories/cooperativas.png",
    href: "#cooperativas",
  },
];

export default function AgroCategories() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Categorias & Soluções
          </h2>
          <p className="mt-4 text-base text-text-muted">
            Explore soluções que impulsionam a agricultura sustentável e
            valorizam a biodiversidade amazônica.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-strong transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-44 w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition">
                  {category.title}
                </h3>
                <p className="text-sm text-text-muted">
                  {category.description}
                </p>
              </div>

              {/* Accent */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary to-secondary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
