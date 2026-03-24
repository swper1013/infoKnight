"use client";

import { useMemo, useState } from "react";
import type { QuestionProgress, StudyQuestion, StudyResult } from "@/lib/types";
import { getQuestionResource } from "@/lib/question-resources";
import {
  formatDateTimeLabel,
  formatDifficultyLabel,
  formatQuestionTypeLabel,
} from "@/lib/study";

export function QuestionCard({
  question,
  progress,
  onMark,
}: {
  question: StudyQuestion;
  progress?: QuestionProgress;
  onMark: (result: StudyResult) => void;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHelpNote, setShowHelpNote] = useState(false);

  const stats = useMemo(() => {
    if (!progress) {
      return {
        correctCount: 0,
        wrongCount: 0,
        lastSolvedAt: null,
      };
    }

    return progress;
  }, [progress]);
  const resource = useMemo(() => getQuestionResource(question), [question]);

  return (
    <article className="card-surface rounded-[32px] p-6 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
        <div className="flex flex-wrap gap-2">
          <MetaBadge label={formatQuestionTypeLabel(question.type)} />
          <MetaBadge label={question.topic} />
          <MetaBadge label={formatDifficultyLabel(question.difficulty)} />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">문제 {question.id}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {question.sourceNote}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100">
            <p>정답 {stats.correctCount}회</p>
            <p className="mt-1 text-slate-300">오답 {stats.wrongCount}회</p>
            {stats.lastSolvedAt ? (
              <p className="mt-1 text-xs text-slate-400">
                최근 풀이 {formatDateTimeLabel(stats.lastSolvedAt)}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] bg-white/80 p-5">
        <p className="whitespace-pre-wrap text-base leading-8 text-slate-800">
          {question.question}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setShowAnswer((value) => !value)}
          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {showAnswer ? "답 숨기기" : "답 보기"}
        </button>
        <button
          type="button"
          onClick={() => setShowExplanation((value) => !value)}
          className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          {showExplanation ? "해설 숨기기" : "해설 보기"}
        </button>
        <button
          type="button"
          onClick={() => setShowHelpNote((value) => !value)}
          className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-900 transition hover:border-sky-300 hover:bg-sky-100"
        >
          {showHelpNote ? "도움말 숨기기" : "도움말 보기"}
        </button>
      </div>

      {showAnswer ? (
        <div className="mt-4 rounded-[28px] border border-emerald-100 bg-emerald-50/75 p-5">
          <p className="text-sm font-semibold text-emerald-800">정답</p>
          <p className="mt-2 whitespace-pre-wrap font-mono text-sm leading-7 text-emerald-950">
            {question.answer}
          </p>
        </div>
      ) : null}

      {showExplanation ? (
        <div className="mt-4 rounded-[28px] border border-amber-100 bg-amber-50/80 p-5">
          <p className="text-sm font-semibold text-amber-800">해설</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {question.explanation}
          </p>
        </div>
      ) : null}

      {showHelpNote ? (
        <div className="mt-4 rounded-[28px] border border-slate-200 bg-white/90 p-5 sm:p-6">
          <p className="text-sm font-semibold text-emerald-700">빠른 도움말</p>
          <h4 className="mt-2 text-2xl font-bold tracking-tight">{resource.studyNote.title}</h4>
          <p className="mt-2 text-sm font-semibold text-slate-500">{resource.studyNote.subtitle}</p>
          <p className="mt-4 text-sm leading-8 text-slate-700 sm:text-base">
            {resource.studyNote.summary}
          </p>

          <div className="mt-5 space-y-3">
            {resource.studyNote.bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-3xl border border-slate-200/80 bg-slate-50/70 px-5 py-4"
              >
                <p className="text-sm leading-8 text-slate-700 sm:text-base">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[24px] border border-amber-100 bg-amber-50/80 px-5 py-4">
            <p className="text-sm font-semibold text-amber-800">시험장 팁</p>
            <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
              {resource.studyNote.examTip}
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 rounded-[28px] border border-sky-100 bg-sky-50/80 p-5">
        <p className="text-sm font-semibold text-sky-800">관련 개념 정리</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
          {resource.conceptSummary}
        </p>
      </div>

      <div className="mt-4 rounded-[28px] border border-slate-200 bg-white/90 p-5">
        <p className="text-sm font-semibold text-slate-800">공식 / 학습 링크</p>
        <div className="mt-3 flex flex-col gap-2">
          {resource.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onMark("correct")}
          className="rounded-[24px] bg-emerald-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          맞았음
        </button>
        <button
          type="button"
          onClick={() => onMark("wrong")}
          className="rounded-[24px] bg-rose-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          틀렸음
        </button>
      </div>
    </article>
  );
}

function MetaBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 sm:text-sm">
      {label}
    </span>
  );
}
