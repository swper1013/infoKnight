import questionsData from "@/data/questions.json";
import { extraQuestions } from "@/lib/extra-questions";
import type { StudyQuestion } from "@/lib/types";

export const questions = [...(questionsData as StudyQuestion[]), ...extraQuestions];
