from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from backend.database import get_connection
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "NFL Stats API is running"}

@app.get("/players")
def get_players(position=None, team=None):
    connection = get_connection()
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    query = "SELECT * FROM players WHERE 1=1"
    parameters = []

    if position:
        query += " AND position = ?"
        parameters.append(position)

    if team:
        query += " AND team = ?"
        parameters.append(team)

    cursor.execute(query, parameters)

    players = [
        dict(row)
        for row in cursor.fetchall()
    ]

    connection.close()

    return players

@app.get("/players/{player_id}")
def get_player(player_id: str):
    connection = get_connection()
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM players WHERE id = ?",
        (player_id,)
    )

    player = cursor.fetchone()

    connection.close()

    if player is None:
        return {"error": "Player not found"}

    return dict(player)