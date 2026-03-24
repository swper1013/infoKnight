import questionsData from "@/data/questions.json";
import { recoveryQuestions } from "@/data/recovery-questions";
import { extraQuestions } from "@/lib/extra-questions";
import type { StudyQuestion } from "@/lib/types";

export const questions = [
  ...(questionsData as StudyQuestion[]),
  ...extraQuestions,
  ...recoveryQuestions,
];

export const recoveryQuestionSet = questions.filter(
  (question) => question.examTrack === "recovery",
);
