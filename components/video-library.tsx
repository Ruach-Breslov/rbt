"use client";

import { useState } from "react";
import { ExternalLink, MonitorPlay, Play, Sparkles } from "lucide-react";
import type { Dictionary } from "@/data/locales";
import type { VideoRecord } from "@/data/videos";
import { site } from "@/data/site";

function VideoCard({ video, dictionary }: { video: VideoRecord; dictionary: Dictionary }) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="video-card">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button type="button" className="video-consent" onClick={() => setPlaying(true)}>
            <span className="video-play"><Play aria-hidden="true" /></span>
            <strong>{video.title}</strong>
            <span>{dictionary.actions.watchVideos}</span>
          </button>
        )}
      </div>
      <div className="video-card-copy">
        <div className="quality-badges">
          {video.supports4K ? <span><MonitorPlay aria-hidden="true" />{dictionary.videos.quality}</span> : null}
          {video.supportsHdr ? <span><Sparkles aria-hidden="true" />{dictionary.videos.hdr}</span> : null}
        </div>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </article>
  );
}

export function VideoLibrary({ videos, dictionary }: { videos: VideoRecord[]; dictionary: Dictionary }) {
  if (!videos.length) {
    return (
      <div className="empty-state">
        <span className="icon-tile"><MonitorPlay aria-hidden="true" /></span>
        <h2>{dictionary.videos.emptyTitle}</h2>
        <p>{dictionary.videos.emptyCopy}</p>
        {site.youtube.channelUrl ? <a className="button button-secondary" href={site.youtube.channelUrl} target="_blank" rel="noreferrer">YouTube <ExternalLink aria-hidden="true" /></a> : null}
      </div>
    );
  }

  return <div className="video-grid">{videos.map((video) => <VideoCard key={video.youtubeId} video={video} dictionary={dictionary} />)}</div>;
}
