"use client";

import { useMemo, useState, useTransition } from "react";
import { QuestionCard } from "@/components/question-card";
import { useStudy } from "@/components/study-provider";
import {
  formatQuestionTypeLabel,
  getDueReviewQuestions,
  questionMatchesWeakTopic,
  QUESTION_TYPE_OPTIONS,
  sortQuestionsForPractice,
} from "@/lib/study";
import type { QuestionTypeFilter, StudyQuestion } from "@/lib/types";

type PracticeMode = "recommended" | "random10" | "wrong-only" | "due-review" | "weak-only";

const PRACTICE_MODES: { id: PracticeMode; title: string; description: string }[] = [
  {
    id: "recommended",
    title: "추천 순서",
    description: "복습 예정과 오답이 많은 문제를 먼저 보여줍니다.",
  },
  {
    id: "random10",
    title: "랜덤 10문제",
    description: "가볍게 한 세트만 빠르게 풀 때 적합합니다.",
  },
  {
    id: "wrong-only",
    title: "오답만",
    description: "틀린 기록이 있는 문제만 다시 풉니다.",
  },
  {
    id: "due-review",
    title: "오늘 복습",
    description: "3일 복습 규칙상 오늘 다시 볼 문제만 모읍니다.",
  },
  {
    id: "weak-only",
    title: "취약 파트",
    description: "취약 주제와 가까운 문제만 모아 풉니다.",
  },
];

export function PracticeView() {
  const { hydrated, questionProgress, questions, markQuestion, stats, wrongQuestions } = useStudy();
  const [activeType, setActiveType] = useState<QuestionTypeFilter>("all");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("recommended");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomSeed, setRandomSeed] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isPending, startTransition] = useTransition();

  const filteredQuestions = useMemo(() => {
    const dueQuestions = getDueReviewQuestions(questions, questionProgress);

    let baseQuestions: StudyQuestion[];

    switch (practiceMode) {
      case "random10":
        baseQuestions = deterministicShuffle(questions, randomSeed).slice(0, 10);
        break;
      case "wrong-only":
        baseQuestions = wrongQuestions;
        break;
      case "due-review":
        baseQuestions = dueQuestions;
        break;
      case "weak-only":
        baseQuestions = questions.filter((question) =>
          questionMatchesWeakTopic(question, stats.weakTopics.slice(0, 2)),
        );
        break;
      default:
        baseQuestions = questions;
        break;
    }

    const byType =
      activeType === "all"
        ? baseQuestions
        : baseQuestions.filter((question) => question.type === activeType);

    if (practiceMode === "random10") {
      return byType;
    }

    return sortQuestionsForPractice(byType, questionProgress, { prioritizeDue: true });
  }, [activeType, practiceMode, questionProgress, questions, randomSeed, stats.weakTopics, wrongQuestions]);

  if (!hydrated) {
    return <LoadingCard label="문제 데이터를 준비하는 중입니다." />;
  }

  const safeIndex =
    filteredQuestions.length === 0
      ? 0
      : Math.min(currentIndex, filteredQuestions.length - 1);
  const currentQuestion = filteredQuestions[safeIndex];
  const currentMode = PRACTICE_MODES.find((mode) => mode.id === practiceMode);

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">풀이 모드 선택</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">문제 풀이</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {currentMode?.description}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
              <p className="font-semibold">
                {filteredQuestions.length}문제 · 현재 {filteredQuestions.length === 0 ? 0 : safeIndex + 1}번
              </p>
              <p className="mt-1 text-slate-300">
                복습 예정 {stats.dueReviewCount}문제 · 누적 오답 {stats.totalWrongCount}회
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {PRACTICE_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setPracticeMode(mode.id);
                  setCurrentIndex(0);
                }}
                className={`rounded-3xl border px-4 py-4 text-left transition ${
                  practiceMode === mode.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white/85 text-slate-700 hover:border-emerald-200"
                }`}
              >
                <p className="text-sm font-semibold">{mode.title}</p>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    practiceMode === mode.id ? "text-slate-200" : "text-slate-500"
                  }`}
                >
                  {mode.description}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
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

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-3xl border border-slate-200 bg-white/70 p-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={autoAdvance}
                onChange={() => setAutoAdvance((value) => !value)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-700"
              />
              정답/오답 체크 후 다음 문제로 자동 이동
            </label>
            {practiceMode === "random10" ? (
              <button
                type="button"
                onClick={() => {
                  setRandomSeed((value) => value + 1);
                  setCurrentIndex(0);
                }}
                className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                랜덤 세트 다시 섞기
              </button>
            ) : null}
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
                if (autoAdvance && safeIndex < filteredQuestions.length - 1) {
                  setCurrentIndex((index) => index + 1);
                }
              })
            }
          />
        ) : (
          <LoadingCard label="선택한 조건에 맞는 문제가 없습니다. 다른 모드나 유형을 선택해 보세요." />
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
                (progress?.wrongCount ?? 0) > 0
                  ? "bg-rose-50 text-rose-700"
                  : progress?.nextReviewAt
                    ? "bg-amber-50 text-amber-700"
                    : "bg-white text-slate-600";

              return (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                    isActive ? "bg-slate-900 text-white" : `${emphasis} hover:bg-slate-50`
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
              답 보기와 해설 보기, 도움말 보기를 분리해 두어서 스스로 먼저 떠올린 뒤 확인하기 좋습니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              틀렸음을 누르면 오답노트에 저장되고, 3일 뒤 다시 보도록 복습 예정 문제가 자동 생성됩니다.
            </p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">
              랜덤 10문제, 오답만, 오늘 복습, 취약 파트 모드를 번갈아 쓰면 반복 학습이 훨씬 효율적입니다.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function deterministicShuffle(items: StudyQuestion[], seed: number) {
  const source = [...items];
  let currentSeed = seed * 7919;

  for (let index = source.length - 1; index > 0; index -= 1) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const targetIndex = currentSeed % (index + 1);
    [source[index], source[targetIndex]] = [source[targetIndex], source[index]];
  }

  return source;
}

function LoadingCard({ label }: { label: string }) {
  return (
    <div className="card-surface rounded-[28px] p-10 text-center text-sm text-slate-600">
      {label}
    </div>
  );
}
