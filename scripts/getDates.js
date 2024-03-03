const year = document.getElementById('year');
const lastModified = document.getElementById('lastModified');
document.addEventListener("DOMContentLoaded", function () {
    const getYear = new Date();
    year.textContent = getYear.getFullYear();

    if (lastModified) {
        getLastModified = document.lastModified;
        lastModified.innerHTML = `Last Modified: ${getLastModified}`;
    } else {
        console.log("Last Modified not found");
    }
})