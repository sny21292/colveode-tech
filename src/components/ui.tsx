import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Tone = "light" | "dark";

const pill =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 h-11 text-[15px] font-medium transition-[background-color,color,transform] duration-300 ease-apple active:scale-[0.98]";

/** The one primary button style used across the whole site. */
const gradient =
  "bg-gradient-to-r from-brand-pink to-brand-orange text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] hover:scale-[1.02]";

const tones: Record<Tone, { solid: string; ghost: string; link: string }> = {
  // on dark backgrounds
  dark: {
    solid: gradient,
    ghost: "bg-white/10 text-white hover:bg-white/15 backdrop-blur",
    link: "text-white hover:text-white/80",
  },
  // on light backgrounds
  light: {
    solid: gradient,
    ghost: "bg-ink/6 text-ink hover:bg-ink/10",
    link: "text-ink hover:text-graphite/70",
  },
};

export function Button({
  href,
  tone = "dark",
  variant = "solid",
  className = "",
  children,
  ...rest
}: {
  href: string;
  tone?: Tone;
  variant?: "solid" | "ghost";
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  return (
    <Link href={href} className={`${pill} ${tones[tone][variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  tone = "dark",
  className = "",
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-0.5 text-[15px] font-medium ${tones[tone].link} ${className}`}
    >
      <span>{children}</span>
      <ChevronRight
        className="size-4 translate-y-px transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
        strokeWidth={2.25}
        aria-hidden
      />
    </Link>
  );
}

