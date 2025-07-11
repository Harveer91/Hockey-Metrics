import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data_collector import get_player_stats
from app.data_collector import get_team_roster
from app.data_collector import get_team_stats
from app.data_collector import get_skater_stats_for_single_team
from app.data_collector import get_goalie_stats_one_team
from app.data_collector import stat_leaders
                                
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
#can later change this for a welcome page 
def read_root():
    return {"message": "Hello, NHL Advanced Stats!"}


#Connects the api endpoints (Defines the pathways a user could potintially ask for and requests them from data_collector)
#Data collector 
@app.get("/team/{team_id}/roster")
def team_roster(team_id: int):
    return get_team_roster(team_id)

@app.get("/team/{team_abbr}/stats")
def team_stats(team_abbr: str):
    return get_team_stats(team_abbr, "20242025")

@app.get("/team/{team_abbr}/stats/now")
def team_skaters_now(team_abbr: str):
    return get_skater_stats_for_single_team(team_abbr)

@app.get("/team/{team_abbr}/goalies")
def team_goalies(team_abbr: str):
    return get_goalie_stats_one_team(team_abbr)

@app.get("/player/{player_id}")
def player_stats(player_id: int):
    return get_player_stats(player_id)

@app.get("/stats-leaders")
def get_stat_leaders(category: str, limit: int = 25):
    result = stat_leaders(category, limit)  
    return result

@app.get("/v1/draft/rankings/{season}/{prospect_category}")
def rookie_rankings(season: int, prospect_category: int):
    response = requests.get(f"https://api-web.nhle.com/v1/draft/rankings/{season}/{prospect_category}")
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to get rookie rankings. Status code: {response.status_code}"}