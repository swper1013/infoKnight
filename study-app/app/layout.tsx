import type { Metadata } from "next";
import "./globals.css";
import { AppNavigation } from "@/components/app-navigation";
import { StudyProvider } from "@/components/study-provider";

export const metadata: Metadata = {
  title: "InfoKnight",
  description: "정보처리기사 실기 공부용 MVP 웹앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full text-slate-900">
        <StudyProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
            <header className="mb-6 rounded-[28px] border border-white/70 bg-white/85 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur sm:px-7">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-2">
                  <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                    InfoKnight
                  </span>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      정보처리기사 실기 공부 루틴
                    </h1>
                    <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
                      비전공자 기준으로 오늘 공부할 양을 자동으로 나누고, 문제 풀이와 오답 반복까지 한 번에 관리합니다.
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-[0_10px_24px_rgba(15,23,42,0.16)]">
                  <p className="font-semibold">평일 공부 시간</p>
                  <p className="mt-1 text-slate-300">최대 120분 기준으로 자동 계획</p>
                </div>
              </div>
              <AppNavigation />
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </StudyProvider>
      </body>
    </html>
  );
}
