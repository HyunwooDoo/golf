"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type PhotoFadeImage = {
  src: string;
  alt: string;
  /** fluidHeight 를 쓸 때 필요한 원본 크기 */
  width?: number;
  height?: number;
};

type PhotoFadeProps = {
  images: readonly PhotoFadeImage[];
  /** 프레임에 적용할 클래스 (레이아웃은 부모 CSS가 담당합니다) */
  className?: string;
  /** 한 장이 머무는 시간(ms) */
  interval?: number;
  /** 첫 화면에 보이는 이미지에만 사용합니다 */
  priority?: boolean;
  sizes?: string;
  /** 사진 위에 겹쳐 표시할 라벨 */
  overlay?: ReactNode;
  /** 인물 컷처럼 여백을 살려야 할 때 */
  fit?: "cover" | "contain";
  /** 사진 뒤에서 아주 천천히 움직이는 빛 번짐 */
  aura?: boolean;
  /** 전환 인디케이터 표시 여부 */
  showDots?: boolean;
  /** 사진 비율대로 높이를 맞춥니다 (여백 없이 가로 꽉 채우기) */
  fluidHeight?: boolean;
};

export function PhotoFade({
  images,
  className,
  interval = 4600,
  priority = false,
  sizes = "(min-width: 721px) 720px, 100vw",
  overlay,
  fit = "cover",
  aura = false,
  showDots = true,
  fluidHeight = false,
}: PhotoFadeProps) {
  const shouldReduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(frameRef, { amount: 0.25 });
  const [index, setIndex] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);

  useEffect(() => {
    if (!fluidHeight) return;
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      setFrameWidth(entry.contentRect.width);
    });
    observer.observe(frame);

    return () => observer.disconnect();
  }, [fluidHeight]);

  const canRotate = images.length > 1 && !shouldReduceMotion;

  useEffect(() => {
    if (!canRotate || !isInView) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [canRotate, images.length, interval, isInView]);

  const current = images[index];
  const fluidRatio =
    fluidHeight && current.width && current.height
      ? current.height / current.width
      : null;

  return (
    <motion.div
      ref={frameRef}
      className={["photo-frame", className].filter(Boolean).join(" ")}
      style={
        fluidRatio
          ? { aspectRatio: `${current.width} / ${current.height}` }
          : undefined
      }
      animate={
        fluidRatio && frameWidth
          ? { height: Math.round(frameWidth * fluidRatio) }
          : undefined
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {aura ? (
        <div className="photo-aura" aria-hidden="true">
          <motion.span
            className="photo-aura-core"
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.07, 1], opacity: [0.62, 0.9, 0.62] }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            className="photo-aura-drift"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1.04, 0.94, 1.04],
                    x: ["-3%", "4%", "-3%"],
                    y: ["2%", "-3%", "2%"],
                    opacity: [0.5, 0.78, 0.5],
                  }
            }
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      ) : null}

      <AnimatePresence initial={false}>
        <motion.div
          key={current.src}
          className="photo-frame-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.2,
            ease: "easeInOut",
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes={sizes}
            priority={priority && index === 0}
            className={
              fit === "contain" ? "photo-image-contain" : "photo-image"
            }
          />
        </motion.div>
      </AnimatePresence>

      {overlay ? <div className="photo-frame-overlay">{overlay}</div> : null}

      {showDots && images.length > 1 ? (
        <div className="photo-frame-dots" aria-hidden="true">
          {images.map((image, dotIndex) => (
            <span
              key={image.src}
              className={dotIndex === index ? "is-active" : undefined}
            />
          ))}
        </div>
      ) : null}
    </motion.div>
  );
}
