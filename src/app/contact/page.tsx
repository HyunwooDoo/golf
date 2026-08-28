import type { Metadata } from "next";
import type { ReactNode } from "react";
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
  TvMinimalPlay,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { KakaoMap } from "@/components/kakao-map";
import { Reveal } from "@/components/reveal";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { createPageMetadata } from "@/lib/seo";
import { links, phoneHref, site, smsHref } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "도봉구 골프 레슨 상담·위치",
  description:
    "서울 도봉구 문화골프연습장 두윤곤 프로 골프 레슨의 위치, 운영 안내와 카카오톡·전화·문자 상담 방법을 확인하세요.",
  path: "/contact",
  keywords: ["도봉구 골프 레슨 상담", "문화골프연습장 위치"],
});

const faqs = [
  {
    question: "어떤 레슨을 선택해야 할지 모르겠어요.",
    answer:
      "방문하시면 회원님의 상황과 수준에 맞춰 직접 상담해 드립니다. 현재 구력과 가장 큰 고민을 알려주시면 정기 레슨과 개인 레슨 중 더 적합한 방식을 안내해 드립니다.",
  },
  {
    question: "골프를 처음 시작해도 체험 레슨이 가능한가요?",
    answer:
      "물론입니다. 처음이신 분도 쉽고 재미있게 체험하실 수 있도록 그립과 어드레스 같은 기초부터 차근차근 안내해 드립니다.",
  },
  {
    question: "상담할 때 무엇을 알려드리면 되나요?",
    answer:
      "원하시는 내용이나 지금의 고민을 편하게 남겨주시면 그에 맞게 안내해 드립니다. 구력과 평균 타수, 가능한 시간대를 함께 주시면 더 빠릅니다.",
  },
  {
    question: "레슨 일정은 어떻게 확정되나요?",
    answer: `가능한 한 회원님이 원하시는 일정에 맞춰 시작합니다. 레슨 가능 요일은 ${site.lessonDays}입니다.`,
  },
  {
    question: "취소나 일정 변경도 가능한가요?",
    answer:
      "레슨 하루 전에 연락 주시면 일정을 조정해 드립니다. 자세한 기준은 정기 레슨 안내에서도 확인하실 수 있습니다.",
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

export default function ContactPage() {
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
            레슨을 시작하세요.
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
          {links.kakaoChannel ? (
            <Link
              href={links.kakaoChannel}
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
                <small>오픈채팅으로 바로 상담</small>
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
                <strong>카카오톡 1:1 채팅</strong>
                <small>오픈채팅으로 바로 상담</small>
              </div>
            </span>
          )}

          <a
            href={phoneHref}
            className="contact-method-card contact-method-phone"
          >
            <span className="contact-method-icon">
              <Phone aria-hidden="true" />
            </span>
            <div>
              <span>PHONE CALL</span>
              <strong>전화 걸기</strong>
              <small>{site.phone}</small>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </a>

          <a href={smsHref} className="contact-method-card contact-method-sms">
            <span className="contact-method-icon">
              <MessageSquareText aria-hidden="true" />
            </span>
            <div>
              <span>MESSAGE</span>
              <strong>문자 보내기</strong>
              <small>{site.phone}</small>
            </div>
            <ArrowUpRight aria-hidden="true" />
          </a>

          {links.instagram ? (
            <Link
              href={links.instagram}
              className="contact-method-card contact-method-instagram"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method-icon">
                <Camera aria-hidden="true" />
              </span>
              <div>
                <span>INSTAGRAM</span>
                <strong>{site.instagramName}</strong>
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
                <strong>{site.instagramName}</strong>
                <small>계정 주소 준비 중</small>
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
          description="스윙 교정 팁과 실제 레슨 영상으로 수업 방식을 미리 살펴보실 수 있습니다."
        />

        <div className="youtube-preview-card">
          <YoutubeEmbed
            videoId={site.youtubeVideoId}
            title={`${site.youtubeName} 레슨 영상`}
            poster="/photos/youtube-thumb.jpg"
          />
          <div className="youtube-preview-info">
            <div>
              <TvMinimalPlay aria-hidden="true" />
              <span>YOUTUBE CHANNEL · {site.youtubeName}</span>
            </div>
            <h3>영상으로 배우는 골프 레슨</h3>
            {links.youtube ? (
              <Link href={links.youtube} target="_blank" rel="noreferrer">
                유튜브에서 보기 <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <span className="youtube-disabled-link">채널 주소 준비 중</span>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal className="content-section contact-location-section">
        <SectionHeading
          index="03"
          eyebrow="LOCATION & HOURS"
          title={
            <>
              연습장 위치와
              <br />
              상담 가능 시간
            </>
          }
        />

        <KakaoMap
          className="contact-map-placeholder"
          placeName={site.place}
          address={site.address}
        />

        <dl className="contact-location-details">
          <div>
            <dt>
              <MapPin aria-hidden="true" /> 주소
            </dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> 상담 가능 시간
            </dt>
            <dd>{site.consultationHours}</dd>
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
        </dl>

        {links.kakaoMap ? (
          <Link
            href={links.kakaoMap}
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
            카카오맵 길찾기 준비 중
          </span>
        )}
      </Reveal>

      <Reveal className="content-section contact-faq-section">
        <SectionHeading
          index="04"
          eyebrow="FAQ"
          title={
            <>
              상담 전,
              <br />
              많이 물어보시는 질문
            </>
          }
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
          description="작성한 내용은 서버에 저장되지 않으며, 상담 메시지 형태로 정리해 카카오톡이나 문자로 보내실 수 있습니다."
        />

        <ContactForm kakaoUrl={links.kakaoChannel} phone={site.phone} />
      </Reveal>
    </div>
  );
}
