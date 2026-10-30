// Downloads the photos and film listed in assets-manifest.json into public/,
// then makes the small (-sm) photo versions and the iPhone home-screen icon.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const manifest = JSON.parse(await readFile(new URL("./assets-manifest.json", import.meta.url), "utf8"));
for (const [path, url] of Object.entries(manifest)) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  await mkdir(dirname(path), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path, buf);
  console.log("saved", path, buf.length);
  if (path.startsWith("public/assets/img/") && path.endsWith(".webp")) {
    const small = path.replace(/\.webp$/, "-sm.webp");
    await sharp(buf).resize(800, 800, { fit: "inside", withoutEnlargement: true }).webp({ quality: 74 }).toFile(small);
    console.log("saved", small);
  }
}
await sharp("public/assets/brand/favicon.svg", { density: 300 }).resize(180, 180).png().toFile("public/assets/brand/apple-touch-icon.png");
console.log("saved apple-touch-icon");
