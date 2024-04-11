const lastMod = document.getElementById('lastMod');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');

document.addEventListener("DOMContentLoaded", function() {
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("article");

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

fetch('../chamber/data/members.json')
    .then(response => response.json())
    .then(data => {
        renderMembers(data); // Initial rendering
        gridButton.addEventListener("click", () => renderMembers(data, "grid"));
        listButton.addEventListener("click", () => renderMembers(data, "list"));
    })
    .catch(error => console.error('Error fetching JSON:', error));

// Function to render members based on the selected view
function renderMembers(data, view = "grid") {
    const members = data.chamber_of_commerce_members;
    display.innerHTML = ""; // Clear previous content
    
    members.forEach(member => {
        const section = document.createElement("section");
        section.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>${member.additional_info}</p>
    `;

    if (view === "grid") {
        section.classList.add("grid-section");
    }

    display.appendChild(section);
    });
}
});

window.onload = function () {
    const timeStamp = document.querySelector('#timeStamp');
    const currentTimeStamp = new Date().toISOString();
    timeStamp.value = currentTimeStamp;
}

document.addEventListener('DOMContentLoaded', () => {
    if (lastMod) {
        const getLastMod = document.lastModified;
        lastMod.innerHTML = `Last Modification: ${getLastMod}`;
    }
});

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function () {
    var messageElement = document.getElementById('visits');
    var currentDate = Date.now();
    var lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!lastVisitDate) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        lastVisitDate = parseInt(lastVisitDate, 10);
        var timeDiff = currentDate - lastVisitDate;
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

        if (timeDiff < oneDay) {
            // Less than a day between visits
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            // More than a day between visits
            var daysBetweenVisits = Math.round(timeDiff / oneDay);
            var pluralSuffix = (daysBetweenVisits === 1) ? "" : "s";
            messageElement.textContent = "You last visited " + daysBetweenVisits + " day" + pluralSuffix + " ago.";
        }
    }

    // Store current date as last visit date
    localStorage.setItem('lastVisitDate', currentDate.toString());
});

