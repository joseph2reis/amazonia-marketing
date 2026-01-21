import { IconType } from "react-icons";

interface AgroBenefitCardProps {
  icon: IconType;
  title: string;
  description: string;
}

export default function AgroBenefitCard({
  icon: Icon,
  title,
  description,
}: AgroBenefitCardProps) {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-border
        bg-surface-strong
        p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:shadow-xl
        cursor-pointer
        flex items-center flex-col min-h-56
      "
    >
      {/* glow sutil */}
      <span
        className="
          pointer-events-none absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          bg-linear-to-b from-primary-soft/40 to-transparent
        "
      />

      {/* Icon */}
      <div
        className="
          relative mb-4 flex items-center justify-center
          h-12 w-12
          rounded-full
          bg-primary-soft
          transition-transform duration-300 ease-out
          group-hover:scale-110
        "
      >
        <Icon
          size={24}
          className="
            text-primary
            leading-none
            shrink-0
            transition-transform duration-300
            group-hover:rotate-6
          "
        />
      </div>

      <h3 className="relative text-lg font-semibold text-text">{title}</h3>

      <p className="relative mt-2 text-sm text-text-muted leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
}
