def analyze_resume_gap(user_skills, market_required_skills):
    user_skill_set = set(user_skills)
    market_skill_set = set(market_required_skills)

    matching_skills = [
        skill
        for skill in market_required_skills
        if skill in user_skill_set
    ]

    missing_skills = [
        skill
        for skill in market_required_skills
        if skill not in user_skill_set
    ]

    match_percentage = 0

    if market_required_skills:
        match_percentage = round(
            (len(matching_skills) / len(market_required_skills)) * 100,
            1
        )

    top_missing = missing_skills[:3]

    if top_missing:
        recommendation = (
            "Focus first on: "
            + ", ".join(top_missing)
        )
    else:
        recommendation = (
            "Your resume already covers the main skills currently visible "
            "in this market sample."
        )

    return {
        "user_skills": user_skills,
        "market_required_skills": market_required_skills,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "match_percentage": match_percentage,
        "recommendation": recommendation
    }