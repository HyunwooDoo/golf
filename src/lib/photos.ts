import type { PhotoFadeImage } from "@/components/photo-fade";

/** public/photos 에 있는 최적화 사진 목록 (원본은 assets/original-photos) */

export const proPhotos: readonly PhotoFadeImage[] = [
  { src: "/photos/pro-1.png", alt: "두윤곤 프로 프로필 사진" },
  { src: "/photos/pro-2.png", alt: "두윤곤 프로 프로필 사진" },
];

export const bay1F: readonly PhotoFadeImage[] = [
  { src: "/photos/bay-1f-1.jpg", alt: "문화골프연습장 1층 타석" },
  {
    src: "/photos/bay-1f-2.jpg",
    alt: "문화골프연습장 1층 타석에서 바라본 타깃",
  },
  { src: "/photos/bay-1f-3.jpg", alt: "문화골프연습장 1층 타석 전경" },
  { src: "/photos/bay-1f-4.jpg", alt: "문화골프연습장 1층 실내 타석" },
];

export const bay2F: readonly PhotoFadeImage[] = [
  { src: "/photos/bay-2f-1.jpg", alt: "문화골프연습장 2층 타석" },
  {
    src: "/photos/bay-2f-2.jpg",
    alt: "문화골프연습장 2층 타석에서 바라본 타깃",
  },
  { src: "/photos/bay-2f-3.jpg", alt: "문화골프연습장 2층 타석 전경" },
  { src: "/photos/bay-2f-4.jpg", alt: "문화골프연습장 2층 타석 라인" },
  { src: "/photos/bay-2f-5.jpg", alt: "문화골프연습장 2층 연습 환경" },
  { src: "/photos/bay-2f-6.jpg", alt: "문화골프연습장 2층 타석 측면" },
];

/** GC QUAD 장비 안내 자료 */
export const analyzerPhotos: readonly PhotoFadeImage[] = [
  { src: "/photos/gcquad-1.jpg", alt: "GC QUAD 런치 모니터 소개 자료" },
  { src: "/photos/gcquad-2.jpg", alt: "GC QUAD 레슨 안내 자료" },
  { src: "/photos/gcquad-3.jpg", alt: "GC QUAD 실측 데이터 안내 자료" },
];

/** 쇼트게임 연습 공간 */
export const shortGameArea: readonly PhotoFadeImage[] = [
  { src: "/photos/putting-green.jpg", alt: "문화골프연습장 퍼팅 연습장" },
  { src: "/photos/bunker.jpg", alt: "문화골프연습장 벙커 연습장" },
];

/** 실내외 휴게 공간 */
export const restArea: readonly PhotoFadeImage[] = [
  { src: "/photos/lounge.jpg", alt: "문화골프연습장 실내 휴게실" },
  { src: "/photos/lounge-2.jpg", alt: "문화골프연습장 휴게실 좌석" },
  { src: "/photos/bench-1.jpg", alt: "문화골프연습장 야외 그네 벤치" },
  { src: "/photos/bench-2.jpg", alt: "문화골프연습장 야외 파라솔 테이블" },
];

/** 락커 · 정수기 · 커피머신 */
export const amenities: readonly PhotoFadeImage[] = [
  { src: "/photos/locker-2.jpg", alt: "문화골프연습장 락커룸" },
  { src: "/photos/locker-1.jpg", alt: "문화골프연습장 락커와 클럽 관리 공간" },
  { src: "/photos/coffee.jpg", alt: "문화골프연습장 커피머신" },
  { src: "/photos/water-1.jpg", alt: "문화골프연습장 정수기" },
  { src: "/photos/water-2.jpg", alt: "문화골프연습장 휴게 공간 정수기" },
];

/** 타석 배정 안내와 층별 이동 */
export const guideArea: readonly PhotoFadeImage[] = [
  { src: "/photos/bay-monitor.jpg", alt: "1층과 2층 타석 배정 안내 모니터" },
  { src: "/photos/stairs.jpg", alt: "문화골프연습장 2층으로 오르는 계단" },
];

export const parkingArea: readonly PhotoFadeImage[] = [
  { src: "/photos/parking.jpg", alt: "문화골프연습장 앞 주차장" },
];

/** 정기 레슨 히어로: 연습 장면과 대표 타석 컷 */
export const facilityHighlights: readonly PhotoFadeImage[] = [
  { src: "/photos/lesson-scene.jpg", alt: "문화골프연습장에서 연습하는 회원" },
  bay2F[0],
  bay1F[1],
  bay2F[3],
];

/** 소개 · 개인 레슨 히어로에서 쓰는 레슨 공간 컷 */
export const lessonScenes: readonly PhotoFadeImage[] = [
  bay1F[3],
  bay2F[4],
  bay1F[0],
  bay2F[2],
];
