const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
const darkMode = document.querySelector('#darkMode');
const mainDark = document.querySelector('main');
const visits = document.querySelector('#visits');
const weather = document.querySelector('#weather');
const weatherImage = document.querySelector('#weatherImage');
const caption = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-25.39&lon=-57.35&appid=2901ed8d3b5195ca71334a25c54c3369&units=imperial';

hamburgerElement.addEventListener('click', () => {
    // toggle class name on click of the button
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

darkMode.addEventListener('click', () => {
    mainDark.classList.toggle('dark');
});

let numVisits = Number(window.localStorage.getItem('numVisits-ls')) || 0;
if (numVisits !== 0) {
    visits.textContent = `Visits: ${numVisits}`;
} else {
    visits.textContent = 'Welcome. This is your first visit'
}
numVisits++;
window.localStorage.setItem('numVisits-ls', numVisits);

async function getWeather() {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        showWeatherData(data);
    } else {
        console.log(`HTTP error! status: ${response.text()}`);
    }
}
getWeather();

function showWeatherData(data) {
    const iconCode = data.weather[0].icon;
    const imgUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    let description = data.weather[0].description;

    weather.innerHTML = `${data.main.temp}&deg;F - ${description}`;
    weatherImage.setAttribute('src', imgUrl);
    weatherImage.setAttribute('alt', description);
    caption.textContent = description;
}