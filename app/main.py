from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from collections import Counter
from pydantic import BaseModel
from app.job_api import fetch_live_jobs
from app.skill_extractor import extract_skills_from_text
from app.resume_gap import analyze_resume_gap
from app.pdf_service import extract_text_from_pdf
from app.analyzer import analyze_market, generate_homework, monthly_update

from app.career_agent import build_career_plan

class CareerPlanRequest(BaseModel):
    name: str = "Student"
    degree: str = "Computer Science"
    interests: list[str] = ["backend", "AI"]
    location: str = "Seattle"
    target_role: str = "software developer"
    resume_text: str

class ResumeGapRequest(BaseModel):
    user_skills: list[str]
    query: str = "software engineer"
    location: str = "Dublin"

app = FastAPI(
    title="JobAgent",
    description="Agentic AI career market analyzer for software roles.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "JobAgent is running.",
        "demo_routes": [
            "/analyze?location=Dublin&field=Computer Science",
            "/homework?target_role=Junior Software Engineer",
            "/monthly-update"
        ]
    }

@app.get("/analyze")
def analyze(location: str = "Dublin", field: str = "Computer Science"):
    return analyze_market(location, field)

@app.get("/homework")
def homework(target_role: str = "Junior Software Engineer"):
    return generate_homework(target_role)

@app.get("/monthly-update")
def update():
    return monthly_update()

@app.get("/live-jobs")
def live_jobs(query: str = "software engineer", location: str = "Dublin"):
    jobs = fetch_live_jobs(query, location)
    return {
        "query": query,
        "location": location,
        "jobs_found": len(jobs),
        "jobs": jobs[:10]
    }


@app.get("/market-report")
def market_report(query: str = "software engineer", location: str = "Dublin"):
    jobs = fetch_live_jobs(query, location)

    all_skills = []
    for job in jobs:
        text = f"{job.get('title', '')} {job.get('description', '')}"
        all_skills.extend(extract_skills_from_text(text))

    top_skills = Counter(all_skills).most_common(15)

    return {
        "query": query,
        "location": location,
        "period": "last month",
        "jobs_analyzed": len(jobs),
        "top_skills": top_skills,
        "summary": f"Based on recent {query} listings in {location}, the most visible skills are: {', '.join([skill for skill, count in top_skills[:5]])}.",
        "example_jobs": jobs[:5]
    }


@app.post("/resume-gap")
def resume_gap(payload: ResumeGapRequest):
    jobs = fetch_live_jobs(payload.query, payload.location)

    all_skills = []
    for job in jobs:
        text = f"{job.get('title', '')} {job.get('description', '')}"
        all_skills.extend(extract_skills_from_text(text))

    market_skills = [skill for skill, count in Counter(all_skills).most_common(15)]

    return analyze_resume_gap(payload.user_skills, market_skills)


@app.post("/career-plan")
def career_plan(payload: CareerPlanRequest):
    return build_career_plan(
        name=payload.name,
        degree=payload.degree,
        interests=payload.interests,
        location=payload.location,
        target_role=payload.target_role,
        resume_text=payload.resume_text
    )

@app.post("/analyze-career")
async def analyze_career(
    resume: UploadFile = File(...),
    name: str = Form("Student"),
    degree: str = Form("Computer Science"),
    location: str = Form("Seattle"),
    target_role: str = Form("software engineer"),
    experience_level: str = Form("junior"),
    interests: str = Form("backend,AI")
):
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF resume."
        )

    resume_text = extract_text_from_pdf(resume.file)

    if not resume_text.strip():
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from this PDF."
        )

    interest_list = [
        interest.strip()
        for interest in interests.split(",")
        if interest.strip()
    ]

    return build_career_plan(
        name=name,
        degree=degree,
        interests=interest_list,
        location=location,
        target_role=target_role,
        resume_text=resume_text,
        experience_level=experience_level
    )