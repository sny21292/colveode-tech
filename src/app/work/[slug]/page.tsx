import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { CoverArt } from "@/components/cover-art";
import { WorkCard } from "@/components/work-explorer";
import { TechStack } from "@/components/tech-icons";
import { Zoom } from "@/components/zoom";
import { getProject, projects, type Project } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: p.title, description: p.summary, url: `/work/${slug}` },
  };
}

/** A screenshot in a subtle browser frame. */
function BrowserShot({ project, aspect = "aspect-[16/10]" }: { project: Project; aspect?: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-graphite shadow-[0_40px_80px_-32px_rgba(15,15,15,0.45)] ring-1 ring-black/10">
      <div className="flex items-center gap-1.5 bg-ink/90 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
        <span className="size-2.5 rounded-full bg-white/25" />
      </div>
      <CoverArt hue={project.hue} image={project.image} label={project.client || project.title} className={aspect} />
    </div>
  );
}

function SectionLabel({ num, children, heading = false }: { num: string; children: ReactNode; heading?: boolean }) {
  if (heading) {
    return (
      <h3 className="flex items-baseline gap-3.5 text-[1.6rem] font-semibold leading-snug tracking-[-0.02em] text-graphite">
        <span className="text-[1.6rem] font-semibold text-brand-pink">{num}</span>
        {children}
      </h3>
    );
  }
  return (
    <p className="flex items-baseline gap-3.5 text-[1.05rem] font-medium text-graphite">
      <span className="text-[1.35rem] font-semibold text-brand-pink">{num}</span>
      {children}
    </p>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const others = projects.filter((o) => o.slug !== p.slug).slice(0, 3);
  const hasCaseStudy = !!(p.challenge || p.approach || p.results?.length);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="wrap grid items-center gap-8 pb-8 pt-20 md:grid-cols-2 md:gap-12 md:pb-10 md:pt-24">
          <div className="relative z-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-fine text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to work
            </Link>
            <p className="mt-5 text-fine font-medium uppercase tracking-[0.18em] text-white/45">{p.category}</p>
            <h1 className="text-title mt-3 max-w-[24ch] text-balance">
              <WordReveal text={p.title} />
            </h1>
            <Reveal as="p" delay={0.4} className="text-copy mt-4 max-w-[46ch] text-white/70">
              {p.summary}
            </Reveal>
            {p.link && (
              <Reveal delay={0.5} className="mt-6">
                <Link
                  href={p.link}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
                >
                  View live site
                  <ArrowUpRight className="size-4" />
                </Link>
              </Reveal>
            )}
          </div>
          <div className="relative">
            {p.heroMockup ? (
              <div className="relative aspect-[16/10] md:-mr-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background: "radial-gradient(closest-side at 55% 42%, rgba(255,40,110,0.32), transparent 70%)",
                    filter: "blur(28px)",
                  }}
                />
                <Image
                  src={p.heroMockup}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 768px) 92vw, 46vw"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-8"
                  style={{
                    background: "radial-gradient(closest-side at 60% 45%, rgba(255,60,120,0.4), transparent 72%)",
                    filter: "blur(24px)",
                  }}
                />
                <div className="relative">
                  <BrowserShot project={p} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative isolate overflow-hidden bg-fog py-10 text-graphite md:py-14">
        <Image
          src="/backgrounds/pink-blobs.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="-z-20 object-cover object-right opacity-60"
          priority
        />
        {/* fade the blobs out over the text side so the pink only shows around the showcase */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(to right, var(--color-fog) 34%, transparent 74%)" }}
        />
        <div className="wrap grid gap-12 md:grid-cols-[45%_55%] md:items-center md:gap-16">
          <div>
            <SectionLabel num="01">Overview</SectionLabel>
            {p.overview && <h2 className="text-title mt-4 max-w-[18ch] text-balance">{p.overview}</h2>}
            <div className="mt-6 space-y-5">
              {(p.body ?? [p.summary]).map((para, i) => (
                <Reveal key={i} as="p" className="text-copy max-w-[46ch] text-mute" amount={0.3}>
                  {para}
                </Reveal>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-ink/10 pt-6">
              <div>
                <dt className="text-fine text-mute">Client</dt>
                <dd className="mt-1 text-copy">{p.client}</dd>
              </div>
              <div>
                <dt className="text-fine text-mute">Year</dt>
                <dd className="mt-1 text-copy tabular-nums">{p.year}</dd>
              </div>
              <div>
                <dt className="text-fine text-mute">Service</dt>
                <dd className="mt-1 text-copy">{p.service ?? p.category}</dd>
              </div>
            </dl>
            {p.tech?.length ? (
              <div className="mt-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="flex items-center gap-3 text-fine font-medium uppercase tracking-[0.16em] text-graphite">
                    <span aria-hidden className="h-px w-8 bg-brand-pink" />
                    Technology stack
                  </span>
                  <span className="text-fine text-mute">Core technologies used to build this project.</span>
                </div>
                <div className="mt-7">
                  <TechStack tech={p.tech} />
                </div>
              </div>
            ) : null}
          </div>
          <Reveal amount={0.2}>
            <Zoom src={p.image}>
              <BrowserShot project={p} aspect="aspect-[16/9]" />
            </Zoom>
            {p.gallery?.length ? (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {p.gallery.map((g, i) => (
                  <Zoom key={i} src={g}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-graphite ring-1 ring-ink/10 transition-[transform,box-shadow] duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:shadow-lg">
                      <Image src={g} alt="" fill sizes="220px" className="object-cover object-top" />
                    </div>
                  </Zoom>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* Challenge / Approach / Results */}
      {hasCaseStudy && (
        <section className="bg-white py-10 text-graphite md:py-14">
          <div className="wrap grid gap-12 md:grid-cols-[57%_43%] md:items-center md:gap-16">
            {/* Left: case image */}
            <Reveal amount={0.2} className="relative">
              <Zoom src={p.caseImage ?? p.gallery?.[0] ?? p.image}>
                <div className="relative overflow-hidden rounded-lg ring-1 ring-black/10 shadow-[0_40px_80px_-32px_rgba(15,15,15,0.4)]">
                  <CoverArt
                    hue={p.hue}
                    image={p.caseImage ?? p.gallery?.[0] ?? p.image}
                    label={p.client || p.title}
                    className="aspect-[16/10]"
                  />
                </div>
              </Zoom>
            </Reveal>

            {/* Right: 02 / 03 / 04 stacked */}
            <div className="space-y-6">
              {p.challenge && (
                <Reveal amount={0.3}>
                  <SectionLabel num="02" heading>The challenge</SectionLabel>
                  <p className="mt-4 max-w-[46ch] text-copy text-mute">{p.challenge}</p>
                </Reveal>
              )}
              {p.approach && (
                <Reveal amount={0.3}>
                  <SectionLabel num="03" heading>Our approach</SectionLabel>
                  <p className="mt-4 max-w-[46ch] text-copy text-mute">{p.approach}</p>
                </Reveal>
              )}
              {p.results?.length ? (
                <Reveal amount={0.3}>
                  <SectionLabel num="04" heading>The results</SectionLabel>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {p.results.map((r) => (
                      <div key={r.label} className="rounded-2xl bg-fog p-5 ring-1 ring-ink/[0.06]">
                        <p className="flex items-center gap-1 text-[1.75rem] font-semibold tracking-[-0.02em] text-brand-pink">
                          <ArrowUpRight className="size-6" strokeWidth={2.5} />
                          {r.value}
                        </p>
                        <p className="mt-2 text-fine text-mute">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* More work */}
      <section className="bg-fog py-20 text-graphite md:py-28">
        <div className="wrap">
          <p className="text-fine font-medium uppercase tracking-[0.18em] text-mute">More work</p>
          <Reveal as="h2" className="text-headline mt-3 max-w-[16ch] text-balance">
            Other projects you might like
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <WorkCard key={o.slug} project={o} />
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
