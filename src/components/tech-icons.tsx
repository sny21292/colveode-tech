import {
  siNextdotjs, siReact, siNodedotjs, siLaravel, siWordpress, siVercel,
  siShopify, siBigcommerce, siWoocommerce, siStripe, siPaypal,
  siEthereum, siSolidity, siSolana, siPolkadot, siPostgresql,
  siDocker, siGraphql, siZapier, siWeb3dotjs,
  siGoogleanalytics, siGooglesearchconsole,
  siTypescript, siTailwindcss, siPhp, siMysql, siPython, siMongodb, siRedis, siKubernetes,
  siRazorpay, siMailchimp, siAlgolia, siSquare,
  siEthers, siChainlink, siIpfs, siRust,
  siGoogletagmanager, siSemrush, siLighthouse, siCloudflare,
  siHubspot, siAirtable, siFirebase, siSupabase,
  siJavascript, siBootstrap, siJquery, siHtml5, siCss, siElementor,
} from "simple-icons";

type Icon = { title: string; hex: string; path: string };

/** Display name → official brand mark. Names without a mark fall back to a neutral monogram. */
const ICONS: Record<string, Icon> = {
  "Next.js": siNextdotjs,
  "React": siReact,
  "Node.js": siNodedotjs,
  "Laravel": siLaravel,
  "WordPress": siWordpress,
  "Vercel": siVercel,
  "Shopify": siShopify,
  "BigCommerce": siBigcommerce,
  "WooCommerce": siWoocommerce,
  "Stripe": siStripe,
  "PayPal": siPaypal,
  "Ethereum": siEthereum,
  "Solidity": siSolidity,
  "Solana": siSolana,
  "Polkadot": siPolkadot,
  "PostgreSQL": siPostgresql,
  "Docker": siDocker,
  "GraphQL": siGraphql,
  "Zapier": siZapier,
  "Web3.js": siWeb3dotjs,
  "Analytics": siGoogleanalytics,
  "Search Console": siGooglesearchconsole,
  "TypeScript": siTypescript,
  "Tailwind CSS": siTailwindcss,
  "PHP": siPhp,
  "MySQL": siMysql,
  "Python": siPython,
  "MongoDB": siMongodb,
  "Redis": siRedis,
  "Kubernetes": siKubernetes,
  "Razorpay": siRazorpay,
  "Mailchimp": siMailchimp,
  "Algolia": siAlgolia,
  "Square": siSquare,
  "Ethers": siEthers,
  "Chainlink": siChainlink,
  "IPFS": siIpfs,
  "Rust": siRust,
  "Google Tag Manager": siGoogletagmanager,
  "Semrush": siSemrush,
  "Lighthouse": siLighthouse,
  "Cloudflare": siCloudflare,
  "HubSpot": siHubspot,
  "Airtable": siAirtable,
  "Firebase": siFirebase,
  "Supabase": siSupabase,
  "JavaScript": siJavascript,
  "Bootstrap": siBootstrap,
  "jQuery": siJquery,
  "HTML": siHtml5,
  "CSS": siCss,
  "Elementor": siElementor,
};

function BrandMark({ icon, sm }: { icon: Icon; sm?: boolean }) {
  // Keep near-black brand colours legible on a white chip.
  const color = `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden className={`${sm ? "size-4" : "size-[22px]"} shrink-0`} fill={color}>
      <path d={icon.path} />
    </svg>
  );
}

/** “Technology stack” row: a soft-tinted circle icon with the name below, per tech. */
export function TechStack({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-y-7">
      {tech.map((name, i) => {
        const icon = ICONS[name];
        const hex = icon ? `#${icon.hex}` : null;
        return (
          <div
            key={name}
            className={`flex min-w-[4.5rem] flex-1 basis-[5rem] flex-col items-center gap-2.5 px-2 ${
              i > 0 ? "border-l border-ink/10" : ""
            }`}
          >
            <div
              className="flex size-14 items-center justify-center rounded-full ring-1 ring-ink/[0.04]"
              style={{ background: hex ? `${hex}1f` : "rgba(17,17,17,0.05)" }}
            >
              {icon ? (
                <svg viewBox="0 0 24 24" role="img" aria-hidden className="size-7" fill={hex!}>
                  <path d={icon.path} />
                </svg>
              ) : (
                <span className="text-base font-semibold text-graphite">{name.charAt(0)}</span>
              )}
            </div>
            <span className="text-fine font-medium text-graphite">{name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TechChip({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const icon = ICONS[name];
  const sm = size === "sm";
  return (
    <div className={`flex items-center rounded-full bg-white ring-1 ring-ink/[0.06] ${sm ? "gap-2 px-3 py-1.5" : "gap-2.5 px-5 py-3"}`}>
      {icon ? (
        <BrandMark icon={icon} sm={sm} />
      ) : (
        <span
          className={`flex shrink-0 items-center justify-center rounded-full bg-ink/[0.07] font-semibold text-graphite ${
            sm ? "size-4 text-[10px]" : "size-[22px] text-[11px]"
          }`}
        >
          {name.charAt(0)}
        </span>
      )}
      <span className={`truncate font-medium ${sm ? "text-[13px]" : "text-copy"}`}>{name}</span>
    </div>
  );
}
