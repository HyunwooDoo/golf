"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type LoopClipProps = {
  /** /clips 아래의 파일 이름 (확장자 제외) */
  name: string;
  /** 스크린 리더와 접근성을 위한 설명 */
  label: string;
  className?: string;
  overlay?: ReactNode;
};

/**
 * 소리 없이 반복 재생되는 짧은 클립.
 * GIF 와 같은 방식으로 보이지만 용량은 훨씬 작습니다.
 * 화면에 보일 때만 재생하고, 모션을 줄인 환경에서는 포스터 이미지로 대체합니다.
 */
export function LoopClip({ name, label, className, overlay }: LoopClipProps) {
  const shouldReduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(frameRef, { amount: 0.3 });
  const [isReady, setIsReady] = useState(false);

  const poster = `/clips/${name}.jpg`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    if (isInView) {
      const playback = video.play();
      playback?.catch(() => {
        /* 자동 재생이 막히면 포스터 이미지가 그대로 보입니다. */
      });
    } else {
      video.pause();
    }
  }, [isInView, shouldReduceMotion]);

  return (
    <div
      ref={frameRef}
      className={["photo-frame", "clip-frame", className]
        .filter(Boolean)
        .join(" ")}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="clip-media clip-poster" src={poster} alt={label} />

      {shouldReduceMotion ? null : (
        <motion.video
          ref={videoRef}
          className="clip-media"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: isReady ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          onCanPlay={() => setIsReady(true)}
        >
          <source src={`/clips/${name}.mp4`} type="video/mp4" />
        </motion.video>
      )}

      {overlay ? <div className="photo-frame-overlay">{overlay}</div> : null}
    </div>
  );
}
