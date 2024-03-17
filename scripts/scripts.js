const hamburgerElement = document.querySelector('#myButton');
const navElement = document.querySelector('.menuLinks');
const darkMode = document.querySelector('#darkMode');
const mainDark = document.querySelector('main');

hamburgerElement.addEventListener('click', () => {
    // toggle class name on click of the button
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
});

darkMode.addEventListener('click', () => {
    mainDark.classList.toggle('dark');
});