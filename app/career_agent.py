from collections import Counter

from app.job_api import fetch_live_jobs
from app.skill_extractor import extract_skills_from_text
from app.resume_gap import analyze_resume_gap
from app.openai_service import generate_ai_career_analysis


def generate_roadmap(missing_skills, target_role):
    roadmap = []

    priority_map = {
        "Docker": "Learn Docker basics and containerize a small backend API.",
        "AWS": "Deploy a simple app using AWS or learn core cloud services.",
        "PostgreSQL": "Build a project using relational database design.",
        "Kubernetes": "Understand containers, pods, deployments, and scaling.",
        "FastAPI": "Build REST APIs using Python FastAPI.",
        "React": "Create a small frontend dashboard.",
        "TypeScript": "Convert a JavaScript project into TypeScript.",
        "CI/CD": "Set up a GitHub Actions deployment pipeline.",
        "Linux": "Practice terminal commands and basic server management.",
        "System Design": "Study APIs, databases, caching, queues, and scalability."
    }

    for skill in missing_skills[:5]:
        roadmap.append({
            "skill": skill,
            "action": priority_map.get(skill, f"Build a small project using {skill}.")
        })

    if not roadmap:
        roadmap.append({
            "skill": "Portfolio Polish",
            "action": f"Improve your CV projects to better match {target_role} roles."
        })

    return roadmap


def generate_daily_homework(missing_skills, target_role):
    focus = missing_skills[0] if missing_skills else "project improvement"

    return {
        "target_role": target_role,
        "focus_area": focus,
        "today": {
            "learn": f"Spend 30 minutes learning the basics of {focus}.",
            "build": f"Add {focus} to a small project or write a demo using it.",
            "interview_questions": [
                f"Why is {focus} useful in modern software projects?",
                "Explain a project from your resume in technical detail.",
                "What would you improve in one of your previous projects?"
            ],
            "resume_task": f"Add one measurable bullet point showing evidence of {focus} or related experience."
        
        }
    }


def build_career_plan(name, degree, interests, location, target_role, resume_text):
    jobs = fetch_live_jobs(target_role, location)

    market_skills = []
    for job in jobs:
        text = f"{job.get('title', '')} {job.get('description', '')}"
        market_skills.extend(extract_skills_from_text(text))

    top_market_skills = Counter(market_skills).most_common(15)

    resume_skills = extract_skills_from_text(resume_text)

    market_skill_names = [skill for skill, count in top_market_skills]

    gap_analysis = analyze_resume_gap(resume_skills, market_skill_names)

    missing_skills = gap_analysis["missing_skills"]

    roadmap = generate_roadmap(missing_skills, target_role)

    homework = generate_daily_homework(missing_skills, target_role)

    ai_analysis = generate_ai_career_analysis(
    resume_text=resume_text,
    market_report=top_market_skills,
    gap_analysis=gap_analysis,
    target_role=target_role,
    location=location
)

    return {
        "candidate": {
            "name": name,
            "degree": degree,
            "interests": interests,
            "location": location,
            "target_role": target_role
        },
        "agent_workflow": [
            "Job Search Agent collected recent job listings.",
            "Skill Analysis Agent extracted tools, frameworks, and technologies.",
            "Resume Agent extracted candidate skills from resume text.",
            "Gap Agent compared resume skills against market demand.",
            "Learning Coach Agent generated a roadmap and daily homework."
        ],
        "market_report": {
            "jobs_analyzed": len(jobs),
            "top_skills": top_market_skills,
            "example_jobs": jobs[:5]
        },
        "resume_analysis": {
            "resume_skills_found": resume_skills,
            "gap_analysis": gap_analysis
        },
        "personalized_roadmap": roadmap,
        "daily_homework": homework,
        "ai_analysis": ai_analysis,
        "agent_reasoning": {
            "market_demand": f"The most requested skills for {target_role} in {location} are {', '.join(market_skill_names[:5])}.",
            "resume_gap_reason": f"The candidate is missing {', '.join(missing_skills[:5])} based on recent job listings.",
            "roadmap_reason": "The roadmap prioritizes missing skills that appear most often in current job postings."
        }
    }