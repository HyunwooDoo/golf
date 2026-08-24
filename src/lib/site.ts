/**
 * 사이트 전역에서 사용하는 브랜드 · 연락처 · 운영 정보.
 * 실제 값이 확정되기 전까지는 아래 기본값을 사용하고,
 * 필요한 경우 환경변수로 덮어씁니다.
 */

const env = {
  kakaoChannelUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL,
  kakaoMapUrl: process.env.NEXT_PUBLIC_KAKAO_MAP_URL,
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL,
  naverPlaceUrl: process.env.NEXT_PUBLIC_NAVER_PLACE_URL,
  googleReviewUrl: process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL,
  phone: process.env.NEXT_PUBLIC_LESSON_PHONE,
  address: process.env.NEXT_PUBLIC_LESSON_ADDRESS,
  consultationHours: process.env.NEXT_PUBLIC_CONSULTATION_HOURS,
};

export const site = {
  brand: "두윤곤 골프 레슨",
  brandMark: "DOO GOLF LESSON",
  proName: "두윤곤",
  proTitle: "골프 티칭 프로",
  proRole: "문화골프연습장 헤드 프로",
  place: "문화골프연습장",
  phone: env.phone ?? "010-7434-4208",
  kakaoChannelId: "dyk3102",
  instagramName: "두윤곤 프로",
  instagramHandle: "yunkondo",
  youtubeName: "두윤곤프로",
  youtubeVideoId: "DHDhN2r0Tm4",
  address: env.address ?? "상세 주소 준비 중",
  consultationHours: env.consultationHours ?? "매일 오전 7시 – 오후 11시",
  parking: "서울문화고등학교 교내, 골프연습장 앞 주차장 이용 가능",
  facilityHours: "월요일 – 일요일 매일 운영",
  lessonDays: "월 · 수 · 금 · 토요일",
  analyzer: "GC QUAD 런치 모니터",
  analyzerNote: "세계 최고 수준의 스윙 분석 장비",
  cameraSetup: "정면 · 측면 2대 카메라 촬영",
} as const;

export const links = {
  kakaoChannel: env.kakaoChannelUrl,
  kakaoMap: env.kakaoMapUrl,
  instagram: env.instagramUrl ?? "https://www.instagram.com/yunkondo",
  youtube: env.youtubeUrl ?? "https://www.youtube.com/@두윤곤프로_youcandoit",
  naverPlace: env.naverPlaceUrl,
  googleReview: env.googleReviewUrl,
} as const;

/** 카카오 채널 주소가 없으면 문의 페이지로 보냅니다. */
export const kakaoChannelHref = links.kakaoChannel ?? "/contact?channel=kakao";

const digits = site.phone.replace(/[^+\d]/g, "");

export const phoneHref = `tel:${digits}`;
export const smsHref = `sms:${digits}`;

export const isExternal = (href: string) => href.startsWith("http");

export const profile = {
  certifications: [
    "USGA 미국골프협회 티칭 프로",
    "KSPGA 세미프로",
    "대한스포츠프로골프협회 회원",
    "TPI Mechanics Level 2",
  ],
  career: [
    "현 문화골프연습장 헤드 프로",
    "전 수락산 행복골프훈련소 헤드 프로",
    "전 이민영 골프 아카데미 헤드 프로",
    "전 팀 타이틀리스트 레슨 팀장",
  ],
  awards: [
    "미국 부치 하먼 골프 아카데미 수료",
    "KSPGA 경기위원 · 정회원",
    "홀인원 2회 · 알바트로스 2회",
  ],
  stats: [
    { label: "누적 회원", value: "3,652", unit: "명" },
    { label: "누적 레슨", value: "182,600", unit: "회" },
    { label: "레슨 경력", value: "11", unit: "년" },
  ],
} as const;
