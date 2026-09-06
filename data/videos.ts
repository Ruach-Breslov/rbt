import { withBasePath } from "@/lib/paths";
import youtubeCatalog from "@/data/youtube-catalog.json";

export type VideoKind = "video" | "short";

export type VideoRecord = {
  youtubeId: string;
  title: string;
  kind: VideoKind;
  publishedAt: string;
  duration?: string;
  views: number;
  thumbnail: string;
};

type CatalogRecord = Omit<VideoRecord, "thumbnail"> & { thumbnail?: string };

const catalog = youtubeCatalog as CatalogRecord[];

export function getVideos(): VideoRecord[] {
  return catalog.map((video) => ({
    ...video,
    thumbnail: video.thumbnail ?? withBasePath(`/media/videos/${video.youtubeId}.webp`)
  }));
}
