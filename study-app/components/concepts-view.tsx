import Link from "next/link";

const CONCEPT_SECTIONS = [
  {
    title: "SQL 핵심",
    subtitle: "JOIN / GROUP BY / 트랜잭션",
    items: [
      "JOIN은 테이블 연결, WHERE는 조회 조건이라는 역할 분리를 먼저 기억합니다.",
      "집계 결과 조건은 WHERE가 아니라 HAVING을 사용합니다.",
      "COMMIT은 확정, ROLLBACK은 취소, SAVEPOINT는 중간 복구 지점입니다.",
    ],
  },
  {
    title: "Java 핵심",
    subtitle: "상속 / 오버라이딩 / 예외",
    items: [
      "Parent obj = new Child() 에서는 오버라이딩된 인스턴스 메서드가 실행됩니다.",
      "static 메서드는 오버라이딩이 아니라 hiding으로 봅니다.",
      "catch는 더 구체적인 예외부터, 더 넓은 예외는 뒤에 둡니다.",
    ],
  },
  {
    title: "서술형 핵심",
    subtitle: "응집도 / 결합도 / 정규화",
    items: [
      "응집도는 높게, 결합도는 낮게가 기본 설계 방향입니다.",
      "정규화 목적은 중복과 이상 현상 감소, 무결성 향상입니다.",
      "서술형은 정의 + 목적 + 비교 포인트를 2문장 안에 쓰는 연습이 좋습니다.",
    ],
  },
  {
    title: "암기 포인트",
    subtitle: "네트워크 / 테스트 / 개발 프로세스",
    items: [
      "네트워크 계층은 IP와 라우팅, 브로드캐스트는 같은 네트워크 전체 대상입니다.",
      "경계값 분석은 경계 근처, 동등 분할은 대표 구간값에 초점을 둡니다.",
      "CI는 통합과 자동 검증, CD는 배포 전후 자동화 흐름입니다.",
    ],
  },
];

export function ConceptsView() {
  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">오늘의 개념 복습</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">실전 전 핵심 개념 노트</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                비전공자 기준으로 시험장에서 바로 떠올려야 하는 문장만 짧게 압축했습니다. 먼저 읽고, 바로 문제 풀이로 넘어가면 효과가 좋습니다.
              </p>
            </div>
            <Link
              href="/practice"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              문제 풀이로 이동
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {CONCEPT_SECTIONS.map((section) => (
            <article key={section.title} className="card-surface rounded-[28px] p-6">
              <p className="text-sm font-semibold text-emerald-700">{section.subtitle}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {section.items.map((item) => (
                  <li key={item} className="rounded-2xl bg-white/80 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">추천 흐름</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">1. 개념 복습에서 오늘 약한 파트를 먼저 읽습니다.</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">2. 문제 풀이에서 관련 유형을 바로 풀어봅니다.</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">3. 틀린 문제는 오답노트에서 다시 확인합니다.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
