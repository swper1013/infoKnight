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
import questionsData from "@/data/questions.json";
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
  StudyQuestion,
} from "@/lib/types";

const STORAGE_KEY = "infoknight-study-state-v1";

const defaultState: StudyState = {
  examDate: DEFAULT_EXAM_DATE,
  planCompletionByDate: {},
  questionProgress: {},
  attemptLog: [],
};

const StudyContext = createContext<StudyContextValue | null>(null);
const questions = questionsData as StudyQuestion[];

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
          const now = new Date().toISOString();

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
            lastSolvedAt: now,
          };

          return {
            ...current,
            questionProgress: {
              ...current.questionProgress,
              [questionId]: nextProgress,
            },
            attemptLog: [
              ...current.attemptLog,
              { questionId, result, solvedAt: now },
            ],
          };
        });
      },
      setExamDate: (examDate) => {
        setState((current) => ({
          ...current,
          examDate,
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
  };
}

function mergeState(input: Partial<StudyState>): StudyState {
  return {
    examDate: input.examDate ?? DEFAULT_EXAM_DATE,
    planCompletionByDate: input.planCompletionByDate ?? {},
    questionProgress: input.questionProgress ?? {},
    attemptLog: input.attemptLog ?? [],
  };
}
