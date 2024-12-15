const id = new URLSearchParams(window.location.search).get("id");
const showName = new URLSearchParams(window.location.search).get("name");

console.log(window.location.href);

document.getElementById("show-title").innerHTML += `${showName}`;
const backLink = document.getElementById("back");

backLink.innerHTML = `<span class = previous>Back to ${showName}</span>`;
backLink.href = `episodes.html?id=${id}`;


async function getCast() {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}/cast`);
    const cast = await response.json();
    return cast;
}

getCast().then((cast )=> {
    populateCast(cast);
});




function populateCast(cast) {
    const castContainerDiv = document.getElementById("cast-container");
    cast.forEach((cast) => {
        const castDiv = document.createElement("div");
        castDiv.classList.add("cast-item");
        castDiv.innerHTML = `
        <div class = "actor">
        <p>${cast.person.name}</p>
        <img src="${cast.person.image.medium}">
        <p>${cast.person.gender}</p>
        <p>${cast.person.country?.name}</p>
        <p>${cast.person.birthday}</p>
       
        </div>
        <div class ="role">
        <p>${cast.character.name}</p>
        <img src ="${cast.character.image.medium}">
        </div>
        
        `;

        castContainerDiv.appendChild(castDiv);
    });
}