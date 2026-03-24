import type { Metadata } from "next";
import { RecoveryPracticeView } from "@/components/recovery-practice-view";

export const metadata: Metadata = {
  title: "실전 풀이 | InfoKnight",
  description: "2020~2025 공개 복원 경향 기반 Java, Python, SQL 실전 세트",
};

export default function RecoveryPracticePage() {
  return <RecoveryPracticeView />;
}
