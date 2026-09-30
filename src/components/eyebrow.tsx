import type { ReactNode } from "react";

/**
 * The one section/hero eyebrow used across the whole site:
 * a short pink rule + uppercase label. `dark` for use on the dark hero sections.
 */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-fine font-medium uppercase tracking-[0.16em] ${dark ? "text-white/50" : "text-mute"}`}>
      <span aria-hidden className="h-px w-8 bg-brand-pink" />
      {children}
    </p>
  );
}
