import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Process } from "@/components/process";
import { Cta } from "@/components/cta";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, e-commerce, blockchain, custom software, SEO and integrations. Everything a modern business needs to run online, from one team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Everything a modern business needs to run online."
        lede="Six services, one team. Pick what you need now and add the rest as you grow."
      />
      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap">
          <ul className="divide-y divide-ink/10">
            {services.map((s, i) => (
              <Reveal key={s.slug} as="li" delay={Math.min(i, 3) * 0.05} amount={0.2}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group grid gap-6 py-10 md:grid-cols-[1fr_1.6fr_auto] md:items-start md:gap-12 md:py-14"
                >
                  <h2 className="text-title text-balance">{s.title}</h2>
                  <div>
                    <p className="text-lede max-w-[40ch]">{s.lead}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.capabilities.slice(0, 4).map((c) => (
                        <li key={c} className="rounded-full bg-fog px-3.5 py-1.5 text-fine text-graphite">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[15px] font-medium md:pt-2">
                    Learn more
                    <ChevronRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Process />
      <Cta />
    </>
  );
}
