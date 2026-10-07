import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { BlogExplorer } from "@/components/blog-explorer";
import { Cta } from "@/components/cta";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and updates on web development, blockchain, APIs and SaaS from the Cloveode Technologies team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white md:flex md:h-[30rem] md:items-center">
        <div className="wrap relative grid items-center gap-8 pb-10 pt-24 md:w-full md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:py-0">
          <div className="relative z-10">
            <Reveal as="h1" delay={0.08} className="text-headline max-w-[20ch] text-balance">
              <span className="brand-text">Blog</span> posts
            </Reveal>
            <Reveal as="p" delay={0.16} className="text-lede mt-5 max-w-[40ch] text-white/70">
              Notes on web development, blockchain, APIs and SaaS from the Cloveode team.
            </Reveal>
          </div>
          <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-[18rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(closest-side at 58% 46%, rgba(255,60,120,0.42), transparent 72%)",
                filter: "blur(18px)",
              }}
            />
            <Image
              src="/blog/blog-hero.png"
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

      <BlogExplorer posts={posts} />

      <Cta />
    </>
  );
}
