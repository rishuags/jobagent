def generate_ai_market_insights(skills):
    insights = []

    if "Python" in skills:
        insights.append("Python is strongly represented across backend, automation, and AI-related roles.")

    if "React" in skills:
        insights.append("React remains a key frontend requirement for software engineering roles.")

    if "AWS" in skills:
        insights.append("Cloud skills, especially AWS, are frequently requested by Dublin employers.")

    if "Docker" in skills:
        insights.append("Docker suggests employers expect familiarity with deployment and DevOps workflows.")

    if "LLMs" in skills:
        insights.append("LLM-related skills are emerging in AI-focused software roles.")

    return insights