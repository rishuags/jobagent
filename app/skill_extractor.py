import re

SKILL_ALIASES = {
    "Python": [
        "python"
    ],
    "Java": [
        "java"
    ],
    "JavaScript": [
        "javascript",
        "js",
        "ecmascript"
    ],
    "TypeScript": [
        "typescript",
        "ts"
    ],
    "React": [
        "react",
        "react.js",
        "reactjs"
    ],
    "Node.js": [
        "node.js",
        "nodejs",
        "node js"
    ],
    "Express": [
        "express",
        "express.js",
        "expressjs"
    ],
    "FastAPI": [
        "fastapi"
    ],
    "Django": [
        "django"
    ],
    "Flask": [
        "flask"
    ],
    "Spring Boot": [
        "spring boot",
        "springboot"
    ],
    "SQL": [
        "sql"
    ],
    "PostgreSQL": [
        "postgresql",
        "postgres",
        "psql"
    ],
    "MySQL": [
        "mysql"
    ],
    "MongoDB": [
        "mongodb",
        "mongo db"
    ],
    "Supabase": [
        "supabase"
    ],
    "Firebase": [
        "firebase",
        "firebase realtime database",
        "firebase rtdb"
    ],
    "AWS": [
        "aws",
        "amazon web services"
    ],
    "Azure": [
        "azure",
        "microsoft azure"
    ],
    "GCP": [
        "gcp",
        "google cloud",
        "google cloud platform"
    ],
    "Docker": [
        "docker",
        "dockerfile",
        "containerized",
        "containerisation",
        "containerization"
    ],
    "Kubernetes": [
        "kubernetes",
        "k8s"
    ],
    "Terraform": [
        "terraform"
    ],
    "Git": [
        "git"
    ],
    "GitHub": [
        "github"
    ],
    "CI/CD": [
        "ci/cd",
        "continuous integration",
        "continuous deployment",
        "continuous delivery",
        "github actions"
    ],
    "Linux": [
        "linux"
    ],
    "REST APIs": [
        "rest api",
        "rest apis",
        "restful api",
        "restful apis",
        "restful services",
        "rest"
    ],
    "GraphQL": [
        "graphql"
    ],
    "OpenAI API": [
        "openai api",
        "openai"
    ],
    "LLMs": [
        "llm",
        "llms",
        "large language model",
        "large language models"
    ],
    "Machine Learning": [
        "machine learning",
        "ml"
    ],
    "Pandas": [
        "pandas"
    ],
    "PyTorch": [
        "pytorch"
    ],
    "TensorFlow": [
        "tensorflow"
    ],
    "Tailwind": [
        "tailwind",
        "tailwind css",
        "tailwindcss"
    ],
    "Next.js": [
        "next.js",
        "nextjs",
        "next js"
    ],
    "HTML": [
        "html",
        "html5"
    ],
    "CSS": [
        "css",
        "css3"
    ]
}


def normalize_text(text: str) -> str:
    text = text.lower()

    # Normalize common punctuation/separators
    text = text.replace("–", "-")
    text = text.replace("—", "-")

    # Keep useful symbols for skills such as node.js / ci/cd
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def phrase_exists(text: str, phrase: str) -> bool:
    """
    Matches aliases while reducing accidental substring matches.

    Example:
    'java' should not match inside 'javascript'.
    """
    escaped = re.escape(phrase.lower())

    pattern = rf"(?<![a-zA-Z0-9]){escaped}(?![a-zA-Z0-9])"

    return re.search(pattern, text, re.IGNORECASE) is not None


def extract_skills_from_text(text: str):
    if not text:
        return []

    normalized_text = normalize_text(text)

    found_skills = []

    for canonical_skill, aliases in SKILL_ALIASES.items():
        for alias in aliases:
            if phrase_exists(normalized_text, alias):
                found_skills.append(canonical_skill)
                break

    return found_skills