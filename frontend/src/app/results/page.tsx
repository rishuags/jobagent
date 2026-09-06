"use client";

import { useEffect, useState } from "react";
import type {
    AnalyzeCareerResponse,
    Job,
} from "@/lib/api";

export default function ResultsPage() {
    const [data, setData] =
        useState<AnalyzeCareerResponse | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem(
            "jobagent-analysis"
        );

        if (!stored) {
            return;
        }

        try {
            setData(JSON.parse(stored));
        } catch {
            console.error("Could not parse stored JobAgent analysis.");
        }
    }, []);

    if (!data) {
        return <NoResults />;
    }

    const gap = data.resume_analysis.gap_analysis;

    const matchingSkills = gap.matching_skills ?? [];
    const missingSkills = gap.missing_skills ?? [];
    const matchPercentage = gap.match_percentage ?? 0;

    const topSkills =
        data.market_report.top_skills?.slice(0, 7) ?? [];

    const maxSkillCount =
        Math.max(...topSkills.map(([, count]) => count), 1);

    const homework = data.daily_homework?.today;

    return (
        <main className="min-h-screen px-3 py-3 sm:px-5 sm:py-5">
            <div className="mx-auto max-w-7xl border-2 border-[var(--border)] bg-[var(--background)] shadow-[6px_6px_0_var(--border)]">
                {/* SYSTEM HEADER */}
                <header className="grid border-b-2 border-[var(--border)] md:grid-cols-[1fr_auto]">
                    <div className="flex items-center gap-5 px-5 py-4 sm:px-7">
                        <div>
                            <div className="font-pixel text-lg">
                                JOBAGENT
                            </div>

                            <div className="font-system mt-1 text-[9px] uppercase tracking-[0.15em] text-[var(--muted)]">
                                Career Intelligence OS / Report
                            </div>
                        </div>

                        <div className="hidden h-9 border-l-2 border-dotted border-[var(--border)] sm:block" />

                        <div className="font-system hidden text-[10px] uppercase tracking-[0.12em] sm:block">
                            System Scan
                            <br />
                            Complete
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 border-t-2 border-[var(--border)] px-5 py-4 md:border-l-2 md:border-t-0">
                        <div className="font-system flex items-center gap-2 text-[10px] uppercase tracking-[0.12em]">
                            <span className="h-2.5 w-2.5 border border-[var(--border)] bg-[var(--success)]" />
                            Market Feed Live
                        </div>

                        <a
                            href="/analyze"
                            className="font-system text-[10px] uppercase tracking-[0.12em] transition hover:text-[var(--brand)]"
                        >
                            ← New Scan
                        </a>
                    </div>
                </header>

                {/* REPORT INTRO */}
                <section className="border-b-2 border-[var(--border)] px-6 py-8 sm:px-10">
                    <div className="font-system text-[10px] uppercase tracking-[0.15em] text-[var(--brand)]">
            /// Career scan complete
                    </div>

                    <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <h1 className="font-pixel text-2xl leading-[1.45] sm:text-3xl">
                                CAREER REPORT
                                <br />
                                READY.
                            </h1>

                            <div className="font-system mt-5 flex flex-wrap gap-x-7 gap-y-2 text-xs uppercase tracking-[0.1em]">
                                <span>
                                    Role:{" "}
                                    <strong>
                                        {data.candidate.target_role}
                                    </strong>
                                </span>

                                <span>
                                    Location:{" "}
                                    <strong>
                                        {data.candidate.location}
                                    </strong>
                                </span>

                                {data.candidate.experience_level && (
                                    <span>
                                        Level:{" "}
                                        <strong>
                                            {data.candidate.experience_level}
                                        </strong>
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="font-system text-xs uppercase tracking-[0.12em]">
                            {data.market_report.jobs_analyzed} live jobs
                            analyzed
                        </div>
                    </div>
                </section>

                {/* MAIN DASHBOARD */}
                <section className="grid border-b-2 border-[var(--border)] lg:grid-cols-[0.8fr_1.2fr]">
                    {/* MATCH SCORE */}
                    <div className="border-b-2 border-[var(--border)] p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
                        <SectionLabel>MARKET MATCH</SectionLabel>

                        <div className="mt-8 flex items-end gap-3">
                            <div className="font-pixel text-5xl leading-none text-[var(--brand)] sm:text-6xl">
                                {Math.round(matchPercentage)}
                            </div>

                            <div className="font-pixel pb-1 text-lg">
                                %
                            </div>
                        </div>

                        <div className="mt-6 h-6 border-2 border-[var(--border)] bg-[var(--surface)] p-1">
                            <div
                                className="h-full bg-[var(--brand)] transition-all duration-700"
                                style={{
                                    width: `${Math.min(
                                        Math.max(matchPercentage, 0),
                                        100
                                    )}%`,
                                }}
                            />
                        </div>

                        <p className="font-system mt-5 text-xs leading-6 text-[var(--muted)]">
                            Exact skill coverage against the most visible
                            skills in the current market sample.
                        </p>

                        <div className="font-system mt-6 border-t border-dashed border-[var(--border)] pt-5 text-xs leading-6">
                            {gap.recommendation}
                        </div>
                    </div>

                    {/* MARKET DEMAND */}
                    <div className="p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <SectionLabel>TOP MARKET DEMAND</SectionLabel>

                            <div className="font-system text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
                                Frequency
                            </div>
                        </div>

                        <div className="mt-7 space-y-4">
                            {topSkills.map(([skill, count], index) => {
                                const width =
                                    (count / maxSkillCount) * 100;

                                return (
                                    <div
                                        key={skill}
                                        className="grid grid-cols-[22px_100px_1fr_30px] items-center gap-3 sm:grid-cols-[26px_140px_1fr_35px]"
                                    >
                                        <span className="font-system text-[10px] text-[var(--muted)]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="font-system truncate text-xs font-semibold">
                                            {skill}
                                        </span>

                                        <div className="h-3 border border-[var(--border)] bg-[var(--surface)]">
                                            <div
                                                className="h-full bg-[var(--screen-dark)]"
                                                style={{
                                                    width: `${width}%`,
                                                }}
                                            />
                                        </div>

                                        <span className="font-system text-right text-[10px]">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* SKILL COMPARISON */}
                <section className="grid border-b-2 border-[var(--border)] lg:grid-cols-2">
                    <div className="border-b-2 border-[var(--border)] p-6 sm:p-8 lg:border-b-0 lg:border-r-2">
                        <div className="flex items-center gap-3">
                            <span className="font-pixel text-sm text-[var(--success)]">
                                ✓
                            </span>

                            <SectionLabel>YOU ALREADY HAVE</SectionLabel>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {matchingSkills.length > 0 ? (
                                matchingSkills.map((skill) => (
                                    <SkillChip
                                        key={skill}
                                        skill={skill}
                                        variant="match"
                                    />
                                ))
                            ) : (
                                <EmptyText>
                                    No exact market matches detected.
                                </EmptyText>
                            )}
                        </div>

                        <div className="font-system mt-5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {matchingSkills.length} current market
                            matches
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <span className="font-pixel text-sm text-[var(--warning)]">
                                !
                            </span>

                            <SectionLabel>PRIORITY SKILL GAPS</SectionLabel>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {missingSkills.length > 0 ? (
                                missingSkills.map((skill) => (
                                    <SkillChip
                                        key={skill}
                                        skill={skill}
                                        variant="gap"
                                    />
                                ))
                            ) : (
                                <EmptyText>
                                    No major gaps detected in this sample.
                                </EmptyText>
                            )}
                        </div>

                        <div className="font-system mt-5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {missingSkills.length} skills to investigate
                        </div>
                    </div>
                </section>

                {/* ALL DETECTED SKILLS */}
                <section className="border-b-2 border-[var(--border)] px-6 py-6 sm:px-8">
                    <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-start">
                        <div>
                            <SectionLabel>RESUME DETECTED</SectionLabel>

                            <div className="font-system mt-2 text-[10px] text-[var(--muted)]">
                                {data.resume_analysis.resume_skills_found.length}{" "}
                                skills found
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {data.resume_analysis.resume_skills_found.map(
                                (skill) => (
                                    <SkillChip
                                        key={skill}
                                        skill={skill}
                                        variant="neutral"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* ROADMAP */}
                <section className="border-b-2 border-[var(--border)] px-6 py-9 sm:px-8">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <SectionLabel>NEXT LEVELS</SectionLabel>

                            <h2 className="font-pixel mt-3 text-lg">
                                PERSONALIZED ROADMAP
                            </h2>
                        </div>

                        <div className="font-system text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
                            Built from current skill gaps
                        </div>
                    </div>

                    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        {data.personalized_roadmap.map(
                            (item, index) => (
                                <RoadmapCard
                                    key={`${item.skill}-${index}`}
                                    level={index + 1}
                                    skill={item.skill}
                                    action={item.action}
                                />
                            )
                        )}
                    </div>
                </section>

                {/* TODAY'S MISSION */}
                {homework && (
                    <section className="border-b-2 border-[var(--border)] bg-[var(--screen)] px-6 py-9 sm:px-8">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                            <div>
                                <div className="font-system text-[10px] uppercase tracking-[0.16em]">
                                    Daily Learning Agent
                                </div>

                                <h2 className="font-pixel mt-3 text-xl">
                                    TODAY&apos;S MISSION
                                </h2>
                            </div>

                            <div className="border-2 border-[var(--border)] bg-[var(--foreground)] px-4 py-3 font-pixel text-[9px] text-[var(--screen)]">
                                FOCUS:{" "}
                                {data.daily_homework.focus_area.toUpperCase()}
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <MissionCard
                                number="01"
                                title="LEARN"
                                text={homework.learn}
                            />

                            <MissionCard
                                number="02"
                                title="BUILD"
                                text={homework.build}
                            />

                            <MissionCard
                                number="03"
                                title="INTERVIEW"
                            >
                                <ul className="space-y-2">
                                    {homework.interview_questions.map(
                                        (question) => (
                                            <li
                                                key={question}
                                                className="leading-5"
                                            >
                                                › {question}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </MissionCard>

                            <MissionCard
                                number="04"
                                title="CV QUEST"
                                text={homework.resume_task}
                            />
                        </div>
                    </section>
                )}

                {/* LIVE JOBS */}
                <section className="border-b-2 border-[var(--border)] px-6 py-9 sm:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <div className="font-system flex items-center gap-2 text-[10px] uppercase tracking-[0.14em]">
                                <span className="h-2.5 w-2.5 border border-[var(--border)] bg-[var(--success)]" />
                                Live Market Feed
                            </div>

                            <h2 className="font-pixel mt-3 text-lg">
                                JOB MATCHES
                            </h2>
                        </div>

                        <div className="font-system text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                            Real listings from current market data
                        </div>
                    </div>

                    <div className="mt-7 grid gap-4 lg:grid-cols-2">
                        {data.market_report.example_jobs.length > 0 ? (
                            data.market_report.example_jobs.map(
                                (job, index) => (
                                    <JobCard
                                        key={`${job.title}-${job.company}-${index}`}
                                        job={job}
                                        index={index}
                                    />
                                )
                            )
                        ) : (
                            <EmptyText>
                                No job examples returned for this scan.
                            </EmptyText>
                        )}
                    </div>
                </section>

                {/* AI ASSESSMENT */}
                <section className="px-6 py-9 sm:px-8">
                    <details className="group border-2 border-[var(--border)]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 bg-[var(--surface)] px-5 py-5">
                            <div>
                                <SectionLabel>
                                    JOBAGENT AI ASSESSMENT
                                </SectionLabel>

                                <div className="font-system mt-2 text-xs text-[var(--muted)]">
                                    Detailed reasoning and career guidance
                                </div>
                            </div>

                            <div className="font-pixel text-xs transition group-open:rotate-180">
                                ▼
                            </div>
                        </summary>

                        <div className="font-system whitespace-pre-wrap border-t-2 border-[var(--border)] bg-[var(--screen)] p-6 text-sm leading-7 sm:p-8">
                            {data.ai_analysis}
                        </div>
                    </details>
                </section>

                {/* FOOTER */}
                <footer className="grid gap-3 border-t-2 border-[var(--border)] px-5 py-4 sm:grid-cols-3">
                    <FooterStatus
                        label="Resume Parser"
                        status="Complete"
                    />

                    <FooterStatus
                        label="Market Feed"
                        status={`${data.market_report.jobs_analyzed} Jobs`}
                    />

                    <FooterStatus
                        label="Career Roadmap"
                        status="Generated"
                    />
                </footer>
            </div>
        </main>
    );
}

function NoResults() {
    return (
        <main className="min-h-screen px-4 py-6">
            <div className="mx-auto max-w-3xl border-2 border-[var(--border)] bg-[var(--background)] p-8 shadow-[6px_6px_0_var(--border)]">
                <div className="font-pixel text-sm">
                    NO REPORT FOUND
                </div>

                <p className="font-system mt-4 text-sm text-[var(--muted)]">
                    JobAgent cannot find a stored career scan.
                    Apparently even artificial intelligence cannot analyze
                    data that does not exist.
                </p>

                <a
                    href="/analyze"
                    className="font-pixel mt-7 inline-block border-2 border-[var(--border)] bg-[var(--brand)] px-6 py-4 text-[9px] text-white shadow-[4px_4px_0_var(--border)]"
                >
                    ▶ START CAREER SCAN
                </a>
            </div>
        </main>
    );
}

function SectionLabel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="font-pixel text-[10px] leading-5">
            {children}
        </div>
    );
}

function SkillChip({
    skill,
    variant,
}: {
    skill: string;
    variant: "match" | "gap" | "neutral";
}) {
    const styles = {
        match:
            "bg-[var(--success)] text-white",
        gap:
            "bg-[var(--warning)] text-[var(--foreground)]",
        neutral:
            "bg-[var(--surface)] text-[var(--foreground)]",
    };

    return (
        <span
            className={`font-system border-2 border-[var(--border)] px-3 py-1.5 text-[11px] ${styles[variant]}`}
        >
            {skill}
        </span>
    );
}

function RoadmapCard({
    level,
    skill,
    action,
}: {
    level: number;
    skill: string;
    action: string;
}) {
    return (
        <article className="flex min-h-[190px] flex-col border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[4px_4px_0_var(--border)]">
            <div className="flex items-center justify-between">
                <span className="font-pixel text-[9px] text-[var(--brand)]">
                    LVL {String(level).padStart(2, "0")}
                </span>

                <span className="font-system text-[10px]">
                    ◆
                </span>
            </div>

            <h3 className="font-pixel mt-5 text-[11px] leading-5">
                {skill.toUpperCase()}
            </h3>

            <p className="font-system mt-4 text-xs leading-5 text-[var(--muted)]">
                {action}
            </p>

            <div className="mt-auto pt-5">
                <div className="h-1.5 bg-[var(--border)] opacity-20" />
            </div>
        </article>
    );
}

function MissionCard({
    number,
    title,
    text,
    children,
}: {
    number: string;
    title: string;
    text?: string;
    children?: React.ReactNode;
}) {
    return (
        <article className="border-2 border-[var(--border)] bg-[var(--background)] p-5 shadow-[4px_4px_0_var(--border)]">
            <div className="flex items-center justify-between">
                <div className="font-pixel text-[9px]">
                    {title}
                </div>

                <div className="font-system text-[10px] text-[var(--muted)]">
                    {number}
                </div>
            </div>

            <div className="font-system mt-5 text-xs leading-6">
                {text || children}
            </div>
        </article>
    );
}

function JobCard({
    job,
    index,
}: {
    job: Job;
    index: number;
}) {
    return (
        <article className="group border-2 border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--border)]">
            <div className="flex items-start justify-between gap-5">
                <div className="font-system text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    Job {String(index + 1).padStart(2, "0")}
                </div>

                {job.source && (
                    <div className="font-system text-[9px] uppercase tracking-[0.1em] text-[var(--muted)]">
                        {job.source}
                    </div>
                )}
            </div>

            <h3 className="font-pixel mt-4 text-[11px] leading-5">
                {job.title || "Untitled Role"}
            </h3>

            <div className="font-system mt-4 space-y-1 text-xs">
                <div>
                    {job.company || "Company not listed"}
                </div>

                <div className="text-[var(--muted)]">
                    {job.location || "Location not listed"}
                </div>
            </div>

            <div className="mt-6 border-t border-dashed border-[var(--border)] pt-5">
                {job.apply_link ? (
                    <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-pixel inline-flex border-2 border-[var(--border)] bg-[var(--brand)] px-4 py-3 text-[8px] text-white shadow-[3px_3px_0_var(--border)] transition group-hover:shadow-[4px_4px_0_var(--border)]"
                    >
                        VIEW & APPLY →
                    </a>
                ) : (
                    <span className="font-system text-[10px] uppercase text-[var(--muted)]">
                        Apply link unavailable
                    </span>
                )}
            </div>
        </article>
    );
}

function FooterStatus({
    label,
    status,
}: {
    label: string;
    status: string;
}) {
    return (
        <div className="font-system flex items-center gap-3 text-[10px] uppercase tracking-[0.12em]">
            <span className="h-2.5 w-2.5 border border-[var(--border)] bg-[var(--success)]" />

            <div>
                <div>{label}</div>

                <div className="mt-1 text-[9px] text-[var(--muted)]">
                    {status}
                </div>
            </div>
        </div>
    );
}

function EmptyText({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="font-system text-xs leading-6 text-[var(--muted)]">
            {children}
        </p>
    );
}