"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus, Clock, Briefcase, Box, ShieldCheck, Headphones, Monitor, type LucideIcon } from "lucide-react";
import { faq } from "@/content/faq";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";

const ICONS: LucideIcon[] = [Clock, Briefcase, Box, ShieldCheck, Headphones, Monitor];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative isolate overflow-hidden bg-fog py-20 text-graphite md:py-28">
      <div className="wrap grid gap-12 md:grid-cols-[0.88fr_1.12fr] md:gap-16">
        {/* Left: intro + artwork */}
        <div>
          <Reveal className="mb-5">
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal as="h2" delay={0.05} className="text-headline max-w-[12ch] text-balance">
            Questions we hear <span className="brand-text">most.</span>
          </Reveal>
          <Reveal as="p" delay={0.12} className="text-copy mt-5 max-w-[42ch] text-mute">
            Quick answers to common questions about our services, process and support. Still have a question?
            We’re here to help.
          </Reveal>
          <Reveal delay={0.18} className="relative mt-8 hidden aspect-[4/3] max-w-[26rem] md:block">
            <Image
              src="/backgrounds/faq-art.jpg"
              alt=""
              aria-hidden
              fill
              sizes="40vw"
              className="object-contain object-center"
              style={{
                maskImage: "radial-gradient(72% 72% at 50% 52%, #000 56%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(72% 72% at 50% 52%, #000 56%, transparent 100%)",
              }}
            />
          </Reveal>
        </div>

        {/* Right: accordion cards */}
        <div className="space-y-3">
          {faq.map((item, i) => {
            const isOpen = open === i;
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                as="div"
                key={item.q}
                delay={Math.min(i, 4) * 0.05}
                amount={0.2}
                className={`rounded-2xl ring-1 transition-colors duration-300 ${
                  isOpen ? "bg-brand-pink/[0.05] ring-brand-pink/20" : "bg-white ring-ink/[0.06]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex w-full items-center gap-4 p-5 text-left"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                      <Icon className="size-5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="flex-1 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em]">
                      {item.q}
                    </span>
                    <span
                      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-brand-pink/10 text-brand-pink" : "bg-ink/[0.05] text-graphite"
                      }`}
                    >
                      {isOpen ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[64ch] pb-5 pl-[3.5rem] pr-5 text-copy text-mute">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
