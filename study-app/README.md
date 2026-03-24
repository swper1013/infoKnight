# InfoKnight Study App

정보처리기사 실기 공부를 위해 만든 Next.js App Router + Tailwind CSS 기반 MVP입니다.

핵심 목표:

- 시험일까지의 D-day를 기준으로 오늘 할 일을 자동 생성
- SQL / Java / 서술형 / 개념 문제 풀이
- 틀린 문제를 localStorage 기반 오답노트로 저장
- 오답 위주 반복 학습 루틴 제공

앱의 기본 D-day 기준일은 `2026-04-17`이며, 공식 실기 시작일 `2026-04-18`의 전날까지 학습하는 흐름으로 잡았습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 `/dashboard`로 이동합니다.

검증용 명령:

```bash
npm run lint
npm run build
```

권장 Node 버전:

```bash
node 20.9+
```

## GitHub / Vercel 배포

이 프로젝트는 GitHub에 올린 뒤 Vercel로 바로 배포할 수 있습니다.

가장 쉬운 방법은 2가지입니다.

### 방법 1. `study-app`만 별도 저장소로 올리기

가장 안전한 방식입니다.

1. `C:\project\infoKnight\study-app`만 새 GitHub 저장소로 올립니다.
2. Vercel에서 해당 저장소를 Import 합니다.
3. Framework Preset은 `Next.js`로 둡니다.
4. Build Command는 기본값 `next build`를 사용합니다.
5. 배포 후 생성된 URL로 바로 웹처럼 확인할 수 있습니다.

### 방법 2. 현재 상위 저장소를 그대로 올리고 `Root Directory`를 `study-app`으로 지정하기

상위 폴더에 Spring 프로젝트가 함께 있으므로 이 경우 `Root Directory` 설정이 중요합니다.

1. `C:\project\infoKnight` 전체를 GitHub에 올립니다.
2. Vercel에서 저장소를 Import 합니다.
3. Project Settings 또는 Import 화면에서 `Root Directory`를 `study-app`으로 설정합니다.
4. Framework Preset은 `Next.js`로 둡니다.
5. 배포를 진행합니다.

설정을 잘못하면 Vercel이 루트의 Gradle 프로젝트를 같이 보거나 Next 앱을 못 찾을 수 있으니, 혼동을 줄이려면 방법 1을 추천합니다.

## 배포 전 체크리스트

- `npm run lint` 통과
- `npm run build` 통과
- `node` 버전이 `20.9+`
- `study-app/.next`, `node_modules`는 Git에 올리지 않음
- 이 앱은 `localStorage`를 사용하므로 학습 기록은 브라우저/기기별로 따로 저장됨

## 배포 후 확인할 점

- 첫 접속 시 `/dashboard`로 이동하는지
- 모바일 폭에서도 상단 탭과 카드가 깨지지 않는지
- 문제 풀이 후 새로고침해도 기록이 유지되는지
- 오답노트에 틀린 문제가 정상 누적되는지

## 구현 페이지

- `dashboard`
  - D-day
  - 오늘 공부 시간 120분
  - 오늘 할 일 요약
  - 누적 푼 문제 수
  - 누적 오답 수
  - 취약 파트
  - 오늘 공부 시작 버튼
- `today`
  - 남은 날짜와 오답 비중을 반영한 오늘 플랜 자동 생성
  - 120분 / 4개 이하 블록
  - 체크 상태 localStorage 저장
- `practice`
  - SQL / Java / 서술형 / 개념 문제 필터
  - 답 보기 / 해설 보기
  - 맞았음 / 틀렸음 기록
- `wrong-note`
  - 틀린 문제만 모아서 표시
  - 유형별 필터
  - 틀린 횟수, 최근 틀린 날짜 표시
  - 바로 다시 풀기

## 프로젝트 구조

```text
study-app
├─ app
│  ├─ dashboard/page.tsx
│  ├─ today/page.tsx
│  ├─ practice/page.tsx
│  ├─ wrong-note/page.tsx
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ app-navigation.tsx
│  ├─ dashboard-view.tsx
│  ├─ practice-view.tsx
│  ├─ question-card.tsx
│  ├─ study-provider.tsx
│  ├─ today-plan-view.tsx
│  └─ wrong-note-view.tsx
├─ data
│  ├─ questions.json
│  └─ research-summary.json
├─ lib
│  ├─ study.ts
│  └─ types.ts
└─ README.md
```

## 상태 저장 방식

- 로그인 없음
- 브라우저 `localStorage`에 다음을 저장
  - 오늘 할 일 체크 상태
  - 문제별 정답/오답 횟수
  - 최근 풀이 시간
  - 전체 풀이 로그
- 저장 키: `infoknight-study-state-v1`

## 문제 데이터 구성 원칙

- 시험 원문을 그대로 복사하지 않았습니다.
- 최근 출제 경향과 복원 문제에서 반복되는 개념을 바탕으로 유사문제 / 변형문제로 재구성했습니다.
- 비전공자 기준으로 `입문 -> 기본 -> 실전` 난이도 흐름을 섞었습니다.
- SQL, Java, 서술형, 개념 문제를 확장해 총 80개로 늘렸습니다.

문제 형식:

```json
{
  "id": "SQL-01",
  "type": "sql",
  "topic": "DISTINCT와 COUNT",
  "question": "문제 내용",
  "answer": "정답",
  "explanation": "해설",
  "difficulty": "입문",
  "sourceNote": "2023~2025 SQL 집계 기본 패턴 반영"
}
```

## 웹 조사 반영 메모

다음 내용을 바탕으로 문제 구성 원칙과 기본 시험일을 잡았습니다.

- 큐넷 정보처리기사 종목 정보
  - 공식 실기 시작일은 `2026-04-18`이지만, 앱의 D-day 계산은 요청에 맞춰 `2026-04-17`까지로 설정
  - 2026 출제기준 링크와 최근 후기 기반 주제 반영
- 2021~2025 복원/후기 자료
  - 데이터베이스, SQL, Java, 테스트, 응집도/결합도, 네트워크/IP 주제가 반복
  - 최근 후기에는 Java의 `static`과 오버라이딩 구분, 람다식, 관계대수/프로젝션, 브로드캐스트, 스케줄링 언급이 보임

참고 링크:

- 큐넷 정보처리기사 종목 정보: https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s02&jmCd=1320
- 출제 유형 분석: https://jbground.tistory.com/20
- 2024년 2회 실기 후기: https://cookie.tistory.com/111
- 2025년 2회 실기 후기: https://juzero-space.tistory.com/entry/%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EC%82%AC-%EC%8B%A4%EA%B8%B0-%ED%9B%84%EA%B8%B0-2025%EB%85%84-2%ED%9A%8C%EC%B0%A8
- SQL 기출 정리: https://bhher.tistory.com/91

## 이후 확장 포인트

- 시험일 변경 UI 추가
- 문제 검색 / 토픽 검색
- 랜덤 모의고사 모드
- localStorage 대신 IndexedDB 또는 서버 저장소 전환
- 오답 우선 알고리즘 고도화


## 버전 로그 운영

- 앱 안의 `업데이트 로그` 버튼에서 버전별 수정 이력을 볼 수 있습니다.
- 버전 정보는 `data/changelog.json`에서 관리합니다.
- 다음 배포부터는 `v0.11 -> v0.12 -> v0.13`처럼 `0.01`씩 올려 주세요.
- 수정 후에는 `currentVersion`과 첫 번째 entry를 함께 갱신하면 됩니다.
