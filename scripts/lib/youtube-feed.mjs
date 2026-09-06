const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const CHANNEL_ID_PATTERN = /^UC[A-Za-z0-9_-]{22}$/;

function decodeXml(value) {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"'
  };

  return value
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/i, "$1")
    .replace(/&#(x[\da-f]+|\d+);|&([a-z]+);/gi, (match, numeric, named) => {
      if (numeric) {
        const radix = numeric[0].toLowerCase() === "x" ? 16 : 10;
        const parsed = Number.parseInt(radix === 16 ? numeric.slice(1) : numeric, radix);
        const isUnicodeScalar = Number.isInteger(parsed) && parsed >= 0 && parsed <= 0x10ffff && !(parsed >= 0xd800 && parsed <= 0xdfff);
        return isUnicodeScalar ? String.fromCodePoint(parsed) : match;
      }
      return namedEntities[named.toLowerCase()] ?? match;
    });
}

function extractText(xml, tagName) {
  const escapedName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(new RegExp(`<${escapedName}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapedName}>`, "i"));
  if (!match) return "";
  const printableText = [...decodeXml(match[1])]
    .map((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint < 32 || codePoint === 127 ? " " : character;
    })
    .join("");
  return printableText.replace(/\s+/g, " ").trim();
}

function extractAttribute(xml, tagName, attributeName) {
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = xml.match(new RegExp(`<${escapedTag}\\b[^>]*>`, "i"))?.[0] ?? "";
  const escapedAttribute = attributeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(new RegExp(`\\b${escapedAttribute}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return decodeXml(match?.[1] ?? match?.[2] ?? "");
}

export function parseYouTubeFeed(xml, expectedChannelId) {
  if (typeof xml !== "string" || !xml.trim()) throw new Error("YouTube returned an empty channel feed.");
  if (!CHANNEL_ID_PATTERN.test(expectedChannelId)) throw new Error("The configured YouTube channel ID is invalid.");

  const entries = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  if (!entries.length) throw new Error("YouTube returned no public uploads; the catalog was not changed.");
  if (entries.length > 50) throw new Error("YouTube returned an unexpectedly large channel feed.");

  const videos = entries.map((entry) => {
    const youtubeId = extractText(entry, "yt:videoId");
    const channelId = extractText(entry, "yt:channelId");
    const title = extractText(entry, "title");
    const publishedAt = extractText(entry, "published");
    const rawViews = extractAttribute(entry, "media:statistics", "views");

    if (channelId !== expectedChannelId) throw new Error(`Feed entry ${youtubeId || "<unknown>"} belongs to an unexpected channel.`);
    if (!VIDEO_ID_PATTERN.test(youtubeId)) throw new Error("The channel feed contained an invalid video ID.");
    if (!title || title.length > 300) throw new Error(`Feed entry ${youtubeId} has an invalid title.`);
    if (!publishedAt || Number.isNaN(Date.parse(publishedAt))) throw new Error(`Feed entry ${youtubeId} has an invalid publication date.`);

    const views = /^\d+$/.test(rawViews) ? Number.parseInt(rawViews, 10) : 0;
    return {
      youtubeId,
      title,
      publishedAt: new Date(publishedAt).toISOString(),
      views: Number.isSafeInteger(views) ? views : 0
    };
  });

  if (new Set(videos.map((video) => video.youtubeId)).size !== videos.length) {
    throw new Error("The channel feed contained duplicate video IDs.");
  }

  return videos;
}

export async function classifyYouTubeKind(youtubeId, fetchImpl = fetch) {
  if (!VIDEO_ID_PATTERN.test(youtubeId)) throw new Error("Cannot classify an invalid YouTube video ID.");

  try {
    const response = await fetchImpl(`https://www.youtube.com/shorts/${youtubeId}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      headers: { "user-agent": "Ruach-Breslov-video-sync/1.0" }
    });
    const finalPath = new URL(response.url).pathname;
    await response.body?.cancel();
    return finalPath.startsWith("/shorts/") ? "short" : "video";
  } catch {
    return "video";
  }
}

export async function mergeYouTubeCatalog(currentCatalog, feedVideos, classify = classifyYouTubeKind) {
  if (!Array.isArray(currentCatalog)) throw new Error("The YouTube catalog must be an array.");

  const knownIds = new Set();
  for (const video of currentCatalog) {
    if (!VIDEO_ID_PATTERN.test(video?.youtubeId) || knownIds.has(video.youtubeId)) {
      throw new Error("The current YouTube catalog contains an invalid or duplicate video ID.");
    }
    knownIds.add(video.youtubeId);
  }

  const additions = [];
  for (const video of feedVideos) {
    if (knownIds.has(video.youtubeId)) continue;
    const kind = await classify(video.youtubeId);
    additions.push({
      ...video,
      kind: kind === "short" ? "short" : "video",
      thumbnail: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
    });
    knownIds.add(video.youtubeId);
  }

  const catalog = [...currentCatalog, ...additions].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  return { catalog, additions };
}
