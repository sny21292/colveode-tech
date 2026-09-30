import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { ServicesRail } from "@/components/services-rail";
import { Process } from "@/components/process";
import { WorkGrid } from "@/components/work-grid";
import { Figures } from "@/components/figures";
import { TechMarquee } from "@/components/tech-marquee";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement>
        Cloveode is a software studio in the Himalayan foothills. We design and engineer websites, online
        stores, blockchain systems and custom software for companies that want it done properly.
      </Statement>
      <TechMarquee />
      <ServicesRail />
      <Process />
      <WorkGrid projects={featuredProjects} />
      <Figures />
      <Faq />
      <Cta />
    </>
  );
}
