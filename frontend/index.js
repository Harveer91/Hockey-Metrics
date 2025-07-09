const toggleMenu = () => {
    const nav = document.querySelector('.nav-bar ul');
    nav.classList.toggle('open');
}

function getSkaterStatsForSingleTeam(teamAbbr) {
    fetch(`http://localhost:8000/team/${teamAbbr}/stats/now`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const teamInfoElem = document.getElementById('team-info');
      if (Array.isArray(data)) {
        // If data is an array (list of skaters), nicely format it
        teamInfoElem.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } else {
        // If it’s an error message or object
        teamInfoElem.innerText = JSON.stringify(data);
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('team-info').innerText = 'Error fetching team skater stats.';
    });
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

//Change this code 
const teamLinks = document.querySelectorAll('.team-options a');
teamLinks.forEach(link => {
  link.addEventListener('click', () => {
    const dropdown = document.querySelector('.team-options');
    dropdown.classList.remove('show');
  });
});