def create_homework_plan(missing_skills, target_role: str):
    if not missing_skills:
        return {
            "message": "No major gaps found.",
            "today": [
                "Polish one project README.",
                "Practice explaining your strongest project clearly.",
                "Apply to 3 relevant roles."
            ]
        }

    focus = missing_skills[0]

    return {
        "target_role": target_role,
        "priority_skill": focus,
        "today": [
            f"Watch or read a 30-minute beginner guide on {focus}.",
            f"Build a tiny demo that uses {focus}.",
            f"Write one resume bullet proving you have used {focus}.",
            f"Answer this interview question: Why is {focus} useful for {target_role} roles?"
        ],
        "this_week": [
            f"Add {focus} to an existing project.",
            "Push the project to GitHub.",
            "Write a short README explaining the technical decisions.",
            "Prepare a 60-second explanation of the project."
        ]
    }