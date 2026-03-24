export type QuestionType = "sql" | "java" | "descriptive" | "concept";
export type QuestionTypeFilter = QuestionType | "all";
export type Difficulty = "입문" | "기본" | "실전";
export type StudyStage = "early" | "middle" | "final";
export type StudyResult = "correct" | "wrong";

export interface StudyQuestion {
  id: string;
  type: QuestionType;
  topic: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: Difficulty;
  sourceNote: string;
}

export interface StudyLink {
  label: string;
  url: string;
}

export interface StudyNote {
  title: string;
  subtitle: string;
  summary: string;
  bullets: string[];
  examTip: string;
}

export interface QuestionResource {
  conceptSummary: string;
  studyNote: StudyNote;
  links: StudyLink[];
}

export interface StudyBlock {
  id: string;
  title: string;
  minutes: number;
  description: string;
}

export interface QuestionProgress {
  correctCount: number;
  wrongCount: number;
  lastResult: StudyResult | null;
  lastSolvedAt: string | null;
}

export interface AttemptLogItem {
  questionId: string;
  result: StudyResult;
  solvedAt: string;
}

export interface StudyState {
  examDate: string;
  planCompletionByDate: Record<string, string[]>;
  questionProgress: Record<string, QuestionProgress>;
  attemptLog: AttemptLogItem[];
}

export interface StudyStats {
  stage: StudyStage;
  dDayLabel: string;
  daysLeft: number;
  dailyMinutes: number;
  totalSolvedCount: number;
  totalWrongCount: number;
  weakTopics: string[];
  wrongQuestions: StudyQuestion[];
  todayPlan: StudyBlock[];
  todaySummary: string;
  questionTypeCounts: Record<QuestionType, number>;
}

export interface StudyContextValue {
  hydrated: boolean;
  questions: StudyQuestion[];
  questionProgress: Record<string, QuestionProgress>;
  completedBlockIds: string[];
  wrongQuestions: StudyQuestion[];
  stats: StudyStats;
  togglePlanBlock: (dateKey: string, blockId: string) => void;
  markQuestion: (questionId: string, result: StudyResult) => void;
  setExamDate: (examDate: string) => void;
}
