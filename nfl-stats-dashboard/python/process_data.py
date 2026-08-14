import json

team_logos = {
    "Buffalo Bills": "bills.png",
    "Chicago Bears": "bears.png",
    "Jacksonville Jaguars": "jaguars.png",
    "New England Patriots": "patriots.png",
    "Atlanta Falcons": "falcons.png",
    "Minnesota Vikings": "vikings.png",
    "Arizona Cardinals": "cardinals.png",
    "Houston Texans": "texans.png",
    "Baltimore Ravens": "ravens.png",
    "New York Jets": "jets.png",
    "Cincinnati Bengals": "bengals.png",
    "Pittsburgh Steelers": "steelers.png",
    "Dallas Cowboys": "cowboys.png",
    "Indianapolis Colts": "colts.png",
    "Philadelphia Eagles": "eagles.png",
    "Seattle Seahawks": "seahawks.png",
}

with open("../src/data/players.json", "r") as file:
    players = json.load(file)

valid_positions = {"QB", "RB", "WR", "TE"}

for player in players:
    errors = []

    if not player.get("name"):
        errors.append("missing name")

    if not player.get("team"):
        errors.append("missing team")

    if player.get("position") not in valid_positions:
        errors.append("invalid position")

    if player.get("team") not in team_logos:
        errors.append("unknown team")

    if errors:
        print(f"ERROR: {player.get('name', 'Unknown Player')}")
        for error in errors:
            print(f"  - {error}")

    player["image"] = player["name"].lower().replace(" ", "-") + ".jpg"
    player["logo"] = team_logos[player["team"]]
    
    
    passing_tds = player.get("passingTouchdowns", 0)
    rushing_tds = player.get("rushingTouchdowns", 0)
    receiving_tds = player.get("receivingTouchdowns", 0)

    player["totalTouchdowns"] = (
        passing_tds +
        rushing_tds +
        receiving_tds
    )

with open("../src/data/processed_players.json", "w") as file:
    json.dump(players, file, indent=4)

print(f"Processed {len(players)} players")
print("Created processed_players.json")