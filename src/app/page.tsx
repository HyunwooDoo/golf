import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Gauge,
  MessageCircleMore,
  MoveRight,
  Radar,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { HeroGallery } from "@/components/hero-gallery";
import { PhotoFade } from "@/components/photo-fade";
import { Reveal } from "@/components/reveal";
import { lessonScenes, proPhotos } from "@/lib/photos";
import { isExternal, kakaoChannelHref, profile, site } from "@/lib/site";

const philosophy = [
  {
    number: "01",
    title: "정확한 진단",
    description:
      "스윙 영상과 런치 모니터 데이터로 지금의 움직임을 있는 그대로 확인합니다.",
  },
  {
    number: "02",
    title: "핵심 교정",
    description:
      "한 번에 여러 가지를 바꾸지 않습니다. 결과를 가장 크게 바꾸는 원인부터 교정합니다.",
  },
  {
    number: "03",
    title: "반복 드릴",
    description:
      "혼자 연습할 때도 그대로 재현할 수 있는 단순한 드릴로 동작을 몸에 남깁니다.",
  },
  {
    number: "04",
    title: "변화 확인",
    description:
      "다시 촬영하고 측정해 달라진 점을 확인하고, 다음 레슨의 목표를 정합니다.",
  },
] as const;

const audiences = [
  "골프를 처음 시작해 어디서 배울지 고민이신 분",
  "100타의 벽을 빠르게 넘고 싶은 분",
  "라이프 베스트 스코어를 경신하고 싶은 분",
  "싱글 스코어에 도전하고 싶은 분",
  "드라이버 비거리가 고민이신 분",
  "슬라이스 · 훅을 확실히 잡고 싶은 분",
] as const;

const faqs = [
  {
    question: "골프를 한 번도 해본 적이 없어도 괜찮을까요?",
    answer:
      "네, 괜찮습니다. 그립과 어드레스처럼 처음에 제대로 잡아야 하는 기초부터 눈높이에 맞춰 안내해 드립니다. 부담 없이 쉽고 재미있게 시작하실 수 있습니다.",
  },
  {
    question: "체험 레슨에서는 무엇을 확인할 수 있나요?",
    answer:
      "현재 스윙을 촬영하고 GC QUAD로 측정한 뒤, 가장 먼저 해결해야 할 문제 한 가지와 앞으로의 연습 방향을 정리해 드립니다.",
  },
  {
    question: "정기 레슨과 개인 레슨 중 무엇을 선택해야 하나요?",
    answer:
      "현재 구력과 가장 큰 고민을 알려주시면 두 방식 중 더 잘 맞는 쪽을 추천해 드립니다. 방문하시면 실력과 상황에 맞춰 직접 상담해 드립니다.",
  },
  {
    question: "레슨은 몇 회 정도 받아야 하나요?",
    answer:
      "목표에 따라 다릅니다. 체험 레슨에서 현재 상태를 진단한 뒤 필요한 횟수와 연습 주기를 과하지 않게 제안해 드립니다.",
  },
  {
    question: "일정 변경이나 취소도 가능한가요?",
    answer:
      "하루 전에 연락 주시면 일정을 조정해 드립니다. 레슨 가능 요일은 월 · 수 · 금 · 토요일입니다.",
  },
] as const;

function KakaoLink({
  children,
  className,
}: {
  children: React.ReactNode;
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

export default function Home() {
  return (
    <div className="intro-page">
      <section className="intro-hero" aria-labelledby="intro-title">
        <Reveal className="intro-hero-copy">
          <h1
            id="intro-title"
            className="flex flex-col items-center justify-center text-center"
          >
            기초는 확실하게,
            <br />
            진단은 정확하게.
            <span>
              한 번의 체험으로 방향을 찾고,
              <br />
              반복 레슨으로 변화를 완성합니다.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <HeroGallery
            photos={lessonScenes}
            clip={{
              name: "swing-pro",
              label: `${site.proName} 프로의 스윙 영상`,
            }}
            photoOverlay={{ eyebrow: "LESSON", label: site.place }}
            clipOverlay={{ eyebrow: "SWING", label: `${site.proName} 프로` }}
          />
        </Reveal>

        <Reveal className="hero-actions" delay={0.12}>
          <KakaoLink className="glass-button glass-button-primary glass-button-large">
            <MessageCircleMore aria-hidden="true" />
            <span>체험 레슨 상담하기</span>
            <ArrowRight className="button-arrow" aria-hidden="true" />
          </KakaoLink>
          <p>
            지금 가장 큰 고민 한 가지만 남겨주세요. <br />
            진단 방향부터 안내해 드립니다.
          </p>
        </Reveal>
      </section>

      <Reveal className="hook-band">
        <span>
          <Sparkles aria-hidden="true" />
          DIFFERENT EXPERIENCE
        </span>
        <h2>
          지금까지 알던 골프와
          <br />
          차원이 다른 레슨을
          <br />
          경험해 보세요.
        </h2>
        <p>
          <strong>열심히 연습하는데 실력이 그대로인가요?</strong> <br /> 한 번의
          체험 레슨으로 문제의 원인을 파악하고, <br />
          진단과 해결책까지 정리해 드립니다.
        </p>
      </Reveal>

      <Reveal className="content-section profile-section">
        <SectionHeading
          index="01"
          eyebrow="COACH PROFILE"
          title="감이 아니라, 데이터로 설명합니다"
          description={`${site.analyzerNote} ${site.analyzer}로 스윙 자세와 동작을 과학적으로 분석하고, 체계적인 교정으로 해결책까지 이어가는 프라이빗 레슨입니다.`}
        />

        <div className="profile-layout">
          <PhotoFade
            images={proPhotos}
            className="profile-photo-frame photo-frame-plain"
            fit="contain"
            interval={5200}
            sizes="(min-width: 721px) 384px, 92vw"
            aura
            showDots={false}
          />

          <div className="profile-details">
            <div className="profile-name">
              <p>GOLF TEACHING PRO</p>
              <h3>{site.proName} 프로</h3>
              <span>{site.proRole}</span>
            </div>
          </div>
        </div>

        <dl className="profile-list">
          <div>
            <dt>
              <Award aria-hidden="true" /> 자격
            </dt>
            <dd>
              <ul className="profile-sublist">
                {profile.certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> 레슨 경력
            </dt>
            <dd>
              <ul className="profile-sublist">
                {profile.career.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>
              <Trophy aria-hidden="true" /> 주요 활동 · 수상
            </dt>
            <dd>
              <ul className="profile-sublist">
                {profile.awards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="profile-stats" aria-label="누적 레슨 기록">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.unit}</small>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="content-section philosophy-section">
        <SectionHeading
          index="02"
          eyebrow="LESSON METHOD"
          title="진단부터 피드백까지, 이유 있는 네 단계"
        />

        <ol className="philosophy-list">
          {philosophy.map((item, index) => (
            <li key={item.number}>
              <span className="philosophy-number">{item.number}</span>
              <div className="philosophy-icon" aria-hidden="true">
                {index === 0 ? <Gauge /> : null}
                {index === 1 ? <Target /> : null}
                {index === 2 ? <CircleDot /> : null}
                {index === 3 ? <Sparkles /> : null}
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="inline-highlight">
          <Radar aria-hidden="true" />
          <p>
            <strong>공의 궤적은 임팩트의 순간에 이미 결정됩니다</strong>
            {site.analyzer}가 4개의 초고속 카메라로 임팩트를 실측합니다. 느낌이
            아니라 숫자로 원인을 찾습니다.
          </p>
        </div>
      </Reveal>

      <Reveal className="content-section results-section">
        <SectionHeading
          index="03"
          eyebrow="REAL CHANGES"
          title="느낌이 아니라, 눈으로 확인하는 변화"
          description="회원 동의를 받은 실제 사례가 준비되면 전후 영상과 측정 수치가 이 영역에 표시됩니다."
        />

        <div className="comparison-card">
          <div className="comparison-media">
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
          <div className="comparison-summary">
            <div>
              <span>스코어</span>
              <strong>—</strong>
            </div>
            <div>
              <span>구질</span>
              <strong>—</strong>
            </div>
            <div>
              <span>비거리</span>
              <strong>—</strong>
            </div>
          </div>
          <p>
            수치는 실제 측정 자료를 기준으로 기록하며, 결과는 개인에 따라 달라질
            수 있습니다.
          </p>
        </div>

        <Link href="/reviews" className="section-link">
          레슨 과정과 후기 살펴보기 <MoveRight aria-hidden="true" />
        </Link>
      </Reveal>

      <Reveal className="content-section audience-section">
        <SectionHeading
          index="04"
          eyebrow="WHO IT IS FOR"
          title="이런 고민이 있다면 추천합니다"
        />

        <ul className="audience-list">
          {audiences.map((audience, index) => (
            <li key={audience}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{audience}</p>
              <Check aria-hidden="true" />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="content-section lesson-preview-section">
        <SectionHeading
          index="05"
          eyebrow="LESSON PROGRAM"
          title="나에게 맞는 방식으로 시작하세요"
        />

        <div className="lesson-preview-list">
          <article className="lesson-preview-card lesson-preview-regular">
            <div className="lesson-preview-label">
              <span>REGULAR</span>
              <span>01</span>
            </div>
            <div>
              <p>{site.place}</p>
              <h3>정기 레슨</h3>
              <ul>
                <li>회당 20분, 주 3~4회 반복</li>
                <li>기초부터 단계별로 쌓는 스윙</li>
                <li>매 레슨의 변화를 영상으로 확인</li>
              </ul>
            </div>
            <Link
              href="/regular-lessons"
              className="glass-button glass-button-light"
            >
              자세히 보기 <MoveRight aria-hidden="true" />
            </Link>
          </article>

          <article className="lesson-preview-card lesson-preview-private">
            <div className="lesson-preview-label">
              <span>PRIVATE</span>
              <span>02</span>
            </div>
            <div>
              <p>목표 집중 프로그램</p>
              <h3>개인 레슨</h3>
              <ul>
                <li>한 가지 목표에 수업 전체를 집중</li>
                <li>1:1 스윙 진단과 전후 비교 영상</li>
                <li>숏게임 · 퍼팅 · 필드까지 확장</li>
              </ul>
            </div>
            <Link
              href="/private-lessons"
              className="glass-button glass-button-light"
            >
              자세히 보기 <MoveRight aria-hidden="true" />
            </Link>
          </article>
        </div>
      </Reveal>

      <Reveal className="content-section faq-section">
        <SectionHeading
          index="06"
          eyebrow="FAQ"
          title="레슨 전, 많이 물어보시는 질문"
        />

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="intro-faq" open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faq.question}</strong>
                <ChevronDown aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <span>A</span>
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="final-cta-section">
        <div className="final-cta-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>START WITH ONE LESSON</p>
        <h2>
          한 번의 체험으로,
          <br />내 스윙의 방향을 찾으세요.
        </h2>
        <span className="final-cta-description">
          현재 고민과 가능한 시간대를 남겨주시면, 목표에 맞는 레슨과 시작 방법을
          안내해 드립니다.
        </span>
        <KakaoLink className="glass-button glass-button-kakao glass-button-large">
          <MessageCircleMore aria-hidden="true" />
          <span>카카오톡으로 상담하기</span>
          <ArrowRight className="button-arrow" aria-hidden="true" />
        </KakaoLink>
      </Reveal>
    </div>
  );
}
