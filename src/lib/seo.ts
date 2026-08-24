import type { Metadata } from "next";
import { site } from "@/lib/site";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "http://localhost:3000";

export const siteUrl = (
  configuredSiteUrl.startsWith("http")
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
).replace(/\/$/, "");

export const siteName = "두윤곤 프로 레슨";
export const siteDescription =
  "서울 도봉구 문화골프연습장에서 진행하는 두윤곤 프로 골프 레슨. GC QUAD와 정면·측면 영상 분석으로 초보 기초, 스윙 교정, 정기·개인 레슨을 안내합니다.";

export const seoKeywords = [
  "두윤곤 프로",
  "도봉구 골프 레슨",
  "방학동 골프 레슨",
  "문화골프연습장 레슨",
  "골프 개인 레슨",
  "골프 스윙 교정",
  "골프 초보 레슨",
  "GC QUAD 레슨",
] as const;

export const absoluteUrl = (path = "/") =>
  new URL(path, `${siteUrl}/`).toString();

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${site.proName} 프로`;

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: path,
      title: socialTitle,
      siteName,
      description,
      images: [
        {
          url: "/api/og",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/api/og"],
    },
  };
}
