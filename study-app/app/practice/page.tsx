import type { Metadata } from "next";
import { PracticeView } from "@/components/practice-view";

export const metadata: Metadata = {
  title: "문제 풀이 | InfoKnight",
  description: "SQL, Java, 서술형, 개념 문제 풀이",
};

export default function PracticePage() {
  return <PracticeView />;
}
