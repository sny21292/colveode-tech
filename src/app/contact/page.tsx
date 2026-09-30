import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, WordReveal } from "@/components/reveal";
import { Eyebrow } from "@/components/eyebrow";
import { ContactForm } from "./contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Tell us what you’re working on and we’ll reply within one business day.`,
};

const EmailIcon = (
  <svg viewBox="0 0 74 74" fill="none" className="size-12 shrink-0" aria-hidden>
    <circle cx="37" cy="37" r="37" fill="#FDE8EF" />
    <rect x="19" y="27" width="36" height="25" rx="3" stroke="#F20D5C" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M20 29L37 42L54 29" stroke="#F20D5C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = (
  <svg viewBox="0 0 74 74" fill="none" className="size-12 shrink-0" aria-hidden>
    <circle cx="37" cy="37" r="37" fill="#FDE8EF" />
    <path
      d="M37 18C29.27 18 23 24.27 23 32C23 42.5 37 56 37 56C37 56 51 42.5 51 32C51 24.27 44.73 18 37 18Z"
      fill="#F20D5C"
    />
    <circle cx="37" cy="32" r="5" fill="#FDE8EF" />
  </svg>
);

const BoltIcon = (
  <svg viewBox="0 0 64 64" fill="none" className="size-11 shrink-0" aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#280014" />
    <path d="M35.5 13L21 34H30L27.5 51L43 28H34L35.5 13Z" fill="#FF315D" />
  </svg>
);

const PeopleIcon = (
  <svg viewBox="0 0 64 64" fill="none" className="size-11 shrink-0" aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#280014" />
    <circle cx="25" cy="25" r="5" fill="#FF315D" />
    <path d="M15.5 43C15.5 36.8 19.5 33 25 33C30.5 33 34.5 36.8 34.5 43" fill="#FF315D" />
    <circle cx="39" cy="25" r="5" fill="#FF315D" />
    <path d="M29 43C29 36.8 33 33 38.5 33C44 33 48 36.8 48 43" fill="#FF315D" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 64 64" fill="none" className="size-11 shrink-0" aria-hidden>
    <circle cx="32" cy="32" r="32" fill="#280014" />
    <path
      d="M32 15L46 20V30.5C46 39.5 40.2 46.7 32 50C23.8 46.7 18 39.5 18 30.5V20L32 15Z"
      fill="#FF315D"
    />
    <path d="M25.5 31.5L30 36L39 26.5" stroke="#19000D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  { icon: BoltIcon, title: "Quick response", sub: "Within 1 business day" },
  { icon: PeopleIcon, title: "Direct collaboration", sub: "Work with our team" },
  { icon: ShieldIcon, title: "Confidential", sub: "Your information is safe" },
];

const steps = [
  { n: "01", title: "Share your idea", desc: "Tell us about your project and your goals." },
  { n: "02", title: "We’ll get in touch", desc: "We’ll reply within one business day with questions or a plan." },
  { n: "03", title: "Let’s build", desc: "Once aligned, we’ll get started and keep you updated." },
];

const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: (
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.25 8.25h4.5V24h-4.5V8.25Zm7.5 0h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.99c0-1.67-.03-3.82-2.33-3.82-2.33 0-2.69 1.82-2.69 3.7V24h-4.5V8.25Z" />
    ),
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 2.88A6.96 6.96 0 1 0 12 19a6.96 6.96 0 0 0 0-13.92Zm0 11.48a4.52 4.52 0 1 1 0-9.04 4.52 4.52 0 0 1 0 9.04Zm7.24-11.75a1.63 1.63 0 1 1-3.25 0 1.63 1.63 0 0 1 3.25 0Z" />
    ),
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    icon: (
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    ),
  },
];

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-center gap-4 py-5">
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        <span className="mt-0.5 block whitespace-pre-line text-copy text-mute">{value}</span>
      </span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/[0.05] text-graphite transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
        <ArrowUpRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

export default function ContactPage() {
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${site.location.city}, ${site.location.region} ${site.location.postalCode}, ${site.location.country}`,
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* warm maroon glow behind the blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[60%] md:block"
          style={{
            background: "radial-gradient(58% 66% at 72% 48%, rgba(198,26,74,0.5), rgba(96,14,44,0.32) 44%, transparent 74%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 hidden w-[52%] -translate-y-1/2 md:block lg:w-[46%]"
        >
          <Image
            src="/backgrounds/contact-molecule.png"
            alt=""
            width={1671}
            height={941}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <div className="wrap relative z-10 pb-10 pt-24 md:pb-14 md:pt-28">
          <div className="max-w-[44rem]">
            <Eyebrow dark>Contact us</Eyebrow>
            <h1 className="text-headline mt-4 max-w-[15ch] text-balance">
              <WordReveal text="Tell us what you’re building" />
              <span className="brand-text">.</span>
            </h1>
            <Reveal as="p" delay={0.4} className="text-lede mt-5 max-w-[42ch] text-white/70">
              A few sentences is enough to start. We’ll reply within one business day with questions or a plan.
            </Reveal>
            <Reveal delay={0.5} className="mt-9 flex flex-wrap gap-x-6 gap-y-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-center gap-3">
                  {f.icon}
                  <div>
                    <p className="text-fine font-semibold">{f.title}</p>
                    <p className="text-fine text-white/50">{f.sub}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-fog py-12 text-graphite md:py-16">
        <div className="wrap grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Get in touch */}
          <Reveal className="relative isolate overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(15,15,15,0.04)] ring-1 ring-ink/[0.06] md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 -z-10 size-72 rounded-full opacity-80 blur-3xl"
              style={{
                background: "radial-gradient(closest-side, rgba(255,120,150,0.5), rgba(255,160,110,0.3) 55%, transparent 78%)",
              }}
            />
            <div className="relative">
              <h2 className="text-headline">Get in touch</h2>
              <p className="mt-3 max-w-[34ch] text-copy text-mute">
                Have a project in mind or just want to explore ideas? We’d love to hear from you.
              </p>

              <div className="mt-8 divide-y divide-ink/[0.08]">
                <ContactRow icon={EmailIcon} label="Email" value={site.email} href={`mailto:${site.email}`} />
                <ContactRow
                  icon={PinIcon}
                  label="Our studio"
                  value={`${site.location.city}, ${site.location.region} ${site.location.postalCode}\n${site.location.country}`}
                  href={mapsUrl}
                />
              </div>

              <hr className="my-8 border-ink/[0.08]" />

              <h3 className="text-copy font-semibold">Follow us</h3>
              <p className="mt-1 text-copy text-mute">See what we’re working on and get updates.</p>
              <div className="mt-4 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center rounded-xl bg-ink/[0.05] text-graphite transition-colors duration-300 hover:bg-ink hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Send us a message */}
          <Reveal delay={0.1} className="relative isolate overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(15,15,15,0.04)] ring-1 ring-ink/[0.06] md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 -z-10 size-80 rounded-full opacity-80 blur-3xl"
              style={{
                background: "radial-gradient(closest-side, rgba(255,130,170,0.5), rgba(255,150,110,0.28) 55%, transparent 78%)",
              }}
            />
            <div className="relative">
              <h2 className="text-headline">Send us a message</h2>
              <p className="mt-3 max-w-[48ch] text-copy text-mute">
                Tell us about your project and we’ll get back to you within one business day.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Process strip */}
        <div className="wrap mt-6">
          <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-ink/[0.06] md:px-10">
            <ol className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              {steps.map((s, i) => (
                <li key={s.n} className="contents">
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-pink text-[13px] font-semibold text-white ring-4 ring-brand-pink/15">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-copy font-semibold">{s.title}</h3>
                      <p className="mt-1 max-w-[28ch] text-fine text-mute">{s.desc}</p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowUpRight aria-hidden className="hidden size-5 rotate-45 justify-self-center text-mute md:block" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
