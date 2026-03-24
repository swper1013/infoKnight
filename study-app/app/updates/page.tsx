import type { Metadata } from "next";
import { UpdatesView } from "@/components/updates-view";

export const metadata: Metadata = {
  title: "업데이트 로그 | InfoKnight",
  description: "버전별 수정 사항 로그",
};

export default function UpdatesPage() {
  return <UpdatesView />;
}
