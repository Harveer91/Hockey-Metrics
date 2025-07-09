import requests #allows you to send HTTP requests (like GET) to external APIs

Live_info_url = "https://api-web.nhle.com" #this is the base url all endpoints are connected to  

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
    print(f"Fetching skater stats for team: {TEAM_ABBR}")
    response = requests.get(f"https://api-web.nhle.com/v1/club-stats/{TEAM_ABBR}/now")
    print(f"Response status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("Response JSON preview:", list(data.keys())) 
        team_skaters = data.get('skaters', [])
        print(f"Found {len(team_skaters)} skaters")
        return team_skaters
    else:
        print("Failed to receive roster data")
        return "Error: Failed to receive roster data"

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






    




