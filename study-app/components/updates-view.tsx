import Link from "next/link";
import { appVersion, changelogEntries } from "@/lib/app-meta";

export function UpdatesView() {
  const latest = changelogEntries[0];

  return (
    <div className="page-grid">
      <section className="space-y-4">
        <div className="card-surface rounded-[28px] p-6 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">버전 기록</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">업데이트 로그 {appVersion}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                커밋 후 push할 때마다 버전을 0.01씩 올려서 변경 사항을 남길 수 있게 만든 로그 화면입니다.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              대시보드로 돌아가기
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {changelogEntries.map((entry) => (
            <article key={entry.version} className="card-surface rounded-[28px] p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {entry.version}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{entry.summary}</h3>
                </div>
                {entry.version === latest.version ? (
                  <span className="rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                    최신 버전
                  </span>
                ) : null}
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                {entry.changes.map((change: string) => (
                  <li key={change} className="rounded-2xl bg-white/80 px-4 py-3">
                    {change}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="card-surface rounded-[28px] p-6">
          <h3 className="text-lg font-bold">사용 규칙</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-white/75 px-4 py-3">다음 배포부터는 수정 후 버전을 `0.01`씩 올려 주세요. 예: `v0.12`, `v0.13`</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">버전은 `data/changelog.json`의 `currentVersion`과 첫 번째 entry를 함께 수정하면 됩니다.</p>
            <p className="rounded-2xl bg-white/75 px-4 py-3">짧게 무엇이 바뀌었는지만 적어도 나중에 배포 이력을 추적하기 쉽습니다.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
