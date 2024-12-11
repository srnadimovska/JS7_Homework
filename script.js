async function getShows(searchKeyword) {
    if (searchKeyword == "" || searchKeyword == undefined) {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        return data;
    } else {
        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${searchKeyword}`   
        );
        const data = await response.json();
        const mappedShows = data.map((x) => x.show);
        return mappedShows;
    }
}
const showsContainer = document.getElementById("tvshows");

getShows().then((shows) =>{
    populateShows(shows);
});

function populateShows(shows) {
    showsContainer.innerHTML="";
    var noResultsContainer = document.getElementById("empty");

    if (showsContainer.lenght == 0){
        noResultsContainer.innerHTML = `
        <img src="./images/no-results.png" />
        <h2>No results</h2>
        <p>Please change your search</p>
        `;
    } else {
        noResultsContainer.innerHTML="";
        
        shows.forEach ((show) => {
            const showDivElement = document.createElement ("div");
            showDivElement.classList.add("show")
            showDivElement.innerHTML = `
            <i class ="fa-solid fa-bookmark bookmark"></i>
            <img class="show-img" src="${show.image.medium}" />
            <div class = "show-data">
            <h2>${show.name}</h2>
            <p><i class = "fa-solid fa-star"></i> ${show.rating.average}</p>
            <div class="genres">
            ${show.genres .map((genre) => `<span class="genre">${genre}</span>`)
                .join("")}
                </div>
                <div class = "links">
                <a href="https://www.imdb.com/title/${
            show.externals.imdb
          }" target="_blank">Learn More</a>
        </div>
        </div>`;

        showDivElement.addEventListener("click", () => {
            window.location.href = `episodes.html?id=${show.id}`
        });

        showsContainer.appendChild(showDivElement);
        });
    }};

    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        getShows(searchInput.value).then((shows) => {
            populateShows(shows);
        });

        
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            getShows(searchInput.value).then((shows) => {
                populateShows (shows);
            });
        }

    });
