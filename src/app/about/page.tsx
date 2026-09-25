import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Target, MessageCircle, Code2, Users, Gem, TrendingUp, Globe } from "lucide-react";
import { WordReveal, Reveal } from "@/components/reveal";
import { Cta } from "@/components/cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a software studio founded in ${site.founded} in ${site.location.city}, ${site.location.region}. We build websites, stores, blockchain systems and custom software for clients worldwide.`,
};

const values = [
  { icon: Target, title: "Care about the outcome", text: "We measure a project by what it does for your business after launch, not by the features list on day one." },
  { icon: MessageCircle, title: "Say the honest thing", text: "If a technology isn’t right for your problem, we’ll tell you, even when it means a smaller project for us." },
  { icon: Code2, title: "Build to be maintained", text: "Clean code, mainstream tools and clear handover. You should be able to find anyone to work on what we build." },
  { icon: Users, title: "Stay after the launch", text: "Most of our clients keep working with us for years. Support and iteration are part of the job, not an upsell." },
];

const stats = [
  { value: `${site.figures.projects}+`, label: "Projects shipped", desc: "From marketing websites to complex web applications." },
  { value: `${site.figures.clients}`, label: "Clients", desc: "Across finance, healthcare, e-commerce, logistics and more." },
  { value: `${site.figures.yearsExperience}+`, label: "Years of combined experience", desc: "Designing, building and supporting digital products." },
];

const approach = [
  { icon: Users, title: "Focused team", text: "A small, experienced team that works closely together." },
  { icon: Gem, title: "Quality over volume", text: "We take on fewer projects so we can do them properly." },
  { icon: TrendingUp, title: "Long-term thinking", text: "We build for what you need today and where you want to be tomorrow." },
  { icon: Globe, title: "Clients everywhere", text: "Local to the Himalayas, working with businesses around the world." },
];

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-fine font-medium uppercase tracking-[0.16em] ${dark ? "text-white/45" : "text-mute"}`}>
      <span className="h-px w-8 bg-brand-pink" />
      {children}
    </p>
  );
}

export default function AboutTwoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* full-bleed photo on the right, fading into the black */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[60%]">
          <Image
            src="/about/hero-cabin.png"
            alt="A glass studio cabin lit up at sunset in the mountains"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #0a0a0a 6%, rgba(10,10,10,0.55) 32%, transparent 62%)" }}
          />
        </div>
        <div className="wrap relative z-10 pb-10 pt-24 md:pb-14 md:pt-28">
          <div className="max-w-[40rem]">
            <Eyebrow dark>About us</Eyebrow>
            <h1 className="text-headline mt-4 max-w-[16ch] text-balance">
              <WordReveal text="A small studio with a long view." />
            </h1>
            <Reveal as="p" delay={0.4} className="text-lede mt-5 max-w-[38ch] text-white/70">
              Founded in {site.founded} in {site.location.city}, {site.location.region}, in the foothills of the
              Himalayas. Our clients are everywhere.
            </Reveal>
            <Reveal delay={0.5} className="mt-7">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-orange px-6 text-[15px] font-medium text-white shadow-[0_12px_34px_-10px_rgba(255,15,106,0.55)] transition-transform duration-300 ease-apple hover:scale-[1.02] active:scale-[0.98]"
              >
                Start a project
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap">
          <Eyebrow>Our story</Eyebrow>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <Reveal as="h2" className="text-headline max-w-[18ch] text-balance">
                We started Cloveode because too much business software is built to be sold, not to be used.
              </Reveal>
              <p className="mt-6 max-w-[48ch] text-copy text-mute">
                We wanted to build things properly: fast, secure, easy to maintain and genuinely useful to the people who
                rely on them every day.
              </p>
            </div>
            <div className="space-y-5 md:pt-2">
              <p className="text-copy text-mute">
                We’re a small, experienced team that cares deeply about well-engineered software, clear communication and
                long-term relationships.
              </p>
              <p className="text-copy text-mute">
                We work with businesses of all sizes — from ambitious startups to established companies — to help them
                build, improve and scale their digital products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-fog py-20 text-graphite md:py-28">
        <div className="wrap">
          <Eyebrow>What we hold ourselves to</Eyebrow>
          <Reveal as="h2" className="text-headline mt-4 max-w-[16ch] text-balance">
            Four values that guide everything we do.
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} as="li" delay={(i % 2) * 0.08} amount={0.3} className="flex gap-5 rounded-3xl bg-white p-7 ring-1 ring-ink/[0.05]">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink">
                  <v.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-copy font-semibold">{v.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-fine text-mute">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* By the numbers */}
      <section className="bg-white py-20 text-graphite md:py-24">
        <div className="wrap">
          <Eyebrow>By the numbers</Eyebrow>
          <Reveal as="h2" className="text-headline mt-4 max-w-[16ch] text-balance">
            Real work. Real relationships.
          </Reveal>
          <dl className="mt-12 grid gap-10 sm:grid-cols-3">
            {stats.map((st, i) => (
              <Reveal key={st.label} delay={i * 0.08} amount={0.3} className="border-t border-ink/10 pt-6">
                <dd className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-brand-pink">
                  {st.value}
                </dd>
                <dt className="mt-3 text-copy font-semibold">{st.label}</dt>
                <p className="mt-2 max-w-[28ch] text-fine text-mute">{st.desc}</p>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Where we work */}
      <section className="overflow-hidden bg-fog py-16 text-graphite md:py-24">
        <div className="wrap grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative h-64 overflow-hidden rounded-3xl ring-1 ring-ink/[0.06] md:h-[24rem]">
            <Image
              src="/about/mandi.png"
              alt="Mandi town in the Himalayan foothills at dusk"
              fill
              sizes="(max-width: 768px) 90vw, 46vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <Eyebrow>Where we work</Eyebrow>
            <Reveal as="h2" className="text-headline mt-4 max-w-[12ch] text-balance">
              Based in Mandi, built for anywhere.
            </Reveal>
            <p className="mt-6 max-w-[46ch] text-copy text-mute">
              We’re based in {site.location.city}, a small city in {site.location.region} where the Beas river meets the
              mountains. Quiet, focused, and a long way from the noise.
            </p>
            <p className="mt-4 max-w-[46ch] text-copy text-mute">
              Our clients are in India, the US, Europe and the Middle East. We work in your time zone for meetings and in
              ours for deep work, which tends to mean you wake up to progress.
            </p>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="bg-white py-20 text-graphite md:py-24">
        <div className="wrap">
          <Eyebrow>Our approach</Eyebrow>
          <Reveal as="h2" className="text-headline mt-4 max-w-[16ch] text-balance">
            A small team, a bigger perspective.
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06} amount={0.3}>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink">
                  <a.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-copy font-semibold">{a.title}</h3>
                <p className="mt-2 max-w-[26ch] text-fine text-mute">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
