import type { Metadata } from "next";
import { ConceptsView } from "@/components/concepts-view";

export const metadata: Metadata = {
  title: "개념 복습 | InfoKnight",
  description: "정보처리기사 실기 핵심 개념 복습 노트",
};

export default function ConceptsPage() {
  return <ConceptsView />;
}
