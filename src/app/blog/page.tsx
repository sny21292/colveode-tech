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
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink pb-10 pt-24 text-white md:pb-14 md:pt-28">
        {/* neon artwork bleeding in from the right */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[62%] sm:w-[54%] md:w-[48%]">
          <Image src="/backgrounds/cta-orbits.jpg" alt="" fill sizes="50vw" className="object-cover object-right" priority />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #000 0%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.15) 62%, transparent 100%)",
            }}
          />
        </div>

        <div className="wrap relative">
          <Reveal as="h1" delay={0.08} className="text-headline max-w-[16ch] text-balance">
            <span className="brand-text">Blog</span>  posts
          </Reveal>
          <Reveal as="p" delay={0.16} className="text-lede mt-5 max-w-[40ch] text-white/70">
            Notes on web development, blockchain, APIs and SaaS from the Cloveode team.
          </Reveal>
        </div>
      </section>

      <BlogExplorer posts={posts} />

      <Cta />
    </>
  );
}
