"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, smoothWheel: true, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
