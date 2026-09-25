import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { services } from "@/content/services";
import { process } from "@/content/process";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, e-commerce, blockchain, custom software, SEO and integrations — everything a modern business needs to run online, from one team.",
};

function StartButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      Start a project
      <ArrowRight className="size-4" />
    </Link>
  );
}

export default function ServicesTwoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-3/5 md:block"
          style={{
            background: "radial-gradient(60% 62% at 72% 46%, rgba(198,26,74,0.42), rgba(96,14,44,0.28) 46%, transparent 74%)",
          }}
        />
        <div className="wrap grid items-center gap-10 pb-10 pt-24 md:grid-cols-[1.05fr_0.95fr] md:pb-14 md:pt-28">
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-brand-pink/15 px-3.5 py-1 text-fine font-medium uppercase tracking-[0.16em] text-brand-pink">
              Services
            </span>
            <h1 className="text-headline mt-4 max-w-[18ch] text-balance">
              <WordReveal text="Everything a modern business needs to" />{" "}
              <span className="text-brand-pink">run online.</span>
            </h1>
            <Reveal as="p" delay={0.4} className="text-lede mt-6 max-w-[40ch] text-white/70">
              Six core services, one team. Pick what you need now and add the rest as you grow.
            </Reveal>
            <Reveal delay={0.5} className="mt-9">
              <StartButton />
            </Reveal>
          </div>
          <Reveal as="div" delay={0.2} amount={0.2} className="relative h-64 md:h-[24rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{ background: "radial-gradient(closest-side at 55% 45%, rgba(255,40,110,0.32), transparent 72%)", filter: "blur(30px)" }}
            />
            <div className="relative size-full overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src="/services/services-hero.jpg"
                alt="A designer’s workstation showing code and a live product dashboard"
                fill
                sizes="(max-width: 768px) 90vw, 46vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-fog py-20 text-graphite md:py-28">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="flex items-center gap-2 text-fine font-medium uppercase tracking-[0.16em] text-mute">
                <span className="size-2 rounded-full bg-brand-pink" />
                Our services
              </p>
              <Reveal as="h2" className="text-headline mt-4 max-w-[16ch] text-balance">
                Digital services to help your business grow.
              </Reveal>
            </div>
            <p className="text-copy text-mute md:max-w-[46ch]">
              From high-performance websites to custom software, we build digital products that solve real problems and
              create long-term value.
            </p>
          </div>

          <ul className="mt-14 divide-y divide-ink/10 border-t border-ink/10">
            {services.map((s, i) => (
              <Reveal
                key={s.slug}
                as="li"
                delay={Math.min(i, 3) * 0.05}
                amount={0.2}
                className="grid items-center gap-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto_auto] md:gap-10 md:py-10"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-fine font-semibold tabular-nums text-brand-pink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-title">{s.title}</h3>
                </div>

                <div>
                  <p className="max-w-[44ch] text-copy text-mute">{s.lead}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.stack.slice(0, 3).map((t) => (
                      <li key={t} className="rounded-full bg-white px-3 py-1 text-fine text-graphite ring-1 ring-ink/[0.06]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative h-24 w-32 shrink-0 justify-self-start overflow-hidden rounded-2xl ring-1 ring-ink/[0.06] md:justify-self-center">
                  <Image src={`/services/${s.slug}-tile.png`} alt="" aria-hidden fill sizes="160px" className="object-cover" />
                </div>

                <Link
                  href={`/services/${s.slug}`}
                  className="group inline-flex items-center gap-1.5 justify-self-start text-[15px] font-medium text-graphite md:justify-self-end"
                >
                  Learn more
                  <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="wrap">
          <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-16">
            <div>
              <p className="flex items-center gap-2 text-fine font-medium uppercase tracking-[0.16em] text-white/45">
                <span className="size-2 rounded-full bg-brand-pink" />
                Our process
              </p>
              <Reveal as="h2" className="text-headline mt-4 max-w-[14ch] text-balance">
                How a project moves from idea to launch.
              </Reveal>
            </div>
            <p className="text-copy text-white/60 md:max-w-[42ch]">
              A clear, collaborative process that keeps things simple and gets real results.
            </p>
          </div>

          <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 lg:block" />
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08} amount={0.3} className="relative">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-brand-pink text-[15px] font-semibold text-white ring-4 ring-brand-pink/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-title">{step.title}</h3>
                <p className="mt-2 max-w-[26ch] text-copy text-white/60">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
