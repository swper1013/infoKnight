import type {
  Difficulty,
  QuestionProgress,
  QuestionType,
  QuestionTypeFilter,
  StudyBlock,
  StudyQuestion,
  StudyStage,
  StudyState,
} from "@/lib/types";

export const DEFAULT_EXAM_DATE = "2026-04-17";
export const DAILY_STUDY_MINUTES = 120;
export const QUESTION_TYPE_OPTIONS: QuestionTypeFilter[] = [
  "all",
  "sql",
  "java",
  "python",
  "c",
  "descriptive",
  "concept",
];

export const defaultWeakTopics = ["SQL/데이터베이스", "Java 기초", "Python 기초"];

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateLabel(value: string) {
  const date = new Date(`${value}T00:00:00`);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateTimeLabel(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getDaysLeft(examDate: string, currentDate: Date) {
  const startOfToday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const target = new Date(`${examDate}T00:00:00`);
  const diff = target.getTime() - startOfToday.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDDayLabel(daysLeft: number) {
  if (daysLeft > 0) {
    return `D-${daysLeft}`;
  }

  if (daysLeft === 0) {
    return "D-Day";
  }

  return `D+${Math.abs(daysLeft)}`;
}

export function getStudyStage(daysLeft: number): StudyStage {
  if (daysLeft > 56) {
    return "early";
  }

  if (daysLeft > 21) {
    return "middle";
  }

  return "final";
}

export function formatStageLabel(stage: StudyStage) {
  const map: Record<StudyStage, string> = {
    early: "초반",
    middle: "중반",
    final: "막판",
  };

  return map[stage];
}

export function formatQuestionTypeLabel(type: string) {
  const map: Record<string, string> = {
    all: "전체",
    sql: "SQL",
    java: "Java",
    python: "Python",
    c: "C",
    descriptive: "서술형",
    concept: "개념",
  };

  return map[type] ?? type;
}

export function formatDifficultyLabel(difficulty: Difficulty) {
  return difficulty;
}

export function getWrongQuestions(
  questions: StudyQuestion[],
  questionProgress: Record<string, QuestionProgress>,
) {
  return questions.filter(
    (question) => (questionProgress[question.id]?.wrongCount ?? 0) > 0,
  );
}

export function isQuestionDueForReview(
  progress?: QuestionProgress,
  now: Date = new Date(),
) {
  if (!progress?.nextReviewAt) {
    return false;
  }

  return new Date(progress.nextReviewAt).getTime() <= now.getTime();
}

export function getDueReviewQuestions(
  questions: StudyQuestion[],
  questionProgress: Record<string, QuestionProgress>,
  now: Date = new Date(),
) {
  return questions.filter((question) =>
    isQuestionDueForReview(questionProgress[question.id], now),
  );
}

export function getWeakTopics(
  questions: StudyQuestion[],
  questionProgress: Record<string, QuestionProgress>,
) {
  const topicScores = new Map<string, number>();

  questions.forEach((question) => {
    const progress = questionProgress[question.id];
    const wrongCount = progress?.wrongCount ?? 0;
    const dueBonus = isQuestionDueForReview(progress) ? 2 : 0;

    if (wrongCount > 0 || dueBonus > 0) {
      topicScores.set(
        question.topic,
        (topicScores.get(question.topic) ?? 0) + wrongCount + dueBonus,
      );
    }
  });

  const ranked = [...topicScores.entries()]
    .sort((left, right) => right[1] - left[1])
    .map(([topic]) => topic);

  return ranked.length > 0 ? ranked : defaultWeakTopics;
}

export function questionMatchesWeakTopic(
  question: StudyQuestion,
  weakTopics: string[],
) {
  const topic = normalizeText(question.topic);

  return weakTopics.some((weakTopic) => {
    const weak = normalizeText(weakTopic);

    if (topic.includes(weak) || weak.includes(topic)) {
      return true;
    }

    if (weak.includes("sql") || weak.includes("데이터베이스")) {
      return question.type === "sql";
    }

    if (weak.includes("java")) {
      return question.type === "java";
    }

    if (weak.includes("python") || weak.includes("파이썬")) {
      return question.type === "python";
    }

    if (weak === "c" || weak.includes("c언어") || weak.includes("포인터") || weak.includes("구조체")) {
      return question.type === "c";
    }

    if (
      weak.includes("응집") ||
      weak.includes("결합") ||
      weak.includes("테스트") ||
      weak.includes("보안") ||
      weak.includes("네트워크")
    ) {
      return question.type === "descriptive" || question.type === "concept";
    }

    return false;
  });
}

export function generateTodayPlan({
  stage,
  weakTopic,
  wrongQuestionCount,
  totalWrongCount,
  dueReviewCount,
}: {
  stage: StudyStage;
  weakTopic: string;
  wrongQuestionCount: number;
  totalWrongCount: number;
  dueReviewCount: number;
}) {
  const heavyWrongReview =
    wrongQuestionCount >= 4 || totalWrongCount >= 6 || dueReviewCount >= 2;

  const dueReviewDescription =
    dueReviewCount > 0
      ? `복습 예정 ${dueReviewCount}문제를 우선 반영합니다.`
      : "최근 틀린 문제를 다시 풀며 약점을 바로 메웁니다.";

  const plans: Record<StudyStage, StudyBlock[]> = {
    early: [
      {
        id: "concept-review",
        title: "개념 복습",
        minutes: heavyWrongReview ? 35 : 40,
        description: `${weakTopic} 포함 핵심 이론을 짧게 정리합니다.`,
      },
      {
        id: "practice-basic",
        title: "문제 풀이",
        minutes: 35,
        description: "기본 난이도 문제를 먼저 풀며 유형에 익숙해집니다.",
      },
      {
        id: "wrong-review",
        title: heavyWrongReview ? "오답 복습" : "기출 유형 복습",
        minutes: heavyWrongReview ? 30 : 25,
        description: heavyWrongReview ? dueReviewDescription : "반복 출제 개념을 짧게 확인합니다.",
      },
      {
        id: "memory-note",
        title: "암기 정리",
        minutes: 20,
        description: "정규화, 테스트, 네트워크 핵심 키워드를 암기합니다.",
      },
    ],
    middle: [
      {
        id: "concept-review",
        title: "개념 복습",
        minutes: heavyWrongReview ? 20 : 25,
        description: `${weakTopic} 관련 개념과 헷갈리는 용어를 먼저 정리합니다.`,
      },
      {
        id: "practice-core",
        title: "문제 풀이",
        minutes: 45,
        description: "SQL, Java, Python, C, 개념 문제를 섞어 실전 감각을 올립니다.",
      },
      {
        id: "wrong-review",
        title: "오답 복습",
        minutes: heavyWrongReview ? 35 : 30,
        description:
          dueReviewCount > 0
            ? `복습 예정 ${dueReviewCount}문제를 먼저 다시 풉니다.`
            : "틀렸던 문제를 다시 풀고 해설에서 키워드만 다시 적어봅니다.",
      },
      {
        id: "memory-note",
        title: "암기 정리",
        minutes: 20,
        description: "서술형 정의와 핵심 공식, 용어를 압축 복습합니다.",
      },
    ],
    final: [
      {
        id: "mock-practice",
        title: "실전형 문제 풀이",
        minutes: 40,
        description: "시간을 재고 연속으로 풀면서 실전 리듬을 맞춥니다.",
      },
      {
        id: "wrong-review",
        title: "오답 복습",
        minutes: heavyWrongReview ? 40 : 35,
        description:
          dueReviewCount > 0
            ? `오늘 다시 볼 ${dueReviewCount}문제를 최우선으로 복습합니다.`
            : "오답노트 최상단 문제부터 다시 풀며 약점을 줄입니다.",
      },
      {
        id: "weak-topic",
        title: "취약 파트 보강",
        minutes: heavyWrongReview ? 25 : 30,
        description: `${weakTopic} 중심으로 자주 헷갈리는 문제를 묶어 복습합니다.`,
      },
      {
        id: "memory-note",
        title: "암기 정리",
        minutes: 15,
        description: "시험장 직전처럼 핵심 키워드만 빠르게 확인합니다.",
      },
    ],
  };

  return plans[stage];
}

export function buildStudyStats(state: StudyState, questions: StudyQuestion[]) {
  const daysLeft = getDaysLeft(state.examDate, new Date());
  const stage = getStudyStage(daysLeft);
  const weakTopics = getWeakTopics(questions, state.questionProgress);
  const wrongQuestions = getWrongQuestions(questions, state.questionProgress);
  const dueReviewCount = getDueReviewQuestions(questions, state.questionProgress).length;
  const totalSolvedCount = state.attemptLog.length;
  const totalWrongCount = state.attemptLog.filter(
    (attempt) => attempt.result === "wrong",
  ).length;
  const todayPlan = generateTodayPlan({
    stage,
    weakTopic: weakTopics[0],
    wrongQuestionCount: wrongQuestions.length,
    totalWrongCount,
    dueReviewCount,
  });

  return {
    stage,
    dDayLabel: formatDDayLabel(daysLeft),
    daysLeft,
    dailyMinutes: DAILY_STUDY_MINUTES,
    totalSolvedCount,
    totalWrongCount,
    dueReviewCount,
    weakTopics,
    wrongQuestions,
    todayPlan,
    todaySummary: buildTodaySummary({
      daysLeft,
      stage,
      weakTopic: weakTopics[0],
      wrongQuestionCount: wrongQuestions.length,
      dueReviewCount,
    }),
    questionTypeCounts: countQuestionTypes(questions),
  };
}

export function sortQuestionsForPractice(
  questions: StudyQuestion[],
  questionProgress: Record<string, QuestionProgress>,
  options?: { prioritizeDue?: boolean },
) {
  return [...questions].sort((left, right) => {
    const leftProgress = questionProgress[left.id];
    const rightProgress = questionProgress[right.id];
    const leftDue = options?.prioritizeDue && isQuestionDueForReview(leftProgress) ? 1 : 0;
    const rightDue = options?.prioritizeDue && isQuestionDueForReview(rightProgress) ? 1 : 0;

    if (rightDue !== leftDue) {
      return rightDue - leftDue;
    }

    const leftWrong = leftProgress?.wrongCount ?? 0;
    const rightWrong = rightProgress?.wrongCount ?? 0;

    if (rightWrong !== leftWrong) {
      return rightWrong - leftWrong;
    }

    const leftSolved = (leftProgress?.correctCount ?? 0) + leftWrong;
    const rightSolved = (rightProgress?.correctCount ?? 0) + rightWrong;

    if (leftSolved === 0 && rightSolved > 0) {
      return -1;
    }

    if (rightSolved === 0 && leftSolved > 0) {
      return 1;
    }

    const leftNext = leftProgress?.nextReviewAt ?? "9999-12-31T00:00:00.000Z";
    const rightNext = rightProgress?.nextReviewAt ?? "9999-12-31T00:00:00.000Z";

    if (leftNext !== rightNext) {
      return leftNext.localeCompare(rightNext);
    }

    return left.id.localeCompare(right.id);
  });
}

function buildTodaySummary({
  daysLeft,
  stage,
  weakTopic,
  wrongQuestionCount,
  dueReviewCount,
}: {
  daysLeft: number;
  stage: StudyStage;
  weakTopic: string;
  wrongQuestionCount: number;
  dueReviewCount: number;
}) {
  const stageLabel = formatStageLabel(stage);

  if (dueReviewCount > 0) {
    return `${stageLabel} 구간이며 시험까지 ${Math.max(daysLeft, 0)}일 남았습니다. 오늘 다시 볼 복습 예정 ${dueReviewCount}문제를 우선 배치하고 ${weakTopic} 보강을 함께 넣었습니다.`;
  }

  const wrongMessage =
    wrongQuestionCount > 0
      ? `오답 ${wrongQuestionCount}문제를 고려해 ${weakTopic} 복습 비중을 높였습니다.`
      : `${weakTopic}부터 시작하는 기본 루틴으로 구성했습니다.`;

  return `${stageLabel} 구간이며 시험까지 ${Math.max(daysLeft, 0)}일 남았습니다. ${wrongMessage}`;
}

function countQuestionTypes(questions: StudyQuestion[]) {
  return questions.reduce<Record<QuestionType, number>>(
    (accumulator, question) => {
      accumulator[question.type] += 1;
      return accumulator;
    },
    {
      sql: 0,
      java: 0,
      python: 0,
      c: 0,
      descriptive: 0,
      concept: 0,
    },
  );
}

function normalizeText(value: string) {
  return value.replace(/[\s/]/g, "").toLowerCase();
}
