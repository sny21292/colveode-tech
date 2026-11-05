import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JsonLd } from "@/components/json-ld";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const homeTitle = `Web & Software Development Company | ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  verification: {
    google: "pGSWZo5-IWdXA5HCAHDq-Eojaj_OA0fGoQULKIzlyAs",
  },
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: homeTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo-mark.png`,
      image: `${site.url}/brand/logo-mark.png`,
      description: site.description,
      email: site.email,
      telephone: site.phone.tel,
      foundingDate: String(site.founded),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.location.street,
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        postalCode: site.location.postalCode,
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", ...site.location.geo },
      hasMap: site.location.mapsUrl,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
      areaServed: "Worldwide",
      sameAs: [...Object.values(site.social), site.location.mapsUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${onest.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-white">
        <JsonLd data={organizationJsonLd} />
        <SmoothScroll>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
