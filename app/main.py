from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.analyzer import analyze_market, generate_homework, monthly_update

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