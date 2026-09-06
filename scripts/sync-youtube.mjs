import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeYouTubeCatalog, parseYouTubeFeed } from "./lib/youtube-feed.mjs";

const channelId = "UCOhxrylucgg0_WdPRFU1d_w";
const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const catalogPath = path.join(projectRoot, "data", "youtube-catalog.json");
const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

const response = await fetch(feedUrl, {
  headers: {
    accept: "application/atom+xml, application/xml;q=0.9, text/xml;q=0.8",
    "user-agent": "Ruach-Breslov-video-sync/1.0"
  },
  signal: AbortSignal.timeout(30_000)
});

if (!response.ok) throw new Error(`YouTube feed request failed with HTTP ${response.status}.`);
if (!/xml/i.test(response.headers.get("content-type") ?? "")) throw new Error("YouTube returned an unexpected feed content type.");

const feedVideos = parseYouTubeFeed(await response.text(), channelId);
const currentCatalog = JSON.parse(await readFile(catalogPath, "utf8"));
const { catalog, additions } = await mergeYouTubeCatalog(currentCatalog, feedVideos);

if (!additions.length) {
  console.log(`YouTube sync complete: ${feedVideos.length} feed entries checked; no new uploads.`);
} else {
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`YouTube sync added ${additions.length} upload(s): ${additions.map((video) => video.youtubeId).join(", ")}`);
}
