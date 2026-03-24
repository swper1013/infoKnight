import type { Metadata } from "next";
import { WrongNoteView } from "@/components/wrong-note-view";

export const metadata: Metadata = {
  title: "오답노트 | InfoKnight",
  description: "틀린 문제를 다시 풀고 약점을 보완하는 오답노트",
};

export default function WrongNotePage() {
  return <WrongNoteView />;
}
