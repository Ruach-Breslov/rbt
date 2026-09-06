import assert from "node:assert/strict";
import test from "node:test";
import { classifyYouTubeKind, mergeYouTubeCatalog, parseYouTubeFeed } from "./lib/youtube-feed.mjs";

const channelId = "UCOhxrylucgg0_WdPRFU1d_w";
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/">
  <entry>
    <yt:videoId>AbCdEf123_4</yt:videoId>
    <yt:channelId>${channelId}</yt:channelId>
    <title>Torah &amp; connection &#x1F525;</title>
    <published>2026-09-06T12:30:00+00:00</published>
    <media:group><media:community><media:statistics views="42" /></media:community></media:group>
  </entry>
</feed>`;

test("parses and validates the YouTube channel feed", () => {
  assert.deepEqual(parseYouTubeFeed(feed, channelId), [{
    youtubeId: "AbCdEf123_4",
    title: "Torah & connection 🔥",
    publishedAt: "2026-09-06T12:30:00.000Z",
    views: 42
  }]);
  assert.throws(() => parseYouTubeFeed(feed, "UC0000000000000000000000"), /unexpected channel/);
});

test("adds only unseen uploads and preserves the archive", async () => {
  const existing = [{
    youtubeId: "77ibzlmzv2E",
    title: "Existing",
    kind: "video",
    publishedAt: "2026-07-31T02:25:05Z",
    views: 1
  }];
  const parsed = parseYouTubeFeed(feed, channelId);
  const { catalog, additions } = await mergeYouTubeCatalog(existing, parsed, async () => "short");

  assert.equal(additions.length, 1);
  assert.equal(additions[0].kind, "short");
  assert.equal(additions[0].thumbnail, "https://i.ytimg.com/vi/AbCdEf123_4/hqdefault.jpg");
  assert.equal(catalog.length, 2);
  assert.deepEqual(catalog[1], existing[0]);
});

test("recognizes Shorts from YouTube's final URL", async () => {
  const fakeResponse = (url) => ({ url, body: { cancel: async () => {} } });
  assert.equal(await classifyYouTubeKind("AbCdEf123_4", async () => fakeResponse("https://www.youtube.com/shorts/AbCdEf123_4")), "short");
  assert.equal(await classifyYouTubeKind("AbCdEf123_4", async () => fakeResponse("https://www.youtube.com/watch?v=AbCdEf123_4")), "video");
});
