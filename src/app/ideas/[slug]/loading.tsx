export default function IdeaLoading() {
  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="w-24 h-4 rounded bg-[var(--bg-elevated)] animate-pulse" />
          </div>
        </div>
      </header>

      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl p-8 md:p-12 animate-pulse">
            <div className="mb-12 space-y-4">
              <div className="h-4 w-20 rounded bg-[var(--bg-elevated)]" />
              <div className="h-10 w-3/4 rounded bg-[var(--bg-elevated)]" />
              <div className="h-10 w-1/2 rounded bg-[var(--bg-elevated)]" />
              <div className="flex gap-6 mt-4">
                <div className="h-4 w-28 rounded bg-[var(--bg-elevated)]" />
                <div className="h-4 w-20 rounded bg-[var(--bg-elevated)]" />
              </div>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-4 rounded bg-[var(--bg-elevated)]"
                  style={{ width: `${70 + Math.random() * 30}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
