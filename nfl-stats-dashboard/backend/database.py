import sqlite3
import json

DATABASE = "backend/nfl_stats.db"


def get_connection():
    return sqlite3.connect(DATABASE)


def initialize_database():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("DROP TABLE IF EXISTS players")

    cursor.execute("""
        CREATE TABLE players (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            team TEXT NOT NULL,
            position TEXT NOT NULL,
            passingYards INTEGER DEFAULT 0,
            passingTouchdowns INTEGER DEFAULT 0,
            interceptions INTEGER DEFAULT 0,
            rushingYards INTEGER DEFAULT 0,
            rushingTouchdowns INTEGER DEFAULT 0,
            receivingYards INTEGER DEFAULT 0,
            receivingTouchdowns INTEGER DEFAULT 0,
            totalTouchdowns INTEGER DEFAULT 0,
            image TEXT,
            logo TEXT
        )
    """)

    with open("src/data/processed_players.json", "r") as file:
        players = json.load(file)

    for player in players:
        cursor.execute("""
            INSERT OR REPLACE INTO players (
                id,
                name,
                team,
                position,
                passingYards,
                passingTouchdowns,
                interceptions,
                rushingYards,
                rushingTouchdowns,
                receivingYards,
                receivingTouchdowns,
                totalTouchdowns,
                image,
                logo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            player["id"],
            player["name"],
            player["team"],
            player["position"],
            player.get("passingYards", 0),
            player.get("passingTouchdowns", 0),
            player.get("interceptions", 0),
            player.get("rushingYards", 0),
            player.get("rushingTouchdowns", 0),
            player.get("receivingYards", 0),
            player.get("receivingTouchdowns", 0),
            player.get("totalTouchdowns", 0),
            player.get("image"),
            player.get("logo", "")
        ))

    connection.commit()
    connection.close()
    
if __name__ == "__main__":
        initialize_database()
        print("Database initialized successfully!")