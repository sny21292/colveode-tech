import Image from "next/image";

/**
 * Project tile cover. Shows a real screenshot when the project has one
 * (`image`), otherwise a clean, flat fallback: a dark panel with a faint
 * brand wash and the client’s monogram. No abstract blobs.
 */
export function CoverArt({
  hue,
  image,
  label,
  className = "",
}: {
  hue: number;
  image?: string;
  /** used for the fallback monogram + image alt */
  label?: string;
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-graphite ${className}`}>
        <Image
          src={image}
          alt={label ?? ""}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  const monogram = (label ?? "").trim().charAt(0).toUpperCase() || "•";
  return (
    <div className={`relative overflow-hidden bg-ink ${className}`} aria-hidden>
      {/* flat diagonal brand wash, hue-shifted per project — no blur, no blobs */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          filter: `hue-rotate(${hue}deg)`,
          backgroundImage: "linear-gradient(125deg, var(--color-brand-pink), var(--color-brand-orange))",
        }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
      <span className="absolute bottom-[6%] right-[7%] font-semibold leading-none tracking-tight text-white/[0.07] text-[clamp(4rem,14vw,9rem)]">
        {monogram}
      </span>
    </div>
  );
}
