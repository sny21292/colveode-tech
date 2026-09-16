import sharp from "sharp";
const src = process.argv[2] ?? "./brand-source/logo.png"; // path to the source logo PNG (transparent background)
const out = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const trimmed = await sharp(src).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("trimmed", meta.width, meta.height);
await sharp(trimmed).resize({ width: 1600 }).png({ compressionLevel: 9 }).toFile(`${out}/public/brand/logo-mark.png`);
await sharp(trimmed).resize({ width: 480 }).png().toFile(`${out}/public/brand/logo-mark-480.png`);
async function icon(size, pad, file, bg) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(trimmed).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const m = await sharp(mark).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: mark, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2) }])
    .png().toFile(file);
}
await icon(512, 0.16, `${out}/src/app/icon.png`, { r: 0, g: 0, b: 0, alpha: 1 });
await icon(180, 0.16, `${out}/src/app/apple-icon.png`, { r: 0, g: 0, b: 0, alpha: 1 });
console.log("done");
