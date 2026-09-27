# 두윤곤 프로 골프 레슨

Next.js 기반 홈페이지: https://dooyunkon.pro/

## 개발 및 검증

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

## 검색 노출 설정

대표 주소는 기본적으로 `https://dooyunkon.pro`입니다. 도메인을 변경할 때만
`NEXT_PUBLIC_SITE_URL`에 HTTPS origin을 지정합니다. 빈 값은 기본 주소를 사용하고,
경로·쿼리·인증정보가 포함된 주소 및 프로덕션의 localhost는 오류로 처리합니다.
Canonical, OG, 구조화 데이터, robots.txt, sitemap.xml은 같은 대표 주소를 사용합니다.

검색엔진 등록 절차:

1. Google Search Console에 `https://dooyunkon.pro/` URL 접두어 속성을 추가합니다.
   HTML 태그 방식의 content 값을 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 입력합니다.
   DNS로 소유확인했다면 태그가 없어도 됩니다.
2. 네이버 서치어드바이저에 사이트를 추가하고 HTML 태그의 content 값을
   `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 입력합니다.
3. 배포 환경에 값을 저장하고 재배포한 뒤 각 관리도구에서 소유확인을 완료합니다.
4. 두 관리도구에 `https://dooyunkon.pro/sitemap.xml`을 제출합니다.
5. Google URL 검사에서 홈 URL의 실시간 테스트 후 색인 생성을 요청합니다.
   네이버에서는 요청 > 웹 페이지 수집에서 홈 URL을 제출합니다.
6. 색인 제외 사유, 마지막 수집일, Google이 선택한 표준 URL을 확인합니다.

배포 후 확인할 항목:

- 홈 및 4개 하위 페이지가 HTTP 200을 반환하고 noindex 헤더/태그가 없는지 확인
- 페이지마다 해당 경로의 canonical이 생성되는지 확인
- `/robots.txt`가 크롤링을 허용하고 운영 도메인의 사이트맵을 가리키는지 확인
- `/sitemap.xml`의 모든 URL이 운영 도메인인지 확인
- 소유확인 태그가 페이지 HTML에 존재하는지 확인 (HTML 태그 방식 사용 시)

사이트맵의 lastModified는 실제 수정 이력이 연결되기 전까지 생략합니다.
매 빌드 시각이나 임의 날짜를 콘텐츠 수정일로 제출하지 않습니다.
검색엔진 등록 및 수집 요청은 노출이나 특정 순위를 보장하지 않습니다.

공식 안내:

- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://searchadvisor.naver.com/guide
