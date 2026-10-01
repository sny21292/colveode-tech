import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight, ArrowUpRight, Zap, Search, TrendingUp, ShieldCheck, Check,
  Gauge, LifeBuoy, Truck, Smartphone, Tag, Coins, Lock, Plug,
  Cloud, Headphones, FileText, MapPin, Workflow, Server, Users,
  type LucideIcon,
} from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { Cta } from "@/components/cta";
import { TechChip } from "@/components/tech-icons";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.short,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${s.title} | ${site.name}`, description: s.short, url: `/services/${slug}` },
  };
}

const values = [
  { icon: Zap, title: "Performance", desc: "Fast, optimised builds that load quickly." },
  { icon: Search, title: "Found", desc: "Structured and search-friendly by design." },
  { icon: TrendingUp, title: "Scalable", desc: "Built to grow with your business." },
  { icon: ShieldCheck, title: "Reliable", desc: "Secure, stable and maintained." },
];

const steps = [
  { n: "01", title: "Discover", text: "Understand your goals, audience and requirements." },
  { n: "02", title: "Plan", text: "Define the structure, technology and roadmap." },
  { n: "03", title: "Design & develop", text: "Create and build your solution in short cycles." },
  { n: "04", title: "Test & launch", text: "Quality testing, optimisation and a smooth launch." },
  { n: "05", title: "Support & grow", text: "Ongoing maintenance, updates and improvements." },
];

/** Icon + one-line blurb for each capability shown in “What we can build”. */
const BUILD_META: Record<string, { icon: LucideIcon; desc: string }> = {
  // web development
  "Performance and Core Web Vitals work": { icon: Gauge, desc: "Fast load times and green Core Web Vitals that search engines reward." },
  "Technical SEO and structured data": { icon: Search, desc: "Clean structure, meta and schema markup so you rank for what matters." },
  "Ongoing maintenance and support": { icon: LifeBuoy, desc: "Backups, monitoring and updates so your site keeps running smoothly." },
  // e-commerce
  "Inventory, shipping and ERP connections": { icon: Truck, desc: "Sync stock, shipping and back-office systems so orders just flow." },
  "Mobile-first checkout": { icon: Smartphone, desc: "A fast, frictionless checkout that converts on any screen size." },
  "Product SEO and structured data": { icon: Tag, desc: "Rich product markup so your catalogue shows up in search." },
  // blockchain
  "Tokenisation and DeFi products": { icon: Coins, desc: "Tokens, wallets and DeFi flows, built to spec and audited." },
  "Private and permissioned chains": { icon: Lock, desc: "Permissioned networks for when data can’t live on a public chain." },
  "Integration with existing systems and ERPs": { icon: Plug, desc: "Bridge on-chain logic with the systems your business already runs." },
  // custom software
  "Cloud-based applications": { icon: Cloud, desc: "Scalable, secure and high-performance applications for modern businesses." },
  "Automation of manual processes": { icon: Zap, desc: "Save time and reduce errors with automation built around your workflow." },
  "Long-term support and iteration": { icon: Headphones, desc: "Ongoing support, updates and new features as your business grows." },
  // seo
  "Content strategy": { icon: FileText, desc: "Content planned around real search intent, not guesswork." },
  "Local SEO": { icon: MapPin, desc: "Get found by nearby customers across Maps and local search." },
  "Reporting and ongoing optimisation": { icon: TrendingUp, desc: "Clear monthly reporting and improvements that compound over time." },
  // integrations & consulting
  "Process automation": { icon: Workflow, desc: "Turn manual re-entry into automated flows across your tools." },
  "Cloud and infrastructure advice": { icon: Server, desc: "Right-sized, secure infrastructure recommendations for your stage." },
  "Team training and handover": { icon: Users, desc: "Documentation and training so your team owns it with confidence." },
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug).slice(0, 3);
  const approach = s.capabilities.slice(0, 3).map((title, i) => ({ title, text: s.body[i] ?? "" }));
  // Show the capabilities the approach section doesn’t already cover, so the two don’t repeat.
  const buildCards = s.capabilities.length > 3 ? s.capabilities.slice(3) : s.capabilities.slice(0, 3);
  const work = projects.filter((p) => p.featured && p.image).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-3/5 md:block"
          style={{ background: "radial-gradient(58% 64% at 72% 46%, rgba(198,26,74,0.42), rgba(96,14,44,0.28) 46%, transparent 74%)" }}
        />
        <div className="wrap grid items-center gap-10 pb-10 pt-24 md:grid-cols-[1.05fr_0.95fr] md:pb-14 md:pt-28">
          <div className="relative z-10">
            <Eyebrow dark>{s.title}</Eyebrow>
            <h1 className="text-headline mt-4 max-w-[18ch] text-balance">
              <WordReveal text={s.short} />
            </h1>
            <Reveal as="p" delay={0.4} className="text-lede mt-6 max-w-[44ch] text-white/70">
              {s.lead}
            </Reveal>
            <Reveal delay={0.5} className="mt-9">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
              >
                Talk to us about {s.title.toLowerCase()}
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <Reveal as="div" delay={0.2} amount={0.2} className="relative aspect-[3/2]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{ background: "radial-gradient(closest-side at 55% 45%, rgba(255,40,110,0.32), transparent 72%)", filter: "blur(30px)" }}
            />
            <div className="relative size-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src={`/services/${s.slug}-hero.jpg`}
                alt=""
                aria-hidden
                fill
                sizes="(max-width:768px) 90vw, 46vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we build */}
      <section className="bg-fog py-20 text-graphite md:py-28">
        <div className="wrap grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>What we build</Eyebrow>
            <Reveal as="h2" className="text-headline mt-4 max-w-[16ch] text-balance">
              Digital experiences designed to perform.
            </Reveal>
            <p className="mt-6 max-w-[46ch] text-copy text-mute">
              We don’t just build {s.title.toLowerCase()} — we create fast, secure and scalable products that help you
              attract users, generate leads and grow your business.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Reveal key={v.title} amount={0.3}>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-copy font-semibold">{v.title}</h3>
                <p className="mt-1 text-fine text-mute">{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach + technologies */}
      <section className="bg-fog pb-20 text-graphite md:pb-28">
        <div className="wrap grid gap-14 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>How we approach {s.title.toLowerCase()}</Eyebrow>
            <ol className="mt-8 space-y-8">
              {approach.map((a, i) => (
                <Reveal key={i} as="li" amount={0.3} className="flex gap-5">
                  <span className="text-fine font-semibold tabular-nums text-brand-pink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-title">{a.title}</h3>
                    <p className="mt-2 max-w-[42ch] text-copy text-mute">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="md:border-l md:border-ink/10 md:pl-14">
            <Eyebrow>Technologies we work with</Eyebrow>
            <Reveal as="div" amount={0.15} className="mt-8 flex flex-wrap gap-2.5">
              {s.stack.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we can build */}
      <section className="bg-white py-20 text-graphite md:py-24">
        <div className="wrap">
          <Eyebrow>What we can build</Eyebrow>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {buildCards.map((c, i) => {
              const meta = BUILD_META[c];
              const Icon = meta?.icon ?? Check;
              return (
                <Reveal
                  key={c}
                  as="div"
                  delay={i * 0.06}
                  amount={0.2}
                  className="flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-ink/[0.05] shadow-[0_4px_18px_-8px_rgba(15,15,15,0.12)]"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink">
                    <Icon className="size-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em]">{c}</h3>
                    {meta?.desc && <p className="mt-1.5 text-fine text-mute">{meta.desc}</p>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Often paired with */}
      <section className="bg-fog py-16 text-graphite md:py-20">
        <div className="wrap">
          <h2 className="text-headline max-w-[14ch] text-balance">Often paired with</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex items-start gap-4 rounded-3xl bg-white p-6 ring-1 ring-ink/[0.06] transition-transform duration-500 ease-apple hover:-translate-y-1"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink">
                    <ArrowUpRight className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-copy font-semibold">{o.title}</h3>
                    <p className="mt-1 text-fine text-mute">{o.short}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <Eyebrow>Our process</Eyebrow>
              <Reveal as="h2" className="text-headline mt-4 max-w-[12ch] text-balance">
                How we build your project.
              </Reveal>
            </div>
            <p className="text-copy text-mute md:max-w-[42ch]">
              A clear, collaborative process from idea to launch, so you always know what’s happening.
            </p>
          </div>
          <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            <div aria-hidden className="absolute inset-x-0 top-6 hidden h-px bg-ink/10 lg:block" />
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.06} amount={0.3} className="relative">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-brand-pink text-[15px] font-semibold text-white ring-4 ring-brand-pink/15">
                  {step.n}
                </span>
                <h3 className="mt-5 text-[1.125rem] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 max-w-[24ch] text-fine text-mute">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      {work.length > 0 && (
        <section className="bg-fog py-16 text-graphite md:py-24">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-headline text-balance">Selected work</h2>
              <Link href="/work" className="group inline-flex items-center gap-1.5 text-[15px] font-medium">
                View all projects
                <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {work.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="group grid grid-cols-[1.1fr_1fr] items-center gap-5 rounded-3xl bg-white p-5 ring-1 ring-ink/[0.06] transition-transform duration-500 ease-apple hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-graphite">
                    <Image src={p.image!} alt="" fill sizes="30vw" className="object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em]">{p.client}</h3>
                    <p className="mt-2 line-clamp-3 text-fine text-mute">{p.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium">
                      View project
                      <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Cta />
    </>
  );
}
