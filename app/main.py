from fastapi import FastAPI
from app.data_collector import get_player_stats
from app.data_collector import get_team_roster
from app.data_collector import get_team_stats
from app.data_collector import get_skater_stats_for_single_team
from app.data_collector import get_goalie_stats_one_team
                                
app = FastAPI()

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

@app.get("/team/{team_abbr}/skaters")
def team_skaters(team_abbr: str):
    return get_skater_stats_for_single_team(team_abbr)

@app.get("/team/{team_abbr}/goalies")
def team_goalies(team_abbr: str):
    return get_goalie_stats_one_team(team_abbr)

@app.get("/player/{player_id}")
def player_stats(player_id: int):
    return get_player_stats(player_id)


