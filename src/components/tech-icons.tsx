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
};

function BrandMark({ icon }: { icon: Icon }) {
  // Keep near-black brand colours legible on a white chip.
  const color = `#${icon.hex}`;
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden className="size-[22px] shrink-0" fill={color}>
      <path d={icon.path} />
    </svg>
  );
}

export function TechChip({ name }: { name: string }) {
  const icon = ICONS[name];
  return (
    <div className="flex items-center gap-2.5 rounded-full bg-white px-5 py-3 ring-1 ring-ink/[0.06]">
      {icon ? (
        <BrandMark icon={icon} />
      ) : (
        <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-ink/[0.07] text-[11px] font-semibold text-graphite">
          {name.charAt(0)}
        </span>
      )}
      <span className="truncate text-copy font-medium">{name}</span>
    </div>
  );
}
