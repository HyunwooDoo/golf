import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import { AppShell } from "@/components/app-shell";
import {
  absoluteUrl,
  seoKeywords,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";
import { links, site } from "@/lib/site";
import "./globals.css";

const suit = localFont({
  src: "../font/SUIT-Variable.woff2",
  variable: "--font-suit",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: site.brand,
  title: {
    default: `${siteName} | 도봉구 골프 레슨·스윙 분석`,
    template: `%s | ${site.brand}`,
  },
  description: siteDescription,
  keywords: [...seoKeywords],
  authors: [{ name: site.proName, url: siteUrl }],
  creator: site.proName,
  publisher: site.brand,
  category: "골프 레슨",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: siteName,
    siteName,
    description: siteDescription,
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
    title: siteName,
    description: siteDescription,
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "ko-KR",
    },
    {
      "@type": "SportsActivityLocation",
      "@id": `${siteUrl}/#business`,
      name: siteName,
      url: siteUrl,
      image: absoluteUrl("/photos/pro-1.png"),
      description: siteDescription,
      telephone: site.phone.replace(/^0/, "+82"),
      address: {
        "@type": "PostalAddress",
        streetAddress: "마들로 598 서울문화고등학교 교내",
        addressLocality: "도봉구",
        addressRegion: "서울특별시",
        addressCountry: "KR",
      },
      sameAs: [links.instagram, links.youtube],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.proName,
      jobTitle: site.proTitle,
      description: site.proRole,
      image: absoluteUrl("/photos/pro-1.png"),
      url: siteUrl,
      worksFor: {
        "@id": `${siteUrl}/#business`,
      },
      sameAs: [links.instagram, links.youtube],
    },
  ],
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
    <html lang="ko" className={`${suit.variable} h-full antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <AppShell>{children}</AppShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
