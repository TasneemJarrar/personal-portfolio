let aboutMeData;
let projectsData;

async function fetchData() {
    try {
        const aboutMeResponse = await fetch('../data/aboutMeData.json');
        aboutMeData = await aboutMeResponse.json();

        const projectsResponse = await fetch('../data/projectsData.json');
        projectsData = await projectsResponse.json();

        displayAboutMe();
        displayProjects();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
// Display About Me Section Data
function displayAboutMe() {
    const aboutMeDiv = document.getElementById('aboutMe');
    const bio = document.createElement('p');
    const headshotContainer = document.createElement('div');
    const headshot = document.createElement('img');
    const fragment = document.createDocumentFragment();

    bio.textContent = aboutMeData.aboutMe || 'Bio coming soon.';

    headshotContainer.classList.add('headshotContainer');

    headshot.src = aboutMeData.headshot || '';
    headshot.alt = 'Headshot photo';

    headshotContainer.appendChild(headshot);

    fragment.appendChild(bio);
    fragment.appendChild(headshotContainer);

    aboutMeDiv.appendChild(fragment);
}

// Display Projects Section Data
function displayProjects() {
    const projectList = document.getElementById('projectList');
    const fragment = document.createDocumentFragment();

    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('projectCard');
        card.id = project.project_id;

        const cardImage = project.card_image || './images/card_placeholder_bg.webp';
        card.style.backgroundImage = `url(${cardImage})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';

        const title = document.createElement('h4');
        title.textContent = project.project_name || 'Untitled Project';

        const shortDesc = document.createElement('p');
        shortDesc.textContent = project.short_description || 'No description available.';

        card.appendChild(title);
        card.appendChild(shortDesc);
        fragment.appendChild(card);
    });

    projectList.appendChild(fragment);
}


