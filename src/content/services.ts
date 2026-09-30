export type Service = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  body: string[];
  capabilities: string[];
  stack: string[];
  /** hue offset applied to the brand gradient for this service’s visual */
  hue: number;
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web development",
    short: "Fast, responsive websites and web apps built to be found and to last.",
    lead:
      "From marketing sites to full web applications, we build on modern frameworks so your site loads fast, ranks well and grows with you.",
    body: [
      "We use React, Next.js and Node.js to build sites that are quick to load and simple to maintain. Performance is part of the build, not a fix afterwards, so pages stay fast as content grows.",
      "Search visibility is designed in from the start: clean structure, sensible URLs, meta and schema markup, and fast load times that search engines reward.",
      "Once live, we keep things running with backups, security monitoring and performance checks, so you can focus on your business instead of the technical side.",
    ],
    capabilities: [
      "Marketing and corporate websites",
      "Web applications and portals",
      "Content management with WordPress or headless CMS",
      "Performance and Core Web Vitals work",
      "Technical SEO and structured data",
      "Ongoing maintenance and support",
    ],
    stack: ["Next.js", "React", "Node.js", "TypeScript", "Tailwind CSS", "Laravel", "PHP", "WordPress", "PostgreSQL", "MySQL", "Vercel"],
    hue: 0,
  },
  {
    slug: "e-commerce-solutions",
    title: "E-commerce",
    short: "Online stores that are secure, quick and built to convert.",
    lead:
      "We build stores on Shopify, BigCommerce and WooCommerce, or from scratch when your catalogue or checkout needs something the platforms can’t do.",
    body: [
      "Your store is the core of your online business. We design storefronts that look right for your brand and make it easy for a visitor to become a customer, on any screen size.",
      "Payments go through trusted providers like Stripe and PayPal, configured to industry standards so customer data stays safe and checkout stays smooth.",
      "As you add products, markets or payment methods, the store keeps up. We build with growth in mind so you’re never rebuilding from zero.",
    ],
    capabilities: [
      "Shopify, BigCommerce and WooCommerce stores",
      "Custom storefronts and headless commerce",
      "Payment gateway integration (Stripe, PayPal, Authorize.net)",
      "Inventory, shipping and ERP connections",
      "Mobile-first checkout",
      "Product SEO and structured data",
    ],
    stack: ["Shopify", "WooCommerce", "BigCommerce", "Magento", "Stripe", "PayPal", "Razorpay", "Mailchimp", "Algolia", "Square"],
    hue: 14,
  },
  {
    slug: "blockchain-development",
    title: "Blockchain",
    short: "Smart contracts, dApps and private chains built with security first.",
    lead:
      "We help businesses use blockchain where it genuinely helps: transparent records, automated agreements and secure, decentralised applications.",
    body: [
      "It starts with strategy. We work out whether a private, permissioned or public chain fits your goals, then design a roadmap before writing a line of code.",
      "We build on Ethereum, Solana, Polkadot and Hyperledger, writing smart contracts in Solidity and decentralised apps that people can actually use.",
      "Security is not an afterthought. Every contract and dApp goes through code review and audit, and we keep monitoring nodes and contracts after launch.",
    ],
    capabilities: [
      "Blockchain consulting and roadmaps",
      "Smart contract development and audits",
      "Decentralised applications (dApps)",
      "Tokenisation and DeFi products",
      "Private and permissioned chains",
      "Integration with existing systems and ERPs",
    ],
    stack: ["Ethereum", "Solidity", "Solana", "Hyperledger", "Web3.js", "Chainlink", "IPFS", "Rust"],
    hue: -18,
  },
  {
    slug: "custom-software-development",
    title: "Custom software",
    short: "Tailored applications that fit how your business actually works.",
    lead:
      "When off-the-shelf tools stop fitting, we design and build software around your real processes, from internal tools to full enterprise platforms.",
    body: [
      "We start by understanding the work your team does every day, then design software that removes the friction instead of adding a new layer of it.",
      "Applications are built to integrate with what you already run, whether that’s a database, a payment system or an existing ERP, so nothing lives in a silo.",
      "Scalable architecture means the system handles today’s load and tomorrow’s without a rewrite, and you keep ownership of the code.",
    ],
    capabilities: [
      "Internal tools and dashboards",
      "SaaS products and platforms",
      "APIs and system integrations",
      "Cloud-based applications",
      "Automation of manual processes",
      "Long-term support and iteration",
    ],
    stack: ["Node.js", "TypeScript", "Laravel", "Python", "PostgreSQL", "MongoDB", "Redis", "React", "AWS", "Docker", "Kubernetes"],
    hue: 28,
  },
  {
    slug: "seo-services",
    title: "SEO",
    short: "Search strategies that bring the right people to your site.",
    lead:
      "We combine technical SEO, on-page work and content strategy so your site ranks for the terms that actually bring business.",
    body: [
      "Every campaign starts with research: the high-volume terms that bring traffic and the long-tail phrases that convert, mapped to your audience and goals.",
      "On the site itself we tune titles, descriptions, headings, internal links and page speed so both search engines and people find it easy to use.",
      "You get clear reporting on rankings, traffic and conversions, so you can see what’s working and where the next opportunity is.",
    ],
    capabilities: [
      "Keyword research and competitor analysis",
      "Technical SEO audits and fixes",
      "On-page optimisation",
      "Content strategy",
      "Local SEO",
      "Reporting and ongoing optimisation",
    ],
    stack: ["Search Console", "Analytics", "Google Tag Manager", "Ahrefs", "Semrush", "Lighthouse", "Cloudflare", "Schema.org", "Core Web Vitals"],
    hue: 8,
  },
  {
    slug: "software-integrations-consulting",
    title: "Integrations & consulting",
    short: "Connecting your systems and choosing the right technology.",
    lead:
      "We help you pick the right tools, connect them to what you already have and roll them out without disrupting the business.",
    body: [
      "Most companies run a patchwork of systems that don’t talk to each other. We map the data flows, then build the integrations that turn manual re-entry into automation.",
      "When you’re choosing new technology, we give you an honest recommendation based on your team, budget and roadmap, not on what’s fashionable.",
      "Rollouts are staged and reversible. Your team keeps working while the new system comes online alongside the old one.",
    ],
    capabilities: [
      "Technology selection and roadmaps",
      "API and third-party integrations",
      "Data migration",
      "Process automation",
      "Cloud and infrastructure advice",
      "Team training and handover",
    ],
    stack: ["REST", "GraphQL", "Zapier", "AWS", "Stripe", "Salesforce", "HubSpot", "Airtable", "Firebase", "Supabase"],
    hue: -8,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
