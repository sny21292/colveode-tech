"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { site } from "@/content/site";

const liveHost = new URL(site.url).hostname;

/**
 * Google Analytics, loaded only on the live domain so localhost, staging and
 * Vercel preview visits stay out of the reports.
 *
 * One delegated click listener tracks, without touching each link:
 * - `contact_click`: email, phone and Google Maps links (`method`)
 * - `cta_click`: any link to /contact (`label` = link text, `page` = where it was clicked)
 */
export function Analytics() {
  const [live, setLive] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hostname is only known in the browser
    setLive(window.location.hostname === liveHost);
  }, []);

  useEffect(() => {
    if (!live) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (href.startsWith("mailto:")) return trackEvent("contact_click", { method: "email", page });
      if (href.startsWith("tel:")) return trackEvent("contact_click", { method: "phone", page });
      if (/^https?:\/\/(maps\.google\.|(www\.)?google\.[^/]+\/maps)/.test(href)) {
        return trackEvent("contact_click", { method: "maps", page });
      }
      if (a.origin === window.location.origin && a.pathname === "/contact") {
        const label = (a.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60);
        return trackEvent("cta_click", { label, page });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [live]);

  return live ? <GoogleAnalytics gaId={site.analyticsId} /> : null;
}

/** Send a GA event; a no-op wherever Analytics didn’t load. */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && "dataLayer" in window) sendGAEvent("event", name, params ?? {});
}
