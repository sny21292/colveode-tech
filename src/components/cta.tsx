import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui";
import { site } from "@/content/site";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-white md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-brand-pink) 0%, var(--color-brand-orange) 40%, transparent 70%)",
        }}
      />
      <div className="wrap-narrow text-center">
        <Reveal as="h2" className="text-display text-balance">
          Let’s build something remarkable.
        </Reveal>
        <Reveal as="p" delay={0.1} className="text-lede mx-auto mt-6 max-w-[34ch] text-white/70">
          Tell us what you’re working on. We’ll reply within one business day.
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Button href="/contact">Start a project</Button>
          <a href={`mailto:${site.email}`} className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
