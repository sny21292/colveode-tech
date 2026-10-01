"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent, type MotionValue } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Target,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  PenTool,
  Settings,
  CheckCircle2,
  Rocket,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { process } from "@/content/process";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";

const STEP_ICONS: LucideIcon[][] = [
  [Target, Users, FileText], // Discover
  [BarChart3, Users, Lightbulb], // Research
  [PenTool, Settings, CheckCircle2], // Build
  [Rocket, BarChart3, LifeBuoy], // Launch
];

const STEP_ART = [
  "/process/discover-v2.webp",
  "/process/research.webp",
  "/process/build.webp",
  "/process/launch.webp",
];

function Timeline({
  active,
  progress,
  onSelect,
}: {
  active: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="relative">
      {/* connecting line + progress fill — spans from the first dot centre to the last */}
      <span aria-hidden className="absolute left-[0.6875rem] top-[0.6875rem] bottom-[0.6875rem] w-px bg-ink/10" />
      <motion.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute left-[0.6875rem] top-[0.6875rem] bottom-[0.6875rem] w-px origin-top bg-gradient-to-b from-brand-pink to-brand-orange"
      />
      {process.map((step, i) => {
        const isActive = i === active;
        return (
          <li key={step.title} className={i === process.length - 1 ? "" : "pb-14 sm:pb-16"}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "step" : undefined}
              className="group flex items-center gap-4 text-left"
            >
              <span
                className={`relative z-10 flex size-[1.375rem] shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300 ${
                  isActive
                    ? "bg-brand-pink ring-brand-pink"
                    : "bg-fog ring-ink/15 group-hover:ring-brand-pink/50"
                }`}
              >
                <span
                  className={`size-2 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-white" : "bg-transparent"
                  }`}
                />
              </span>
              <span className="flex items-baseline gap-3">
                <span
                  className={`text-[0.95rem] font-semibold tabular-nums transition-colors duration-300 ${
                    isActive ? "text-brand-pink" : "text-mute"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-[1.15rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                    isActive ? "text-graphite" : "text-mute group-hover:text-graphite"
                  }`}
                >
                  {step.title}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Detail({ active, onPrev, onNext }: { active: number; onPrev: () => void; onNext: () => void }) {
  const reduce = useReducedMotion();
  const step = process[active];
  const icons = STEP_ICONS[active];

  return (
    <div>
      <p className="text-fine font-semibold tabular-nums text-mute">
        <span className="text-brand-pink">{String(active + 1).padStart(2, "0")}</span> / {String(process.length).padStart(2, "0")}
      </p>

      <div className="relative mt-4 min-h-[19rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <h3 className="text-title font-semibold tracking-[-0.02em] text-graphite">{step.title}</h3>
            <p className="mt-3 max-w-[42ch] text-copy text-mute">{step.text}</p>

            <ul className="mt-7 space-y-5">
              {step.steps.map((sub, i) => {
                const Icon = icons[i] ?? Target;
                return (
                  <li key={sub.title} className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-pink/10 text-brand-pink">
                      <Icon className="size-[1.1rem]" strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <p className="text-copy font-semibold text-graphite">{sub.title}</p>
                      <p className="mt-0.5 text-fine text-mute">{sub.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={active === 0}
          aria-label="Previous step"
          className="flex size-11 items-center justify-center rounded-full bg-white text-graphite ring-1 ring-ink/[0.1] transition-colors duration-300 enabled:hover:bg-ink/[0.04] enabled:hover:text-brand-pink disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={active === process.length - 1}
          aria-label="Next step"
          className="flex size-11 items-center justify-center rounded-full bg-gradient-to-r from-brand-pink to-brand-orange text-white shadow-[0_10px_28px_-10px_rgba(255,15,106,0.6)] transition-transform duration-300 ease-apple enabled:hover:scale-[1.05] enabled:active:scale-[0.97] disabled:opacity-40"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* Per-step illustration (transparent PNGs with baked pink blobs), crossfading with the active step. */
function DashboardArt({ active }: { active: number }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="relative aspect-[3/2] w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={STEP_ART[active]}
            alt=""
            fill
            sizes="(max-width: 1024px) 88vw, 46vw"
            className="object-contain object-center"
            priority={active === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Mobile / tablet: a clean stacked list — no scroll-pinning. */
function MobileProcess() {
  return (
    <section className="bg-fog text-graphite lg:hidden">
      <div className="wrap py-20 md:py-24">
        <Reveal className="mb-5">
          <Eyebrow>Our process</Eyebrow>
        </Reveal>
        <Reveal as="h2" delay={0.05} className="text-headline max-w-[14ch] text-balance">
          How a project moves from <span className="brand-text">idea to launch.</span>
        </Reveal>
        <Reveal as="p" delay={0.1} className="text-copy mt-5 max-w-[40ch] text-mute">
          A clear and collaborative process that turns ideas into real, working products.
        </Reveal>

        <ol className="mt-12 space-y-16">
          {process.map((step, i) => {
            const icons = STEP_ICONS[i];
            return (
              <Reveal as="li" key={step.title} amount={0.15}>
                <div className="relative mx-auto aspect-[3/2] w-full max-w-md">
                  <Image
                    src={STEP_ART[i]}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 768px) 92vw, 60vw"
                    className="object-contain"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span aria-hidden className="h-[3px] w-7 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange" />
                  <span className="text-[0.95rem] font-semibold tabular-nums brand-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fine font-semibold tabular-nums text-mute">
                    / {String(process.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-title mt-3">{step.title}</h3>
                <p className="mt-3 text-copy text-mute">{step.text}</p>
                <ul className="mt-6 space-y-5">
                  {step.steps.map((sub, j) => {
                    const Icon = icons[j] ?? Target;
                    return (
                      <li key={sub.title} className="flex items-start gap-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-pink/10 text-brand-pink">
                          <Icon className="size-[1.1rem]" strokeWidth={2} aria-hidden />
                        </span>
                        <div>
                          <p className="text-copy font-semibold text-graphite">{sub.title}</p>
                          <p className="mt-0.5 text-fine text-mute">{sub.text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* Large screens: pinned, scroll-driven explorer. */
function DesktopProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(process.length - 1, Math.max(0, Math.floor(p * process.length)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const scrollToStep = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const clamped = Math.min(process.length - 1, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + ((clamped + 0.5) / process.length) * travel;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-fog text-graphite lg:block"
      style={{ height: `${process.length * 100}vh` }}
    >
      <div className="sticky top-0 flex min-h-screen items-center">
        <div className="wrap w-full">
          {/* header */}
          <div className="grid gap-x-16 gap-y-4 lg:grid-cols-2">
            <div>
              <Eyebrow>Our process</Eyebrow>
              <h2 className="text-headline mt-5 max-w-[24ch] text-balance">
                How a project moves from <span className="brand-text">idea to launch.</span>
              </h2>
            </div>
            <p className="text-copy max-w-[40ch] text-mute lg:self-end lg:pl-4 lg:text-right">
              A clear and collaborative process that turns ideas into real, working products.
            </p>
          </div>

          {/* body */}
          <div className="mt-12 grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-10">
              <Timeline active={active} progress={scrollYProgress} onSelect={scrollToStep} />
              <Detail active={active} onPrev={() => scrollToStep(active - 1)} onNext={() => scrollToStep(active + 1)} />
            </div>

            <div className="self-center">
              <DashboardArt active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessExplorer() {
  return (
    <>
      <MobileProcess />
      <DesktopProcess />
    </>
  );
}
