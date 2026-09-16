import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/logo";

const columns = [
  {
    title: "Services",
    links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "LinkedIn", href: site.social.linkedin, external: true },
      { label: "Instagram", href: site.social.instagram, external: true },
      { label: "Facebook", href: site.social.facebook, external: true },
      { label: site.email, href: `mailto:${site.email}`, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-fog text-graphite">
      <div className="wrap py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo className="text-graphite" />
            <p className="mt-5 text-fine text-mute">
              Websites, online stores, blockchain systems and custom software, engineered in{" "}
              {site.location.city}, {site.location.region}, and shipped worldwide.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-fine font-semibold text-graphite">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="text-fine text-mute transition-colors hover:text-graphite"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-fine text-mute transition-colors hover:text-graphite">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-ink/10 pt-6 text-[13px] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            {site.location.city}, {site.location.region} {site.location.postalCode}, {site.location.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
