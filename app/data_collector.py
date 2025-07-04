import requests #allows you to send HTTP requests (like GET) to external APIs

Live_info_url = "https://api-web.nhle.com/v1/" #this is the base url all endpoints are connected to  

#gets full roster of selected NHL team 
def get_team_roster(team_id: int):
    response = requests.get(f"{Live_info_url}teams/{team_id}/roster") #this is just f scripting 
    if response.status_code == 200: #.status_code is a number that tells you what happened when the request was made and if it returns 200 its working (just a check to see if request worked)
        return response.json()
    return("error: Failed to get Roster")
#this function requires user input which will be gotten throoguht the front end code
 

def get_team_stats(TEAM_ABBR: str, season_id: str):
    #cant do the same thing as previous function as this is basic endpoint and thus must filter for team
    response = requests.get("https://api.nhle.com/stats/rest/en/team")
    if response.status_code == 200:
        teams = response.json().get('data', [])
        #converts JSON respon to python dict
        for selected_team in teams:
            if selected_team.get("TEAM_ABBR","").lower() == TEAM_ABBR.lower():
                return selected_team 
        return("error: Team you selected was not found")
    return("error: Failed to get team stats")

def get_skater_stats_for_single_team(TEAM_ABBR: str):
    team_skaters = []
    response = requests.get("https://api.nhle.com/stats/rest/en/skater")
    if response.status_code == 200:
        teams = response.json().get('data', [])
        for selected_team_player in teams:
            if selected_team_player.get("TEAM_ABBR","").lower() == TEAM_ABBR.lower():
                team_skaters.append(selected_team_player)
        return team_skaters
    else:
        return("Error: Failed to recieve roster data")

    #gets the stats for players on one team 

def get_player_stats(player_id: int):
    response = requests.get(f"{Live_info_url}player/{player_id}/landing")
    if response.status_code == 200:
        return response.json()
    return("error: Failed to retrieve player stats")
#gets stats for one specific player 


def get_goalie_stats_one_team(TEAM_ABBR: str):
    goalie_pair = []
    response = requests.get("https://api.nhle.com/stats/rest/en/goalie")
    if response.status_code == 200:
        goalies = response.json().get("data", [])
        for selected_goalie in goalies:
            if selected_goalie.get("TEAM_ABBR","").lower() == TEAM_ABBR.lower():
                goalie_pair.append(selected_goalie)
        return goalie_pair
    else:
        return("Error: Failed to goaltender data")






    




