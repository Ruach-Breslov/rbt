import type { Dictionary } from "@/data/locales";

export type VideoRecord = {
  youtubeId: string;
  title: string;
  description: string;
  supports4K: boolean;
  supportsHdr: boolean;
};

const configuredIds = (process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_IDS ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter((value) => /^[A-Za-z0-9_-]{11}$/.test(value))
  .slice(0, 3);

export function getVideos(dictionary: Dictionary): VideoRecord[] {
  return configuredIds.map((youtubeId, index) => ({
    youtubeId,
    title: dictionary.videos.items[index]?.title ?? dictionary.videos.items[0].title,
    description: dictionary.videos.items[index]?.description ?? dictionary.videos.items[0].description,
    supports4K: true,
    supportsHdr: true
  }));
}
