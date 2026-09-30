import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

function Figure({ children }: { children: React.ReactNode }) {
  return <span className="brand-text tabular-nums">{children}</span>;
}

/** The company's track record, written as a sentence rather than a row of stat tiles. */
export function Figures() {
  const f = site.figures;
  return (
    <section className="bg-ink py-24 text-white md:py-36">
      <div className="wrap-narrow text-center">
        <Reveal as="p" className="text-headline text-balance">
          Since {site.founded} we’ve shipped <Figure>{f.projects}+</Figure> projects for{" "}
          <Figure>{f.clients}</Figure> clients, drawing on <Figure>{f.yearsExperience}+</Figure> years of
          combined experience.
        </Reveal>
        <Reveal as="p" delay={0.15} className="text-lede mx-auto mt-8 max-w-[40ch] text-white/60">
          Finance, healthcare, e-commerce, logistics and technology. Companies of every size, with one thing
          in common: they wanted it done properly.
        </Reveal>
      </div>
    </section>
  );
}
