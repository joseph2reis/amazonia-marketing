import Image from "next/image";
import Link from "next/link";

type AgroCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  footer?: React.ReactNode;
};

export default function AgroCard({
  title,
  description,
  image,
  href,
  footer,
}: AgroCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface-strong transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-5">
        <h3 className="text-lg font-semibold text-text group-hover:text-primary transition">
          {title}
        </h3>

        <p className="text-sm text-text-muted">{description}</p>

        {footer && <div className="pt-3">{footer}</div>}
      </div>

      {/* Accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary to-secondary" />
    </Link>
  );
}
