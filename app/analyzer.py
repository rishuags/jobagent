from collections import Counter
from app.mock_jobs import mock_jobs
from app.ai_agent import generate_ai_market_insights

def analyze_market(location: str, field: str):
    filtered = [
        job for job in mock_jobs
        if location.lower() in job["location"].lower()
    ]

    skills = []
    for job in filtered:
        skills.extend(job["skills"])

    skill_counts = Counter(skills)
    ai_insights = generate_ai_market_insights(skills)

    return {
        "location": location,
        "field": field,
        "jobs_analyzed": len(filtered),
        "top_skills": skill_counts.most_common(10),
        "summary": f"In {location}, employers are currently looking for Python, React, AWS, Docker, and cloud/backend experience.",
        "ai_insights": ai_insights,
        "example_jobs": filtered[:3]
      
    }

def generate_homework(target_role: str):
    return {
        "target_role": target_role,
        "today": {
            "learn": "Revise Docker basics and understand how containers differ from virtual machines.",
            "build": "Create a small FastAPI app with one endpoint and containerize it using Docker.",
            "interview_questions": [
                "What is the difference between REST and GraphQL?",
                "Explain how authentication works in a web app.",
                "What is the difference between SQL and NoSQL?"
            ],
            "mini_project": "Build a job skills analyzer that counts the most common technologies from job listings."
        },
        "weekly_goal": "Deploy a backend API and connect it to a simple frontend dashboard."
    }

def monthly_update():
    return {
        "rising_skills": ["LLMs", "FastAPI", "Docker", "AWS", "Vector Databases"],
        "stable_skills": ["Python", "React", "SQL"],
        "declining_or_less_visible": ["jQuery", "PHP-only roles"],
        "recommendation": "Focus on Python backend, cloud deployment, APIs, and AI integration."
    }