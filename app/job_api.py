import os
import requests
from dotenv import load_dotenv

load_dotenv()

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST", "jsearch.p.rapidapi.com")

def fetch_live_jobs(query: str, location: str, num_pages: int = 1):
    url = "https://jsearch.p.rapidapi.com/search"

    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }

    params = {
        "query": f"{query} in {location}",
        "page": "1",
        "num_pages": str(num_pages),
        "date_posted": "month"
    }

    print("Starting API request...")
    response = requests.get(url, headers=headers, params=params, timeout=20)
    print("Response received")
    response.raise_for_status()

    data = response.json()

    jobs = []
    for item in data.get("data", []):
        jobs.append({
            "title": item.get("job_title"),
            "company": item.get("employer_name"),
            "location": item.get("job_city") or location,
            "description": item.get("job_description") or "",
            "apply_link": item.get("job_apply_link"),
            "posted_at": item.get("job_posted_at_datetime_utc"),
            "source": item.get("job_publisher")
        })

    return jobs