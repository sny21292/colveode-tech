"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/reveal";

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduced) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, reduced]);
  return (
    <span ref={ref} className="brand-text tabular-nums">
      {reduced ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}

/** The company's track record, written as a sentence rather than a row of stat tiles. */
export function Figures() {
  const f = site.figures;
  return (
    <section className="bg-fog py-24 text-graphite md:py-36">
      <div className="wrap-narrow text-center">
        <Reveal as="p" className="text-headline text-balance">
          Since {site.founded} we’ve shipped <Count to={f.projects} suffix="+" /> projects for{" "}
          <Count to={f.clients} /> clients, drawing on <Count to={f.yearsExperience} suffix="+" /> years of
          combined experience.
        </Reveal>
        <Reveal as="p" delay={0.15} className="text-lede mx-auto mt-8 max-w-[40ch] text-mute">
          Finance, healthcare, e-commerce, logistics and technology. Companies of every size, with one thing
          in common: they wanted it done properly.
        </Reveal>
      </div>
    </section>
  );
}
