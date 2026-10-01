import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { WorkExplorer } from "@/components/work-explorer";
import { Cta } from "@/components/cta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across e-commerce, blockchain, custom software, web development and SEO.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="wrap grid items-center gap-8 pb-10 pt-24 md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:pb-14 md:pt-28">
          <div className="relative z-10">
            <Eyebrow dark>Our work</Eyebrow>
            <h1 className="text-headline mt-4 max-w-[24ch] text-balance">
              <WordReveal text="Work that carries real weight." />
            </h1>
            <Reveal as="p" delay={0.4} className="text-lede mt-6 max-w-[40ch] text-white/70">
              A selection of projects across retail, logistics, healthcare, finance and services.
            </Reveal>
            <Reveal delay={0.5} className="mt-9">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
              >
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-[26rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(closest-side at 58% 46%, rgba(255,60,120,0.42), transparent 72%)",
                filter: "blur(18px)",
              }}
            />
            <Image
              src="/work/work-hero.png"
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 88vw, 40vw"
              className="object-contain object-center mix-blend-screen"
              priority
            />
          </div>
        </div>
      </section>

      <WorkExplorer projects={projects} />
      <Cta />
    </>
  );
}
