export default function IdeasLoading() {
  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="w-16 h-4 rounded bg-[var(--bg-elevated)] animate-pulse" />
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-12 w-48 rounded bg-[var(--bg-elevated)] animate-pulse mb-4" />
            <div className="h-6 w-96 max-w-full rounded bg-[var(--bg-elevated)] animate-pulse" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-6 animate-pulse"
              >
                <div className="pl-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="h-4 w-16 rounded bg-[var(--bg-elevated)]" />
                    <div className="h-4 w-20 rounded bg-[var(--bg-elevated)]" />
                  </div>
                  <div className="h-6 w-3/4 rounded bg-[var(--bg-elevated)]" />
                  <div className="h-4 w-full rounded bg-[var(--bg-elevated)]" />
                  <div className="h-4 w-24 rounded bg-[var(--bg-elevated)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
