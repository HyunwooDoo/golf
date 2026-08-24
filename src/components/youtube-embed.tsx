"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

type YoutubeEmbedProps = {
  videoId: string;
  title: string;
  /** public 아래의 썸네일 경로 */
  poster: string;
};

/**
 * 눌렀을 때만 유튜브 플레이어를 불러옵니다.
 * 처음에는 썸네일만 보여줘서 페이지가 무거워지지 않습니다.
 */
export function YoutubeEmbed({ videoId, title, poster }: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="youtube-embed youtube-embed-playing">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="youtube-embed"
      onClick={() => setPlaying(true)}
      aria-label={`${title} 재생`}
    >
      <Image
        src={poster}
        alt={title}
        fill
        sizes="(min-width: 721px) 720px, 100vw"
        className="youtube-embed-poster"
      />
      <span className="youtube-play" aria-hidden="true">
        <Play fill="currentColor" />
      </span>
      <span className="youtube-embed-label">LESSON VIDEO</span>
    </button>
  );
}
