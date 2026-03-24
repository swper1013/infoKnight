import type { Metadata } from "next";
import { TodayPlanView } from "@/components/today-plan-view";

export const metadata: Metadata = {
  title: "오늘 공부 | InfoKnight",
  description: "오늘의 120분 학습 계획",
};

export default function TodayPage() {
  return <TodayPlanView />;
}
