"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useStudy } from "@/components/study-provider";
import { formatDateKey, formatStageLabel } from "@/lib/study";

export function TodayPlanView() {
  const { hydrated, completedBlockIds, stats, togglePlanBlock } = useStudy();
  const [isPending, startTransition] = useTransition();

  if (!hydrated) {
    return <LoadingCard label="오늘 계획을 계산하는 중입니다." />;
  }

  const todayKey = formatDateKey(new Date());
  const completedCount = stats.todayPlan.filter((block) =>
    completedBlockIds.includes(block.id),
  ).length;

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                오늘의 자동 생성 루틴
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {stats.dDayLabel} 기준 120분 플랜
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {stats.todaySummary}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">{completedCount} / {stats.todayPlan.length} 완료</p>
              <p className="mt-1 text-slate-300">{formatStageLabel(stats.stage)} 집중 구간</p>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{
                width: `${(completedCount / Math.max(stats.todayPlan.length, 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {stats.todayPlan.map((block, index) => {
            const isDone = completedBlockIds.includes(block.id);

            return (
              <article
                key={block.id}
                className={`card-surface rounded-[28px] p-5 transition ${
                  isDone ? "border-emerald-200 bg-emerald-50/70" : ""
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        startTransition(() => togglePlanBlock(todayKey, block.id))
                      }
                      className={`mt-1 h-7 w-7 rounded-full border-2 transition ${
                        isDone
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                      aria-label={`${block.title} 완료 체크`}
                    >
                      ✓
                    </button>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                        Block {index + 1}
                      </p>
                      <h3 className="mt-1 text-xl font-bold">{block.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {block.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700">
                      {block.minutes}분
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
                      {isDone ? "완료" : "진행 전"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">오늘 우선순위</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              취약 파트: <span className="font-semibold text-slate-900">{stats.weakTopics[0]}</span>
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              오답이 많을수록 계획 안에서 오답 복습 시간이 먼저 늘어납니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              블록 체크 상태는 브라우저의 localStorage에 저장됩니다.
            </p>
          </div>
        </div>

        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">바로 이어서 하기</h3>
          <div className="mt-4 space-y-3">
            <Link
              href="/practice"
              className="block rounded-3xl bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              문제 풀이 시작
            </Link>
            <Link
              href="/wrong-note"
              className="block rounded-3xl bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              오답노트 열기
            </Link>
          </div>
          {isPending ? (
            <p className="mt-3 text-xs text-slate-500">체크 상태 저장 중...</p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">
      {label}
    </div>
  );
}
