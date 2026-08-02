"use client";

import {
  Check,
  Copy,
  MessageCircleMore,
  MessageSquareText,
  Send,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";

type ContactFormProps = {
  kakaoUrl?: string;
  phone?: string;
};

type PreparationState = "idle" | "copied" | "manual";

export function ContactForm({ kakaoUrl, phone }: ContactFormProps) {
  const [preparedMessage, setPreparedMessage] = useState("");
  const [preparationState, setPreparationState] =
    useState<PreparationState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "[골프 레슨 상담 문의]",
      `이름: ${String(formData.get("name") ?? "")}`,
      `연락처: ${String(formData.get("phone") ?? "")}`,
      `관심 레슨: ${String(formData.get("lesson") ?? "")}`,
      `희망 시간대: ${String(formData.get("preferredTime") ?? "협의")}`,
      `현재 고민: ${String(formData.get("concern") ?? "")}`,
    ].join("\n");

    setPreparedMessage(message);

    try {
      await navigator.clipboard.writeText(message);
      setPreparationState("copied");
    } catch {
      setPreparationState("manual");
    }
  };

  const smsHref = phone
    ? `sms:${phone.replace(/[^+\d]/g, "")}?body=${encodeURIComponent(preparedMessage)}`
    : undefined;

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
            placeholder="이름을 입력해 주세요"
            required
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
            <option value="체험 레슨">체험 레슨</option>
            <option value="문화골프연습장 정기 레슨">
              문화골프연습장 정기 레슨
            </option>
            <option value="1:1 스윙 교정">1:1 스윙 교정</option>
            <option value="숏게임·퍼팅 레슨">숏게임·퍼팅 레슨</option>
            <option value="필드 레슨">필드 레슨</option>
            <option value="스윙 영상 분석">스윙 영상 분석</option>
            <option value="다인 레슨">다인 레슨</option>
            <option value="아직 잘 모르겠어요">아직 잘 모르겠어요</option>
          </select>
        </label>

        <label>
          <span>희망 시간대</span>
          <select name="preferredTime" defaultValue="상담 후 협의">
            <option value="상담 후 협의">상담 후 협의</option>
            <option value="평일 오전">평일 오전</option>
            <option value="평일 오후">평일 오후</option>
            <option value="평일 저녁">평일 저녁</option>
            <option value="주말 오전">주말 오전</option>
            <option value="주말 오후">주말 오후</option>
          </select>
        </label>

        <label className="contact-form-wide">
          <span>현재 고민 한 줄</span>
          <textarea
            name="concern"
            rows={4}
            maxLength={160}
            placeholder="예: 드라이버 슬라이스와 방향성이 고민이에요."
          />
          <small>최대 160자</small>
        </label>
      </div>

      <label className="privacy-check">
        <input type="checkbox" required />
        <span>
          상담 메시지 작성에 필요한 개인정보 이용에 동의합니다. 입력 내용은 이
          사이트에 저장되지 않습니다.
        </span>
      </label>

      <button
        type="submit"
        className="glass-button glass-button-primary contact-submit-button"
      >
        <Send aria-hidden="true" />
        상담 메시지 만들기
        <span>작성</span>
      </button>

      {preparationState !== "idle" ? (
        <div className="prepared-inquiry" aria-live="polite">
          <div className="prepared-inquiry-heading">
            <span className="prepared-status-icon">
              {preparationState === "copied" ? (
                <Check aria-hidden="true" />
              ) : (
                <Copy aria-hidden="true" />
              )}
            </span>
            <div>
              <strong>
                {preparationState === "copied"
                  ? "상담 메시지를 복사했습니다"
                  : "상담 메시지가 준비되었습니다"}
              </strong>
              <p>
                {preparationState === "copied"
                  ? "카카오톡이나 문자에서 붙여넣어 보내주세요."
                  : "아래 내용을 직접 복사해 카카오톡이나 문자로 보내주세요."}
              </p>
            </div>
          </div>

          {preparationState === "manual" ? (
            <textarea
              readOnly
              value={preparedMessage}
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
            ) : (
              <span
                className="glass-button glass-button-kakao is-disabled"
                aria-disabled="true"
              >
                <MessageCircleMore aria-hidden="true" />
                채널 주소 입력 예정
              </span>
            )}

            {smsHref ? (
              <a href={smsHref} className="glass-button contact-sms-action">
                <MessageSquareText aria-hidden="true" />
                문자 작성하기
              </a>
            ) : (
              <span
                className="glass-button contact-sms-action is-disabled"
                aria-disabled="true"
              >
                <MessageSquareText aria-hidden="true" />
                전화번호 입력 예정
              </span>
            )}
          </div>
        </div>
      ) : null}
    </form>
  );
}
