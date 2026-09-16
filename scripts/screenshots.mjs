#!/usr/bin/env node
/**
 * Visual QA: screenshot pages with the local Chrome binary.
 *
 *   node scripts/screenshots.mjs [--base http://localhost:3000] [--out ./shots] [--mobile] [--full] [--scroll 1200] [paths...]
 *
 * --full stitches viewport-sized slices while scrolling, so scroll-linked
 * animations fire the way they do for a person. Console errors are logged per page.
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const BOOL = new Set(["mobile", "full"]);
const flags = {};
const rest = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a.startsWith("--")) {
    const k = a.slice(2);
    if (BOOL.has(k)) flags[k] = true;
    else flags[k] = args[++i];
  } else rest.push(a);
}
const base = flags.base ?? "http://localhost:3000";
const out = flags.out ?? "./shots";
const mobile = !!flags.mobile;
const full = !!flags.full;
const scrollTo = Number(flags.scroll ?? 0);
const paths = rest.length ? rest : ["/", "/services", "/services/blockchain-development", "/work", "/about", "/contact"];

mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"],
});

const page = await browser.newPage();
const vp = mobile
  ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
  : { width: 1440, height: 900, deviceScaleFactor: 1 };
await page.setViewport(vp);
if (mobile) {
  await page.setUserAgent(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  );
}

const errors = [];
page.on("console", (m) => {
  if (["error", "warning"].includes(m.type())) errors.push(`[${m.type()}] ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));

for (const p of paths) {
  errors.length = 0;
  await page.goto(base + p, { waitUntil: "networkidle0", timeout: 60000 });
  await sleep(1800);
  const name =
    (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-")) +
    (mobile ? "-mobile" : "") +
    (scrollTo ? `-y${scrollTo}` : "") +
    (full ? "-full" : "") +
    ".png";
  const file = join(out, name);

  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollTo);
    await sleep(1400);
  }

  if (full) {
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    // Walk the page first so every in-view reveal has fired before capture.
    for (let y = 0; y < total; y += 400) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await sleep(150);
    }
    await sleep(2200);
    const slices = [];
    for (let y = 0; y < total; y += vp.height) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await sleep(900);
      if (y > 0) await page.evaluate(() => document.querySelector("header")?.style.setProperty("visibility", "hidden"));
      const buf = await page.screenshot({ type: "png" });
      slices.push({ input: buf, top: Math.round(y * vp.deviceScaleFactor), left: 0 });
      await page.evaluate(() => document.querySelector("header")?.style.removeProperty("visibility"));
    }
    const W = vp.width * vp.deviceScaleFactor;
    const H = Math.round(total * vp.deviceScaleFactor);
    // last slice overlaps the previous one when total isn't a multiple of the viewport
    const lastY = Math.max(0, total - vp.height);
    slices[slices.length - 1].top = Math.round(lastY * vp.deviceScaleFactor);
    await sharp({ create: { width: W, height: H, channels: 4, background: "#000" } })
      .composite(slices)
      .png()
      .toFile(file);
  } else {
    await page.screenshot({ path: file });
  }
  console.log(`${name}${errors.length ? `\n   ${errors.join("\n   ")}` : ""}`);
}
await browser.close();
