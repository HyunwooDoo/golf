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
  Play,
  Sparkles,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import { Reveal } from "@/components/reveal";

const kakaoChannelUrl =
  process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? "/contact?channel=kakao";

const philosophy = [
  {
    number: "01",
    title: "정확한 진단",
    description: "스윙 영상과 분석 장비로 현재 움직임을 객관적으로 확인합니다.",
  },
  {
    number: "02",
    title: "핵심 문제 교정",
    description:
      "한 번에 많은 것을 바꾸기보다 가장 영향이 큰 원인부터 교정합니다.",
  },
  {
    number: "03",
    title: "반복 드릴",
    description:
      "혼자 연습할 때도 재현할 수 있는 단순하고 명확한 드릴을 제공합니다.",
  },
  {
    number: "04",
    title: "지속적인 피드백",
    description:
      "변화를 다시 측정하고 다음 목표를 정해 좋은 움직임을 완성합니다.",
  },
] as const;

const audiences = [
  "골프를 처음 시작하는 분",
  "100타의 벽을 넘고 싶은 분",
  "드라이버 비거리가 고민인 분",
  "슬라이스·훅을 교정하고 싶은 분",
  "스윙이 매번 달라지는 분",
  "내 문제를 정확히 알고 싶은 분",
] as const;

const faqs = [
  {
    question: "골프를 한 번도 해보지 않은 초보도 가능한가요?",
    answer:
      "네, 가능합니다. 그립과 어드레스처럼 처음부터 제대로 익혀야 하는 기초를 눈높이에 맞춰 단계적으로 안내합니다.",
  },
  {
    question: "체험 레슨에서는 무엇을 알 수 있나요?",
    answer:
      "현재 스윙을 촬영하고 분석 장비로 움직임을 확인한 뒤, 가장 먼저 해결해야 할 문제와 앞으로의 연습 방향을 설명해 드립니다.",
  },
  {
    question: "개인 골프 장비가 없어도 레슨을 받을 수 있나요?",
    answer:
      "처음 시작하는 분은 장비가 없어도 상담할 수 있습니다. 레슨 장소의 대여 가능 여부와 준비물은 예약 전에 정확히 안내해 드립니다.",
  },
  {
    question: "몇 회 정도 레슨을 받아야 하나요?",
    answer:
      "현재 실력과 목표에 따라 다릅니다. 체험 레슨에서 상태를 진단한 뒤 필요한 횟수와 연습 주기를 과도하지 않게 제안합니다.",
  },
  {
    question: "상담과 예약은 어떻게 진행하나요?",
    answer:
      "카카오톡으로 현재 고민과 가능한 시간대를 남겨주시면 확인 후 적합한 레슨과 일정을 안내해 드립니다.",
  },
] as const;

function KakaoLink({
  children,
  className,
}: {
  children: React.ReactNode;
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

        <Reveal className="hero-media-grid" delay={0.08}>
          <div
            className="media-placeholder hero-lesson-photo"
            role="img"
            aria-label="레슨 사진 자리"
          >
            <span className="media-number">01</span>
            <span>레슨 사진</span>
          </div>
          <div
            className="media-placeholder hero-swing-video"
            role="img"
            aria-label="스윙 영상 자리"
          >
            <span className="video-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
            <span>스윙 영상</span>
          </div>
        </Reveal>

        <Reveal className="hero-actions" delay={0.12}>
          <KakaoLink className="glass-button glass-button-primary glass-button-large">
            <MessageCircleMore aria-hidden="true" />
            <span>체험 레슨 상담하기</span>
            <ArrowRight className="button-arrow" aria-hidden="true" />
          </KakaoLink>
          <p>현재 고민만 알려주세요. 알맞은 레슨 방향부터 안내해 드립니다.</p>
        </Reveal>
      </section>

      <Reveal className="content-section profile-section">
        <SectionHeading
          index="01"
          eyebrow="COACH PROFILE"
          title="기본을 이해시키고, 변화를 끝까지 확인합니다."
          description="감각적인 설명에 그치지 않고 영상과 데이터를 함께 보며 회원이 스스로 이해할 수 있는 레슨을 지향합니다."
        />

        <div className="profile-layout">
          <div
            className="media-placeholder profile-photo"
            role="img"
            aria-label="프로필 사진 자리"
          >
            <UserRound aria-hidden="true" />
            <span>프로필 사진</span>
          </div>

          <div className="profile-details">
            <div className="profile-name">
              <p>YOUR GOLF COACH</p>
              <h3>프로 이름</h3>
              <span>골프 레슨 프로</span>
            </div>
            <dl className="profile-list">
              <div>
                <dt>
                  <Award aria-hidden="true" /> 자격
                </dt>
                <dd>프로 자격 정보를 입력해 주세요</dd>
              </div>
              <div>
                <dt>
                  <Clock3 aria-hidden="true" /> 레슨 경력
                </dt>
                <dd>레슨 경력을 입력해 주세요</dd>
              </div>
              <div>
                <dt>
                  <Trophy aria-hidden="true" /> 주요 활동·수상
                </dt>
                <dd>주요 활동과 수상 내역을 입력해 주세요</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="profile-stats" aria-label="누적 레슨 정보">
          <div>
            <span>누적 회원</span>
            <strong>—</strong>
            <small>실제 수치 입력</small>
          </div>
          <div>
            <span>누적 레슨</span>
            <strong>—</strong>
            <small>실제 수치 입력</small>
          </div>
          <div>
            <span>레슨 경력</span>
            <strong>—</strong>
            <small>실제 수치 입력</small>
          </div>
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
      </Reveal>

      <Reveal className="content-section results-section">
        <SectionHeading
          index="03"
          eyebrow="REAL CHANGES"
          title="느낌이 아닌, 확인할 수 있는 변화"
          description="실제 회원 사례가 준비되면 전후 영상과 수치가 이 영역에 표시됩니다."
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
          <p>실제 회원의 동의를 받은 사례와 측정 수치로 업데이트됩니다.</p>
        </div>
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
              <p>문화골프연습장</p>
              <h3>정기 레슨</h3>
              <ul>
                <li>꾸준한 주기와 반복 학습</li>
                <li>기초부터 단계별 스윙 완성</li>
                <li>정해진 장소에서 안정적인 연습</li>
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
                <li>현재 스윙 집중 진단</li>
                <li>목표별 맞춤 교정 드릴</li>
                <li>전후 영상과 핵심 피드백</li>
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
          <br />내 스윙의 방향을 찾아보세요.
        </h2>
        <span className="final-cta-description">
          현재 고민을 남겨주시면 확인 후 가장 적합한 레슨을 안내해 드립니다.
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
