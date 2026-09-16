import Link from "next/link";
import { CoverArt } from "@/components/cover-art";
import { Reveal } from "@/components/reveal";
import { TextLink } from "@/components/ui";
import type { Project } from "@/content/projects";

export function ProjectTile({ project, large = false, tone = "light" }: { project: Project; large?: boolean; tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-mute" : "text-white/60";
  return (
    <Link href="/work" className="group block">
      <CoverArt
        hue={project.hue}
        variant={project.variant}
        className={`rounded-3xl transition-transform duration-700 ease-apple group-hover:scale-[1.01] ${
          large ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      />
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className={`text-balance font-semibold tracking-[-0.02em] ${large ? "text-title max-w-[28ch]" : "text-[1.25rem] leading-snug max-w-[30ch]"}`}>
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
