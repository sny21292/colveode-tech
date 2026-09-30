import {
  siNextdotjs, siReact, siNodedotjs, siLaravel, siTypescript, siPostgresql, siDocker,
  siVercel, siGraphql, siTailwindcss,
  siShopify, siWoocommerce, siStripe, siEthereum, siSolidity, siSolana, siWordpress,
  siMongodb, siRedis, siFigma,
} from "simple-icons";

type Icon = { title: string; hex: string; path: string };
type Item = { name: string; icon: Icon };

const rowA: Item[] = [
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Laravel", icon: siLaravel },
  { name: "TypeScript", icon: siTypescript },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "Docker", icon: siDocker },
  { name: "Vercel", icon: siVercel },
  { name: "GraphQL", icon: siGraphql },
  { name: "Tailwind CSS", icon: siTailwindcss },
];

const rowB: Item[] = [
  { name: "Shopify", icon: siShopify },
  { name: "WooCommerce", icon: siWoocommerce },
  { name: "Stripe", icon: siStripe },
  { name: "Ethereum", icon: siEthereum },
  { name: "Solidity", icon: siSolidity },
  { name: "Solana", icon: siSolana },
  { name: "WordPress", icon: siWordpress },
  { name: "MongoDB", icon: siMongodb },
  { name: "Redis", icon: siRedis },
  { name: "Figma", icon: siFigma },
];

/** Brand colour, but lift near-black logos to a light tone so they read on the dark row. */
function markColor(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 72 ? "#e8e8ed" : `#${hex}`;
}

function Row({ items, reverse = false }: { items: Item[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <ul
        className={`flex w-max shrink-0 items-center gap-x-12 pr-12 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: `${items.length * 5}s` }}
      >
        {doubled.map((t, i) => (
          <li
            key={`${t.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-3 whitespace-nowrap opacity-70 grayscale-0 transition-opacity duration-500 hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" role="img" aria-hidden className="size-8 shrink-0" fill={markColor(t.icon.hex)}>
              <path d={t.icon.path} />
            </svg>
            <span className="text-[clamp(1.35rem,2.6vw,2.1rem)] font-semibold tracking-[-0.03em] text-white/75">
              {t.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="bg-ink py-20 text-white md:py-24" aria-label="Technologies we work with">
      <div className="wrap">
        <p className="text-fine text-white/50">We build with tools your team can hire for and maintain.</p>
      </div>
      <div className="mt-10 flex flex-col gap-8">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
