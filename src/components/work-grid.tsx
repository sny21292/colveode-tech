import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/ui";
import type { Project } from "@/content/projects";

export function ProjectTile({ project, large = false, tone = "light" }: { project: Project; large?: boolean; tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-mute" : "text-white/60";

  if (large) {
    return (
      <Link href={`/work/${project.slug}`} className="group block">
        <CoverArt
          hue={project.hue}
          image={project.image}
          label={project.client || project.title}
          className="aspect-[16/9] rounded-3xl ring-1 ring-ink/[0.06]"
        />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-title max-w-[28ch] text-balance font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-graphite/70">
              {project.title}
            </h3>
            <p className={`mt-2 text-fine ${muted}`}>
              {project.category}, {project.client}
            </p>
          </div>
          <span className={`shrink-0 text-fine ${muted}`}>{project.year}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col">
      <CoverArt
        hue={project.hue}
        image={project.image}
        label={project.client || project.title}
        className="aspect-[4/3] rounded-2xl ring-1 ring-ink/[0.06]"
      />
      <h3 className="mt-4 line-clamp-2 min-h-[3rem] text-copy font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 group-hover:text-graphite/70">
        {project.title}
      </h3>
      <div className={`mt-1.5 flex items-baseline justify-between gap-3 text-fine ${muted}`}>
        <span className="truncate">
          {project.client} · {project.category}
        </span>
        <span className="shrink-0 tabular-nums">{project.year}</span>
      </div>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [first, ...rest] = projects;
  return (
    <section className="bg-white py-24 text-graphite md:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="text-headline max-w-[14ch] text-balance">
            Work that carries real weight.
          </Reveal>
          <Reveal delay={0.1}>
            <TextLink href="/work" tone="light">
              All projects
            </TextLink>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16">
          <Reveal amount={0.2}>
            <ProjectTile project={first} large />
          </Reveal>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} amount={0.2}>
                <ProjectTile project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
