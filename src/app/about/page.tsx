import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Statement } from "@/components/statement";
import { Reveal } from "@/components/reveal";
import { Figures } from "@/components/figures";
import { Cta } from "@/components/cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a software studio founded in ${site.founded} in ${site.location.city}, ${site.location.region}. We build websites, stores, blockchain systems and custom software for clients worldwide.`,
};

const values = [
  {
    title: "Care about the outcome",
    text: "We measure a project by what it does for your business after launch, not by the feature list on day one.",
  },
  {
    title: "Say the honest thing",
    text: "If a technology isn’t right for your problem, we’ll tell you, even when it means a smaller project for us.",
  },
  {
    title: "Build to be maintained",
    text: "Clean code, mainstream tools and clear handover. You should be able to hire anyone to work on what we build.",
  },
  {
    title: "Stay after the launch",
    text: "Most of our clients keep working with us for years. Support and iteration are part of the job, not an upsell.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A small studio with a long view."
        lede={`Founded in ${site.founded} in ${site.location.city}, ${site.location.region}, in the foothills of the Himalayas. Our clients are everywhere.`}
      />
      <Statement>
        We started Cloveode because too much business software is built to be sold, not to be used. We
        wanted to build things properly: fast, secure, easy to maintain and genuinely useful to the people
        who rely on them every day.
      </Statement>
      <section className="bg-fog py-24 text-graphite md:py-32">
        <div className="wrap">
          <Reveal as="h2" className="text-headline max-w-[14ch] text-balance">
            What we hold ourselves to.
          </Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={(i % 2) * 0.08} amount={0.3} className="border-t border-ink/10 pt-6">
                <h3 className="text-title">{v.title}</h3>
                <p className="mt-3 max-w-[44ch] text-copy text-mute">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Figures />
      <section className="bg-white py-24 text-graphite md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-2 md:gap-24">
          <Reveal as="h2" className="text-headline max-w-[12ch] text-balance">
            Where we work.
          </Reveal>
          <div className="space-y-6">
            <Reveal as="p" className="text-lede max-w-[40ch]">
              We’re based in {site.location.city}, a small city in {site.location.region} where the Beas
              river meets the mountains. Quiet, focused, and a long way from the noise.
            </Reveal>
            <Reveal as="p" delay={0.1} className="text-copy max-w-[52ch] text-mute">
              Our clients are in India, the US, Europe and the Middle East. We work in your time zone for
              meetings and in ours for deep work, which tends to mean you wake up to progress.
            </Reveal>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
