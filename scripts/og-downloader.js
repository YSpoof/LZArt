#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

const scriptName = path.basename(import.meta.filename);
const [, , pageUrl, destPath] = process.argv;

if (!pageUrl || !destPath) {
  console.error(`Usage: ${scriptName} <page-url> <dest-path>`);
  process.exit(1);
}

try {
  const pageRes = await fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!pageRes.ok) {
    throw new Error(`Failed to fetch page (${pageRes.status})`);
  }

  const html = await pageRes.text();

  const match =
    html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i) ||
    html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);

  if (!match) {
    throw new Error("No og:image or twitter:image found");
  }

  const imageUrl = new URL(match[1], pageUrl).href;

  console.log("Found:", imageUrl);

  const imageRes = await fetch(imageUrl);

  if (!imageRes.ok) {
    throw new Error(`Failed to download image (${imageRes.status})`);
  }

  const urlPath = new URL(imageUrl).pathname;
  let ext = path.extname(urlPath);

  // Fallback to content type if URL has no extension
  if (!ext) {
    const contentType = imageRes.headers.get("content-type") ?? "";
    const subtype = contentType.split("/")[1]?.split(";")[0];

    if (subtype) {
      ext = "." + (subtype === "jpeg" ? "jpg" : subtype);
    }
  }

  const outputPath = destPath + ext;

  const file = fs.createWriteStream(outputPath);

  Readable.fromWeb(imageRes.body).pipe(file);

  await finished(file);

  console.log(`Saved as ${outputPath}`);
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}