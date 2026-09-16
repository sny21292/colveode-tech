const rowA = ["Next.js", "React", "Node.js", "Laravel", "TypeScript", "PostgreSQL", "AWS", "Vercel", "Docker", "GraphQL"];
const rowB = ["Shopify", "BigCommerce", "WooCommerce", "Stripe", "Ethereum", "Solidity", "Solana", "Hyperledger", "WordPress", "Magento"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <ul
        className={`flex w-max shrink-0 items-center gap-x-14 pr-14 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ ["--marquee-duration" as string]: `${items.length * 5}s` }}
      >
        {doubled.map((t, i) => (
          <li
            key={`${t}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-white/40 transition-colors duration-500 hover:text-white"
          >
            {t}
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
      <div className="mt-8 flex flex-col gap-6">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
