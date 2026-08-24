"use client";

import {
  Check,
  Copy,
  MessageCircleMore,
  MessageSquareText,
  Phone,
  Send,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  buildInquiryMessage,
  lessonOptions,
  timeOptions,
} from "@/lib/contact-schema";

type ContactFormProps = {
  kakaoUrl?: string;
  phone?: string;
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; message: string; delivered: boolean; copied: boolean }
  | { state: "error"; error: string };

export function ContactForm({ kakaoUrl, phone }: ContactFormProps) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const input = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      lesson: String(formData.get("lesson") ?? ""),
      preferredTime: String(formData.get("preferredTime") ?? "상담 후 협의"),
      concern: String(formData.get("concern") ?? "").trim(),
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") ?? ""),
    };

    setStatus({ state: "sending" });

    const fallbackMessage = buildInquiryMessage(input);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus({
          state: "error",
          error: result?.error ?? "잠시 후 다시 시도해 주세요.",
        });
        return;
      }

      const message: string = result.message || fallbackMessage;
      let copied = false;
      try {
        await navigator.clipboard.writeText(message);
        copied = true;
      } catch {
        copied = false;
      }

      setStatus({
        state: "sent",
        message,
        delivered: Boolean(result.delivered),
        copied,
      });
      form.reset();
    } catch {
      // 네트워크가 끊겨도 카카오톡 · 문자로 이어서 보낼 수 있게 합니다.
      let copied = false;
      try {
        await navigator.clipboard.writeText(fallbackMessage);
        copied = true;
      } catch {
        copied = false;
      }
      setStatus({
        state: "sent",
        message: fallbackMessage,
        delivered: false,
        copied,
      });
    }
  };

  const cleanPhone = phone?.replace(/[^+\d]/g, "");
  const preparedMessage = status.state === "sent" ? status.message : "";
  // iOS 와 Android 모두에서 동작하는 형식입니다.
  const smsHref = cleanPhone
    ? `sms:${cleanPhone}?&body=${encodeURIComponent(preparedMessage)}`
    : undefined;
  const callHref = cleanPhone ? `tel:${cleanPhone}` : undefined;

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label>
          <span>
            이름 <em>필수</em>
          </span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="이름"
            required
            maxLength={40}
          />
        </label>

        <label>
          <span>
            연락처 <em>필수</em>
          </span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-0000-0000"
            required
            maxLength={20}
          />
        </label>

        <label>
          <span>
            관심 레슨 <em>필수</em>
          </span>
          <select name="lesson" defaultValue="" required>
            <option value="" disabled>
              관심 레슨을 선택해 주세요
            </option>
            {lessonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>희망 시간대</span>
          <select name="preferredTime" defaultValue="상담 후 협의">
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="contact-form-wide">
          <span>현재 고민 한 줄</span>
          <textarea
            name="concern"
            rows={4}
            maxLength={160}
            placeholder="예) 드라이버 슬라이스와 방향성이 고민입니다"
          />
          <small>최대 160자</small>
        </label>
      </div>

      <input
        type="text"
        name="company"
        className="contact-form-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
      />

      <label className="privacy-check">
        <input type="checkbox" name="consent" required />
        <span>
          상담 안내를 위한 개인정보 수집 · 이용에 동의합니다. 문의 내용은 상담
          목적으로만 사용합니다.
        </span>
      </label>

      <button
        type="submit"
        className="glass-button glass-button-primary contact-submit-button"
        disabled={status.state === "sending"}
      >
        <Send aria-hidden="true" />
        {status.state === "sending" ? "보내는 중…" : "상담 신청하기"}
        <span>접수</span>
      </button>

      {status.state === "error" ? (
        <div className="form-alert" role="alert">
          <TriangleAlert aria-hidden="true" />
          <p>{status.error}</p>
        </div>
      ) : null}

      {status.state === "sent" ? (
        <div className="prepared-inquiry" aria-live="polite">
          <div className="prepared-inquiry-heading">
            <span className="prepared-status-icon">
              {status.delivered ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
            </span>
            <div>
              <strong>
                {status.delivered
                  ? "상담 신청이 접수되었습니다"
                  : "상담 메시지가 준비되었습니다"}
              </strong>
              <p>
                {status.delivered
                  ? "확인 후 남겨주신 연락처로 안내해 드리겠습니다. 더 빠른 상담을 원하시면 아래로 바로 연락해 주세요."
                  : status.copied
                    ? "메시지를 복사했습니다. 카카오톡이나 문자에 붙여넣어 보내주세요."
                    : "아래 내용을 복사해 카카오톡이나 문자로 보내주세요."}
              </p>
            </div>
          </div>

          {!status.delivered && !status.copied ? (
            <textarea
              readOnly
              value={status.message}
              aria-label="작성된 상담 메시지"
              rows={7}
            />
          ) : null}

          <div className="prepared-inquiry-actions">
            {kakaoUrl ? (
              <a
                href={kakaoUrl}
                className="glass-button glass-button-kakao"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircleMore aria-hidden="true" />
                카카오톡 열기
              </a>
            ) : callHref ? (
              <a href={callHref} className="glass-button glass-button-kakao">
                <Phone aria-hidden="true" />
                전화로 상담하기
              </a>
            ) : null}

            {smsHref ? (
              <a href={smsHref} className="glass-button contact-sms-action">
                <MessageSquareText aria-hidden="true" />
                문자 보내기
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
