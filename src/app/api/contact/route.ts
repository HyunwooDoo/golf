import { NextResponse } from "next/server";
import { buildInquiryMessage, contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 문의 접수 엔드포인트.
 *
 * 전달 경로는 환경변수로 선택합니다.
 * - CONTACT_WEBHOOK_URL: 슬랙 · 디스코드 · 자동화 도구(Make, Zapier 등) 웹훅
 * - RESEND_API_KEY + CONTACT_EMAIL_TO (+ CONTACT_EMAIL_FROM): 이메일 발송
 *
 * 둘 다 없으면 서버 로그에만 남기고, 사용자에게는 카카오톡 · 문자로
 * 이어서 보낼 수 있도록 정리된 메시지를 돌려줍니다.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 500) {
    for (const [ip, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(ip);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

async function deliver(message: string, data: Record<string, string>) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.CONTACT_EMAIL_TO;
  const results: string[] = [];

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // text 는 슬랙·디스코드 호환, 나머지는 자동화 도구에서 바로 쓰는 필드입니다.
      body: JSON.stringify({ text: message, content: message, ...data }),
    });
    if (!response.ok) {
      throw new Error(`webhook responded ${response.status}`);
    }
    results.push("webhook");
  }

  if (resendKey && emailTo) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM ?? "onboarding@resend.dev",
        to: [emailTo],
        subject: `[${site.brand}] ${data.name} 님 상담 문의`,
        text: message,
      }),
    });
    if (!response.ok) {
      throw new Error(`email responded ${response.status}`);
    }
    results.push("email");
  }

  return results;
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "잠시 후 다시 시도해 주세요." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "요청을 읽을 수 없습니다." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요.",
      },
      { status: 400 },
    );
  }

  const { company, ...input } = parsed.data;
  if (company) {
    // 봇이 채운 요청은 조용히 성공 처리합니다.
    return NextResponse.json({ ok: true, delivered: false, message: "" });
  }

  const message = buildInquiryMessage(input);

  try {
    const routes = await deliver(message, {
      name: input.name,
      phone: input.phone,
      lesson: input.lesson,
      preferredTime: input.preferredTime,
      concern: input.concern?.trim() ?? "",
      receivedAt: new Date().toISOString(),
    });

    if (routes.length === 0) {
      console.info("[contact] 전달 경로가 설정되지 않았습니다.\n%s", message);
    }

    return NextResponse.json({
      ok: true,
      delivered: routes.length > 0,
      message,
    });
  } catch (error) {
    console.error("[contact] 전달 실패", error);
    return NextResponse.json({ ok: true, delivered: false, message });
  }
}
