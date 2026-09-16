import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logo, onest] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/logo-mark-480.png")),
    readFile(join(process.cwd(), "src/app/onest-600.woff")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#000",
          color: "#fff",
          fontFamily: "Onest, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={logoSrc} width={64} height={51} alt="" />
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -5, lineHeight: 1 }}>{site.tagline}</div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.7)", maxWidth: 900, lineHeight: 1.3 }}>
            Websites, online stores, blockchain systems and custom software.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Onest", data: onest, weight: 600, style: "normal" }],
    },
  );
}
