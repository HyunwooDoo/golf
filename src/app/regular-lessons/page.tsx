import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  BusFront,
  CalendarDays,
  Camera,
  CarFront,
  Check,
  CircleParking,
  Clock3,
  Footprints,
  Gauge,
  MapPin,
  MessageCircleMore,
  MonitorDot,
  Navigation,
  Phone,
  RefreshCcw,
  RotateCcw,
  Shirt,
  ShoppingBag,
  Sparkles,
  Timer,
  Video,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "문화골프연습장 정기 레슨",
  description: "꾸준한 반복과 데이터 분석으로 기본을 완성하는 정기 골프 레슨",
};

const kakaoChannelUrl =
  process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "/contact?channel=kakao";
const kakaoMapUrl = process.env.NEXT_PUBLIC_KAKAO_MAP_URL;
const lessonPhone = process.env.NEXT_PUBLIC_LESSON_PHONE;

const targets = [
  "골프를 처음 시작해 기초를 제대로 배우고 싶은 분",
  "연습할 때마다 스윙이 달라져 기준이 필요한 분",
  "꾸준한 레슨과 연습 루틴을 만들고 싶은 분",
  "영상과 장비로 변화를 직접 확인하고 싶은 분",
] as const;

const lessonProcess = [
  {
    number: "01",
    title: "현재 상태 확인",
    description: "목표와 고민을 듣고 현재 스윙을 영상으로 촬영합니다.",
  },
  {
    number: "02",
    title: "데이터 진단",
    description: "분석 장비와 영상을 함께 보며 핵심 원인을 찾습니다.",
  },
  {
    number: "03",
    title: "핵심 동작 교정",
    description: "한 번에 한 가지 핵심에 집중해 새로운 움직임을 익힙니다.",
  },
  {
    number: "04",
    title: "반복 드릴",
    description: "혼자서도 재현할 수 있는 개인 연습 드릴을 반복합니다.",
  },
  {
    number: "05",
    title: "변화 확인과 과제",
    description: "다시 촬영해 변화를 확인하고 다음 레슨 전 목표를 정합니다.",
  },
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

function KakaoLink({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const isExternal = kakaoChannelUrl.startsWith("http");

  return (
    <Link
      href={kakaoChannelUrl}
      className={className}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function RegularLessonsPage() {
  const phoneHref = lessonPhone
    ? `tel:${lessonPhone.replace(/[^+\d]/g, "")}`
    : null;

  return (
    <div className="regular-page">
      <section className="regular-hero" aria-labelledby="regular-title">
        <Reveal className="regular-hero-copy">
          <h1
            id="regular-title"
            className="flex flex-col items-center justify-center text-center"
          >
            꾸준한 반복이,
            <br />
            흔들리지 않는
            <br />
            기본을 만듭니다.
          </h1>
          <p className="text-center">
            문화골프연습장에서 일정한 주기로 배우고 반복하며, 매 레슨의 변화를
            영상과 데이터로 확인하는
            <br />
            정기 프로그램입니다.
          </p>
        </Reveal>

        <Reveal className="regular-hero-media" delay={0.08}>
          <div
            className="media-placeholder"
            role="img"
            aria-label="문화골프연습장 전경 사진 자리"
          >
            <span>문화골프연습장 전경 사진</span>
            <small>FACILITY VIEW</small>
          </div>
          <div className="regular-hero-badge">
            <span>REGULAR</span>
            <strong>꾸준하게</strong>
            <p>진단 · 교정 · 반복 · 확인</p>
          </div>
        </Reveal>

        <Reveal className="hero-actions" delay={0.12}>
          <KakaoLink className="glass-button glass-button-primary glass-button-large">
            <MessageCircleMore aria-hidden="true" />
            <span>정기 레슨 상담하기</span>
            <ArrowRight className="button-arrow" aria-hidden="true" />
          </KakaoLink>
          <p>
            현재 실력과 가능한 시간대를 알려주시면 수강 방법을 안내해 드립니다.
          </p>
        </Reveal>
      </section>

      <Reveal className="content-section regular-space-section">
        <SectionHeading
          index="01"
          eyebrow="SPACE & FACILITY"
          title="연습에 집중할 수 있는 공간"
          description="실제 시설 사진이 준비되면 타석 간격과 연습 환경을 한눈에 확인할 수 있도록 교체됩니다."
        />

        <div className="facility-gallery">
          <div
            className="media-placeholder facility-main-photo"
            role="img"
            aria-label="타석 환경 사진 자리"
          >
            <span>타석 환경 사진</span>
            <small>HITTING BAY</small>
          </div>
          <div
            className="media-placeholder"
            role="img"
            aria-label="연습장 시설 사진 자리"
          >
            <span>연습장 시설 사진</span>
            <small>FACILITY</small>
          </div>
          <div
            className="media-placeholder"
            role="img"
            aria-label="대기 및 휴게 공간 사진 자리"
          >
            <span>대기·휴게 공간 사진</span>
            <small>LOUNGE</small>
          </div>
        </div>

        <div className="facility-features">
          <div>
            <Gauge aria-hidden="true" />
            <span>타석 환경</span>
            <strong>상세 정보 입력 예정</strong>
          </div>
          <div>
            <CircleParking aria-hidden="true" />
            <span>편의 시설</span>
            <strong>상세 정보 입력 예정</strong>
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section regular-system-section">
        <SectionHeading
          index="02"
          eyebrow="ANALYSIS SYSTEM"
          title="보이지 않던 문제를 장비로 확인합니다"
          description="감각에만 의존하지 않고 촬영 영상과 측정 결과를 함께 비교해 교정 방향을 더 명확하게 설명합니다."
        />

        <div className="system-layout">
          <div
            className="media-placeholder system-photo"
            role="img"
            aria-label="스윙 분석 장비 사진 자리"
          >
            <MonitorDot aria-hidden="true" />
            <span>스윙 분석 장비 사진</span>
            <small>장비명 입력 예정</small>
          </div>
          <div className="system-feature-list">
            <article>
              <Video aria-hidden="true" />
              <div>
                <span>01</span>
                <h3>스윙 영상 촬영</h3>
                <p>육안으로 놓치기 쉬운 움직임을 구간별로 확인합니다.</p>
              </div>
            </article>
            <article>
              <BarChart3 aria-hidden="true" />
              <div>
                <span>02</span>
                <h3>측정 데이터 분석</h3>
                <p>사용 장비명과 제공되는 측정 항목이 이곳에 표시됩니다.</p>
              </div>
            </article>
            <article>
              <Camera aria-hidden="true" />
              <div>
                <span>03</span>
                <h3>전후 변화 비교</h3>
                <p>
                  레슨 전후 영상을 비교해 달라진 점과 다음 과제를 확인합니다.
                </p>
              </div>
            </article>
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section regular-fit-section">
        <SectionHeading
          index="03"
          eyebrow="LESSON FIT"
          title="이런 분께 정기 레슨을 추천합니다"
        />

        <ul className="regular-target-list">
          {targets.map((target, index) => (
            <li key={target}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{target}</p>
              <Check aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="lesson-schedule-summary">
          <div>
            <Timer aria-hidden="true" />
            <span>레슨 시간</span>
            <strong>회당 —분</strong>
            <small>실제 시간 입력</small>
          </div>
          <div>
            <RefreshCcw aria-hidden="true" />
            <span>주당 횟수</span>
            <strong>주 —회</strong>
            <small>실제 횟수 입력</small>
          </div>
        </div>

        <div className="availability-card">
          <div className="availability-heading">
            <CalendarDays aria-hidden="true" />
            <div>
              <p>AVAILABLE SCHEDULE</p>
              <h3>가능한 요일과 시간대</h3>
            </div>
          </div>
          <dl>
            <div>
              <dt>운영 요일</dt>
              <dd>가능 요일 입력 예정</dd>
            </div>
            <div>
              <dt>가능 시간</dt>
              <dd>가능 시간대 입력 예정</dd>
            </div>
            <div>
              <dt>일정 확정</dt>
              <dd>상담 후 협의</dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <Reveal className="content-section regular-package-section">
        <SectionHeading
          index="04"
          eyebrow="PACKAGE"
          title="연습 목표에 맞는 정기 패키지"
          description="아래 가격과 횟수 영역은 실제 운영안이 확정되면 바로 교체할 수 있습니다."
        />

        <div className="regular-package-list">
          <article className="regular-package-card">
            <div className="package-card-topline">
              <span>STARTER</span>
              <span>01 MONTH</span>
            </div>
            <div>
              <p>부담 없이 시작하는</p>
              <h3>1개월 정기 레슨</h3>
            </div>
            <dl>
              <div>
                <dt>레슨 횟수</dt>
                <dd>입력 예정</dd>
              </div>
              <div>
                <dt>레슨비</dt>
                <dd>가격 입력 예정</dd>
              </div>
              <div>
                <dt>타석비</dt>
                <dd>포함 여부 입력</dd>
              </div>
            </dl>
            <KakaoLink className="glass-button package-button">
              1개월 과정 문의 <ArrowRight aria-hidden="true" />
            </KakaoLink>
          </article>

          <article className="regular-package-card regular-package-featured">
            <div className="package-card-topline">
              <span>RECOMMENDED</span>
              <span>03 MONTHS</span>
            </div>
            <div>
              <p>반복으로 변화를 만드는</p>
              <h3>3개월 정기 레슨</h3>
            </div>
            <dl>
              <div>
                <dt>레슨 횟수</dt>
                <dd>입력 예정</dd>
              </div>
              <div>
                <dt>레슨비</dt>
                <dd>가격 입력 예정</dd>
              </div>
              <div>
                <dt>타석비</dt>
                <dd>포함 여부 입력</dd>
              </div>
            </dl>
            <KakaoLink className="glass-button glass-button-light package-button">
              3개월 과정 문의 <ArrowRight aria-hidden="true" />
            </KakaoLink>
          </article>
        </div>
      </Reveal>

      <Reveal className="content-section regular-process-section">
        <SectionHeading
          index="05"
          eyebrow="LESSON FLOW"
          title="매 레슨은 이렇게 진행됩니다"
        />

        <ol className="regular-process-list">
          {lessonProcess.map((item) => (
            <li key={item.number}>
              <div className="process-number">{item.number}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="content-section regular-guide-section">
        <SectionHeading
          index="06"
          eyebrow="POLICY & PREPARATION"
          title="예약 전 확인해 주세요"
        />

        <div className="policy-grid">
          <article>
            <RotateCcw aria-hidden="true" />
            <span>취소 정책</span>
            <h3>기준 입력 예정</h3>
            <p>취소 가능 시점과 당일 취소 기준이 표시됩니다.</p>
          </article>
          <article>
            <RefreshCcw aria-hidden="true" />
            <span>보강 정책</span>
            <h3>기준 입력 예정</h3>
            <p>보강 가능 횟수와 신청 방법이 표시됩니다.</p>
          </article>
          <article>
            <CalendarDays aria-hidden="true" />
            <span>이월 정책</span>
            <h3>기준 입력 예정</h3>
            <p>미사용 레슨의 이월 가능 기간이 표시됩니다.</p>
          </article>
        </div>

        <div className="preparation-card">
          <div className="preparation-title">
            <ShoppingBag aria-hidden="true" />
            <div>
              <p>WHAT TO BRING</p>
              <h3>레슨 준비물</h3>
            </div>
          </div>
          <ul>
            <li>
              <Shirt aria-hidden="true" />
              <div>
                <strong>편안한 복장</strong>
                <span>회전에 방해되지 않는 운동복</span>
              </div>
            </li>
            <li>
              <Footprints aria-hidden="true" />
              <div>
                <strong>운동화 또는 골프화</strong>
                <span>미끄럽지 않고 편안한 신발</span>
              </div>
            </li>
            <li>
              <Sparkles aria-hidden="true" />
              <div>
                <strong>개인 클럽·장갑</strong>
                <span>보유한 경우 준비, 미보유 시 사전 문의</span>
              </div>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal className="content-section regular-location-section">
        <SectionHeading
          index="07"
          eyebrow="LOCATION"
          title="문화골프연습장 오시는 길"
        />

        <div
          className="media-placeholder location-map"
          role="img"
          aria-label="문화골프연습장 지도 자리"
        >
          <MapPin aria-hidden="true" />
          <span>카카오맵 지도 영역</span>
          <small>주소 입력 후 지도 연결</small>
        </div>

        <dl className="location-details">
          <div>
            <dt>
              <MapPin aria-hidden="true" /> 주소
            </dt>
            <dd>연습장 상세 주소 입력 예정</dd>
          </div>
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> 운영시간
            </dt>
            <dd>운영시간 입력 예정</dd>
          </div>
          <div>
            <dt>
              <CarFront aria-hidden="true" /> 주차
            </dt>
            <dd>주차 가능 여부와 이용 안내 입력 예정</dd>
          </div>
          <div>
            <dt>
              <BusFront aria-hidden="true" /> 대중교통
            </dt>
            <dd>가까운 정류장 또는 역 정보 입력 예정</dd>
          </div>
          <div>
            <dt>
              <Phone aria-hidden="true" /> 전화번호
            </dt>
            <dd>{lessonPhone ?? "전화번호 입력 예정"}</dd>
          </div>
        </dl>

        {kakaoMapUrl ? (
          <Link
            href={kakaoMapUrl}
            className="glass-button map-button"
            target="_blank"
            rel="noreferrer"
          >
            <Navigation aria-hidden="true" />
            카카오맵 길찾기
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span
            className="glass-button map-button is-disabled"
            aria-disabled="true"
          >
            <Navigation aria-hidden="true" />
            카카오맵 주소 연결 예정
          </span>
        )}
      </Reveal>

      <Reveal className="regular-final-cta">
        <div className="final-cta-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>TRIAL LESSON</p>
        <h2>
          한 번의 체험으로,
          <br />
          내게 맞는 연습 방향을 찾아보세요.
        </h2>
        <span className="regular-final-description">
          전화 또는 카카오톡으로 현재 고민과 가능한 시간대를 남겨주세요.
        </span>
        <div className="regular-final-actions">
          {phoneHref ? (
            <Link href={phoneHref} className="glass-button glass-button-call">
              <Phone aria-hidden="true" />
              전화로 신청하기
            </Link>
          ) : (
            <span
              className="glass-button glass-button-call is-disabled"
              aria-disabled="true"
            >
              <Phone aria-hidden="true" />
              전화번호 입력 예정
            </span>
          )}
          <KakaoLink className="glass-button glass-button-kakao">
            <MessageCircleMore aria-hidden="true" />
            카톡으로 신청하기
          </KakaoLink>
        </div>
      </Reveal>
    </div>
  );
}
