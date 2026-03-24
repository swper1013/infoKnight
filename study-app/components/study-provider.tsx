"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { questions } from "@/lib/questions";
import {
  buildStudyStats,
  DEFAULT_EXAM_DATE,
  defaultWeakTopics,
  formatDateKey,
  getWrongQuestions,
} from "@/lib/study";
import type {
  QuestionProgress,
  StudyContextValue,
  StudyState,
} from "@/lib/types";

const STORAGE_KEY = "infoknight-study-state-v1";

const defaultState: StudyState = {
  examDate: DEFAULT_EXAM_DATE,
  planCompletionByDate: {},
  questionProgress: {},
  attemptLog: [],
};

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudyState>(() => {
    if (typeof window === "undefined") {
      return defaultState;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultState;
    }

    try {
      return mergeState(JSON.parse(stored) as Partial<StudyState>);
    } catch {
      return defaultState;
    }
  });
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const persistState = useEffectEvent((nextState: StudyState) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  });

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    persistState(state);
  }, [hydrated, state]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        setState(mergeState(JSON.parse(event.newValue) as Partial<StudyState>));
      } catch {
        setState(defaultState);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo<StudyContextValue>(() => {
    const stats = buildStudyStats(state, questions);
    const todayKey = formatDateKey(new Date());

    return {
      hydrated,
      examDate: state.examDate,
      questions,
      questionProgress: state.questionProgress,
      completedBlockIds: state.planCompletionByDate[todayKey] ?? [],
      wrongQuestions: getWrongQuestions(questions, state.questionProgress),
      stats: {
        ...stats,
        weakTopics:
          stats.weakTopics.length > 0 ? stats.weakTopics : defaultWeakTopics,
      },
      togglePlanBlock: (dateKey, blockId) => {
        setState((current) => {
          const completed = current.planCompletionByDate[dateKey] ?? [];
          const nextCompleted = completed.includes(blockId)
            ? completed.filter((id) => id !== blockId)
            : [...completed, blockId];

          return {
            ...current,
            planCompletionByDate: {
              ...current.planCompletionByDate,
              [dateKey]: nextCompleted,
            },
          };
        });
      },
      markQuestion: (questionId, result) => {
        setState((current) => {
          const currentProgress =
            current.questionProgress[questionId] ?? createEmptyProgress();
          const now = new Date();
          const nextReviewAt =
            result === "wrong"
              ? addDays(now, 3).toISOString()
              : currentProgress.wrongCount > 0
                ? null
                : currentProgress.nextReviewAt;

          const nextProgress: QuestionProgress = {
            correctCount:
              result === "correct"
                ? currentProgress.correctCount + 1
                : currentProgress.correctCount,
            wrongCount:
              result === "wrong"
                ? currentProgress.wrongCount + 1
                : currentProgress.wrongCount,
            lastResult: result,
            lastSolvedAt: now.toISOString(),
            nextReviewAt,
          };

          return {
            ...current,
            questionProgress: {
              ...current.questionProgress,
              [questionId]: nextProgress,
            },
            attemptLog: [
              ...current.attemptLog,
              { questionId, result, solvedAt: now.toISOString() },
            ],
          };
        });
      },
      setExamDate: (examDate) => {
        setState((current) => ({
          ...current,
          examDate: examDate || DEFAULT_EXAM_DATE,
        }));
      },
    };
  }, [hydrated, state]);

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
}

export function useStudy() {
  const context = useContext(StudyContext);

  if (!context) {
    throw new Error("useStudy must be used within StudyProvider.");
  }

  return context;
}

function createEmptyProgress(): QuestionProgress {
  return {
    correctCount: 0,
    wrongCount: 0,
    lastResult: null,
    lastSolvedAt: null,
    nextReviewAt: null,
  };
}

function mergeState(input: Partial<StudyState>): StudyState {
  const nextQuestionProgress = Object.fromEntries(
    Object.entries(input.questionProgress ?? {}).map(([questionId, progress]) => [
      questionId,
      {
        correctCount: progress.correctCount ?? 0,
        wrongCount: progress.wrongCount ?? 0,
        lastResult: progress.lastResult ?? null,
        lastSolvedAt: progress.lastSolvedAt ?? null,
        nextReviewAt: progress.nextReviewAt ?? null,
      },
    ]),
  );

  return {
    examDate: input.examDate ?? DEFAULT_EXAM_DATE,
    planCompletionByDate: input.planCompletionByDate ?? {},
    questionProgress: nextQuestionProgress,
    attemptLog: input.attemptLog ?? [],
  };
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

