import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-12 text-white md:py-14">
      {/* neon glass-orbit artwork */}
      <Image
        src="/backgrounds/cta-orbits.jpg"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* vignette so the copy stays legible over the artwork */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 62% at 50% 46%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.25) 45%, transparent 78%)",
        }}
      />
      {/* hairline that catches light at the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="wrap-narrow text-center">
        <Reveal className="mb-5 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-fine font-medium text-white/75 backdrop-blur">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-pink opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-pink" />
            </span>
            Available for new projects
          </span>
        </Reveal>

        <Reveal as="h2" delay={0.05} className="text-headline text-balance [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          Let’s build something{" "}
          <span className="brand-text">remarkable.</span>
        </Reveal>

        <Reveal as="p" delay={0.12} className="text-copy mx-auto mt-4 max-w-[42ch] text-white/70">
          Tell us what you’re working on. We’ll reply within one business day — no
          forms lost, no pitch decks required.
        </Reveal>

        <Reveal delay={0.2} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-base font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a project
            <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/work"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-base font-medium text-white backdrop-blur transition-colors duration-300 ease-apple hover:border-white/45 hover:bg-white/10"
          >
            See our work
            <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={0.28} className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-fine text-white/45">
          <Mail className="size-4 text-white/40" aria-hidden />
          <span>Prefer email?</span>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-1 font-medium text-white/75 transition-colors hover:text-white"
          >
            {site.email}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
