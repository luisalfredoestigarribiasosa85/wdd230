const lastMod = document.getElementById('lastMod');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.menu');

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

