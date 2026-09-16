import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectTile } from "@/components/work-grid";
import { Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects across e-commerce, blockchain, custom software, web development and SEO.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work that carries real weight."
        lede="A selection of projects across retail, logistics, healthcare, finance and services."
      />
      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} amount={0.15}>
              <ProjectTile project={p} />
            </Reveal>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
