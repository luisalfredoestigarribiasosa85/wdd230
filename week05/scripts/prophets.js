const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector("#cards");
async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const paragraph1 = document.createElement("p");
        const paragraph2 = document.createElement("p");
        paragraph1.textContent = `Date of Birth: ${prophet.birthdate}`;
        paragraph2.textContent =  `Place of Birth: ${prophet.birthplace}`;
        const portrait = document.createElement("img");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.src = prophet.imageurl;
        portrait.alt = `Portrait of ${prophet.name} ${prophet.lastname}`;
        portrait.loading = "lazy";
        portrait.width = "300";
        portrait.setAttribute("height", "400");

        card.appendChild(fullName);
        card.appendChild(paragraph1);
        card.appendChild(paragraph2);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}
getProphetData();