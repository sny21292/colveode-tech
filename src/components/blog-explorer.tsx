"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import type { Post } from "@/content/blog";

function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/[0.06] shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-[transform,box-shadow] duration-500 ease-apple hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,15,15,0.22)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span className="rounded-full bg-brand-pink/10 px-2.5 py-1 text-fine font-medium text-brand-pink">
            {post.category}
          </span>
          <span className="text-fine text-mute">{post.date}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-graphite">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-fine text-mute">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-medium text-graphite">
          Read more
          <ArrowRight className="size-4 text-brand-pink transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All Posts");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const p of posts) if (!seen.includes(p.category)) seen.push(p.category);
    return ["All Posts", ...seen];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const inCat = cat === "All Posts" || p.category === cat;
      const inSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return inCat && inSearch;
    });
  }, [posts, cat, query]);

  return (
    <section className="bg-fog py-14 text-graphite md:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`shrink-0 rounded-full px-4 h-9 text-[14px] font-medium transition-colors duration-300 ${
                    active
                      ? "bg-brand-pink text-white"
                      : "bg-white text-graphite ring-1 ring-ink/[0.08] hover:bg-ink/[0.04]"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <label className="relative w-full shrink-0 lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-mute" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="h-11 w-full rounded-full bg-white pl-10 pr-4 text-[15px] text-graphite ring-1 ring-ink/[0.08] outline-none transition placeholder:text-mute focus:ring-2 focus:ring-ink/20"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-copy text-mute">No articles match that search yet.</p>
        ) : (
          <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.li layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <BlogCard post={p} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
