"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeCareer } from "@/lib/api";

export default function AnalyzePage() {
    const [resume, setResume] = useState<File | null>(null);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!resume) {
            setError("Please select a resume PDF.");
            return;
        }

        const form = event.currentTarget;
        const formDataFromPage = new FormData(form);

        const targetRole =
            formDataFromPage.get("targetRole")?.toString().trim() || "";

        const location =
            formDataFromPage.get("location")?.toString().trim() || "";

        const experienceLevel =
            formDataFromPage.get("experienceLevel")?.toString() || "junior";

        const interests =
            formDataFromPage.get("interests")?.toString().trim() || "";

        if (!targetRole || !location) {
            setError("Target role and location are required.");
            return;
        }

        const payload = new FormData();

        payload.append("resume", resume);
        payload.append("name", "Student");
        payload.append("degree", "Computer Science");
        payload.append("target_role", targetRole);
        payload.append("location", location);
        payload.append("experience_level", experienceLevel);
        payload.append("interests", interests);

        try {
            setLoading(true);

            const result = await analyzeCareer(payload);

            sessionStorage.setItem(
                "jobagent-analysis",
                JSON.stringify(result)
            );

            router.push("/results");
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6">
            <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-5xl border-2 border-[var(--border)] bg-[var(--background)] shadow-[6px_6px_0_var(--border)]">
                <header className="flex items-center justify-between border-b-2 border-[var(--border)] px-6 py-5">
                    <div>
                        <div className="font-pixel text-lg">JOBAGENT</div>

                        <div className="font-system mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                            Career Scan
                        </div>
                    </div>

                    <a
                        href="/"
                        className="font-system text-xs uppercase tracking-[0.12em] transition hover:text-[var(--brand)]"
                    >
                        ← Home
                    </a>
                </header>

                <section className="px-6 py-10 sm:px-10">
                    <div className="font-system text-[11px] uppercase tracking-[0.15em] text-[var(--muted)]">
                        Step 01 / Candidate Input
                    </div>

                    <h1 className="font-pixel mt-4 text-2xl leading-[1.4] sm:text-3xl">
                        ANALYZE YOUR CAREER
                    </h1>

                    <p className="font-system mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                        Upload your resume and tell JobAgent what kind of role you want.
                        The system will compare your experience against current market
                        demand.
                    </p>



                    <form

                        onSubmit={handleSubmit}
                        className="mt-10 space-y-8"
                    >
                        {/* Resume */}
                        <div>
                            <label className="font-system mb-3 block text-xs uppercase tracking-[0.12em]">
                                Resume PDF
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[var(--border)] bg-[var(--surface)] px-6 py-10 text-center transition hover:bg-[var(--surface-dark)]">
                                <span className="font-pixel text-[10px]">
                                    {resume ? "RESUME LOADED" : "SELECT RESUME"}
                                </span>

                                <span className="font-system mt-3 text-xs text-[var(--muted)]">
                                    {resume ? resume.name : "PDF files only"}
                                </span>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0] ?? null;
                                        setResume(file);
                                    }}
                                />
                            </label>
                        </div>

                        {/* Role + Location */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                label="Target Role"
                                name="targetRole"
                                placeholder="Software Engineer"
                            />

                            <FormField
                                label="Location"
                                name="location"
                                placeholder="Seattle"
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="font-system mb-3 block text-xs uppercase tracking-[0.12em]">
                                Experience Level
                            </label>

                            <select
                                name="experienceLevel"
                                defaultValue="junior"
                                className="font-system w-full border-2 border-[var(--border)] bg-[var(--background)] px-4 py-4 text-sm outline-none focus:bg-[var(--surface)]"
                            >
                                <option value="intern">Intern</option>
                                <option value="junior">Junior</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>

                        {/* Interests */}
                        <FormField
                            label="Interests"
                            name="interests"
                            placeholder="backend, AI, cloud"
                        />

                        {/* Submit */}
                        {error && (
                            <div className="font-system border-2 border-[var(--danger)] bg-[var(--background)] px-4 py-3 text-xs text-[var(--danger)]">
                                {error}
                            </div>
                        )}
                        <div className="border-t-2 border-[var(--border)] pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="font-pixel w-full border-2 border-[var(--border)] bg-[var(--brand)] px-6 py-5 text-[10px] text-white shadow-[5px_5px_0_var(--border)] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--border)] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "SCANNING MARKET..." : "▶ RUN CAREER SCAN"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}

function FormField({
    label,
    name,
    placeholder,
}: {
    label: string;
    name: string;
    placeholder: string;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="font-system mb-3 block text-xs uppercase tracking-[0.12em]"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type="text"
                placeholder={placeholder}
                className="font-system w-full border-2 border-[var(--border)] bg-[var(--background)] px-4 py-4 text-sm outline-none placeholder:text-[var(--muted)] focus:bg-[var(--surface)]"
            />
        </div>
    );
}