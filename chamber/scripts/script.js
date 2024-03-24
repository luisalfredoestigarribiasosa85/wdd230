const lastMod = document.getElementById('lastMod');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');


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

