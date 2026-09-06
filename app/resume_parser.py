from app.skill_extractor import extract_skills_from_text


def parse_resume(resume_text: str):
    skills = extract_skills_from_text(resume_text)

    lower_text = resume_text.lower()

    education_keywords = ["computer science", "software engineering", "data science", "bachelor", "msc", "degree"]
    project_keywords = ["project", "built", "developed", "created", "implemented", "engineered"]

    education_found = [
        keyword for keyword in education_keywords
        if keyword in lower_text
    ]

    project_signals = [
        keyword for keyword in project_keywords
        if keyword in lower_text
    ]

    return {
        "skills": skills,
        "education_signals": education_found,
        "project_signals": project_signals,
        "resume_strength_score": min(100, len(skills) * 8 + len(project_signals) * 10)
    }