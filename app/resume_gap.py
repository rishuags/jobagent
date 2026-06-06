def analyze_resume_gap(user_skills, market_skills):
    user_skills_lower = {skill.lower() for skill in user_skills}

    missing = [
        skill for skill in market_skills
        if skill.lower() not in user_skills_lower
    ]

    return {
        "user_skills": user_skills,
        "market_required_skills": market_skills,
        "missing_skills": missing[:10],
        "recommendation": f"Focus first on: {', '.join(missing[:3])}" if missing else "You match the main market skills well."
    }