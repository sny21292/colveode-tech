import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { Button } from "@/components/ui";
import { getService, services } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.short };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHeader title={s.title} lede={s.lead}>
        <Reveal delay={0.5} className="mt-10">
          <Button href="/contact">Talk to us about {s.title.toLowerCase()}</Button>
        </Reveal>
      </PageHeader>

      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap grid gap-14 md:grid-cols-[1.3fr_1fr] md:gap-24">
          <div className="space-y-8">
            {s.body.map((p, i) => (
              <Reveal key={i} as="p" className="text-lede max-w-[46ch]" amount={0.3}>
                {p}
              </Reveal>
            ))}
          </div>
          <div className="space-y-12">
            <Reveal amount={0.3}>
              <h2 className="text-title">What we do</h2>
              <ul className="mt-5 divide-y divide-ink/10">
                {s.capabilities.map((c) => (
                  <li key={c} className="py-3 text-copy">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal amount={0.3}>
              <h2 className="text-title">Tools we reach for</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.stack.map((t) => (
                  <li key={t} className="rounded-full bg-fog px-3.5 py-1.5 text-fine">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-fog py-20 text-graphite md:py-28">
        <div className="wrap">
          <Reveal as="h2" className="text-headline max-w-[14ch] text-balance">
            Often paired with
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group block rounded-3xl bg-white p-7 transition-transform duration-500 ease-apple hover:-translate-y-1">
                  <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{o.title}</h3>
                  <p className="mt-2 text-copy text-mute">{o.short}</p>
                  <span className="mt-5 inline-flex items-center gap-0.5 text-[15px] font-medium">
                    Learn more
                    <ChevronRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Cta />
    </>
  );
}
