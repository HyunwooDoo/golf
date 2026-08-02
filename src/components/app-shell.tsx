"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  House,
  MessageCircleMore,
  MessagesSquare,
  Moon,
  Star,
  Sun,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "소개", icon: House },
  { href: "/regular-lessons", label: "정기 레슨", icon: CalendarDays },
  { href: "/private-lessons", label: "개인 레슨", icon: UserRound },
  { href: "/contact", label: "문의", icon: MessagesSquare },
] as const;

const kakaoChannelUrl =
  process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "/contact?channel=kakao";

function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    localStorage.setItem("golf-lesson-theme", nextTheme);

    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute(
          "content",
          nextTheme === "dark" ? "#080808" : "#ffffff",
        ),
      );
  };

  return (
    <button
      type="button"
      className="chrome-button theme-toggle"
      onClick={toggleTheme}
      aria-label="다크모드와 라이트모드 전환"
    >
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
    </button>
  );
}

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const canGoBack = pathname !== "/";

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

          <Link href="/" className="brand" aria-label="골프 레슨 소개 홈">
            <span className="brand-name">BRAND NAME</span>
          </Link>

          <div className="top-bar-slot top-bar-slot-right">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="site-content">{children}</main>

      <aside className="quick-actions" aria-label="빠른 이동">
        <Link href="/reviews" className="quick-action review-action">
          <Star aria-hidden="true" />
          <span>후기</span>
        </Link>
        <Link
          href={kakaoChannelUrl}
          className="quick-action kakao-action"
          target={kakaoChannelUrl.startsWith("http") ? "_blank" : undefined}
          rel={kakaoChannelUrl.startsWith("http") ? "noreferrer" : undefined}
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
