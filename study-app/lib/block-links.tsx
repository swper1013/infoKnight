import Link from "next/link";
import type { StudyBlock } from "@/lib/types";

export function getBlockHref(block: StudyBlock) {
  switch (block.id) {
    case "concept-review":
      return "/concepts";
    case "practice-basic":
    case "practice-core":
    case "mock-practice":
      return "/practice";
    case "wrong-review":
      return "/wrong-note";
    case "weak-topic":
    case "memory-note":
      return "/concepts";
    default:
      return "/today";
  }
}

export function BlockLink({
  block,
  className,
  children,
}: {
  block: StudyBlock;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={getBlockHref(block)} className={className}>
      {children}
    </Link>
  );
}
