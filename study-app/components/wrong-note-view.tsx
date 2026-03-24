"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { QuestionCard } from "@/components/question-card";
import { useStudy } from "@/components/study-provider";
import {
  formatDateLabel,
  formatQuestionTypeLabel,
  isQuestionDueForReview,
  QUESTION_TYPE_OPTIONS,
  sortQuestionsForPractice,
} from "@/lib/study";
import type { QuestionTypeFilter } from "@/lib/types";

type ReviewFilter = "all" | "due" | "repeat";

export function WrongNoteView() {
  const { hydrated, markQuestion, questionProgress, stats, wrongQuestions } = useStudy();
  const [activeType, setActiveType] = useState<QuestionTypeFilter>("all");
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>("all");
  const deferredType = useDeferredValue(activeType);
  const [isPending, startTransition] = useTransition();

  const filteredQuestions = useMemo(() => {
    let base = wrongQuestions;

    if (reviewFilter === "due") {
      base = base.filter((question) =>
        isQuestionDueForReview(questionProgress[question.id]),
      );
    }

    if (reviewFilter === "repeat") {
      base = base.filter((question) => (questionProgress[question.id]?.wrongCount ?? 0) >= 2);
    }

    const typed =
      deferredType === "all"
        ? base
        : base.filter((question) => question.type === deferredType);

    return sortQuestionsForPractice(typed, questionProgress, { prioritizeDue: true });
  }, [deferredType, questionProgress, reviewFilter, wrongQuestions]);

  const dueCount = useMemo(
    () => wrongQuestions.filter((question) => isQuestionDueForReview(questionProgress[question.id])).length,
    [questionProgress, wrongQuestions],
  );

  if (!hydrated) {
    return <LoadingCard label="오답노트를 불러오는 중입니다." />;
  }

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-700">오답 우선 복습</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">오답노트</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                틀린 문제는 자동 저장되고, 다시 틀리면 우선순위가 올라갑니다. 틀린 문제는 기본적으로 3일 뒤 다시 보도록 복습 예정이 잡힙니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">{stats.wrongQuestions.length}문제 저장됨</p>
              <p className="mt-1 text-slate-300">오늘 복습 {dueCount}문제 · 취약 파트 {stats.weakTopics[0]}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUESTION_TYPE_OPTIONS.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeType === type
                    ? "bg-rose-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {formatQuestionTypeLabel(type)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip
              active={reviewFilter === "all"}
              label="전체 오답"
              onClick={() => setReviewFilter("all")}
            />
            <FilterChip
              active={reviewFilter === "due"}
              label="오늘 다시 볼 문제"
              onClick={() => setReviewFilter("due")}
            />
            <FilterChip
              active={reviewFilter === "repeat"}
              label="2번 이상 틀린 문제"
              onClick={() => setReviewFilter("repeat")}
            />
          </div>
        </div>

        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => {
            const progress = questionProgress[question.id];
            const isDue = isQuestionDueForReview(progress);

            return (
              <div key={question.id} className="space-y-3">
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 sm:text-sm">
                  <span className="rounded-full bg-rose-50 px-3 py-2 font-semibold text-rose-700">
                    틀린 횟수 {progress?.wrongCount ?? 0}회
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-2 font-medium text-slate-600">
                    최근 틀린 날짜 {progress?.lastSolvedAt?.slice(0, 10) ?? "-"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-2 font-medium ${
                      isDue
                        ? "bg-amber-50 text-amber-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {progress?.nextReviewAt
                      ? isDue
                        ? "오늘 복습 대상"
                        : `다음 복습 ${formatDateLabel(progress.nextReviewAt.slice(0, 10))}`
                      : "복습 완료 상태"}
                  </span>
                </div>
                <QuestionCard
                  question={question}
                  progress={progress}
                  onMark={(result) =>
                    startTransition(() => markQuestion(question.id, result))
                  }
                />
              </div>
            );
          })
        ) : (
          <div className="card-surface rounded-[28px] p-10 text-center">
            <h3 className="text-xl font-bold">조건에 맞는 오답이 없습니다.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              유형이나 오답 필터를 바꾸거나, 문제 풀이에서 새로 틀린 문제를 저장해 보세요.
            </p>
            <Link
              href="/practice"
              className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              문제 풀이로 이동
            </Link>
          </div>
        )}
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">오답 복습 팁</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              답을 보기 전에 먼저 키워드만 적어 보고, 그다음 정답과 해설, 도움말 노트를 확인하세요.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              같은 문제를 다시 틀리면 오늘 계획에서 오답 복습 비중이 더 올라갑니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              3일 복습 규칙으로 오늘 다시 볼 문제를 따로 모아 둘 수 있으니, 막판에는 `오늘 다시 볼 문제` 필터부터 보는 것이 좋습니다.
            </p>
          </div>
          {isPending ? (
            <p className="mt-3 text-xs text-slate-500">오답 기록 저장 중...</p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">
      {label}
    </div>
  );
}
