from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

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
    with open("src/data/processed_players.json", "r") as file:
        players = json.load(file)

    if position:
        players = [
            player for player in players
            if player["position"] == position
        ]

    if team:
        players = [
            player for player in players
            if player["team"] == team
        ]

    return players