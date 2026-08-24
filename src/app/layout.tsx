import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const socialTitle = "두윤곤 프로";
const socialDescription = "데이터와 영상 분석으로 원인을 진단합니다.";
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "http://localhost:3000";
const siteUrl = configuredSiteUrl.startsWith("http")
  ? configuredSiteUrl
  : `https://${configuredSiteUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.brand,
  title: {
    default: `${site.brand} | 기초는 확실하게, 진단은 정확하게`,
    template: `%s | ${site.brand}`,
  },
  description: "데이터와 영상 분석으로 원인을 진단합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: socialTitle,
    siteName: socialTitle,
    description: socialDescription,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "두윤곤 프로",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: ["/api/og"],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.brand,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body>
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
