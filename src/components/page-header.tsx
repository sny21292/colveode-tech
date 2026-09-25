import { WordReveal, Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

/** Inner-page opener: black, big headline, one supporting line. */
export function PageHeader({ title, lede, children }: { title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className="bg-ink pb-10 pt-24 text-white md:pb-14 md:pt-28">
      <div className="wrap">
        <h1 className="text-headline max-w-[20ch] text-balance">
          <WordReveal text={title} delay={0.1} />
        </h1>
        {lede && (
          <Reveal as="p" delay={0.4} className="text-lede mt-5 max-w-[44ch] text-white/70">
            {lede}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
