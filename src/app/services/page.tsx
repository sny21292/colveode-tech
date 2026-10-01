import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Rocket, Award, Users, Heart } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { Cta } from "@/components/cta";
import { ProcessExplorer } from "@/components/process-explorer";
import { services } from "@/content/services";
import { site } from "@/content/site";

const stats = [
  { icon: Rocket, value: `${site.figures.projects}+`, label: "Projects delivered" },
  { icon: Award, value: `${site.figures.yearsExperience}+`, label: "Years of experience" },
  { icon: Users, value: `${site.figures.clients}+`, label: "Clients worldwide" },
  { icon: Heart, value: "100%", label: "Focused on your growth" },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, e-commerce, blockchain, custom software, SEO and integrations — everything a modern business needs to run online, from one team.",
  alternates: { canonical: "/services" },
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
            <Eyebrow dark>Services</Eyebrow>
            <h1 className="text-headline mt-4 max-w-[18ch] text-balance">
              <WordReveal text="Everything a modern business needs to" />{" "}
              <span className="brand-text">run online.</span>
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
              <Reveal className="mb-5">
                <Eyebrow>Our services</Eyebrow>
              </Reveal>
              <Reveal as="h2" delay={0.05} className="text-headline max-w-[16ch] text-balance">
                Digital services to help your <span className="brand-text">business grow.</span>
              </Reveal>
            </div>
            <Reveal as="p" delay={0.1} className="text-copy text-mute md:max-w-[46ch]">
              From high-performance websites to custom software, we build digital products that solve real problems and
              create long-term value.
            </Reveal>
          </div>

          {/* card grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal
                as="div"
                key={s.slug}
                delay={(i % 3) * 0.06}
                amount={0.15}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-visible rounded-3xl bg-white px-8 pb-8 pt-9 ring-1 ring-ink/[0.05] transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(20,4,12,0.28)] hover:ring-brand-pink/25"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span aria-hidden className="mb-3 block h-[3px] w-7 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange" />
                      <span className="text-[1.15rem] font-semibold tabular-nums brand-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="pointer-events-none relative -mr-3 -mt-14 h-40 w-44 shrink-0 transition-transform duration-300 ease-apple group-hover:-translate-y-1">
                      <Image
                        src={`/services/${s.slug}-tile.png`}
                        alt=""
                        aria-hidden
                        fill
                        sizes="200px"
                        className="object-contain object-top drop-shadow-[0_18px_28px_rgba(220,30,80,0.16)]"
                      />
                    </div>
                  </div>

                  <h3 className="text-title mt-1">{s.title}</h3>
                  <p className="mt-3 text-copy text-mute">{s.lead}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.stack.slice(0, 3).map((t) => (
                      <li key={t} className="rounded-full bg-fog px-3 py-1 text-fine text-graphite ring-1 ring-ink/[0.06]">
                        {t}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 pt-1 text-[15px] font-medium text-brand-pink">
                    Learn more
                    <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* stats band */}
          <Reveal amount={0.2} className="mt-14">
            <div className="relative isolate overflow-hidden rounded-3xl bg-ink text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{ background: "radial-gradient(60% 120% at 12% 50%, rgba(255,15,106,0.22), transparent 60%)" }}
              />
              <dl className="grid gap-y-10 divide-white/10 px-8 py-10 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:px-4">
                {stats.map((st) => (
                  <div key={st.label} className="flex items-center gap-4 px-2 sm:justify-center lg:px-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-pink/15 text-brand-pink">
                      <st.icon className="size-5" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <dd className="text-[1.9rem] font-semibold leading-none tracking-[-0.02em]">{st.value}</dd>
                      <dt className="mt-1.5 text-fine text-white/60">{st.label}</dt>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <ProcessExplorer />

      <Cta />
    </>
  );
}
