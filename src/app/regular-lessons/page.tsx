import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
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
  Navigation,
  Phone,
  Radar,
  RefreshCcw,
  RotateCcw,
  Shirt,
  ShoppingBag,
  Sparkles,
  Timer,
  Video,
} from "lucide-react";
import { LoopClip } from "@/components/loop-clip";
import { KakaoMap } from "@/components/kakao-map";
import { PhotoFade } from "@/components/photo-fade";
import { Reveal } from "@/components/reveal";
import { createPageMetadata } from "@/lib/seo";
import {
  amenities,
  analyzerPhotos,
  bay1F,
  bay2F,
  facilityHighlights,
  guideArea,
  parkingArea,
  restArea,
  shortGameArea,
} from "@/lib/photos";
import {
  isExternal,
  kakaoChannelHref,
  links,
  phoneHref,
  site,
} from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "도봉구 정기 골프 레슨",
  description:
    "서울 도봉구 문화골프연습장에서 두윤곤 프로와 꾸준한 반복, GC QUAD 데이터 분석으로 기본을 완성하는 정기 골프 레슨입니다.",
  path: "/regular-lessons",
  keywords: ["도봉구 정기 골프 레슨", "문화골프연습장 정기 레슨"],
});

const targets = [
  "골프를 처음 시작해 기초를 제대로 배우고 싶은 분",
  "핸디캡을 최소 9타 줄이고 싶은 분",
  "꾸준한 레슨과 연습 루틴을 만들고 싶은 분",
  "영상과 데이터로 변화를 직접 확인하고 싶은 분",
  "라이프 베스트 스코어를 경신하고 싶은 분",
  "100타를 확실하게 깨고 싶은 분",
  "싱글 스코어에 도전하고 싶은 분",
] as const;

const lessonProcess = [
  {
    number: "01",
    title: "현재 상태 확인",
    description: "목표와 고민을 먼저 듣고, 지금의 스윙을 영상으로 촬영합니다.",
  },
  {
    number: "02",
    title: "데이터 진단",
    description:
      "런치 모니터 수치와 영상을 함께 보며 문제의 원인을 찾아냅니다.",
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
    description:
      "다시 촬영해 변화를 확인하고, 다음 레슨 전까지의 목표를 정합니다.",
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
  title: ReactNode;
  description?: ReactNode;
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
  const external = isExternal(kakaoChannelHref);

  return (
    <Link
      href={kakaoChannelHref}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function RegularLessonsPage() {
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
            {site.place}에서 일정한 주기로 배우고 반복하며,
            <br />매 레슨의 변화를 영상과 데이터로 확인하는 정기 프로그램입니다.
          </p>
        </Reveal>

        <Reveal className="regular-hero-media" delay={0.08}>
          <PhotoFade
            images={facilityHighlights}
            className="regular-hero-photo"
            priority
          />
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
          description="1층과 2층 타석부터 퍼팅 · 벙커 연습장, 휴게 공간과 편의 시설까지. 실제 연습 환경을 사진 그대로 보여드립니다."
        />

        <div className="facility-gallery">
          <PhotoFade
            images={bay1F}
            className="facility-photo-wide"
            overlay={
              <>
                <span className="photo-eyebrow">HITTING BAY · 1F</span>
                <span className="photo-label">1층 타석</span>
              </>
            }
          />
          <PhotoFade
            images={bay2F}
            className="facility-photo-wide"
            interval={5200}
            overlay={
              <>
                <span className="photo-eyebrow">HITTING BAY · 2F</span>
                <span className="photo-label">2층 타석</span>
              </>
            }
          />
          <PhotoFade
            images={shortGameArea}
            className="facility-photo-half"
            interval={4900}
            sizes="(min-width: 721px) 350px, 48vw"
            overlay={
              <>
                <span className="photo-eyebrow">SHORT GAME</span>
                <span className="photo-label">퍼팅 · 벙커 연습장</span>
              </>
            }
          />
          <PhotoFade
            images={restArea}
            className="facility-photo-half"
            interval={5400}
            sizes="(min-width: 721px) 350px, 48vw"
            overlay={
              <>
                <span className="photo-eyebrow">LOUNGE</span>
                <span className="photo-label">실내외 휴게 공간</span>
              </>
            }
          />
          <PhotoFade
            images={amenities}
            className="facility-photo-half"
            interval={5100}
            sizes="(min-width: 721px) 350px, 48vw"
            overlay={
              <>
                <span className="photo-eyebrow">AMENITY</span>
                <span className="photo-label">락커 · 커피 · 정수기</span>
              </>
            }
          />
          <PhotoFade
            images={guideArea}
            className="facility-photo-half"
            interval={5600}
            sizes="(min-width: 721px) 350px, 48vw"
            overlay={
              <>
                <span className="photo-eyebrow">GUIDE</span>
                <span className="photo-label">타석 안내 · 층별 이동</span>
              </>
            }
          />
        </div>

        <div className="facility-features">
          <div>
            <Gauge aria-hidden="true" />
            <span>타석 환경</span>
            <strong>1층 · 2층 타석 운영</strong>
          </div>
          <div>
            <CircleParking aria-hidden="true" />
            <span>편의 시설</span>
            <strong>락커 · 휴게 공간 · 커피</strong>
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section regular-system-section">
        <SectionHeading
          index="02"
          eyebrow="ANALYSIS SYSTEM"
          title={
            <>
              보이지 않던 문제를
              <br />
              장비로 확인합니다
            </>
          }
          description="감각에만 의존하지 않습니다. 촬영 영상과 측정 결과를 함께 비교해 교정 방향을 분명하게 설명합니다."
        />

        <div className="system-layout">
          <PhotoFade
            images={analyzerPhotos}
            className="system-photo-frame"
            interval={5600}
            fluidHeight
            sizes="(min-width: 721px) 380px, 92vw"
          />
          <div className="system-feature-list">
            <article>
              <Video aria-hidden="true" />
              <div>
                <span>01</span>
                <h3>스윙 영상 촬영</h3>
                <p>
                  정면과 측면 2대의 카메라로 촬영해, 육안으로 놓치기 쉬운
                  움직임을 구간별로 확인합니다.
                </p>
              </div>
            </article>
            <article>
              <Radar aria-hidden="true" />
              <div>
                <span>02</span>
                <h3>측정 데이터 분석</h3>
                <p>
                  4개의 초고속 카메라가 임팩트를 실측해, 구질이 결정되는 원인을
                  숫자로 보여줍니다.
                </p>
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

        <LoopClip
          name="lesson-analysis"
          label="GC QUAD 분석 화면에서 스윙을 비교하는 모습"
          className="analysis-clip"
          overlay={
            <>
              <span className="photo-eyebrow">ANALYSIS SCREEN</span>
              <span className="photo-label">실제 분석 화면</span>
            </>
          }
        />

        <div className="inline-highlight">
          <Radar aria-hidden="true" />
          <p>
            <strong>공의 궤적은 임팩트의 순간에 이미 결정됩니다</strong>
            {site.analyzerNote} {site.analyzer}가 4개의 초고속 카메라로 임팩트를
            실측합니다. 감각이 아닌 데이터로 원인을 짚고, 해결 순서를 정합니다.
          </p>
        </div>
      </Reveal>

      <Reveal className="content-section regular-fit-section">
        <SectionHeading
          index="03"
          eyebrow="LESSON FIT"
          title={
            <>
              이런 분께
              <br />
              정기 레슨을 추천합니다
            </>
          }
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
            <strong>회당 20분</strong>
            <small>집중도 높은 짧은 주기</small>
          </div>
          <div>
            <RefreshCcw aria-hidden="true" />
            <span>주당 횟수</span>
            <strong>주 3~4회</strong>
            <small>반복으로 동작 정착</small>
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
              <dt>연습장 운영</dt>
              <dd>{site.facilityHours}</dd>
            </div>
            <div>
              <dt>레슨 가능 요일</dt>
              <dd>{site.lessonDays}</dd>
            </div>
            <div>
              <dt>상담 가능 시간</dt>
              <dd>{site.consultationHours}</dd>
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
          title={
            <>
              연습 목표에 맞는
              <br />
              정기 패키지
            </>
          }
          description="레슨비와 타석비 포함 여부는 상담 시 정확한 금액으로 안내해 드립니다."
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
                <dt>레슨 주기</dt>
                <dd>주 3~4회 · 회당 20분</dd>
              </div>
              <div>
                <dt>레슨비</dt>
                <dd>상담 시 안내</dd>
              </div>
              <div>
                <dt>타석비</dt>
                <dd>상담 시 안내</dd>
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
                <dt>레슨 주기</dt>
                <dd>주 3~4회 · 회당 20분</dd>
              </div>
              <div>
                <dt>레슨비</dt>
                <dd>상담 시 안내</dd>
              </div>
              <div>
                <dt>타석비</dt>
                <dd>상담 시 안내</dd>
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
            <span>일정 변경</span>
            <h3>하루 전까지</h3>
            <p>레슨 하루 전에 연락 주시면 일정을 조정해 드립니다.</p>
          </article>
          <article>
            <RefreshCcw aria-hidden="true" />
            <span>보강</span>
            <h3>상담 시 안내</h3>
            <p>보강 가능 횟수와 신청 방법을 예약 전에 알려드립니다.</p>
          </article>
          <article>
            <CalendarDays aria-hidden="true" />
            <span>이월</span>
            <h3>상담 시 안내</h3>
            <p>미사용 레슨의 이월 기준을 함께 확인해 드립니다.</p>
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
                <strong>개인 클럽 · 장갑</strong>
                <span>없어도 괜찮습니다. 상담 시 안내해 드립니다</span>
              </div>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal className="content-section regular-location-section">
        <SectionHeading
          index="07"
          eyebrow="LOCATION"
          title={`${site.place} 오시는 길`}
        />

        <KakaoMap
          className="location-map"
          placeName={site.place}
          address={site.address}
        />

        <PhotoFade
          images={parkingArea}
          className="facility-photo-wide location-photo"
          overlay={
            <>
              <span className="photo-eyebrow">PARKING</span>
              <span className="photo-label">연습장 앞 주차장</span>
            </>
          }
        />

        <dl className="location-details">
          <div>
            <dt>
              <MapPin aria-hidden="true" /> 주소
            </dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> 운영시간
            </dt>
            <dd>{site.facilityHours}</dd>
          </div>
          <div>
            <dt>
              <CarFront aria-hidden="true" /> 주차
            </dt>
            <dd>{site.parking}</dd>
          </div>
          <div>
            <dt>
              <BusFront aria-hidden="true" /> 대중교통
            </dt>
            <dd>가까운 정류장 · 역 정보 준비 중</dd>
          </div>
          <div>
            <dt>
              <Phone aria-hidden="true" /> 전화번호
            </dt>
            <dd>{site.phone}</dd>
          </div>
        </dl>

        {links.kakaoMap ? (
          <Link
            href={links.kakaoMap}
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
            카카오맵 길찾기 준비 중
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
          내게 맞는 연습 방향을 찾으세요.
        </h2>
        <span className="regular-final-description">
          전화나 카카오톡으로 현재 고민과 가능한 시간대를 남겨주세요. 확인 후
          바로 안내해 드립니다.
        </span>
        <div className="regular-final-actions">
          <a href={phoneHref} className="glass-button glass-button-call">
            <Phone aria-hidden="true" />
            {site.phone}
          </a>
          <KakaoLink className="glass-button glass-button-kakao">
            <MessageCircleMore aria-hidden="true" />
            카톡으로 신청하기
          </KakaoLink>
        </div>
      </Reveal>
    </div>
  );
}
