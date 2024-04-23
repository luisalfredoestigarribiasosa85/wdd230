const lastMod = document.getElementById('lastMod');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');

document.addEventListener("DOMContentLoaded", function () {
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

// Fetch weather data from OpenWeatherMap API
const apiKey = '2901ed8d3b5195ca71334a25c54c3369';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Itaugua&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Extract relevant weather data
        const currentWeather = data.list[0].weather[0].main;
        const currentTemperature = data.list[0].main.temp;
        const forecast = data.list.slice(1, 9); // Get next 24 hours forecast
        console.log(data);

        // Display current weather and forecast
        const weatherWidget = document.getElementById('weather-widget');
        weatherWidget.innerHTML = `
            <h2>Weather in Itaugua</h2>
            <p>${currentTemperature}°C</p>
            <img src="" alt="" id="weather-icon"> <!-- Icon placeholder -->
            <p>${currentWeather}</p>
            <h2>Three Day Forecast:</h2>
            <ul>
                ${forecast.map(entry => `<li>${entry.dt_txt}: ${entry.main.temp}°C</li>`).join('')}
            </ul>
        `;

        // Set weather icon based on currentWeather
        const weatherIcon = document.getElementById('weather-icon');
        if (currentWeather === "Rain") {
            weatherIcon.src = "images/rsz_agua.png";
            weatherIcon.alt = "Rainy Icon";
        } else if (currentWeather === "Clouds") {
            weatherIcon.src = "images/rsz_nubes.png";
            weatherIcon.alt = "Cloudy Icon";
        } else {
            weatherIcon.src = "images/rsz_dom.png";
            weatherIcon.alt = "Sunny Icon";
        }

    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

// Define the path to the JSON file
const chamberMembersUrl = "../chamber/data/members.json";

// Function to fetch data and display spotlight ads
async function getDataAndDisplayAds() {
    try {
        // Fetch data from the JSON file
        const response = await fetch(chamberMembersUrl);
        const data = await response.json();

        // Filter silver and gold members
        const silverGoldMembers = data.chamber_of_commerce_members.filter(member => member.membership_level === "Silver" || member.membership_level === "Gold");

        // Display spotlight advertisements
        displaySpotlightAds(silverGoldMembers);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to randomly select spotlight members
const selectRandomMembers = (members, count) => {
    const selectedMembers = [];
    const totalMembers = members.length;
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * totalMembers);
        selectedMembers.push(members[randomIndex]);
    }
    return selectedMembers;
};

// Function to display spotlight advertisements
const displaySpotlightAds = (members) => {
    const spotlightAdsContainer = document.getElementById('spotlight-ads');
    const randomMembers = selectRandomMembers(members, 3); // Select 3 random members
    spotlightAdsContainer.innerHTML = randomMembers.map(member => `
        <div class="spotlight-ad">
            <h2>${member.name}</h2>
            <img src="${member.image}" alt="${member.name}">
            <p>${member.additional_info}</p>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
        </div>
    `).join('');
};

// Call the function to fetch data and display spotlight ads
getDataAndDisplayAds();

// Function to determine if today is Monday, Tuesday, or Wednesday
const isBannerDay = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return dayOfWeek >= 1 && dayOfWeek <= 3; // Monday to Wednesday
};

// Function to display or hide the meet and greet banner
const toggleBanner = () => {
    const banner = document.getElementById('meet-and-greet-banner');
    if (isBannerDay()) {
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
};

// Function to close the meet and greet banner
const closeBanner = () => {
    const banner = document.getElementById('meet-and-greet-banner');
    banner.style.display = 'none';
};

// Call toggleBanner when the page loads
toggleBanner();



