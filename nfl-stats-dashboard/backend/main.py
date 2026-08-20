from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/")
def root():
    return {"message": "NFL Stats API is running"}

@app.get("/players")
def get_players():
    with open("src/data/processed_players.json", "r") as file:
        players = json.load(file)
        
    return players