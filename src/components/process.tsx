"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { process } from "@/content/process";
import { Reveal } from "@/components/reveal";

/**
 * Pinned scrollytelling: the heading and the big step number stay put while
 * the four steps scroll past on the right. The number crossfades as each
 * step reaches the middle of the viewport.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.6 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(process.length - 1, Math.max(0, Math.floor(v * process.length + 0.0001)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section className="bg-ink py-20 text-white md:py-24">
      <div className="wrap">
        <Reveal as="h2" className="text-headline max-w-[18ch] text-balance">
          How a project moves from idea to launch.
        </Reveal>
      </div>

      <div ref={ref} className="wrap mt-10 grid gap-10 md:grid-cols-2 md:gap-20">
        {/* pinned column */}
        <div className="relative hidden md:block">
          <div className="sticky top-[34vh]">
            <div className="relative h-[8rem] overflow-hidden">
              {process.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="absolute inset-0 flex items-baseline gap-5"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    y: active === i ? 0 : active > i ? -40 : 40,
                    filter: active === i ? "blur(0px)" : "blur(6px)",
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  aria-hidden={active !== i}
                >
                  <span className="brand-text text-[7rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-title">{step.title}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 h-px w-full bg-white/10">
              <motion.div className="h-full w-full origin-left bg-white" style={{ scaleX: lineScale }} />
            </div>
          </div>
        </div>

        {/* scrolling steps */}
        <ol className="flex flex-col">
          {process.map((step, i) => (
            <li key={step.title} className="flex min-h-[34vh] flex-col justify-center border-t border-white/10 py-8 first:border-t-0 md:min-h-[42vh]">
              <div className="flex items-baseline gap-4 md:hidden">
                <span className="brand-text text-6xl font-semibold leading-none tracking-[-0.05em] tabular-nums">
                  {i + 1}
                </span>
                <h3 className="text-title">{step.title}</h3>
              </div>
              <h3 className="text-title hidden md:block">{step.title}</h3>
              <motion.p
                className="mt-4 max-w-[38ch] text-lede text-white/80"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0.6 }}
                transition={{ duration: 0.5 }}
              >
                {step.text}
              </motion.p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
