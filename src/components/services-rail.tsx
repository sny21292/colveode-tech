"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { services } from "@/content/services";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/ui";

export function ServicesRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const { scrollXProgress } = useScroll({ container: railRef });
  const progress = useSpring(scrollXProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-fog py-24 text-graphite md:py-32">
      <div className="wrap flex flex-wrap items-end justify-between gap-6">
        <Reveal as="h2" className="text-headline max-w-[16ch] text-balance">
          Everything a modern business needs to run online.
        </Reveal>
        <Reveal delay={0.1} className="flex items-center gap-6">
          <TextLink href="/services" tone="light">
            All services
          </TextLink>
        </Reveal>
      </div>

      <div
        ref={railRef}
        data-lenis-prevent
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-82.5rem)/2+2.5rem))] pb-4 [scroll-padding-inline:max(1.25rem,calc((100vw-82.5rem)/2+2.5rem))]"
      >
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            data-card
            className="group relative flex h-[30rem] w-[19.5rem] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl bg-graphite p-8 text-white transition-transform duration-500 ease-apple hover:-translate-y-1 md:h-[34rem] md:w-[24rem]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-12 h-[42%] transition-transform duration-700 ease-apple group-hover:scale-[1.06] md:top-14"
            >
              <Image
                src={`/services/${s.slug}.png`}
                alt=""
                fill
                sizes="24rem"
                className="object-contain object-center mix-blend-screen"
              />
            </div>
            <div className="relative">
              <p className="text-fine text-white/55">
                {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </p>
            </div>
            <div className="relative">
              <h3 className="text-title text-balance">{s.title}</h3>
              <p className="mt-3 max-w-[26ch] text-copy text-white/70">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-0.5 text-[15px] font-medium">
                Learn more
                <ChevronRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
        <div className="w-[max(1.25rem,calc((100vw-82.5rem)/2+2.5rem))] shrink-0" aria-hidden />
      </div>

      <div className="wrap mt-6 flex items-center justify-between gap-6">
        <div className="relative h-px flex-1 bg-ink/10">
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
            style={{ scaleX: progress }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            className="inline-flex size-10 items-center justify-center rounded-full bg-ink/6 text-graphite transition hover:bg-ink/10 disabled:opacity-30"
            aria-label="Previous services"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            className="inline-flex size-10 items-center justify-center rounded-full bg-ink/6 text-graphite transition hover:bg-ink/10 disabled:opacity-30"
            aria-label="Next services"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
