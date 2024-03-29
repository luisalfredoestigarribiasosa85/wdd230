const lastModified = document.getElementById( "lastModified" );

document.addEventListener('DOMContentLoaded', () => {
    const lastMod = document.lastModified;
    if (lastModified) {
        lastModified.innerText = `Last modified: ${lastMod}`;
    } else {
        console.log("Failed to find 'lastModified' element");
        }
});