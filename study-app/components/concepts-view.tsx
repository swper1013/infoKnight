import Link from "next/link";

const CONCEPT_SECTIONS = [
  {
    title: "SQL 핵심 노트",
    subtitle: "JOIN / GROUP BY / 트랜잭션 / NULL 처리",
    summary:
      "SQL은 문장을 통째로 외우기보다 절의 역할을 분리해서 이해하는 편이 훨씬 오래 갑니다. 시험장에서 헷갈리는 포인트는 대부분 JOIN과 WHERE의 역할, GROUP BY와 HAVING의 차이, 그리고 COMMIT과 ROLLBACK 같은 트랜잭션 제어문입니다.",
    bullets: [
      "JOIN은 테이블을 연결하는 단계이고, WHERE는 연결된 결과에서 필요한 행만 고르는 단계입니다. 그래서 JOIN 조건과 조회 조건을 머릿속에서 따로 구분해야 합니다.",
      "집계 함수가 들어간 뒤의 조건은 WHERE가 아니라 HAVING입니다. 평균, 합계, 건수처럼 이미 계산이 끝난 값을 다시 거르는 상황인지 먼저 떠올리면 됩니다.",
      "COMMIT은 지금까지의 변경을 확정하고, ROLLBACK은 취소합니다. SAVEPOINT는 중간 복구 지점을 만들어서 일부만 되돌릴 수 있게 합니다.",
      "NULL은 = 로 비교하지 않고 IS NULL / IS NOT NULL을 씁니다. 이 부분은 단순하지만 실전에서 자주 틀리는 기본기입니다.",
    ],
    examTip:
      "문제를 보면 먼저 이게 조회인지, 집계인지, 수정인지부터 구분하세요. 그다음 필요한 절을 순서대로 떠올리면 SQL 문장이 훨씬 덜 꼬입니다.",
  },
  {
    title: "Java 핵심 노트",
    subtitle: "상속 / 오버라이딩 / static / 예외 / 컬렉션",
    summary:
      "Java는 문법이 많아 보여도 정보처리기사 실기에서는 반복되는 개념이 꽤 정해져 있습니다. 상속과 다형성, 오버라이딩과 static의 구분, 예외 처리 순서, 컬렉션의 기본 성질 정도를 안정적으로 잡아두면 점수를 챙기기 쉽습니다.",
    bullets: [
      "Parent obj = new Child() 형태에서는 실제 객체가 Child이므로 오버라이딩된 인스턴스 메서드가 실행됩니다. 다형성 문제는 참조형보다 실제 생성 객체를 먼저 보세요.",
      "static 메서드는 오버라이딩 대상이 아니라 hiding으로 봅니다. 최근 실기 후기에서도 이 포인트를 헷갈려 틀린 경우가 많았습니다.",
      "catch 블록은 더 구체적인 예외부터, 더 넓은 예외는 뒤에 둡니다. 그렇지 않으면 뒤쪽 catch가 도달 불가능해져 컴파일 오류가 납니다.",
      "HashSet은 중복을 허용하지 않고, ArrayList는 순서가 있으며 인덱스로 접근합니다. 컬렉션은 각 자료구조의 성질을 짧게 비교할 수 있어야 합니다.",
    ],
    examTip:
      "코드 문제는 무조건 한 줄씩 실행 흐름을 적어 보세요. 생성자 호출 순서, 실제 객체 타입, 예외 발생 위치만 잡아도 정답률이 크게 올라갑니다.",
  },
  {
    title: "서술형 핵심 노트",
    subtitle: "응집도 / 결합도 / 정규화 / 테스트 / 요구사항",
    summary:
      "서술형은 많이 아는 것보다 짧고 정확하게 쓰는 훈련이 더 중요합니다. 정의를 한 문장, 목적이나 장점을 한 문장, 그리고 비교 포인트를 한 문장 정도로 정리해 두면 시험장에서 바로 꺼내 쓰기 좋습니다.",
    bullets: [
      "응집도는 높게, 결합도는 낮게가 기본 설계 방향입니다. 모듈 내부 책임은 밀접하고, 모듈 간 의존성은 약해야 유지보수가 쉬워집니다.",
      "정규화의 목적은 중복과 이상 현상을 줄여 무결성을 높이는 것입니다. 1정규형은 원자값, 2정규형은 부분 함수 종속 제거, 3정규형은 이행 함수 종속 제거를 떠올리면 됩니다.",
      "블랙박스 테스트는 기능 중심, 화이트박스 테스트는 내부 로직 중심입니다. 경계값 분석과 동등 분할도 같이 묶어두면 자주 쓰입니다.",
      "좋은 요구사항은 명확하고, 완전하고, 검증 가능해야 합니다. 특히 검증 가능성은 테스트나 리뷰로 충족 여부를 확인할 수 있느냐를 뜻합니다.",
    ],
    examTip:
      "서술형은 길게 쓰기보다 정의와 목적을 분리해서 2문장 안에 정리하세요. 애매한 형용사보다 '왜 필요한가'를 짧게 쓰는 것이 더 안전합니다.",
  },
  {
    title: "암기 포인트 노트",
    subtitle: "네트워크 / 운영체제 / 보안 / 개발 프로세스",
    summary:
      "막판 점검용으로는 용어를 한 줄 정의로 정리해 두는 것이 가장 효율적입니다. 네트워크, 운영체제, 보안, 애자일/CI-CD 같은 파트는 짧은 단답형이나 서술형의 재료로 반복해서 나옵니다.",
    bullets: [
      "네트워크 계층은 IP와 라우팅을 담당하고, 브로드캐스트 주소는 같은 네트워크 전체 호스트를 대상으로 메시지를 보낼 때 사용합니다.",
      "라운드 로빈은 각 프로세스에 같은 시간 할당량을 순환 방식으로 주는 선점형 스케줄링입니다. 세마포어는 공유 자원 접근을 제어하는 동기화 도구입니다.",
      "대칭키는 암호화와 복호화에 같은 키를 쓰고, 비대칭키는 서로 다른 키를 씁니다. 해시는 무결성 확인용 일방향 함수입니다.",
      "CI는 자주 통합하고 자동 검증하는 흐름이고, CD는 검증된 결과물을 배포 직전 또는 운영까지 이어가는 흐름입니다. 스프린트 회고는 개선점을 찾는 의식입니다.",
    ],
    examTip:
      "이 파트는 완벽한 이해보다 '정의 한 줄'이 더 중요합니다. 보면서 바로 말할 수 있을 정도까지 짧게 압축해 두면 시험 직전 복습에 강합니다.",
  },
];

export function ConceptsView() {
  return (
    <div className="space-y-4">
      <section className="card-surface rounded-[28px] p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">오늘의 개념 복습</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">실전 전에 보는 압축 노트</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              카드형 요약보다 실제 필기처럼 읽히도록 문장을 조금 더 길게 풀었습니다. 먼저 노트를 읽고, 바로 문제 풀이로 넘어가면 암기와 적용이 연결되기 쉽습니다.
            </p>
          </div>
          <Link
            href="/practice"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            문제 풀이로 이동
          </Link>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <section className="space-y-4">
          {CONCEPT_SECTIONS.map((section) => (
            <article key={section.title} className="card-surface rounded-[28px] p-6 sm:p-7">
              <p className="text-sm font-semibold text-emerald-700">{section.subtitle}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[2rem]">{section.title}</h3>
              <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
                {section.summary}
              </p>

              <div className="mt-5 space-y-3">
                {section.bullets.map((bullet) => (
                  <div key={bullet} className="rounded-3xl border border-slate-200/80 bg-white/85 px-5 py-4">
                    <p className="text-sm leading-8 text-slate-700 sm:text-base">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[24px] border border-amber-100 bg-amber-50/80 px-5 py-4">
                <p className="text-sm font-semibold text-amber-800">시험장 팁</p>
                <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">{section.examTip}</p>
              </div>
            </article>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="card-surface rounded-[28px] p-6">
            <h3 className="text-lg font-bold">추천 읽는 순서</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p className="rounded-2xl bg-white/75 px-4 py-3">1. 오늘 가장 약한 파트 노트부터 먼저 읽습니다.</p>
              <p className="rounded-2xl bg-white/75 px-4 py-3">2. 읽은 직후 관련 유형 문제를 3~5개 바로 풉니다.</p>
              <p className="rounded-2xl bg-white/75 px-4 py-3">3. 틀린 문제는 오답노트에서 다시 보고, 같은 개념 문장을 한 번 더 읽습니다.</p>
            </div>
          </div>

          <div className="card-surface rounded-[28px] p-6">
            <h3 className="text-lg font-bold">읽는 기준</h3>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p className="rounded-2xl bg-white/75 px-4 py-3">정의를 먼저 읽고, 그다음 왜 필요한지 한 줄로 설명할 수 있으면 충분합니다.</p>
              <p className="rounded-2xl bg-white/75 px-4 py-3">시험 직전에는 전체를 읽기보다 각 섹션의 시험장 팁만 다시 보는 방식이 더 효율적입니다.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
