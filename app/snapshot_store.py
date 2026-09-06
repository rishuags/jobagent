import json
import os
from datetime import datetime

SNAPSHOT_FILE = "market_snapshots.json"


def save_market_snapshot(location: str, target_role: str, top_skills):
    snapshot = {
        "timestamp": datetime.utcnow().isoformat(),
        "location": location,
        "target_role": target_role,
        "top_skills": top_skills
    }

    snapshots = load_snapshots()
    snapshots.append(snapshot)

    with open(SNAPSHOT_FILE, "w") as file:
        json.dump(snapshots, file, indent=2)

    return snapshot


def load_snapshots():
    if not os.path.exists(SNAPSHOT_FILE):
        return []

    with open(SNAPSHOT_FILE, "r") as file:
        return json.load(file)