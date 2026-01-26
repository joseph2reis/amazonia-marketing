import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string; // Adicionado para dar mais contexto
  footer?: React.ReactNode;
};

export default function AgroCard({
  title,
  description,
  image,
  href,
  category,
  footer,
}: Props) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-border bg-surface-strong transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Container da Imagem com Aspect Ratio fixo */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <div className="absolute left-3 top-3">
            <span className="rounded-lg bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-col space-y-3 p-5">
        <div className="space-y-1">
          <h3 className="text-lg font-black leading-tight text-text transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm font-medium leading-relaxed text-text-muted">
            {description}
          </p>
        </div>

        {footer && (
          <div className="flex items-center border-t border-border pt-4 mt-auto">
            {footer}
          </div>
        )}
      </div>
    </Link>
  );
}