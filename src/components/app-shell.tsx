"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  House,
  MessageCircleMore,
  MessagesSquare,
  Star,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { isExternal, kakaoChannelHref, site } from "@/lib/site";

const navigation = [
  { href: "/", label: "소개", icon: House },
  { href: "/regular-lessons", label: "정기 레슨", icon: CalendarDays },
  { href: "/private-lessons", label: "개인 레슨", icon: UserRound },
  { href: "/contact", label: "문의", icon: MessagesSquare },
] as const;

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const canGoBack = pathname !== "/";
  const kakaoIsExternal = isExternal(kakaoChannelHref);

  return (
    <div className="site-shell">
      <header className="top-bar" aria-label="상단 탐색">
        <div className="top-bar-inner">
          <div className="top-bar-slot">
            {canGoBack ? (
              <button
                type="button"
                className="chrome-button"
                onClick={() => router.back()}
                aria-label="이전 페이지로 이동"
              >
                <ArrowLeft aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <Link href="/" className="brand" aria-label={`${site.brand} 홈`}>
            <Image
              src="/brand/logo.png"
              alt={site.brand}
              width={609}
              height={51}
              className="brand-logo"
              priority
              unoptimized
            />
          </Link>

          <div className="top-bar-slot top-bar-slot-right" aria-hidden="true" />
        </div>
      </header>

      <main className="site-content">{children}</main>

      <aside className="quick-actions" aria-label="빠른 이동">
        <Link href="/reviews" className="quick-action review-action">
          <Star aria-hidden="true" />
          <span>후기</span>
        </Link>
        <Link
          href={kakaoChannelHref}
          className="quick-action kakao-action"
          target={kakaoIsExternal ? "_blank" : undefined}
          rel={kakaoIsExternal ? "noreferrer" : undefined}
        >
          <MessageCircleMore aria-hidden="true" />
          <span>카톡 상담</span>
        </Link>
      </aside>

      <nav className="bottom-navigation" aria-label="주요 메뉴">
        <div className="bottom-navigation-inner">
          {navigation.map(({ href, label, icon: Icon }) => {
            const isActive = isCurrentPath(pathname, href);

            return (
              <Link
                key={href}
                href={href}
                className="bottom-navigation-link"
                aria-current={isActive ? "page" : undefined}
              >
                <span className="bottom-navigation-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
