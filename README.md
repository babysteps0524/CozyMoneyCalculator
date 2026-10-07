# CozyMoneyCalculator

생활·금융·세금·급여·부동산 계산기를 제공하는 [cozymoney.kr](https://cozymoney.kr) 정적 웹사이트입니다. 한국어 페이지를 Astro로 생성하며 Cloudflare Pages 배포를 기준으로 구성합니다.

## 기술 스택

- Astro와 TypeScript
- Bun 패키지 관리자와 테스트 러너
- UnoCSS, Attributify, OKLCH 색상 토큰
- Astro Static Site Generation (SSG)
- Cloudflare Pages

## 시작하기

Node.js `>=22.12.0`와 Bun이 필요합니다.

```sh
bun install
bun run dev
```

개발 서버는 Astro 기본 주소인 `http://localhost:4321`에서 실행됩니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `bun run dev` | 로컬 개발 서버 실행 |
| `bun run check` | `astro check`와 `tsc --noEmit` 실행 |
| `bun run test` | Bun 테스트 실행 |
| `bun run build` | 정적 사이트를 `dist/`에 빌드 |
| `bun run preview` | 빌드 결과 로컬 미리보기 |
| `bun run verify` | 검사, 테스트, 빌드 순서로 실행 |
| `bun run format` | Astro 파일 Prettier 포맷 |

## 디렉터리 구조

```text
src/
├── components/
│   ├── calculators/   # 계산기 UI와 공통 계산기 페이지 프레임
│   ├── common/        # Header, Footer, AdSlot 등 공통 UI
│   └── tools/          # 생활 도구 UI
├── layouts/            # BaseLayout 및 공통 문서 구조
├── lib/
│   ├── calculators/   # 순수 계산 함수, 입력 처리, 실시간 계산 runtime
│   └── seo/            # SEO 관련 유틸리티
├── pages/              # Astro 페이지와 URL 경로
└── content/            # 페이지 콘텐츠 자료

public/                 # 정적 파일, 폰트, robots.txt, sitemap.xml
tests/                 # Bun 테스트
```

계산기 페이지는 공통 `CalculatorPage` 프레임을 사용하고, 계산기 입력·결과 UI는 계산기별 Astro 컴포넌트에 둡니다. 계산 공식은 가능한 한 `src/lib/calculators`에 순수 TypeScript 함수로 분리합니다. 페이지에 이미 별도 설명 UI가 있는 경우 공통 프레임 안에 그대로 유지합니다.

## 광고 환경 변수

광고를 사용할 때 프로젝트 루트의 `.env.example`을 참고해 로컬 `.env`와 Cloudflare Pages 환경 변수에 값을 설정합니다.

- `PUBLIC_ADSENSE_CLIENT`: AdSense 게시자 ID
- `PUBLIC_ADSENSE_SLOT_CALCULATOR`: 계산기 광고 슬롯 ID
- `PUBLIC_ADSENSE_SLOT_TOOL`: 생활 도구 광고 슬롯 ID

실제 게시자 ID와 슬롯 ID는 저장소에 커밋하지 마세요. 광고 설정이 없으면 광고 영역은 렌더링되지 않습니다.

## 스타일 및 페이지 원칙

- UI 프레임워크를 추가하지 않고 Astro 컴포넌트와 필요한 브라우저 스크립트를 사용합니다.
- 스타일은 프로젝트 UnoCSS 토큰과 Attributify 규칙을 따릅니다.
- 계산기는 입력 검증, 키보드 접근성, 다크 모드, 모바일·태블릿·데스크톱 레이아웃을 고려합니다.
- 페이지별 title, description, canonical을 지정합니다.
- 계산 기준과 참고용 결과의 한계를 페이지 콘텐츠에 명확히 씁니다.
- 정적 출력과 낮은 클라이언트 JavaScript를 유지합니다.

## 배포

Astro 정적 빌드 결과인 `dist/`를 Cloudflare Pages에 배포합니다. 배포 환경의 빌드 명령은 `bun run build`, 출력 디렉터리는 `dist`로 설정합니다.
