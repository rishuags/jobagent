KNOWN_SKILLS = [
    "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js",
    "FastAPI", "Django", "Flask", "Spring Boot", "SQL", "PostgreSQL",
    "MongoDB", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
    "Terraform", "CI/CD", "Git", "Linux", "REST", "GraphQL",
    "LLMs", "Machine Learning", "Data Analysis", "Pandas",
    "PyTorch", "TensorFlow", "Tailwind", "Next.js"
]

def extract_skills_from_text(text: str):
    found = []
    lower_text = text.lower()

    for skill in KNOWN_SKILLS:
        if skill.lower() in lower_text:
            found.append(skill)

    return list(set(found))