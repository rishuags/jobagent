export default function Home() {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col border-2 border-[var(--border)] bg-[var(--background)] shadow-[6px_6px_0_var(--border)]">
        {/* Top navigation */}
        <header className="grid border-b-2 border-[var(--border)] lg:grid-cols-[1.2fr_1fr_auto]">
          <div className="flex items-center gap-5 px-6 py-5">
            <div className="font-pixel text-xl leading-none tracking-[-0.08em] sm:text-2xl">
              JOBAGENT
            </div>

            <div className="font-system text-xl font-bold">»</div>

            <div className="font-system hidden text-[11px] uppercase leading-5 tracking-[0.12em] sm:block">
              Career Intelligence System
              <br />
              v0.1
            </div>
          </div>

          <nav className="font-pixel flex items-center justify-center gap-3 border-t-2 border-[var(--border)] px-4 py-4 text-[9px] lg:border-l-2 lg:border-t-0">
            <a
              href="/"
              className="border-2 border-[var(--border)] bg-[var(--brand)] px-5 py-3 text-white"
            >
              HOME
            </a>

            <span>/</span>

            <a
              href="/analyze"
              className="px-3 py-3 transition hover:text-[var(--brand)]"
            >
              ANALYZE
            </a>

            <span>/</span>

            <a
              href="#about"
              className="px-3 py-3 transition hover:text-[var(--brand)]"
            >
              ABOUT
            </a>

            <span>/</span>
          </nav>

          <div className="font-system hidden items-center gap-5 border-l-2 border-[var(--border)] px-6 py-4 text-[10px] uppercase leading-4 tracking-[0.1em] xl:flex">
            <div className="h-10 border-l-2 border-dotted border-[var(--border)]" />

            <div>
              Press Start
              <br />
              For A Brighter
              <br />
              Career
            </div>

            <div className="flex h-10 w-14 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] font-pixel text-sm">
              + •
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="grid flex-1 items-center gap-14 px-8 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
          {/* Left */}
          <div className="relative pl-4 sm:pl-8">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-[var(--border)]" />

            <div className="font-system mb-6 text-[11px] uppercase tracking-[0.14em]">
              /// Real data. Real insights. A brighter you.
            </div>

            <h1 className="font-pixel max-w-4xl text-[clamp(1.8rem,3.2vw,3.7rem)] leading-[1.15] tracking-[-0.04em]">
              <span className="block">
                KNOW WHERE
                <br />
                YOU STAND.
              </span>

              <span className="mt-2 block text-[var(--brand)]">
                KNOW WHAT
                <br />
                THE MARKET WANTS.
              </span>
            </h1>

            <p className="font-system mt-7 max-w-2xl text-[15px] leading-7 tracking-[0.02em]">
              Upload your resume, compare your skills against live job market
              demand, and get a personalized roadmap for what to learn next.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/analyze"
                className="font-pixel inline-flex items-center justify-center border-2 border-[var(--border)] bg-[var(--brand)] px-7 py-5 text-[10px] text-white shadow-[5px_5px_0_var(--border)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--border)]"
              >
                ▶ START ANALYSIS
              </a>

              <a
                href="#about"
                className="font-pixel inline-flex items-center justify-center border-2 border-[var(--border)] bg-[var(--background)] px-7 py-5 text-[10px] shadow-[5px_5px_0_var(--border)] transition hover:bg-[var(--surface)]"
              >
                SEE HOW IT WORKS
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl gap-7 sm:grid-cols-3">
              <FeatureItem symbol="▤" label="Live job" sublabel="market data" />
              <FeatureItem symbol="▥" label="Resume skill" sublabel="analysis" />
              <FeatureItem
                symbol="◇"
                label="Personalized"
                sublabel="roadmap"
              />
            </div>
          </div>

          {/* Handheld */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[430px] rounded-[34px] border-2 border-[var(--border)] bg-[#d8d3c7] p-6 shadow-[9px_9px_0_var(--border)]">
              {/* top seam */}
              <div className="absolute left-8 right-8 top-3 h-px bg-[var(--border)] opacity-40" />

              {/* screen bezel */}
              <div className="rounded-[8px] border-2 border-[var(--border)] bg-[#2d343d] p-4 shadow-inner">
                {/* LCD */}
                <div className="border-2 border-[var(--border)] bg-[var(--screen)] p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-pixel text-[11px]">JOBAGENT OS</div>

                    <div className="font-system text-[10px] uppercase">
                      ▂▅▇ ▣
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      "Career Scan",
                      "Market Data",
                      "Skill Analysis",
                      "Learning Roadmap",
                      "Job Matches",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className={`font-pixel flex items-center gap-3 px-3 py-3 text-[10px] ${index === 0
                          ? "bg-[var(--foreground)] text-[var(--screen)]"
                          : "text-[var(--foreground)]"
                          }`}
                      >
                        <span>{index === 0 ? "▶" : ""}</span>
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t-2 border-dotted border-[var(--foreground)]/40 pt-4">
                    <div className="flex items-end justify-between gap-4">
                      <div className="font-pixel text-[9px] leading-5">
                        YOUR NEXT LEVEL
                        <br />
                        STARTS HERE.
                      </div>

                      <div className="relative h-14 w-14">
                        <div className="absolute left-2 top-3 h-8 w-10 border-2 border-[var(--foreground)]" />
                        <div className="absolute left-[13px] top-[17px] h-1.5 w-1.5 bg-[var(--foreground)]" />
                        <div className="absolute right-[13px] top-[17px] h-1.5 w-1.5 bg-[var(--foreground)]" />
                        <div className="absolute left-[18px] top-[28px] h-1 w-4 bg-[var(--foreground)]" />
                        <div className="absolute left-[25px] top-0 h-3 w-1.5 bg-[var(--foreground)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* controls */}
              <div className="mt-7 grid grid-cols-[1fr_1.2fr] items-center gap-6">
                {/* d-pad */}
                <div className="flex justify-center">
                  <div className="relative h-24 w-24">
                    <div className="absolute left-8 top-0 h-24 w-8 border-2 border-[var(--border)] bg-[#3a4149]" />
                    <div className="absolute left-0 top-8 h-8 w-24 border-2 border-[var(--border)] bg-[#3a4149]" />
                    <div className="absolute left-[38px] top-[38px] h-5 w-5 bg-[#2a3036]" />
                  </div>
                </div>

                {/* A/B */}
                <div className="flex items-center justify-center gap-6">
                  <ConsoleButton label="B" />
                  <ConsoleButton label="A" />
                </div>
              </div>

              {/* select/start + speaker */}
              <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-6">
                <div className="flex justify-center gap-4">
                  <SmallButton label="SELECT" />
                  <SmallButton label="START" />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span
                      key={index}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--border)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom status strip */}
        <footer className="grid gap-4 border-t-2 border-[var(--border)] px-5 py-4 md:grid-cols-3">
          <StatusItem label="Resume Parser" status="Ready" active />
          <StatusItem label="Market Feed" status="Live" active />
          <StatusItem label="Career Roadmap" status="Waiting" />
        </footer>
      </div>
    </main>
  );
}

function FeatureItem({
  symbol,
  label,
  sublabel,
}: {
  symbol: string;
  label: string;
  sublabel: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="font-pixel mt-1 text-2xl leading-none">{symbol}</div>

      <div className="font-system text-sm leading-6">
        <div>{label}</div>
        <div>{sublabel}</div>
      </div>
    </div>
  );
}

function ConsoleButton({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-12 w-12 rounded-full border-2 border-[var(--border)] bg-[#3a4149] shadow-[3px_3px_0_var(--border)]" />
      <div className="font-pixel text-[9px]">{label}</div>
    </div>
  );
}

function SmallButton({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-3 w-10 rounded-full border-2 border-[var(--border)] bg-[#4c535a]" />
      <div className="font-system text-[10px] uppercase">{label}</div>
    </div>
  );
}

function StatusItem({
  label,
  status,
  active = false,
}: {
  label: string;
  status: string;
  active?: boolean;
}) {
  return (
    <div className="font-system flex items-center gap-3 text-xs uppercase tracking-[0.12em]">
      <span
        className={`h-3 w-3 border border-[var(--border)] ${active ? "bg-[var(--success)]" : "bg-[var(--background)]"
          }`}
      />

      <div>
        <div>{label}</div>
        <div className="mt-1 text-[10px] text-[var(--muted)]">{status}</div>
      </div>
    </div>
  );
}