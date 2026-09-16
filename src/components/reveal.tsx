"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Reveals children with a single, restrained rise when they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  amount = 0.4,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "span";
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Word-by-word mask reveal for a headline. Used once per page, on the hero. */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: delay + i * stagger, ease }}
            aria-hidden
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
