import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { getPost, posts, type BlogBlock } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.excerpt,
      url: `/blog/${slug}`,
      publishedTime: Number.isNaN(Date.parse(p.date)) ? undefined : new Date(p.date).toISOString(),
    },
  };
}

/** Render the article body, grouping consecutive bullets into a list. */
function Body({ blocks }: { blocks: BlogBlock[] }) {
  const out: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (key: number) => {
    if (!bullets.length) return;
    out.push(
      <ul key={`ul-${key}`} className="my-5 space-y-2.5 pl-1">
        {bullets.map((t, j) => (
          <li key={j} className="flex gap-3 text-copy text-mute">
            <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-pink" />
            <span>{t}</span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  blocks.forEach((b, i) => {
    if (b.type === "bullet") {
      bullets.push(b.text);
      return;
    }
    flush(i);
    if (b.type === "heading") {
      out.push(
        <h2 key={i} className="mt-12 text-title first:mt-0">
          {b.text}
        </h2>,
      );
    } else if (b.type === "subheading") {
      out.push(
        <h3 key={i} className="mt-10 text-[1.35rem] font-semibold tracking-[-0.02em]">
          {b.text}
        </h3>,
      );
    } else if (b.type === "quote") {
      out.push(
        <blockquote key={i} className="my-8 border-l-2 border-brand-pink pl-6 text-lede text-graphite">
          {b.text}
        </blockquote>,
      );
    } else {
      out.push(
        <p key={i} className="mt-5 text-copy text-mute">
          {b.text}
        </p>,
      );
    }
  });
  flush(blocks.length);
  return <>{out}</>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink pb-10 pt-24 text-white md:pb-14 md:pt-28">
        <div className="wrap max-w-[52rem]">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-fine text-white/50 transition-colors hover:text-white">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 text-fine text-white/50">
            <span className="font-medium text-brand-pink">{p.category}</span>
            <span aria-hidden className="text-white/25">·</span>
            <span>{p.date}</span>
          </div>
          <h1 className="text-headline mt-4 max-w-[24ch] text-balance">
            <WordReveal text={p.title} />
          </h1>
        </div>
      </section>

      {/* Featured image */}
      <section className="bg-fog pt-10 md:pt-14">
        <div className="wrap">
          <Reveal as="div" className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-graphite ring-1 ring-ink/[0.06]">
            <Image src={p.image} alt="" fill sizes="(max-width: 1320px) 100vw, 1320px" className="object-cover" priority />
          </Reveal>
        </div>
      </section>

      {/* Article */}
      <section className="bg-fog py-14 text-graphite md:py-20">
        <div className="wrap max-w-[52rem]">
          <article>
            <Body blocks={p.body} />
          </article>
        </div>
      </section>

      {/* More posts */}
      <section className="bg-white py-16 text-graphite md:py-20">
        <div className="wrap">
          <Reveal as="h2" className="text-headline max-w-[14ch] text-balance">More from the blog</Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <Reveal
                as="div"
                key={o.slug}
                delay={i * 0.06}
                amount={0.15}
                className="h-full"
              >
              <Link
                href={`/blog/${o.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-fog ring-1 ring-ink/[0.06] transition-transform duration-500 ease-apple hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
                  <Image src={o.image} alt="" fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.04]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-fine font-medium text-brand-pink">{o.category}</span>
                  <h3 className="mt-2 line-clamp-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em]">{o.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium">
                    Read more
                    <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
