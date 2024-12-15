const id = new URLSearchParams(window.location.search).get("id");
const showName = new URLSearchParams(window.location.search).get("name");
console.log(window.location.href);

const backLink = document.getElementById("back");

backLink.innerHTML = `<span class = previous>Back to ${showName}</span>`;
backLink.href = `episodes.html?id=${id}`;

document.getElementById("show-title").innerHTML += `${showName}`;

async function getSeasons() {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/seasons`);
    const seasons = await response.json();
    return seasons;
    
};


getSeasons().then ((season) => { populateSeason(season);
});

function populateSeason(season) {
    const seasonContainerDiv = document.getElementById("seasons-container");
    season.forEach((season) => {
        const seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season-item");

        seasonDiv.innerHTML=`
        <div class = "season">
        <h3>Season:${season.number}</h3>
        <img src="${season.image.medium}">
        <p>Premiere date:${season.premiereDate}</p>
        <p>End date:${season.endDate}</p>
        <p>Number of episodes:${season.episodeOrder}</p>
        <p>${season.summary}</p>
        
        </div>
        `;
      seasonContainerDiv.appendChild(seasonDiv);

    })
};

