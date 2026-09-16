import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

/** A large, centred paragraph that carries one idea. Apple-style section intro. */
export function Statement({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <section className={`${tone === "light" ? "bg-white text-graphite" : "bg-ink text-white"} ${className}`}>
      <div className="wrap-narrow py-24 text-center md:py-36">
        <Reveal as="p" className="text-title text-balance">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
