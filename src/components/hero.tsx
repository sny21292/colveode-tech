"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Metaballs } from "@/components/metaballs";
import { WordReveal } from "@/components/reveal";
import { Button, TextLink } from "@/components/ui";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const blobScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      <motion.div
        style={reduced ? undefined : { y: blobY, scale: blobScale }}
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] top-0"
      >
        <Metaballs className="size-full" />
      </motion.div>

      {/* soft floor so the blob doesn’t clip harshly against the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={reduced ? undefined : { y: textY, opacity: textOpacity }}
        className="wrap relative z-10 flex min-h-[100svh] flex-col items-center pt-32 text-center md:pt-40"
      >
        <h1 className="text-display max-w-[14ch] text-balance">
          <WordReveal text={site.tagline} delay={0.15} />
        </h1>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="text-lede mt-6 max-w-[38ch] text-balance text-white/80"
        >
          Websites, online stores, blockchain systems and custom software for companies that want to move
          fast and last long.
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          <Button href="/contact">Start a project</Button>
          <TextLink href="/work">See our work</TextLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
