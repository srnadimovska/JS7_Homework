const id = new URLSearchParams(window.location.search).get("id");

async function getShowData(id) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await response.json();
  return show;
}

async function getEpisodes(id) {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = await response.json();
  return episodes;
}

getShowData(id).then((show) => {
  populateShow(show);
});

getEpisodes(id).then((episodes) => {
  populateEpisode(episodes);
});

function populateShow(show) {
  const showContainer = document.getElementById("show");
  const showTitle = document.getElementById("show-title");
  showTitle.innerText = show.name;

  const menu = document.getElementById("menu");
  menu.innerHTML = `
  <div class="menu">
  <span><a href = "cast.html?id=${show.id}&name=${show.name}">CAST</a></span>
  <span><a href = "crew.html?id=${show.id}&name=${show.name}">CREW</a></span>
  </div>
  `;

  const showDivElement = document.createElement("div");
  showDivElement.classList.add("show");
  showDivElement.innerHTML = `
  
    <div class="show-left">
    <img src="${show.image.original}" width="350"/>
    </div>
    
    <div class="show-right">
     <div class="genres">
    ${show.genres
      .map((genre) => `<span class = "genre">${genre}</span>`)
      .join("")}  
    </div>
    <p>${show.summary}</p>
    <p>Start: ${show.premiered}</p>
    <p>End: ${show.ended}</p>

    
     
    </div>
    `;

  showContainer.appendChild(showDivElement);
}

function populateEpisode(episodes) {
  const episodeContainer = document.getElementById("episodes");
  episodeContainer.innerHTML = `<p> Total episodes: ${episodes.length} </p>`;
  episodes.forEach((episode) => {
    const episodeDivElement = document.createElement("div");
    episodeDivElement.classList.add("episode");
    episodeDivElement.innerHTML = `
        <div class = "episode-img">
         <img src="${episode.image.medium}"/>
        </div>
        <div class = "episode-data">
        <div class = "episode-title-div">
        <h3>${episode.name}</h3>
        <span>${episode.airdate}</span>
        </div>
        <p>${episode.summary}<p>
        <div class = "episode-rate">
        <span><i class="fa fa-star" style="color: gold"></i> ${episode.rating.average}</span>
        <button><i class="fa fa-star" style="color: blue"></i> Rate</button>
        </div>
        </div>
        `;

    episodeContainer.appendChild(episodeDivElement);
  });
}
