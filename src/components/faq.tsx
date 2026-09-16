"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faq } from "@/content/faq";
import { Reveal } from "@/components/reveal";

export function Faq({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const light = tone === "light";
  return (
    <section className={`${light ? "bg-white text-graphite" : "bg-ink text-white"} py-24 md:py-32`}>
      <div className="wrap grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <Reveal as="h2" className="text-headline max-w-[12ch] text-balance">
          Questions we hear most.
        </Reveal>
        <div className={`divide-y ${light ? "divide-ink/10" : "divide-white/10"}`}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.25rem] font-medium tracking-[-0.02em] md:text-[1.375rem]"
                  >
                    <span>{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full ${light ? "bg-ink/6" : "bg-white/10"}`}
                    >
                      <Plus className="size-4" aria-hidden />
                    </motion.span>
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
                      <p className={`max-w-[60ch] pb-7 text-copy ${light ? "text-mute" : "text-white/65"}`}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
