"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { QuestionCard } from "@/components/question-card";
import { useStudy } from "@/components/study-provider";
import { formatQuestionTypeLabel, QUESTION_TYPE_OPTIONS } from "@/lib/study";

export function WrongNoteView() {
  const { hydrated, markQuestion, questionProgress, stats, wrongQuestions } = useStudy();
  const [activeType, setActiveType] = useState("all");
  const deferredType = useDeferredValue(activeType);
  const [isPending, startTransition] = useTransition();

  const filteredQuestions = useMemo(() => {
    const base =
      deferredType === "all"
        ? wrongQuestions
        : wrongQuestions.filter((question) => question.type === deferredType);

    return [...base].sort((left, right) => {
      const leftProgress = questionProgress[left.id];
      const rightProgress = questionProgress[right.id];
      const wrongGap =
        (rightProgress?.wrongCount ?? 0) - (leftProgress?.wrongCount ?? 0);

      if (wrongGap !== 0) {
        return wrongGap;
      }

      return (rightProgress?.lastSolvedAt ?? "").localeCompare(
        leftProgress?.lastSolvedAt ?? "",
      );
    });
  }, [deferredType, questionProgress, wrongQuestions]);

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
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                오답노트
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                틀렸던 문제만 모아 두었습니다. 오답 횟수가 많을수록 위에 배치됩니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">{stats.wrongQuestions.length}문제 저장됨</p>
              <p className="mt-1 text-slate-300">취약 파트: {stats.weakTopics[0]}</p>
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
        </div>

        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => {
            const progress = questionProgress[question.id];

            return (
              <div key={question.id} className="space-y-3">
                <div className="flex flex-wrap gap-2 text-xs text-slate-500 sm:text-sm">
                  <span className="rounded-full bg-rose-50 px-3 py-2 font-semibold text-rose-700">
                    틀린 횟수 {progress?.wrongCount ?? 0}회
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-2 font-medium text-slate-600">
                    최근 틀린 날짜 {progress?.lastSolvedAt?.slice(0, 10) ?? "-"}
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
            <h3 className="text-xl font-bold">오답노트가 비어 있습니다.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              문제 풀이에서 틀렸음을 누른 문제가 여기로 자동 저장됩니다.
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
              답을 보기 전에 먼저 키워드만 적어 보고, 그다음 정답과 해설을 확인하세요.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              같은 문제를 다시 틀리면 오늘 계획에서 오답 복습 비중이 더 올라갑니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              자주 틀리는 주제는 대시보드의 취약 파트에도 다시 표시됩니다.
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

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">
      {label}
    </div>
  );
}
