"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { CoverArt } from "@/components/cover-art";
import type { Project } from "@/content/projects";

export const GROUP_ORDER = [
  "Web development",
  "E-commerce",
  "Blockchain",
  "Custom software",
  "Integrations",
  "Other",
] as const;

/** Bucket a project's free-text category into one of the filter groups. */
export function groupOf(category: string): (typeof GROUP_ORDER)[number] {
  const c = category.toLowerCase();
  if (c.includes("blockchain")) return "Blockchain";
  if (c.includes("e-commerce") || c.includes("shopify") || c.includes("woocommerce")) return "E-commerce";
  if (c.includes("automation") || c.includes("integration") || c.includes("plugin") || /\bapi\b/.test(c))
    return "Integrations";
  if (c.includes("backend") || c.includes("full-stack") || c.includes("custom software")) return "Custom software";
  if (c.includes("web development") || c.includes("wordpress") || c.includes("php")) return "Web development";
  return "Other";
}

export function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-ink/[0.06] shadow-[0_1px_2px_rgba(15,15,15,0.04)] transition-[transform,box-shadow] duration-500 ease-apple hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,15,15,0.22)]"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <CoverArt hue={project.hue} image={project.image} label={project.client || project.title} className="size-full" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-fine font-medium text-brand-pink">{project.category}</span>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] text-graphite">
            {project.title}
          </h3>
          <span className="shrink-0 text-fine text-mute tabular-nums">{project.year}</span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="line-clamp-2 text-fine text-mute">{project.summary}</p>
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-graphite transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-orange group-hover:text-white"
          >
            <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkExplorer({ projects }: { projects: Project[] }) {
  const [group, setGroup] = useState<string>("All");
  const [query, setQuery] = useState("");

  // Only show filters that actually have projects, in canonical order.
  const groups = useMemo(() => {
    const present = new Set(projects.map((p) => groupOf(p.category)));
    return ["All", ...GROUP_ORDER.filter((g) => present.has(g))];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inGroup = group === "All" || groupOf(p.category) === group;
      const inSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return inGroup && inSearch;
    });
  }, [projects, group, query]);

  return (
    <section className="bg-fog py-14 text-graphite md:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {groups.map((g) => {
              const active = g === group;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`shrink-0 rounded-full px-4 h-9 text-[14px] font-medium transition-colors duration-300 ${
                    active ? "bg-ink text-white" : "bg-white text-graphite ring-1 ring-ink/[0.08] hover:bg-ink/[0.04]"
                  }`}
                >
                  {g}
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
              placeholder="Search projects…"
              className="h-11 w-full rounded-full bg-white pl-10 pr-4 text-[15px] text-graphite ring-1 ring-ink/[0.08] outline-none transition placeholder:text-mute focus:ring-2 focus:ring-ink/20"
            />
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-copy text-mute">No projects match that search yet.</p>
        ) : (
          <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.li layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <WorkCard project={p} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
