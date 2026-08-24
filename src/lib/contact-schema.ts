import { z } from "zod";

export const lessonOptions = [
  "체험 레슨",
  "문화골프연습장 정기 레슨",
  "1:1 스윙 교정",
  "숏게임 · 퍼팅 레슨",
  "필드 레슨",
  "스윙 영상 분석",
  "다인 레슨",
  "아직 잘 모르겠어요",
] as const;

export const timeOptions = [
  "상담 후 협의",
  "평일 오전",
  "평일 오후",
  "평일 저녁",
  "주말 오전",
  "주말 오후",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요").max(40),
  phone: z
    .string()
    .trim()
    .min(9, "연락처를 정확히 입력해 주세요")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "숫자와 - 만 입력해 주세요"),
  lesson: z.enum(lessonOptions),
  preferredTime: z.enum(timeOptions).default("상담 후 협의"),
  concern: z.string().trim().max(160).optional().or(z.literal("")),
  consent: z.literal(true, { message: "개인정보 이용에 동의해 주세요" }),
  /** 사람이 채우지 않는 숨김 항목 (스팸 차단용) */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function buildInquiryMessage(input: {
  name: string;
  phone: string;
  lesson: string;
  preferredTime: string;
  concern?: string;
}) {
  return [
    "[골프 레슨 상담 문의]",
    `이름: ${input.name}`,
    `연락처: ${input.phone}`,
    `관심 레슨: ${input.lesson}`,
    `희망 시간대: ${input.preferredTime}`,
    `현재 고민: ${input.concern?.trim() || "-"}`,
  ].join("\n");
}
