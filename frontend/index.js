const toggleMenu = () => {
    const nav = document.querySelector('.nav-bar ul');
    nav.classList.toggle('open');
}

function getSkaterStatsForSingleTeam(teamAbbr) {
  fetch(`https://hockey-metrics.onrender.com/api/team/${teamAbbr}/stats/now`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      displaySkaterStats(data);
      updateTeamLogo(teamAbbr);
      update_team_name(teamAbbr);
    })
    .catch(err => {
      console.error(err);
      document.getElementById('team-info').innerText = 'Error fetching team skater stats.';
    });
}


function displaySkaterStats(data) {
  const teamInfoElem = document.getElementById('team-info');
  
  if (!Array.isArray(data) || data.length === 0) {
    teamInfoElem.innerHTML = '<p>No skater stats available.</p>';
    return;
  }
  //coloumn headers & keys
  const columns = [
    { key: 'fullName', label: 'Player Name' },
    { key: 'positionCode', label: 'Position' },
    {key: 'gamesPlayed', label:'Games Played'},
    { key: 'goals', label: 'Goals' },
    { key: 'assists', label: 'Assists' },
    { key: 'points', label: 'Points' },
    { key: 'shots', label: 'Shots' },
    { key: 'shootingPctg', label: 'Shooting %' },
    { key: 'plusMinus', label: '+/-' },

  ];
  
  let html = '<table border="1" cellspacing="0" cellpadding="5"><thead><tr>';
  
  // Header row
  columns.forEach(col => {
    html += `<th>${col.label}</th>`;
  });
  html += '</tr></thead><tbody>';
  
  data.forEach(player => {
    html += '<tr>';
    columns.forEach(col => {
        let value = player[col.key];

        if (col.key === 'fullName') {
            // Combine firstName and lastName 
            const fullName = `${player.firstName?.default || ''} ${player.lastName?.default || ''}`.trim();
             html += `<td>${fullName}</td>`;

        } else if (col.key === 'shootingPctg') {
            value = value !== undefined ? Number(value).toFixed(2) : '';
            html += `<td>${value}</td>`;
        }else {
            html += `<td>${value !== undefined ? value : ''}</td>`;
        }
    });

    html += '</tr>';
  });
  
  html += '</tbody></table>';
  
  teamInfoElem.innerHTML = html;
}

function updateTeamLogo(teamAbbr) {
  const logoMap = {
    ANA: 'nhl-images/Anaheim-Ducks-Logo.png',
    BOS: 'nhl-images/nhl-boston-bruins-logo.png',
    BUF: 'nhl-images/Buffalo_Sabres_Logo.svg.png',
    CGY: 'nhl-images/calgary-flames-logo.png',
    CAR: 'nhl-images/carolina-hurricanes-logo.png',
    CHI: 'nhl-images/chicago-blackhawks-logo.png',
    COL: 'nhl-images/colorado-avalanche-logo.png',
    CBJ: 'nhl-images/Columbus_Blue_Jackets_logo.svg.png',
    DAL: 'nhl-images/nhl-dallas-stars-logo.png',
    DET: 'nhl-images/Detroit_Red_Wings_logo.svg.png',
    EDM: 'nhl-images/edmonton-oilers-logo.png',
    FLA: 'nhl-images/florida-panthers-logo.png',
    LAK: 'nhl-images/Los_Angeles_Kings_2024_Logo.svg.png',
    MIN: 'nhl-images/Minnesota_Wild.svg.png',
    MTL: 'nhl-images/Montreal_Canadiens.svg.png',
    NSH: 'nhl-images/Nashville_Predators_Logo_(2011).svg.png',
    NJD: 'nhl-images/New_Jersey_Devils_logo.svg.png',
    NYI: 'nhl-images/Logo_New_York_Islanders.svg.png',
    NYR: 'nhl-images/1062px-New_York_Rangers.svg.png',
    OTT: 'nhl-images/Ottawa_Senators_2020-2021_logo.svg.png',
    PHI: 'nhl-images/Philadelphia_Flyers.svg.png',
    PIT: 'nhl-images/pittsburgh-penguins-logo.png',
    SJS: 'nhl-images/SanJoseSharksLogo.svg.png',
    SEA: 'nhl-images/nhl-seattle-kraken-logo.png',
    STL: 'nhl-images/St._Louis_Blues_logo.svg.png',
    TBL: 'nhl-images/tampa-bay-lightning-logo.png',
    TOR: 'nhl-images/Leafs-logo.png',
    UTA: 'nhl-images/UtahMammoth.svg.png',
    VAN: 'nhl-images/nhl-vancouver-canucks-logo.png',
    VGK: 'nhl-images/Vegas_Golden_Knights_logo.svg.png',
    WSH: 'nhl-images/Washington_Capitals.svg.png',
    WPG: 'nhl-images/Winnipeg_Jets_Logo_2011.svg.png',  
  };

  const logoSrc = logoMap[teamAbbr] || ''; 
  const logoElem = document.getElementById('changing-logo');
  if (logoElem) {
    logoElem.src = logoSrc;
    logoElem.alt = `${teamAbbr} Logo`;
  }
}

function update_team_name(teamAbbr){
    const logo_name = {
        ANA: 'Anaheim Ducks',
        BOS: 'Boston Bruins',
        BUF: 'Buffalo Sabres',
        CGY: 'Calgary Flames',
        CAR: 'Carolina Hurricanes',
        CHI: 'Chicago Blackhawks',
        COL: 'Colorado Avalanche',
        CBJ: 'Columbus Blue Jackets',
        DAL: 'Dallas Stars',
        DET: 'Detriot Red Wings',
        EDM: 'Edmonton Oilers',
        FLA: 'Florida Panthers',
        LAK: 'Los Angeles Kings',
        MIN: 'Minnesota Wild',
        MTL: 'Montreal Canadiens',
        NSH: 'Nashville Predators',
        NJD: 'New Jersey Devils',
        NYI: 'New York Islanders',
        NYR: 'New York Rangers',
        OTT: 'Ottawa Senators',
        PHI: 'Philadelphia Flyers',
        PIT: 'Pittsburgh Penguins',
        SJS: 'San Jose Sharks',
        SEA: 'Seattle Kraken',
        STL: 'St.Louis Blues',
        TBL: 'Tampa Bay Lightning',
        TOR: 'Toronto Maple Leafs',
        UTA: 'Utah Mammoth',
        VAN: 'Vanocuver Canucks',
        VGK: 'Vegas Golden Knights',
        WSH: 'Washington Capitals',
        WPG: 'Winnepeg Jets',    
    };

   const nameElem = document.getElementById('team-name');

  if (logo_name[teamAbbr]) {
    nameElem.innerHTML = logo_name[teamAbbr];
  } else {
    nameElem.innerHTML = 'Team Not Found';
  }
};

const toggleDropdown = () => {
  const dropdown = document.querySelector('.team-options');
  dropdown.classList.toggle('show');
};

window.onclick = (event) => {
    if (!event.target.matches(".team-dropdown")){
        const dropdowns = document.getElementsByClassName('team-options');
        for (let i = 0; i < dropdowns.length; i++){
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
};
 
const teamLinks = document.querySelectorAll('.team-options a');
teamLinks.forEach(link => {
  link.addEventListener('click', () => {
    const dropdown = document.querySelector('.team-options');
    dropdown.classList.remove('show');
  });
});

function getTopStatLeaders(category) {
  return fetch(`https://hockey-metrics.onrender.com/api/stats-leaders?category=${category}&limit=25`)
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      return data[category] || []; 
    });
}


function toggle_goal() {
    console.log("Goals button clicked");
    getTopStatLeaders("goals")
        .then(data => {
            display_stat_leaders(data);
        })
        .catch(err => console.error(err));
}


function toggle_assist(){
    getTopStatLeaders("assists")
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}

function toggle_points(){
    getTopStatLeaders('points')
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}

function toggle_plusMinus(){
    getTopStatLeaders('plusMinus')
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}

function toggle_faceoff(){
    getTopStatLeaders('faceoffLeaders')
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}

function toggle_PPG(){
    getTopStatLeaders('goalsPp')
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}

function toggle_SHG(){
    getTopStatLeaders('goalsSh')
    .then(data => {
        display_stat_leaders(data);
    })
        .catch(err => console.error(err))
}



function display_stat_leaders(data) {
  const containerId = "top_25_data";

  if (!Array.isArray(data) || data.length === 0) {
    document.getElementById(containerId).innerHTML = '<p>No data available.</p>';
    return;
  }

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'teamAbbrev', label: 'Team' },
    { key: 'position', label: 'Position' },
    { key: 'value', label: 'Stat Value' },
  ];

  let html = '<table border="1" cellspacing="0" cellpadding="5"><thead><tr>';

  columns.forEach(col => {
    html += `<th>${col.label}</th>`;
  });

  html += '</tr></thead><tbody>';

  data.forEach(player => {
    html += '<tr>';

    columns.forEach(col => {
      let val = player[col.key];

      if ((col.key === 'firstName' || col.key === 'lastName') && typeof val === 'object' && val !== null) {
        val = val.default || '';
      }

      html += `<td>${val !== undefined ? val : ''}</td>`;
    });

    html += '</tr>';
  });

  html += '</tbody></table>';

  document.getElementById(containerId).innerHTML = html;
}

//code for rookie stats app

function getRookieRankings(season = 2025, prospect_category = 1) {
  return fetch(`https://hockey-metrics.onrender.com/api/v1/draft/rankings/${season}/${prospect_category}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    });
}

const toggleLocationDropdown = () => {
  document.querySelector('.location-options').classList.toggle('show');
};

const toggleDraftClassDropdown = () => {
  document.querySelector('.draft-class').classList.toggle('show');
};

function handleRookieClick(event, season, prospect_category) {
  event.preventDefault();

  if (season === undefined) season = 2025;
  if (prospect_category === undefined) prospect_category = 1;

  document.querySelector('.location-options').classList.remove('show');
  document.querySelector('.draft-class').classList.remove('show');

  getRookieRankings(season, prospect_category)
    .then(data => {
      displayRookieRankings(data.rankings, 100);
    })
    .catch(error => {
      console.error(error);
      document.getElementById('rookie-results').innerText = 'Error fetching rookie rankings.';
    });
}

function getRookieRankings(season = 2025, prospect_category = 1) {
  return fetch(`https://hockey-metrics.onrender.com/api/v1/draft/rankings/${season}/${prospect_category}`)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    });
}

function displayRookieRankings(data, limit = 100) {
  const container = document.getElementById('rookie-results');
  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = '<p>No rookie rankings data available.</p>';
    return;
  }

  const columns = [
    { key: 'playerName', label: 'Player Name' },
    { key: 'positionCode', label: 'Position' },
    { key: 'shootsCatches', label: 'Shoots/Catches' },
    { key: 'heightInInches', label: 'Height (in)' },
    { key: 'weightInPounds', label: 'Weight (lbs)' },
    { key: 'lastAmateurClub', label: 'Amateur Club' },
    { key: 'lastAmateurLeague', label: 'Amateur League' },
    { key: 'birthDate', label: 'Birth Date' },
    { key: 'birthCity', label: 'Birth City' },
    { key: 'birthStateProvince', label: 'Birth State/Province' },
    { key: 'birthCountry', label: 'Birth Country' },
    { key: 'midtermRank', label: 'Midterm Rank' },
    { key: 'finalRank', label: 'Final Rank' },
  ];

  const limitedData = data.slice(0, limit);

  let html = '<table border="1" cellspacing="0" cellpadding="5"><thead><tr>';
  columns.forEach(col => {
    html += `<th>${col.label}</th>`;
  });
  html += '</tr></thead><tbody>';

  limitedData.forEach(player => {
    html += '<tr>';
    columns.forEach(col => {
      if (col.key === 'playerName') {
        const fullName = `${player.firstName ?? ''} ${player.lastName ?? ''}`.trim();
        html += `<td>${fullName}</td>`;
      } else {
        html += `<td>${player[col.key] ?? ''}</td>`;
      }
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// Close dropdown menus if clicking outside
window.onclick = (event) => {
  if (!event.target.classList.contains('rookie-dropdowns')) {
    document.querySelector('.location-options').classList.remove('show');
    document.querySelector('.draft-class').classList.remove('show');
  }
};
