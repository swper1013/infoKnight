"use client";

import Link from "next/link";
import researchSummary from "@/data/research-summary.json";
import { useStudy } from "@/components/study-provider";
import { formatQuestionTypeLabel, formatStageLabel } from "@/lib/study";

export function DashboardView() {
  const { hydrated, questions, stats } = useStudy();

  if (!hydrated) {
    return <LoadingCard label="학습 기록을 불러오는 중입니다." />;
  }

  const todayPreview = stats.todayPlan.slice(0, 3);

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  시험일 기준 자동 플랜
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {stats.dDayLabel}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  {stats.todaySummary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge label={`오늘 공부 시간 ${stats.dailyMinutes}분`} />
                <Badge label={`${formatStageLabel(stats.stage)} 구간`} />
                <Badge label={`문제 ${questions.length}개`} />
              </div>
            </div>
            <Link
              href="/today"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              오늘 공부 시작
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="오늘 공부 시간" value="120분" note="평일 최대치 기준" />
          <StatCard
            label="누적 푼 문제 수"
            value={`${stats.totalSolvedCount}회`}
            note="정답/오답 포함 전체 풀이 기록"
          />
          <StatCard
            label="누적 오답 수"
            value={`${stats.totalWrongCount}회`}
            note="반복 학습 우선순위에 반영"
          />
          <StatCard
            label="취약 파트"
            value={stats.weakTopics[0]}
            note={stats.weakTopics[1] ? `다음 약점: ${stats.weakTopics[1]}` : "초기 추천 파트"}
          />
          <StatCard
            label="오늘 할 일 요약"
            value={`${stats.todayPlan.length}개 블록`}
            note={`${stats.todayPlan.reduce((sum, block) => sum + block.minutes, 0)}분 구성`}
          />
          <StatCard
            label="오답노트 대상"
            value={`${stats.wrongQuestions.length}문제`}
            note="틀렸던 문제는 자동 누적"
          />
        </div>

        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">오늘 할 일 미리보기</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                D-day와 최근 오답 기록을 반영해 120분 안에서 바로 시작할 수 있게 나눴습니다.
              </p>
            </div>
            <Link
              href="/today"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              전체 보기
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {todayPreview.map((block, index) => (
              <div
                key={block.id}
                className="rounded-3xl border border-slate-200/80 bg-white/80 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                      Block {index + 1}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold">{block.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {block.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
                    {block.minutes}분
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">문제 구성 기준</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {researchSummary.principles.map((principle) => (
              <li key={principle} className="rounded-2xl bg-white/75 px-4 py-3">
                {principle}
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">최근 반영 포인트</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {researchSummary.focusTopics.map((topic) => (
              <Badge key={topic} label={topic} />
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-4 text-sm text-slate-200">
            <p className="font-semibold text-white">문제 분포</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Object.entries(stats.questionTypeCounts).map(([type, count]) => (
                <div key={type} className="rounded-2xl bg-white/10 px-3 py-3">
                  <p className="text-xs text-slate-300">{formatQuestionTypeLabel(type)}</p>
                  <p className="mt-1 text-lg font-semibold text-white">{count}문제</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">추천 다음 행동</h3>
          <div className="mt-4 space-y-3">
            <ActionLink
              href="/practice"
              title="문제 먼저 풀기"
              description="오답이 많은 문제부터 추천 순서로 풀이"
            />
            <ActionLink
              href="/wrong-note"
              title="오답노트 집중"
              description={`현재 ${stats.wrongQuestions.length}문제를 다시 볼 수 있습니다.`}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="card-surface rounded-[24px] p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
    </article>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:text-sm">
      {label}
    </span>
  );
}

function ActionLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 transition hover:border-emerald-200 hover:bg-white"
    >
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">
      {label}
    </div>
  );
}
