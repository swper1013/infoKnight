import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard-view";

export const metadata: Metadata = {
  title: "대시보드 | InfoKnight",
  description: "정보처리기사 실기 D-day 기반 학습 대시보드",
};

export default function DashboardPage() {
  return <DashboardView />;
}
