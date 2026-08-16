import csv
import json

INPUT_FILE = "player_stats_2025.csv"
OUTPUT_FILE = "../src/data/processed_players.json"

players = []

with open(INPUT_FILE, "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        # Only use regular-season offensive players
        if row["season_type"] != "REG":
            continue

        if row["position"] not in {"QB", "RB", "WR", "TE"}:
            continue

        player = {
            "id": row["player_id"],
            "name": row["player_name"],
            "team": row["recent_team"],
            "position": row["position"],
            "image": row["headshot_url"],

            "passingYards": int(float(row["passing_yards"] or 0)),
            "passingTouchdowns": int(float(row["passing_tds"] or 0)),
            "interceptions": int(float(row["passing_interceptions"] or 0)),

            "rushingYards": int(float(row["rushing_yards"] or 0)),
            "rushingTouchdowns": int(float(row["rushing_tds"] or 0)),

            "receivingYards": int(float(row["receiving_yards"] or 0)),
            "receivingTouchdowns": int(float(row["receiving_tds"] or 0)),
        }

        player["totalTouchdowns"] = (
            player["passingTouchdowns"]
            + player["rushingTouchdowns"]
            + player["receivingTouchdowns"]
        )

        players.append(player)


with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
    json.dump(players, file, indent=4)

print(f"Processed {len(players)} players")
print(f"Created {OUTPUT_FILE}")