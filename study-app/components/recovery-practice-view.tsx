"use client";

import { useMemo, useState, useTransition } from "react";
import { QuestionCard } from "@/components/question-card";
import { useStudy } from "@/components/study-provider";
import { recoveryQuestionSet } from "@/lib/questions";
import { formatQuestionTypeLabel, QUESTION_TYPE_OPTIONS, sortQuestionsForPractice } from "@/lib/study";
import type { QuestionTypeFilter } from "@/lib/types";

const YEAR_OPTIONS = ["all", "2020", "2021", "2022", "2023", "2024", "2025"] as const;
const ROUND_OPTIONS = ["all", "1회", "2회", "3회"] as const;

export function RecoveryPracticeView() {
  const { hydrated, markQuestion, questionProgress } = useStudy();
  const [activeType, setActiveType] = useState<QuestionTypeFilter>("all");
  const [activeYear, setActiveYear] = useState<(typeof YEAR_OPTIONS)[number]>("all");
  const [activeRound, setActiveRound] = useState<(typeof ROUND_OPTIONS)[number]>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const filteredQuestions = useMemo(() => {
    const byYear =
      activeYear === "all"
        ? recoveryQuestionSet
        : recoveryQuestionSet.filter((question) => `${question.year}` === activeYear);
    const byRound =
      activeRound === "all"
        ? byYear
        : byYear.filter((question) => question.round?.startsWith(activeRound));
    const byType =
      activeType === "all"
        ? byRound
        : byRound.filter((question) => question.type === activeType);

    return sortQuestionsForPractice(byType, questionProgress, { prioritizeDue: true });
  }, [activeRound, activeType, activeYear, questionProgress]);

  if (!hydrated) {
    return <LoadingCard label="실전 세트를 불러오는 중입니다." />;
  }

  const safeIndex =
    filteredQuestions.length === 0 ? 0 : Math.min(currentIndex, filteredQuestions.length - 1);
  const currentQuestion = filteredQuestions[safeIndex];

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-violet-700">2020~2025 공개 복원 경향 기반</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">실전 풀이</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                시험 원문을 그대로 복사하지 않고, 공개 후기와 복원 자료에서 반복 확인된 SQL, Java, Python, C 패턴을 변형한 실전 세트입니다. 연도별·언어별 최소 5문항을 보이도록 확장했고, SQL 문제에는 예시 테이블을 함께 붙였습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">총 {recoveryQuestionSet.length}문제</p>
              <p className="mt-1 text-slate-300">현재 조건 {filteredQuestions.length}문제</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-500">연도</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {YEAR_OPTIONS.map((year) => (
                  <FilterChip
                    key={year}
                    active={activeYear === year}
                    label={year === "all" ? "전체 연도" : `${year}년`}
                    onClick={() => {
                      setActiveYear(year);
                      setCurrentIndex(0);
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">회차</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ROUND_OPTIONS.map((round) => (
                  <FilterChip
                    key={round}
                    active={activeRound === round}
                    label={round === "all" ? "전체 회차" : round}
                    onClick={() => {
                      setActiveRound(round);
                      setCurrentIndex(0);
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">언어 / 유형</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {QUESTION_TYPE_OPTIONS.filter((type) => !["descriptive", "concept"].includes(type)).map((type) => (
                  <FilterChip
                    key={type}
                    active={activeType === type}
                    label={formatQuestionTypeLabel(type)}
                    onClick={() => {
                      setActiveType(type);
                      setCurrentIndex(0);
                    }}
                  />
                ))}
              </div>
            </div>
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
          <LoadingCard label="선택한 조건에 맞는 실전 세트가 없습니다." />
        )}

        <div className="card-surface rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold">실전 세트 이동</h3>
              <p className="mt-1 text-sm text-slate-600">연도별 패턴을 빠르게 비교하며 풀 수 있습니다.</p>
            </div>
            {isPending ? <span className="text-xs text-slate-500">결과 저장 중...</span> : null}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {filteredQuestions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                  index === safeIndex
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {question.year} {question.round} · {formatQuestionTypeLabel(question.type)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">구성 원칙</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">공개 후기와 복원 자료에서 반복 확인된 패턴만 가져와 변형했습니다.</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">원문 복사 대신 구조와 핵심 함정을 유지하는 방식으로 재구성했습니다.</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">틀리면 일반 오답노트와 동일하게 저장되어 반복 복습 흐름에 바로 연결됩니다.</p>`r`n            <p className="rounded-2xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-800">각 연도별 SQL, Java, Python, C는 최소 5문항 이상 보이도록 확장했습니다.</p>
          </div>
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
        active ? "bg-violet-700 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">{label}</div>
  );
}



