const toggleMenu = () => {
    const nav = document.querySelector('.nav-bar ul');
    nav.classList.toggle('open');
}

function getSkaterStatsForSingleTeam(teamAbbr) {
  fetch(`http://127.0.0.1:8000/team/${teamAbbr}/stats/now`)
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
    MON: 'nhl-images/Montreal_Canadiens.svg.png',
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