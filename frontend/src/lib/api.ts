const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type Job = {
    title?: string | null;
    company?: string | null;
    location?: string | null;
    apply_link?: string | null;
    posted_at?: string | null;
    source?: string | null;
};

export type DailyHomework = {
    target_role: string;
    focus_area: string;
    today: {
        learn: string;
        build: string;
        interview_questions: string[];
        resume_task: string;
    };
};

export type AnalyzeCareerResponse = {
    candidate: {
        name: string;
        degree: string;
        interests: string[];
        location: string;
        target_role: string;
        experience_level?: string;
    };

    market_report: {
        jobs_analyzed: number;
        top_skills: [string, number][];
        example_jobs: Job[];
    };

    resume_analysis: {
        resume_skills_found: string[];

        gap_analysis: {
            user_skills: string[];
            market_required_skills: string[];
            matching_skills: string[];
            missing_skills: string[];
            match_percentage: number;
            recommendation: string;
        };
    };

    personalized_roadmap: Array<{
        skill: string;
        action: string;
    }>;

    daily_homework: DailyHomework;

    ai_analysis: string;

    agent_workflow?: string[];

    agent_reasoning?: {
        market_demand?: string;
        resume_gap_reason?: string;
        roadmap_reason?: string;
    };
};

export async function analyzeCareer(
    formData: FormData
): Promise<AnalyzeCareerResponse> {
    const response = await fetch(`${API_URL}/analyze-career`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.detail || "Career analysis failed."
        );
    }

    return response.json();
}