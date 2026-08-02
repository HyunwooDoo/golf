import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BusFront,
  Camera,
  CarFront,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircleMore,
  MessageSquareText,
  Navigation,
  Phone,
  Play,
  TvMinimalPlay,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "골프 레슨 문의",
  description: "카카오톡, 전화, 문자로 편하게 상담하는 골프 레슨 문의 페이지",
};

const kakaoChannelUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL;
const lessonPhone = process.env.NEXT_PUBLIC_LESSON_PHONE;
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
const kakaoMapUrl = process.env.NEXT_PUBLIC_KAKAO_MAP_URL;
const lessonAddress = process.env.NEXT_PUBLIC_LESSON_ADDRESS;
const consultationHours = process.env.NEXT_PUBLIC_CONSULTATION_HOURS;

const faqs = [
  {
    question: "어떤 레슨을 선택해야 할지 모르겠어요.",
    answer:
      "현재 구력과 가장 큰 고민을 알려주시면 정기 레슨과 개인 레슨 중 더 적합한 방식을 안내해 드립니다.",
  },
  {
    question: "골프를 처음 시작해도 체험 레슨이 가능한가요?",
    answer:
      "네, 가능합니다. 그립과 어드레스부터 현재 움직임을 확인하고 앞으로 익혀야 할 기초와 연습 방향을 안내합니다.",
  },
  {
    question: "상담할 때 무엇을 알려드리면 되나요?",
    answer:
      "골프 구력, 평균 타수, 가장 큰 고민과 가능한 시간대를 알려주시면 더 빠르게 안내받을 수 있습니다.",
  },
  {
    question: "레슨 일정은 어떻게 확정되나요?",
    answer:
      "상담을 통해 레슨 종류와 장소를 정한 뒤, 가능한 날짜와 시간을 확인해 최종 예약합니다.",
  },
  {
    question: "취소나 일정 변경도 가능한가요?",
    answer:
      "레슨 종류별 취소·보강 기준을 예약 전에 안내합니다. 확정된 운영 정책은 각 레슨 페이지에서도 확인할 수 있습니다.",
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

export default function ContactPage() {
  const cleanPhone = lessonPhone?.replace(/[^+\d]/g, "");
  const phoneHref = cleanPhone ? `tel:${cleanPhone}` : undefined;
  const smsHref = cleanPhone ? `sms:${cleanPhone}` : undefined;

  return (
    <div className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <Reveal className="contact-hero-copy">
          <h1
            id="contact-title"
            className="flex flex-col items-center justify-center text-center"
          >
            가장 편한 방법으로,
            <br />
            레슨을 시작해 보세요.
          </h1>
          <p className="text-center">
            현재 고민과 가능한 시간대만 알려주세요.
            <br />
            확인 후 목표에 맞는 레슨과 시작 방법을
            <br />
            안내해 드립니다.
          </p>
        </Reveal>

        <Reveal className="contact-hero-card" delay={0.08}>
          <div className="contact-hero-orbit" aria-hidden="true">
            <span />
            <span />
          </div>
          <span>LESSON CONSULTING</span>
          <strong>상담부터 예약까지</strong>
          <p>카카오톡 · 전화 · 문자</p>
          <MessageCircleMore aria-hidden="true" />
        </Reveal>
      </section>

      <Reveal className="content-section contact-method-section">
        <SectionHeading
          index="01"
          eyebrow="QUICK CONTACT"
          title="원하는 방법으로 바로 문의하세요"
        />

        <div className="contact-method-grid">
          {kakaoChannelUrl ? (
            <Link
              href={kakaoChannelUrl}
              className="contact-method-card contact-method-kakao"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method-icon">
                <MessageCircleMore aria-hidden="true" />
              </span>
              <div>
                <span>KAKAO TALK</span>
                <strong>카카오톡 1:1 채팅</strong>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="contact-method-card contact-method-kakao is-disabled"
              aria-disabled="true"
            >
              <span className="contact-method-icon">
                <MessageCircleMore aria-hidden="true" />
              </span>
              <div>
                <span>KAKAO TALK</span>
                <strong>채널 주소 입력 예정</strong>
              </div>
            </span>
          )}

          {phoneHref ? (
            <Link href={phoneHref} className="contact-method-card">
              <span className="contact-method-icon">
                <Phone aria-hidden="true" />
              </span>
              <div>
                <span>PHONE CALL</span>
                <strong>전화 걸기</strong>
                <small>{lessonPhone}</small>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="contact-method-card is-disabled"
              aria-disabled="true"
            >
              <span className="contact-method-icon">
                <Phone aria-hidden="true" />
              </span>
              <div>
                <span>PHONE CALL</span>
                <strong>전화번호 입력 예정</strong>
              </div>
            </span>
          )}

          {smsHref ? (
            <Link href={smsHref} className="contact-method-card">
              <span className="contact-method-icon">
                <MessageSquareText aria-hidden="true" />
              </span>
              <div>
                <span>MESSAGE</span>
                <strong>문자 보내기</strong>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="contact-method-card is-disabled"
              aria-disabled="true"
            >
              <span className="contact-method-icon">
                <MessageSquareText aria-hidden="true" />
              </span>
              <div>
                <span>MESSAGE</span>
                <strong>전화번호 입력 예정</strong>
              </div>
            </span>
          )}

          {instagramUrl ? (
            <Link
              href={instagramUrl}
              className="contact-method-card contact-method-instagram"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method-icon">
                <Camera aria-hidden="true" />
              </span>
              <div>
                <span>INSTAGRAM</span>
                <strong>인스타그램 보기</strong>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ) : (
            <span
              className="contact-method-card contact-method-instagram is-disabled"
              aria-disabled="true"
            >
              <span className="contact-method-icon">
                <Camera aria-hidden="true" />
              </span>
              <div>
                <span>INSTAGRAM</span>
                <strong>계정 주소 입력 예정</strong>
              </div>
            </span>
          )}
        </div>
      </Reveal>

      <Reveal className="content-section contact-youtube-section">
        <SectionHeading
          index="02"
          eyebrow="YOUTUBE"
          title="영상으로 먼저 확인하는 레슨"
          description="스윙 교정 팁과 실제 레슨 영상을 통해 수업 방식을 미리 확인해 보세요."
        />

        <div className="youtube-preview-card">
          <div
            className="media-placeholder youtube-thumbnail"
            role="img"
            aria-label="유튜브 영상 썸네일 자리"
          >
            <span className="youtube-play" aria-hidden="true">
              <Play fill="currentColor" />
            </span>
            <span>유튜브 영상 썸네일</span>
            <small>LESSON VIDEO</small>
          </div>
          <div className="youtube-preview-info">
            <div>
              <TvMinimalPlay aria-hidden="true" />
              <span>YOUTUBE CHANNEL</span>
            </div>
            <h3>영상으로 배우는 골프 레슨</h3>
            {youtubeUrl ? (
              <Link href={youtubeUrl} target="_blank" rel="noreferrer">
                유튜브에서 보기 <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <span className="youtube-disabled-link">채널 주소 입력 예정</span>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section contact-location-section">
        <SectionHeading
          index="03"
          eyebrow="LOCATION & HOURS"
          title="연습장 위치와 상담 가능 시간"
        />

        <div
          className="media-placeholder contact-map-placeholder"
          role="img"
          aria-label="연습장 지도 자리"
        >
          <MapPin aria-hidden="true" />
          <span>연습장 지도 영역</span>
          <small>LOCATION MAP</small>
        </div>

        <dl className="contact-location-details">
          <div>
            <dt>
              <MapPin aria-hidden="true" /> 주소
            </dt>
            <dd>{lessonAddress ?? "연습장 상세 주소 입력 예정"}</dd>
          </div>
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> 상담 가능 시간
            </dt>
            <dd>{consultationHours ?? "상담 가능 시간 입력 예정"}</dd>
          </div>
          <div>
            <dt>
              <CarFront aria-hidden="true" /> 주차
            </dt>
            <dd>주차 안내 입력 예정</dd>
          </div>
          <div>
            <dt>
              <BusFront aria-hidden="true" /> 대중교통
            </dt>
            <dd>가까운 정류장·역 정보 입력 예정</dd>
          </div>
        </dl>

        {kakaoMapUrl ? (
          <Link
            href={kakaoMapUrl}
            className="glass-button contact-map-button"
            target="_blank"
            rel="noreferrer"
          >
            <Navigation aria-hidden="true" />
            카카오맵 길찾기
            <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <span
            className="glass-button contact-map-button is-disabled"
            aria-disabled="true"
          >
            <Navigation aria-hidden="true" />
            카카오맵 주소 입력 예정
          </span>
        )}
      </Reveal>

      <Reveal className="content-section contact-faq-section">
        <SectionHeading
          index="04"
          eyebrow="FAQ"
          title="상담 전, 많이 물어보시는 질문"
        />

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="contact-faq" open={index === 0}>
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

      <Reveal className="content-section contact-form-section">
        <SectionHeading
          index="05"
          eyebrow="QUICK INQUIRY"
          title="간단한 정보만 남겨주세요"
          description="작성한 내용은 서버에 저장되지 않으며, 상담 메시지 형태로 정리해 카카오톡이나 문자로 보낼 수 있습니다."
        />

        <ContactForm kakaoUrl={kakaoChannelUrl} phone={lessonPhone} />
      </Reveal>
    </div>
  );
}
