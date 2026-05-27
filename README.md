# JobAgent

An agentic AI-powered career intelligence platform that analyzes software engineering job markets and generates personalized learning roadmaps.

## Features

- Market demand analysis
- Skill trend extraction
- AI-generated learning tasks
- Interview preparation
- Monthly market updates
- FastAPI backend

## Tech Stack

- Python
- FastAPI
- Uvicorn
- REST APIs

## Run Locally

```bash
python3 -m uvicorn app.main:app --reload
```

## Example Endpoints

/analyze?location=Dublin&field=Computer%20Science

/homework?target_role=Junior%20Software%20Engineer

/monthly-update