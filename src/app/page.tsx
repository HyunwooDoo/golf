export default function Home() {
  return (
    <div className="app-shell flex min-h-dvh flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center px-6 py-24">
        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-emerald-900">
          GOLF LESSON
        </p>
        <h1 className="text-[clamp(2.25rem,11vw,4.75rem)] leading-[1.04] font-semibold tracking-[-0.055em] text-balance">
          기초부터 확실하게,
          <br />한 번의 체험으로 방향까지 정확하게.
        </h1>
        <p className="mt-8 max-w-md text-lg leading-8 text-black/60">
          모바일 레이아웃과 설치형 PWA 기반이 준비되었습니다.
        </p>
      </main>
    </div>
  );
}
