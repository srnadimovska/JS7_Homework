
const id = new URLSearchParams(window.location.search).get("id");
const showName = new URLSearchParams(window.location.search).get("name");
console.log(window.location.href);

const backLink = document.getElementById("back");

backLink.innerHTML = `<span class = previous>Back to ${showName}</span>`;
backLink.href = `episodes.html?id=${id}`;

document.getElementById("show-title").innerHTML += `${showName}`;

async function getCrew() {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/crew`);
    const crew = await response.json();
    return crew;
}

getCrew().then((crew )=> {
    populateCrew(crew);
});

function populateCrew(crew) {
    const crewContainerDiv = document.getElementById("crew-container");
    crew.forEach((crew) => {
        const crewDiv = document.createElement("div");
        crewDiv.classList.add("crew-item");

        crewDiv.innerHTML=`
        <div class = "person">
        <h3>${crew.person.name}</h3>
        <p>${crew.type}</p>
        <img src="${crew.person.image.medium}">
        <p>${crew.person.country?.name}</p>
        </div>
        `;
      crewContainerDiv.appendChild(crewDiv);

    })
}