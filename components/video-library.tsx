"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { ExternalLink, Play, Search, X } from "lucide-react";
import type { Dictionary, Locale } from "@/data/locales";
import type { VideoKind, VideoRecord } from "@/data/videos";
import { publicAsset, site } from "@/data/site";

type SortOrder = "latest" | "popular" | "oldest";

const localeCodes: Record<Locale, string> = {
  en: "en-US",
  he: "he-IL",
  es: "es-ES",
  fa: "fa-IR"
};

function VideoCard({
  video,
  locale,
  dictionary,
  onPlay
}: {
  video: VideoRecord;
  locale: Locale;
  dictionary: Dictionary;
  onPlay: (video: VideoRecord) => void;
}) {
  const date = new Intl.DateTimeFormat(localeCodes[locale], { month: "short", year: "numeric" }).format(new Date(video.publishedAt));
  const views = new Intl.NumberFormat(localeCodes[locale], { notation: "compact", maximumFractionDigits: 1 }).format(video.views);

  return (
    <article className={`video-card ${video.kind === "short" ? "video-card-short" : ""}`}>
      <button
        type="button"
        className="video-card-trigger"
        onClick={() => onPlay(video)}
        aria-label={`${dictionary.videos.playVideo}: ${video.title}`}
      >
        <span className="video-thumbnail">
          <img src={video.thumbnail} alt="" width={640} height={360} loading="lazy" decoding="async" />
          <span className="video-hover-play" aria-hidden="true"><Play /></span>
          {video.duration ? <span className="video-duration">{video.duration}</span> : null}
        </span>
        <span className="video-card-details">
          <span className="video-card-copy">
            <strong>{video.title}</strong>
            <span>{views} {dictionary.videos.views} · {date}</span>
          </span>
        </span>
      </button>
    </article>
  );
}

export function VideoLibrary({ videos, dictionary, locale }: { videos: VideoRecord[]; dictionary: Dictionary; locale: Locale }) {
  const [activeKind, setActiveKind] = useState<VideoKind>("video");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoRecord | null>(null);

  const visibleVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(localeCodes[locale]);
    return videos
      .filter((video) => video.kind === activeKind && (!normalizedQuery || video.title.toLocaleLowerCase(localeCodes[locale]).includes(normalizedQuery)))
      .sort((a, b) => {
        if (sortOrder === "popular") return b.views - a.views;
        const difference = Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
        return sortOrder === "oldest" ? -difference : difference;
      });
  }, [activeKind, locale, query, sortOrder, videos]);

  if (!videos.length) {
    return (
      <div className="empty-state">
        <h2>{dictionary.videos.emptyTitle}</h2>
        <p>{dictionary.videos.emptyCopy}</p>
      </div>
    );
  }

  const chooseKind = (kind: VideoKind) => {
    setActiveKind(kind);
    setQuery("");
  };

  return (
    <Dialog.Root open={Boolean(activeVideo)} onOpenChange={(open) => { if (!open) setActiveVideo(null); }}>
      <div className="channel-page-shell">
        <section className="channel-profile" aria-labelledby="channel-name">
          <div className="channel-avatar" aria-hidden="true">
            <img src={publicAsset("/media/brand/ruach-breslov-logo.webp")} alt="" width={160} height={160} />
          </div>
          <div className="channel-profile-copy">
            <h1 id="channel-name">Ruach Breslov</h1>
            <p className="channel-meta"><strong>@RuachBreslov</strong><span>·</span><span>{dictionary.videos.videoCount.replace("{count}", String(videos.length))}</span></p>
            <p>{dictionary.videos.channelDescription}</p>
            <a className="channel-subscribe" href={site.youtube.channelUrl} target="_blank" rel="noreferrer">
              {dictionary.videos.channelCta}<ExternalLink aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="channel-tabs-row">
          <div className="channel-tabs" role="group" aria-label={dictionary.videos.title}>
            <button type="button" aria-pressed={activeKind === "video"} onClick={() => chooseKind("video")}>{dictionary.videos.videosTab}</button>
            <button type="button" aria-pressed={activeKind === "short"} onClick={() => chooseKind("short")}>{dictionary.videos.shortsTab}</button>
          </div>
          <div className={`channel-search ${searchOpen ? "is-open" : ""}`}>
            {searchOpen ? (
              <>
                <Search aria-hidden="true" />
                <label className="sr-only" htmlFor="channel-search-input">{dictionary.videos.searchLabel}</label>
                <input
                  id="channel-search-input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={dictionary.videos.searchPlaceholder}
                  autoFocus
                />
                <button type="button" onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label={dictionary.videos.clearSearch}><X aria-hidden="true" /></button>
              </>
            ) : (
              <button type="button" className="channel-search-open" onClick={() => setSearchOpen(true)} aria-label={dictionary.videos.searchLabel}><Search aria-hidden="true" /></button>
            )}
          </div>
        </div>

        {activeKind === "video" ? (
          <div className="channel-sort" role="group" aria-label={dictionary.videos.videosTab}>
            {(["latest", "popular", "oldest"] as const).map((order) => (
              <button key={order} type="button" aria-pressed={sortOrder === order} onClick={() => setSortOrder(order)}>{dictionary.videos[order]}</button>
            ))}
          </div>
        ) : null}

        {visibleVideos.length ? (
          <div className={`video-grid ${activeKind === "short" ? "shorts-grid" : ""}`}>
            {visibleVideos.map((video) => <VideoCard key={video.youtubeId} video={video} locale={locale} dictionary={dictionary} onPlay={setActiveVideo} />)}
          </div>
        ) : <p className="channel-no-results">{dictionary.videos.noResults}</p>}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="video-player-overlay" />
        <Dialog.Content className="video-player-dialog">
          <Dialog.Title className="video-player-title">{activeVideo?.title ?? dictionary.videos.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{dictionary.videos.description}</Dialog.Description>
          <Dialog.Close className="video-player-close" aria-label={dictionary.videos.closePlayer}><X aria-hidden="true" /></Dialog.Close>
          <div className={`video-player-frame ${activeVideo?.kind === "short" ? "is-short" : ""}`}>
            {activeVideo ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&playsinline=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
