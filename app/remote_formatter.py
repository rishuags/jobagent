def format_career_report(candidate, market_report, resume_analysis, roadmap, homework):
    top_skills = market_report.get("top_skills", [])
    gaps = resume_analysis.get("gap_analysis", {}).get("missing_skills", [])

    return {
        "headline": f"{candidate['name']} is targeting {candidate['target_role']} roles in {candidate['location']}.",
        "market_summary": {
            "jobs_analyzed": market_report.get("jobs_analyzed", 0),
            "top_5_skills": top_skills[:5],
            "main_takeaway": (
                f"The strongest market signals are {', '.join([skill for skill, count in top_skills[:5]])}."
                if top_skills else
                "Not enough market data available yet."
            )
        },
        "resume_summary": {
            "skills_found": resume_analysis.get("resume_skills_found", []),
            "missing_skills": gaps,
            "readiness_level": calculate_readiness_level(len(gaps))
        },
        "next_steps": {
            "roadmap": roadmap,
            "homework": homework
        }
    }


def calculate_readiness_level(gap_count: int):
    if gap_count == 0:
        return "Strong match"
    if gap_count <= 3:
        return "Close match"
    if gap_count <= 6:
        return "Moderate gap"
    return "Needs focused upskilling"