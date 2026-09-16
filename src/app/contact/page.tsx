import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "./contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Tell us what you’re working on and we’ll reply within one business day.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Tell us what you’re building."
        lede="A few sentences is enough to start. We’ll reply within one business day with questions or a plan."
      />
      <section className="bg-white py-20 text-graphite md:py-28">
        <div className="wrap grid gap-16 md:grid-cols-[1fr_1.5fr] md:gap-24">
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-fine font-semibold">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-title break-all hover:text-mute">
                {site.email}
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-fine font-semibold">Studio</h2>
              <p className="mt-2 text-copy text-mute">
                {site.location.city}, {site.location.region} {site.location.postalCode}
                <br />
                {site.location.country}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-fine font-semibold">Elsewhere</h2>
              <ul className="mt-2 space-y-1.5 text-copy">
                <li><a className="text-mute hover:text-graphite" href={site.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
                <li><a className="text-mute hover:text-graphite" href={site.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a className="text-mute hover:text-graphite" href={site.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1} amount={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
