/**
 * PLACEHOLDER PROJECTS
 * Real case studies will replace these once the client sends project details.
 * Each entry drives a tile on the home page and the /work page.
 */
export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  year: number;
  /** hue offset for the abstract cover art */
  hue: number;
  /** cover art composition variant */
  variant: 1 | 2 | 3 | 4;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "commerce-replatform",
    title: "Replatforming a growing retailer onto a headless Shopify storefront",
    client: "Retail",
    category: "E-commerce",
    summary:
      "A faster storefront, a simpler checkout and a catalogue that scales to thousands of products.",
    year: 2025,
    hue: 10,
    variant: 1,
    featured: true,
  },
  {
    slug: "supply-chain-ledger",
    title: "A permissioned ledger for tracking goods from factory to shelf",
    client: "Logistics",
    category: "Blockchain",
    summary:
      "Immutable records shared between partners, with an audit trail that replaced spreadsheets and email.",
    year: 2025,
    hue: -20,
    variant: 2,
    featured: true,
  },
  {
    slug: "clinic-operations",
    title: "Operations software for a multi-location healthcare group",
    client: "Healthcare",
    category: "Custom software",
    summary:
      "Scheduling, billing and reporting in one place, integrated with the systems the clinics already used.",
    year: 2024,
    hue: 30,
    variant: 3,
    featured: true,
  },
  {
    slug: "fintech-marketing-site",
    title: "A marketing site and content platform for a fintech startup",
    client: "Finance",
    category: "Web development",
    summary:
      "Built on Next.js with a headless CMS, launched in six weeks and ranking on page one within a quarter.",
    year: 2024,
    hue: 0,
    variant: 4,
    featured: true,
  },
  {
    slug: "b2b-integrations",
    title: "Connecting an ERP, a CRM and a web store for a B2B distributor",
    client: "Distribution",
    category: "Integrations",
    summary:
      "Orders, stock and customer records now flow automatically between three systems that never used to talk.",
    year: 2024,
    hue: 20,
    variant: 2,
  },
  {
    slug: "local-seo-programme",
    title: "A twelve-month search programme for a regional services brand",
    client: "Services",
    category: "SEO",
    summary:
      "Technical fixes, content and local listings that tripled organic enquiries year on year.",
    year: 2023,
    hue: -6,
    variant: 1,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
