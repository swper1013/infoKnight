"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/today", label: "오늘 공부" },
  { href: "/practice", label: "문제 풀이" },
  { href: "/wrong-note", label: "오답노트" },
];

export function AppNavigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "bg-slate-900 text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
                : "bg-white/75 text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
