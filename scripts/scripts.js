const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
const darkMode = document.querySelector('#darkMode');
const mainDark = document.querySelector('main');
const visits = document.querySelector('#visits');

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