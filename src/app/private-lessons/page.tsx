import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CircleDot,
  Clock3,
  Flag,
  Gauge,
  Info,
  MapPin,
  MessageCircleMore,
  MoveRight,
  PackageCheck,
  Phone,
  Play,
  ScanLine,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { LoopClip } from "@/components/loop-clip";
import { Reveal } from "@/components/reveal";
import { isExternal, kakaoChannelHref, phoneHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인 레슨",
  description:
    "목표와 문제 한 가지에 수업 전체를 집중하는 1:1 맞춤 개인 골프 레슨 프로그램.",
};

const lessonPrograms = [
  {
    number: "01",
    icon: Target,
    clip: "lesson-swing",
    type: "SWING CORRECTION",
    title: "1:1 스윙 교정",
    description:
      "현재 스윙의 원인을 찾고, 목표에 맞는 움직임으로 집중 교정합니다.",
    goal: "슬라이스 · 훅, 비거리, 일관성",
    media: "1:1 스윙 교정",
  },
  {
    number: "02",
    icon: CircleDot,
    clip: "lesson-bunker",
    type: "SHORT GAME",
    title: "숏게임 · 퍼팅",
    description:
      "거리별 어프로치와 퍼팅의 기본 원리부터 실전 루틴까지 다듬습니다.",
    goal: "스코어 관리, 그린 주변 자신감",
    media: "숏게임 · 퍼팅 레슨",
  },
  {
    number: "03",
    icon: Flag,
    clip: "lesson-field",
    type: "ON-COURSE",
    title: "필드 레슨",
    description:
      "실제 코스에서 클럽 선택과 상황 판단, 루틴과 경기 운영을 점검합니다.",
    goal: "코스 매니지먼트, 실전 적응",
    media: "필드 레슨",
  },
  {
    number: "04",
    icon: ScanLine,
    clip: "lesson-analysis",
    type: "VIDEO ANALYSIS",
    title: "스윙 영상 분석",
    description:
      "촬영 영상과 측정 데이터를 구간별로 확인해 교정 우선순위를 정합니다.",
    goal: "문제 진단, 연습 방향 설정",
    media: "스윙 영상 분석",
  },
  {
    number: "05",
    icon: Users,
    clip: "lesson-group",
    type: "SMALL GROUP",
    title: "다인 레슨",
    description:
      "가족 · 친구 · 동료와 함께 배우면서도 개인별 피드백은 따로 받습니다.",
    goal: "함께 시작하기, 소규모 집중 수업",
    media: "다인 레슨",
  },
] as const;

const takeaways = [
  "레슨 전후 스윙 비교 영상",
  "오늘의 핵심 교정 포인트",
  "혼자 할 수 있는 개인 연습 드릴",
  "다음 레슨 전까지의 연습 목표",
  "카카오톡 후속 질문 안내",
] as const;

const cases = [
  {
    label: "슬라이스 교정",
    title: "드라이버가 오른쪽으로 휘어요",
    description:
      "클럽 페이스와 스윙 궤도의 관계를 먼저 확인하고, 하체 회전 순서를 교정하는 드릴로 이어갑니다.",
    metric: "페이스 각 · 클럽 궤도 · 미스 방향",
  },
  {
    label: "비거리 향상",
    title: "힘껏 쳐도 거리가 나지 않아요",
    description:
      "임팩트 효율과 회전 순서를 측정해, 힘을 더 쓰지 않고도 거리를 늘리는 방향으로 정리합니다.",
    metric: "볼 스피드 · 스매시 팩터 · 발사각",
  },
  {
    label: "100타 깨기",
    title: "스코어가 100타 앞에서 멈춰요",
    description:
      "티샷 안정성과 그린 주변 실수를 함께 줄입니다. 무너지는 홀을 없애는 데 집중합니다.",
    metric: "페어웨이 안착 · 홀당 실수 횟수",
  },
  {
    label: "숏게임 개선",
    title: "그린 주변에서 타수를 잃어요",
    description:
      "거리별 스윙 크기의 기준을 만들고, 상황별 클럽 선택까지 정리합니다.",
    metric: "거리 편차 · 업앤다운 성공률",
  },
  {
    label: "필드 레슨",
    title: "연습장과 필드가 너무 달라요",
    description:
      "실제 코스에서 루틴과 코스 매니지먼트를 점검하고, 연습장에서 만든 동작을 실전으로 옮깁니다.",
    metric: "루틴 유지 · 상황별 클럽 선택",
  },
] as const;

const reservationSteps = [
  {
    number: "01",
    title: "상담 신청",
    description: "현재 고민과 원하는 레슨을 남겨주세요.",
  },
  {
    number: "02",
    title: "목표 확인",
    description: "실력과 목표에 맞는 방식과 장소를 협의합니다.",
  },
  {
    number: "03",
    title: "일정 확정",
    description: "가능한 날짜와 시간을 확인해 예약을 확정합니다.",
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

export default function PrivateLessonsPage() {
  return (
    <div className="private-page">
      <section className="private-hero" aria-labelledby="private-title">
        <Reveal className="private-hero-copy">
          <h1
            id="private-title"
            className="flex flex-col items-center justify-center text-center"
          >
            한 사람의 목표에,
            <br />더 깊게 집중합니다.
          </h1>
          <p className="text-center">
            {site.analyzer}로 스윙 자세와 동작을
            <br />
            과학적으로 분석하고, 체계적인 교정으로
            <br />
            해결책까지 완성하는 프라이빗 레슨입니다.
          </p>
        </Reveal>

        <Reveal className="private-hero-media" delay={0.08}>
          <LoopClip
            name="lesson-field-aim"
            label="필드에서 진행한 개인 레슨 영상"
            className="private-hero-clip"
          />
          <div className="private-video-card">
            <span className="video-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
            <div>
              <span>VIDEO FEEDBACK</span>
              <strong>전후 스윙 비교 영상 제공</strong>
            </div>
          </div>
        </Reveal>

        <Reveal className="hero-actions" delay={0.12}>
          <KakaoLink className="glass-button glass-button-primary glass-button-large">
            <MessageCircleMore aria-hidden="true" />
            <span>개인 레슨 상담하기</span>
            <ArrowRight className="button-arrow" aria-hidden="true" />
          </KakaoLink>
          <p>
            현재 고민과 목표를 알려주시면 적합한 레슨 방식부터 안내해 드립니다.
          </p>
        </Reveal>
      </section>

      <Reveal className="content-section private-difference-section">
        <SectionHeading
          index="01"
          eyebrow="WHY PRIVATE"
          title="정기 레슨과 무엇이 다른가요?"
          description="정기 레슨이 꾸준한 주기로 기본과 루틴을 만드는 과정이라면, 개인 레슨은 하나의 문제와 목표에 수업의 밀도를 집중하는 방식입니다. 같은 스윙이라도 원인과 목표는 사람마다 다릅니다."
        />

        <div className="lesson-comparison">
          <article>
            <div className="comparison-label">
              <span>REGULAR</span>
              <span>01</span>
            </div>
            <h3>정기 레슨</h3>
            <p>일정한 주기로 기초부터 꾸준히</p>
            <ul>
              <li>고정된 장소와 주기</li>
              <li>단계별 기본기 형성</li>
              <li>반복으로 동작 정착</li>
            </ul>
            <Link href="/regular-lessons">
              정기 레슨 보기 <MoveRight aria-hidden="true" />
            </Link>
          </article>

          <article className="comparison-private">
            <div className="comparison-label">
              <span>PRIVATE</span>
              <span>02</span>
            </div>
            <h3>개인 레슨</h3>
            <p>한 가지 목표에 더 빠르고 깊게</p>
            <ul>
              <li>목표별 맞춤 구성</li>
              <li>장소와 일정 협의 가능</li>
              <li>집중 진단과 결과물 제공</li>
            </ul>
            <KakaoLink className="comparison-contact-link">
              내게 맞는 레슨 문의 <MoveRight aria-hidden="true" />
            </KakaoLink>
          </article>
        </div>

        <div className="private-recommend-card">
          <Target aria-hidden="true" />
          <div>
            <span>개인 레슨 추천 대상</span>
            <p>
              슬라이스 · 비거리 · 숏게임처럼 해결할 목표가 분명한 분, 또는
              중요한 라운드를 앞두고 단기간 집중 점검이 필요한 분께 추천합니다.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section private-method-section">
        <SectionHeading
          index="02"
          eyebrow="LESSON METHOD"
          title="진단하고, 교정하고, 가져갑니다"
          description="수업 시간만 채우지 않습니다. 다음 연습으로 그대로 이어갈 수 있는 결과물을 함께 드립니다."
        />

        <div className="private-method-media">
          <div
            className="media-placeholder"
            role="img"
            aria-label="레슨 전 스윙 영상 자리"
          >
            <span>레슨 전 스윙</span>
            <small>BEFORE</small>
          </div>
          <div
            className="media-placeholder"
            role="img"
            aria-label="레슨 후 스윙 영상 자리"
          >
            <span>레슨 후 스윙</span>
            <small>AFTER</small>
          </div>
        </div>

        <div className="private-method-flow">
          <div>
            <span>01</span>
            <strong>촬영</strong>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <span>02</span>
            <strong>진단</strong>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <span>03</span>
            <strong>교정</strong>
          </div>
          <ArrowRight aria-hidden="true" />
          <div>
            <span>04</span>
            <strong>피드백</strong>
          </div>
        </div>

        <div className="inline-highlight">
          <ScanLine aria-hidden="true" />
          <p>
            <strong>1:1 스윙 진단 · 50분</strong>
            현재 스윙 촬영, 핵심 문제 진단, 교정 드릴 1~2개, 레슨 요약 영상까지
            한 번의 수업에 담습니다.
          </p>
        </div>

        <div className="takeaway-card">
          <div className="takeaway-heading">
            <PackageCheck aria-hidden="true" />
            <div>
              <p>WHAT YOU TAKE</p>
              <h3>레슨 후 가져가는 것</h3>
            </div>
          </div>
          <ul>
            {takeaways.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="content-section private-program-section">
        <SectionHeading
          index="03"
          eyebrow="PROGRAM"
          title="목표에 맞게 선택하는 개인 레슨"
        />

        <div className="private-program-list">
          {lessonPrograms.map(
            ({
              number,
              icon: Icon,
              clip,
              type,
              title,
              description,
              goal,
              media,
            }) => (
              <article key={number} className="private-program-card">
                <LoopClip
                  name={clip}
                  label={`${media} 영상`}
                  overlay={
                    <>
                      <span className="photo-eyebrow">{type}</span>
                      <span className="photo-label">{media}</span>
                    </>
                  }
                />
                <div className="private-program-content">
                  <div className="program-topline">
                    <span>{number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="program-goal">
                    <span>추천 목표</span>
                    <strong>{goal}</strong>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </Reveal>

      <Reveal className="content-section private-info-section">
        <SectionHeading
          index="04"
          eyebrow="LESSON INFO"
          title="예약 전 확인할 기본 정보"
        />

        <div className="private-info-grid">
          <article>
            <Users aria-hidden="true" />
            <span>대상</span>
            <strong>입문자부터 경험자까지</strong>
            <p>목표와 현재 상태를 상담 후 결정</p>
          </article>
          <article>
            <Clock3 aria-hidden="true" />
            <span>시간</span>
            <strong>회당 50분</strong>
            <p>프로그램에 따라 조정 가능</p>
          </article>
          <article>
            <MapPin aria-hidden="true" />
            <span>장소</span>
            <strong>연습장 · 숏게임장 · 필드</strong>
            <p>프로그램별로 협의해 결정</p>
          </article>
          <article>
            <Gauge aria-hidden="true" />
            <span>인원</span>
            <strong>1:1 또는 다인</strong>
            <p>다인 레슨 인원은 상담 시 안내</p>
          </article>
        </div>
      </Reveal>

      <Reveal className="content-section private-case-section">
        <SectionHeading
          index="05"
          eyebrow="GOAL & CASE"
          title="목표별로 이렇게 진행합니다"
          description="가장 많이 찾아주시는 다섯 가지 목표입니다. 같은 목표라도 원인은 다르기 때문에, 첫 수업은 언제나 진단부터 시작합니다."
        />

        <div className="case-list">
          {cases.map((item, index) => (
            <article key={item.label} className="case-card">
              <div className="case-topline">
                <Target aria-hidden="true" />
                CASE {String(index + 1).padStart(2, "0")} · {item.label}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="case-change">
                <span>확인 지표</span>
                <TrendingUp aria-hidden="true" />
                <strong>{item.metric}</strong>
              </div>
            </article>
          ))}
        </div>

        <p className="case-note">
          <Info aria-hidden="true" />
          실제 회원의 전후 스윙과 수치는 공개 동의를 받은 자료만 후기 페이지에
          기록합니다.
        </p>

        <Link href="/reviews" className="section-link">
          레슨 과정과 후기 보기 <MoveRight aria-hidden="true" />
        </Link>
      </Reveal>

      <Reveal className="content-section private-package-section">
        <SectionHeading
          index="06"
          eyebrow="FOCUSED PACKAGE"
          title="변화에 집중하는 5회 · 10회 패키지"
          description="정확한 구성과 가격, 유효기간은 상담 시 목표에 맞춰 안내해 드립니다."
        />

        <div className="private-package-list">
          <article className="private-package-card">
            <div className="private-package-topline">
              <span>FOCUS 05</span>
              <span>01</span>
            </div>
            <div>
              <p>한 가지 문제를 집중 점검하는</p>
              <h3>5회 집중 패키지</h3>
            </div>
            <dl>
              <div>
                <dt>추천 목표</dt>
                <dd>스윙 교정 · 비거리 · 구질</dd>
              </div>
              <div>
                <dt>레슨 시간</dt>
                <dd>회당 50분</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>상담 후 협의</dd>
              </div>
              <div>
                <dt>가격</dt>
                <dd>상담 시 안내</dd>
              </div>
            </dl>
            <div className="package-includes">
              <span>포함 항목</span>
              <p>스윙 촬영 · 핵심 진단 · 개인 드릴 · 피드백</p>
            </div>
            <KakaoLink className="glass-button private-package-button">
              5회 패키지 문의 <ArrowRight aria-hidden="true" />
            </KakaoLink>
          </article>

          <article className="private-package-card private-package-featured">
            <div className="private-package-topline">
              <span>CHANGE 10</span>
              <span>02</span>
            </div>
            <div>
              <p>진단부터 반복 정착까지 이어가는</p>
              <h3>10회 집중 패키지</h3>
            </div>
            <dl>
              <div>
                <dt>추천 목표</dt>
                <dd>스윙 재구성 · 100타 깨기</dd>
              </div>
              <div>
                <dt>레슨 시간</dt>
                <dd>회당 50분</dd>
              </div>
              <div>
                <dt>장소</dt>
                <dd>상담 후 협의</dd>
              </div>
              <div>
                <dt>가격</dt>
                <dd>상담 시 안내</dd>
              </div>
            </dl>
            <div className="package-includes">
              <span>포함 항목</span>
              <p>전후 비교 · 단계별 드릴 · 레슨 요약 · 후속 피드백</p>
            </div>
            <KakaoLink className="glass-button glass-button-light private-package-button">
              10회 패키지 문의 <ArrowRight aria-hidden="true" />
            </KakaoLink>
          </article>
        </div>
      </Reveal>

      <Reveal className="content-section private-reservation-section">
        <SectionHeading
          index="07"
          eyebrow="RESERVATION"
          title="상담부터 예약까지 간단하게"
        />

        <ol className="reservation-step-list">
          {reservationSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reservation-methods">
          <div>
            <CalendarClock aria-hidden="true" />
            <span>예약 가능 방식</span>
            <strong>카카오톡 · 전화 상담</strong>
          </div>
          <p>
            상담 후 레슨 종류와 장소, 가능한 시간을 확인해 최종 예약합니다.
            상담은 {site.consultationHours} 사이에 가능합니다.
          </p>
        </div>
      </Reveal>

      <Reveal className="private-final-cta">
        <div className="final-cta-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>FOCUS ON YOUR GOAL</p>
        <h2>
          가장 바꾸고 싶은 한 가지부터,
          <br />
          정확하게 시작해 보세요.
        </h2>
        <span className="private-final-description">
          현재 고민과 목표를 알려주시면 적합한 개인 레슨을 안내해 드립니다.
        </span>
        <div className="private-final-actions">
          <a href={phoneHref} className="glass-button glass-button-call">
            <Phone aria-hidden="true" />
            {site.phone}
          </a>
          <KakaoLink className="glass-button glass-button-kakao">
            <MessageCircleMore aria-hidden="true" />
            카톡으로 상담하기
          </KakaoLink>
        </div>
      </Reveal>
    </div>
  );
}
