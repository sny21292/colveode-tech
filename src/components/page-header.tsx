import { WordReveal, Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

/** Inner-page opener: black, big headline, one supporting line. */
export function PageHeader({ title, lede, children }: { title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className="bg-ink pb-16 pt-36 text-white md:pb-24 md:pt-48">
      <div className="wrap">
        <h1 className="text-display max-w-[16ch] text-balance">
          <WordReveal text={title} delay={0.1} />
        </h1>
        {lede && (
          <Reveal as="p" delay={0.4} className="text-lede mt-6 max-w-[44ch] text-white/70">
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
