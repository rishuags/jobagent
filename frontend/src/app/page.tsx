export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6">
        <nav className="flex items-center justify-between py-6">
          <div className="text-lg font-semibold tracking-tight">
            JobAgent
          </div>

          <button className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--brand)] hover:text-white">
            Analyze career
          </button>
        </nav>

        <div className="flex flex-1 items-center">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--muted)]">
              AI-powered career intelligence
            </div>

            <h1 className="text-5xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Know where you stand.
              <br />
              <span className="text-[var(--brand-light)]">
                Know what the market wants.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Upload your resume, compare your skills against live job market
              demand, and get a personalized roadmap for what to learn next.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-xl bg-[var(--brand)] px-6 py-3 font-medium text-white transition hover:bg-[var(--brand-light)]">
                Analyze my career
              </button>

              <button className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-elevated)]">
                See how it works
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
              <span>Live job market data</span>
              <span>Resume skill analysis</span>
              <span>Personalized roadmap</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}