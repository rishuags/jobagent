import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_ai_career_analysis(resume_text, market_report, gap_analysis, target_role, location):
    if not os.getenv("OPENAI_API_KEY"):
        return "OpenAI API key missing. AI analysis unavailable."

    prompt = f"""
You are JobAgent, an agentic AI career coach for computer science students.

Target role: {target_role}
Location: {location}

Resume:
{resume_text}

Market report:
{market_report}

Gap analysis:
{gap_analysis}

Return a concise career analysis with:
1. Candidate strengths
2. Weaknesses/gaps
3. Most important skills to learn
4. A 2-week roadmap
5. Today's homework
"""

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a practical AI career coach."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.4
    )

    return response.choices[0].message.content