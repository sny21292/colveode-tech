import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "@/components/reveal";

/** Four services featured on the home page; the rest live behind “View all services”. */
const FEATURED = [
  "web-development",
  "e-commerce-solutions",
  "blockchain-development",
  "custom-software-development",
] as const;

export function ServicesRail() {
  const featured = FEATURED.map((slug) => services.find((s) => s.slug === slug)!);

  return (
    <section id="services" className="bg-fog py-20 text-graphite md:py-28">
      <div className="wrap">
        {/* header */}
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <Reveal className="mb-5">
              <span className="inline-flex items-center rounded-full bg-brand-pink/10 px-3 py-1 text-fine font-semibold tracking-[0.06em] text-brand-pink">
                Services
              </span>
            </Reveal>
            <Reveal as="h2" delay={0.05} className="text-headline max-w-[18ch] text-balance">
              Everything a modern business needs to{" "}
              <span className="text-brand-pink">run online.</span>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:pb-2">
            <p className="text-copy max-w-[42ch] text-mute">
              From custom development to eCommerce and integrations, we provide
              end-to-end solutions that help you launch, grow and scale.
            </p>
            <Link
              href="/services"
              className="group mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-brand-pink"
            >
              View all services
              <ChevronRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s, i) => (
            <Reveal key={s.slug} as="div" delay={(i % 4) * 0.06} amount={0.15} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-ink/[0.05] shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-[transform,box-shadow] duration-500 ease-apple hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-24px_rgba(15,15,15,0.28)]"
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-fog ring-1 ring-ink/[0.04]">
                  <Image
                    src={`/services/icon3d/${s.slug}.png`}
                    alt=""
                    fill
                    sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 22vw"
                    className="object-contain transition-transform duration-700 ease-apple group-hover:scale-[1.06]"
                  />
                </div>
                <h3 className="text-title">{s.title}</h3>
                <p className="mt-2 text-copy text-mute">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium text-brand-pink">
                  Learn more
                  <ChevronRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
