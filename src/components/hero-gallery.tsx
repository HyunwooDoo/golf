"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, Shrink } from "lucide-react";
import { useCallback, useState } from "react";
import { LoopClip } from "@/components/loop-clip";
import { PhotoFade } from "@/components/photo-fade";
import type { PhotoFadeImage } from "@/components/photo-fade";

type GalleryItem =
  | { kind: "photo"; src: string; alt: string; caption: string }
  | { kind: "clip"; name: string; label: string; caption: string };

type HeroGalleryProps = {
  photos: readonly PhotoFadeImage[];
  clip: { name: string; label: string };
  photoOverlay: { eyebrow: string; label: string };
  clipOverlay: { eyebrow: string; label: string };
};

const SWIPE_THRESHOLD = 60;

/**
 * 히어로 미디어.
 * 눌러서 그 자리에서 크게 펼치고, 좌우로 넘겨 봅니다.
 * (별도 화면으로 이동하거나 영상을 재생창으로 열지 않습니다.)
 */
export function HeroGallery({
  photos,
  clip,
  photoOverlay,
  clipOverlay,
}: HeroGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const items: GalleryItem[] = [
    ...photos.map((photo): GalleryItem => ({
      kind: "photo",
      src: photo.src,
      alt: photo.alt,
      caption: photoOverlay.label,
    })),
    {
      kind: "clip",
      name: clip.name,
      label: clip.label,
      caption: clipOverlay.label,
    },
  ];

  const move = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((current) => (current + step + items.length) % items.length);
    },
    [items.length],
  );

  const open = (startIndex: number) => {
    setDirection(1);
    setIndex(startIndex);
    setExpanded(true);
  };

  const active = items[index];
  const eyebrow =
    active.kind === "clip" ? clipOverlay.eyebrow : photoOverlay.eyebrow;

  return (
    <div className="hero-media">
      <AnimatePresence initial={false} mode="wait">
        {expanded ? (
          <motion.div
            key="stage"
            className="hero-stage"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                className="hero-stage-item"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * 90 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -90 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag={shouldReduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) move(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) move(-1);
                }}
                onClick={() => move(1)}
              >
                {active.kind === "photo" ? (
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 721px) 720px, 100vw"
                    className="hero-stage-media"
                    draggable={false}
                  />
                ) : (
                  <video
                    className="hero-stage-media"
                    src={`/clips/${active.name}.mp4`}
                    poster={`/clips/${active.name}.jpg`}
                    aria-label={active.label}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                <div className="photo-frame-overlay">
                  <span className="photo-eyebrow">{eyebrow}</span>
                  <span className="photo-label">{active.caption}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              className="hero-stage-nav hero-stage-prev"
              onClick={() => move(-1)}
              aria-label="이전 사진"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hero-stage-nav hero-stage-next"
              onClick={() => move(1)}
              aria-label="다음 사진"
            >
              <ChevronRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hero-stage-collapse"
              onClick={() => setExpanded(false)}
              aria-label="작게 보기"
            >
              <Shrink aria-hidden="true" />
            </button>

            <div className="hero-stage-dots" aria-hidden="true">
              {items.map((item, dotIndex) => (
                <span
                  key={item.kind === "photo" ? item.src : item.name}
                  className={dotIndex === index ? "is-active" : undefined}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="hero-media-grid"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              className="hero-media-trigger"
              onClick={() => open(0)}
              aria-label="연습장 사진 크게 보기"
            >
              <PhotoFade
                images={photos}
                className="hero-photo-lesson"
                priority
                sizes="(min-width: 721px) 430px, 62vw"
                overlay={
                  <>
                    <span className="photo-eyebrow">
                      {photoOverlay.eyebrow}
                    </span>
                    <span className="photo-label">{photoOverlay.label}</span>
                  </>
                }
              />
              <span className="media-expand-badge" aria-hidden="true">
                <Expand />
              </span>
            </button>

            <button
              type="button"
              className="hero-media-trigger"
              onClick={() => open(items.length - 1)}
              aria-label="스윙 영상 크게 보기"
            >
              <LoopClip
                name={clip.name}
                label={clip.label}
                className="hero-clip-swing"
                overlay={
                  <>
                    <span className="photo-eyebrow">{clipOverlay.eyebrow}</span>
                    <span className="photo-label">{clipOverlay.label}</span>
                  </>
                }
              />
              <span className="media-expand-badge" aria-hidden="true">
                <Expand />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
