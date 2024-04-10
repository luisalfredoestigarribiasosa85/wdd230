const baseURL = "https://luisalfredoestigarribiasosa85.github.io/wdd230/";
const linksURL = "https://luisalfredoestigarribiasosa85.github.io/wdd230/data/links.json";

async function getLinks() {
    const response = await fetch(linksURL);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayLinks(data.weeks);
    } else {
        console.error(`HTTP error! status: ${response.status}`);
    }
}
getLinks();

function displayLinks(weeks) {
    const ul = document.querySelector('.card:nth-child(1) ul');

    // Clear existing content
    ul.innerHTML = '';

    weeks.forEach(weekObj => {
        // Iterate over each week object
        for (const key in weekObj) {
            if (weekObj.hasOwnProperty(key) && key.startsWith('week')) {
                const weekNumber = weekObj[key];
                const links = weekObj[`links${key.slice(4)}`]; // Extract links dynamically

                const li = document.createElement('li');
                li.textContent = `${weekNumber}: `;

                links.forEach(link => {
                    const a = document.createElement('a');
                    a.textContent = link.title;
                    a.href = link.url;
                    if (link.target) {
                        a.target = link.target;
                    }
                    const separator = document.createTextNode(' | ');
                    li.appendChild(a);
                    li.appendChild(separator);
                });

                // Remove the last separator
                li.removeChild(li.lastChild);

                ul.appendChild(li);
            }
        }
    });
}




