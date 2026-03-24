"use client";

import { useMemo, useState, useTransition } from "react";
import { QuestionCard } from "@/components/question-card";
import { useStudy } from "@/components/study-provider";
import {
  formatQuestionTypeLabel,
  QUESTION_TYPE_OPTIONS,
  sortQuestionsForPractice,
} from "@/lib/study";

export function PracticeView() {
  const { hydrated, questionProgress, questions, markQuestion, stats } = useStudy();
  const [activeType, setActiveType] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const filteredQuestions = useMemo(() => {
    const byType =
      activeType === "all"
        ? questions
        : questions.filter((question) => question.type === activeType);

    return sortQuestionsForPractice(byType, questionProgress);
  }, [activeType, questionProgress, questions]);

  if (!hydrated) {
    return <LoadingCard label="문제 데이터를 준비하는 중입니다." />;
  }

  const safeIndex =
    filteredQuestions.length === 0
      ? 0
      : Math.min(currentIndex, filteredQuestions.length - 1);
  const currentQuestion = filteredQuestions[safeIndex];

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                추천 순서로 풀이
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                문제 풀이
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                오답이 많거나 아직 풀지 않은 문제가 먼저 나오도록 정렬했습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">
                {filteredQuestions.length}문제 · 현재 {safeIndex + 1}번
              </p>
              <p className="mt-1 text-slate-300">
                누적 오답 {stats.totalWrongCount}회
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {QUESTION_TYPE_OPTIONS.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setActiveType(type);
                  setCurrentIndex(0);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeType === type
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {formatQuestionTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        {currentQuestion ? (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            progress={questionProgress[currentQuestion.id]}
            onMark={(result) =>
              startTransition(() => {
                markQuestion(currentQuestion.id, result);
                if (safeIndex < filteredQuestions.length - 1) {
                  setCurrentIndex((index) => index + 1);
                }
              })
            }
          />
        ) : (
          <LoadingCard label="선택한 조건에 맞는 문제가 없습니다." />
        )}

        <div className="card-surface rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">문제 이동</h3>
              <p className="mt-1 text-sm text-slate-600">
                필터 안에서 원하는 문제로 빠르게 이동할 수 있습니다.
              </p>
            </div>
            {isPending ? (
              <span className="text-xs text-slate-500">결과 저장 중...</span>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {filteredQuestions.map((question, index) => {
              const progress = questionProgress[question.id];
              const isActive = index === safeIndex;
              const emphasis =
                progress?.wrongCount && progress.wrongCount > 0
                  ? "bg-rose-50 text-rose-700"
                  : "bg-white text-slate-600";

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : `${emphasis} hover:bg-slate-50`
                  }`}
                >
                  {index + 1}. {question.topic}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">풀이 가이드</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              답 보기와 해설 보기를 분리해 두어서 스스로 먼저 떠올린 뒤 확인하기 좋습니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              틀렸음을 누르면 해당 문제가 오답노트에 자동 저장됩니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              SQL, Java, 서술형, 개념을 균형 있게 섞되 취약한 유형이 먼저 보이도록 정렬했습니다.
            </p>
          </div>
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
