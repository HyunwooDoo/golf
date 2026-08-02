import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  FileText,
  Gauge,
  LockKeyhole,
  MapPin,
  MessageCircleMore,
  Play,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "골프 레슨 후기",
  description:
    "레슨 과정과 전후 변화, 외부 리뷰와 운영 정보를 확인하는 골프 레슨 후기",
};

const kakaoChannelUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL;
const naverPlaceUrl = process.env.NEXT_PUBLIC_NAVER_PLACE_URL;
const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const lessonPhone = process.env.NEXT_PUBLIC_LESSON_PHONE;
const lessonAddress = process.env.NEXT_PUBLIC_LESSON_ADDRESS;
const consultationHours = process.env.NEXT_PUBLIC_CONSULTATION_HOURS;

const lessonFlow = [
  {
    number: "01",
    title: "촬영과 진단",
    description: "현재 스윙과 고민을 객관적으로 확인합니다.",
  },
  {
    number: "02",
    title: "핵심 교정",
    description: "가장 영향이 큰 원인 한 가지부터 바꿉니다.",
  },
  {
    number: "03",
    title: "개인 드릴",
    description: "혼자 연습할 수 있는 반복 과제를 제공합니다.",
  },
  {
    number: "04",
    title: "비교와 피드백",
    description: "전후 영상을 비교하고 다음 목표를 정합니다.",
  },
] as const;

const trustStandards = [
  "회원의 공개 동의를 받은 후기만 사용",
  "이름과 개인 정보는 식별되지 않도록 익명화",
  "스코어·비거리 등 수치는 확인 가능한 자료 기준",
  "개인에 따라 결과가 달라질 수 있음을 함께 안내",
] as const;

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-index" aria-hidden="true">
        <span>{index}</span>
        <span className="section-index-line" />
      </div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? (
        <div className="section-description">{description}</div>
      ) : null}
    </div>
  );
}

function TrustLink({
  href,
  icon,
  eyebrow,
  title,
}: {
  href?: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
}) {
  if (!href) {
    return (
      <span className="third-party-card is-disabled" aria-disabled="true">
        <span className="third-party-icon">{icon}</span>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <small>링크 입력 예정</small>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="third-party-card"
      target="_blank"
      rel="noreferrer"
    >
      <span className="third-party-icon">{icon}</span>
      <span>{eyebrow}</span>
      <strong>{title}</strong>
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

export default function ReviewsPage() {
  return (
    <div className="reviews-page">
      <section className="reviews-hero" aria-labelledby="reviews-title">
        <Reveal className="reviews-hero-copy">
          <h1
            id="reviews-title"
            className="flex flex-col items-center justify-center text-center"
          >
            말보다 과정으로,
            <br />
            느낌보다 변화로 확인하세요.
          </h1>
          <p className="text-center">
            어떤 문제를 진단했고, 무엇을 연습했으며, <br />
            어떻게 달라졌는지 확인할 수 있는 후기만 <br />
            정직하게 기록합니다.
          </p>
        </Reveal>

        <Reveal className="reviews-hero-media" delay={0.08}>
          <div
            className="media-placeholder"
            role="img"
            aria-label="회원 레슨 전후 사진 자리"
          >
            <span>회원 레슨 전후 사진</span>
            <small>REAL PROCESS</small>
          </div>
          <div className="reviews-hero-badge">
            <ShieldCheck aria-hidden="true" />
            <span>VERIFIED FORMAT</span>
            <strong>동의 · 익명화 · 수치 확인</strong>
          </div>
        </Reveal>
      </section>

      <Reveal className="content-section featured-review-section">
        <SectionHeading
          index="01"
          eyebrow="MEMBER STORY"
          title="고민부터 변화까지 한눈에"
          description="아래 내용은 후기 카드의 등록 형식 예시입니다. 실제 회원 후기와 영상은 공개 동의를 받은 자료로 교체됩니다."
        />

        <article className="featured-review-card">
          <div className="review-example-badge">
            <FileText aria-hidden="true" />
            후기 등록 형식 예시
          </div>

          <header>
            <div className="review-avatar" aria-hidden="true">
              김
            </div>
            <div>
              <h3>김○수</h3>
              <p>골프 1년차 · 개인 레슨 10회</p>
            </div>
            <span>PRIVATE 10</span>
          </header>

          <dl className="review-story">
            <div>
              <dt>처음 고민</dt>
              <dd>드라이버 슬라이스와 필드에서의 티샷 불안</dd>
            </div>
            <div>
              <dt>레슨 과정</dt>
              <dd>스윙 궤도 교정, 하체 회전 드릴, 주 2회 연습 과제</dd>
            </div>
            <div>
              <dt>체감 변화</dt>
              <dd>드라이버 미스 방향이 크게 줄었어요.</dd>
            </div>
          </dl>

          <div className="review-score-change">
            <div>
              <span>평균 스코어</span>
              <strong>108</strong>
              <small>BEFORE</small>
            </div>
            <TrendingUp aria-hidden="true" />
            <div>
              <span>평균 스코어</span>
              <strong>96</strong>
              <small>AFTER</small>
            </div>
          </div>

          <div className="review-meta">
            <span>수강 기간 · 실제 기간 입력</span>
            <span>2026년 6월 수강 완료</span>
          </div>

          <Link
            href="#review-result-sample"
            className="glass-button review-video-button"
          >
            <Play fill="currentColor" aria-hidden="true" />
            전후 스윙 예시 보기
            <ArrowRight aria-hidden="true" />
          </Link>
        </article>

        <div className="review-disclaimer">
          <Sparkles aria-hidden="true" />
          <p>
            위 이름과 사례는 사용자가 제공한 예시이며 실제 회원 후기임을
            의미하지 않습니다.
          </p>
        </div>
      </Reveal>

      <Reveal className="content-section review-process-section">
        <SectionHeading
          index="02"
          eyebrow="PROCESS"
          title="결과만큼 중요한 레슨 과정"
          description="무엇을 듣고 끝나는 수업이 아니라, 다음 연습에서 직접 실행할 수 있도록 기록과 과제를 제공합니다."
        />

        <ol className="review-flow-list">
          {lessonFlow.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="review-material-grid">
          <article className="lesson-note-card">
            <div className="review-material-heading">
              <BookOpenText aria-hidden="true" />
              <div>
                <span>LESSON NOTE</span>
                <h3>실제 레슨 노트</h3>
              </div>
            </div>
            <div className="note-paper">
              <p>오늘의 핵심</p>
              <strong>핵심 포인트 입력 영역</strong>
              <span>
                문제 원인과 교정 느낌을 회원이 이해할 수 있는 언어로 정리합니다.
              </span>
              <div aria-hidden="true" />
              <div aria-hidden="true" />
              <div aria-hidden="true" />
            </div>
          </article>

          <article className="drill-card">
            <div className="review-material-heading">
              <Target aria-hidden="true" />
              <div>
                <span>PERSONAL DRILL</span>
                <h3>개인 연습 드릴</h3>
              </div>
            </div>
            <ul>
              <li>
                <span>01</span>
                <div>
                  <strong>동작 드릴 이름</strong>
                  <p>횟수와 체크 포인트 입력</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>구질 연습 과제</strong>
                  <p>연습 목표와 성공 기준 입력</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>다음 레슨 목표</strong>
                  <p>다음 확인 항목 입력</p>
                </div>
              </li>
            </ul>
          </article>
        </div>

        <div className="video-feedback-card">
          <div
            className="media-placeholder"
            role="img"
            aria-label="영상 피드백 예시 자리"
          >
            <span className="video-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
            <span>영상 피드백 예시</span>
            <small>VIDEO FEEDBACK</small>
          </div>
          <div>
            <Video aria-hidden="true" />
            <span>
              화면 위 선과 음성 설명으로 핵심 움직임을 다시 확인합니다.
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section review-result-section">
        <span
          id="review-result-sample"
          className="review-section-anchor"
          aria-hidden="true"
        />
        <SectionHeading
          index="03"
          eyebrow="RESULT"
          title="전후 영상과 숫자로 보는 변화"
          description="이 영역은 실제 회원 사례가 준비되면 원본 자료를 기반으로 업데이트됩니다. 현재 수치는 후기 형식을 설명하기 위한 예시입니다."
        />

        <div className="review-before-after">
          <div
            className="media-placeholder"
            role="img"
            aria-label="레슨 전 스윙 영상 자리"
          >
            <span>레슨 전 스윙 영상</span>
            <small>BEFORE</small>
          </div>
          <div
            className="media-placeholder"
            role="img"
            aria-label="레슨 후 스윙 영상 자리"
          >
            <span>레슨 후 스윙 영상</span>
            <small>AFTER</small>
          </div>
        </div>

        <div className="review-metric-grid">
          <article>
            <TrendingUp aria-hidden="true" />
            <span>스코어 변화</span>
            <strong>108 → 96</strong>
            <small>예시 수치</small>
          </article>
          <article>
            <CircleDot aria-hidden="true" />
            <span>구질 변화</span>
            <strong>변화 입력</strong>
            <small>실제 측정값</small>
          </article>
          <article>
            <Gauge aria-hidden="true" />
            <span>비거리 변화</span>
            <strong>변화 입력</strong>
            <small>실제 측정값</small>
          </article>
        </div>
      </Reveal>

      <Reveal className="content-section third-party-section">
        <SectionHeading
          index="04"
          eyebrow="THIRD-PARTY REVIEWS"
          title="외부 채널에서도 직접 확인하세요"
          description="운영자가 편집한 후기뿐 아니라 외부 플랫폼에 작성된 평가를 함께 연결합니다."
        />

        <div className="third-party-grid">
          <TrustLink
            href={naverPlaceUrl}
            icon={<MapPin aria-hidden="true" />}
            eyebrow="NAVER PLACE"
            title="네이버 플레이스 후기"
          />
          <TrustLink
            href={googleReviewUrl}
            icon={<Star aria-hidden="true" />}
            eyebrow="GOOGLE REVIEW"
            title="Google 리뷰"
          />
          <TrustLink
            href={kakaoChannelUrl}
            icon={<MessageCircleMore aria-hidden="true" />}
            eyebrow="KAKAO CHANNEL"
            title="카카오채널 후기"
          />
          <TrustLink
            href={instagramUrl}
            icon={<Camera aria-hidden="true" />}
            eyebrow="INSTAGRAM"
            title="인스타그램 회원 태그"
          />
        </div>
      </Reveal>

      <Reveal className="content-section operation-trust-section">
        <SectionHeading
          index="05"
          eyebrow="OPERATION TRUST"
          title="레슨만큼 운영 정보도 투명하게"
        />

        <div className="operation-trust-grid">
          <Link href="/regular-lessons" className="operation-trust-card">
            <ReceiptText aria-hidden="true" />
            <span>PRICE</span>
            <strong>투명한 가격</strong>
            <p>각 레슨 페이지에서 패키지와 포함 항목을 확인합니다.</p>
            <ArrowRight aria-hidden="true" />
          </Link>
          <Link href="/regular-lessons" className="operation-trust-card">
            <CalendarDays aria-hidden="true" />
            <span>POLICY</span>
            <strong>취소·보강 정책</strong>
            <p>예약 전 변경, 보강과 이월 기준을 안내합니다.</p>
            <ArrowRight aria-hidden="true" />
          </Link>
          <div className="operation-trust-card">
            <MapPin aria-hidden="true" />
            <span>LOCATION</span>
            <strong>주소와 전화번호</strong>
            <p>{lessonAddress ?? "주소 입력 예정"}</p>
            <small>{lessonPhone ?? "전화번호 입력 예정"}</small>
          </div>
          <div className="operation-trust-card">
            <Clock3 aria-hidden="true" />
            <span>CONSULTING HOURS</span>
            <strong>실제 상담 가능 시간</strong>
            <p>{consultationHours ?? "상담 가능 시간 입력 예정"}</p>
          </div>
        </div>

        <details className="privacy-policy-card" id="privacy">
          <summary>
            <span className="privacy-policy-icon">
              <LockKeyhole aria-hidden="true" />
            </span>
            <div>
              <span>PRIVACY</span>
              <strong>개인정보 처리 안내</strong>
            </div>
            <ChevronDown aria-hidden="true" />
          </summary>
          <div className="privacy-policy-content">
            <p>
              현재 문의 폼의 입력 내용은 서버에 저장되지 않으며, 사용자의
              기기에서 상담 메시지로 정리됩니다. 카카오톡 또는 문자로 이동한
              이후의 정보 처리는 각 서비스의 정책을 따릅니다.
            </p>
            <p>
              추후 서버 접수 기능을 도입할 경우 수집 항목, 이용 목적, 보유
              기간과 삭제 방법을 별도의 개인정보 처리방침으로 고지합니다.
            </p>
          </div>
        </details>
      </Reveal>

      <Reveal className="review-standards-section">
        <ShieldCheck aria-hidden="true" />
        <p>REVIEW STANDARDS</p>
        <h2>후기는 이렇게 공개합니다</h2>
        <ul>
          {trustStandards.map((standard) => (
            <li key={standard}>
              <Check aria-hidden="true" />
              <span>{standard}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="glass-button glass-button-kakao glass-button-large"
        >
          <MessageCircleMore aria-hidden="true" />
          레슨 상담하기
          <ArrowRight aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  );
}
