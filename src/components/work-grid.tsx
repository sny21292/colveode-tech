"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { WorkCard, groupOf, GROUP_ORDER } from "@/components/work-explorer";
import type { Project } from "@/content/projects";

function FeaturedCard({ project }: { project: Project }) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-ink text-white ring-1 ring-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-3/4"
        style={{ background: "radial-gradient(62% 72% at 82% 42%, rgba(255,15,106,0.24), transparent 72%)" }}
      />
      <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:gap-4 md:p-12">
        <div>
          <p className="text-fine font-medium uppercase tracking-[0.16em] text-brand-pink">{project.category}</p>
          <h3 className="mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-balance">
            {project.client}
          </h3>
          {project.tagline && <p className="mt-4 max-w-[38ch] text-copy text-white/70">{project.tagline}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-brand-pink px-5 text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(255,15,106,0.7)] transition-[transform,filter] duration-300 ease-apple hover:brightness-110 active:scale-[0.98]"
            >
              View project
              <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
            </Link>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-[15px] font-medium text-white backdrop-blur transition-colors duration-300 ease-apple hover:border-white/45 hover:bg-white/10"
              >
                Live site
                <ArrowUpRight className="size-4 transition-transform duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
          {project.location && <p className="mt-6 text-fine text-white/45">{project.location}</p>}
        </div>

        <div className="relative h-56 sm:h-72 md:h-80">
          {(project.heroMockup || project.image) && (
            <Image
              src={project.heroMockup ?? project.image ?? ""}
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, 42vw"
              className="object-contain object-center"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;
  const [group, setGroup] = useState<string>("All");

  const groups = useMemo(() => {
    const present = new Set(rest.map((p) => groupOf(p.category)));
    return ["All", ...GROUP_ORDER.filter((g) => present.has(g))];
  }, [rest]);

  const filtered = useMemo(
    () => (group === "All" ? rest : rest.filter((p) => groupOf(p.category) === group)),
    [rest, group],
  );

  return (
    <section className="bg-fog py-20 text-graphite md:py-28">
      <div className="wrap">
        {/* header */}
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <Reveal className="mb-5">
              <span className="flex items-center gap-3 text-fine font-medium uppercase tracking-[0.16em] text-mute">
                <span aria-hidden className="h-px w-8 bg-brand-pink" />
                Our work
              </span>
            </Reveal>
            <Reveal as="h2" delay={0.05} className="text-headline max-w-[16ch] text-balance">
              Work that carries <span className="text-brand-pink">real weight.</span>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:pb-2">
            <p className="text-copy max-w-[42ch] text-mute">
              A selection of projects we’ve built for brands, businesses and ambitious teams across different
              industries.
            </p>
            <Link
              href="/work"
              className="group mt-5 inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[14px] font-medium text-graphite ring-1 ring-ink/[0.1] transition-colors hover:bg-ink/[0.04]"
            >
              All projects
              <ChevronRight className="size-4 text-brand-pink transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* filter pills */}
        <Reveal delay={0.15} className="no-scrollbar -mx-1 mt-8 flex gap-2 overflow-x-auto px-1 pb-1">
          {groups.map((g) => {
            const active = g === group;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={`shrink-0 rounded-full px-4 h-9 text-[14px] font-medium transition-colors duration-300 ${
                  active ? "bg-brand-pink text-white" : "bg-white text-graphite ring-1 ring-ink/[0.08] hover:bg-ink/[0.04]"
                }`}
              >
                {g}
              </button>
            );
          })}
        </Reveal>

        {/* featured project (only on the full view) */}
        {group === "All" && featured && (
          <Reveal amount={0.15} className="mt-8">
            <FeaturedCard project={featured} />
          </Reveal>
        )}

        {/* grid */}
        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-copy text-mute">No projects in that category yet.</p>
        ) : (
          <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.li layout key={p.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <WorkCard project={p} />
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* view all */}
        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
