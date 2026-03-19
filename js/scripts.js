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


function displayAboutMe() {
    const aboutMeDiv = document.getElementById('aboutMe');

    const bio = document.createElement('p');
    bio.textContent = aboutMeData.aboutMe || 'Bio coming soon.';

    const headshotContainer = document.createElement('div');
    headshotContainer.classList.add('headshotContainer');

    const headshot = document.createElement('img');
    headshot.src = aboutMeData.headshot || '';
    headshot.alt = 'Headshot photo';

    headshotContainer.appendChild(headshot);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(bio);
    fragment.appendChild(headshotContainer);

    aboutMeDiv.appendChild(fragment);
}