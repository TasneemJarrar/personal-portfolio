let aboutMeData;
let projectsData;

async function fetchData() {
    try {
        const aboutMeResponse = await fetch('./data/aboutMeData.json');
        aboutMeData = await aboutMeResponse.json();

        const projectsResponse = await fetch('./data/projectsData.json');
        projectsData = await projectsResponse.json();

        displayAboutMe();
        displayProjects();
        setupCharacterCounter(); 
        setupFormValidation();

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

    headshot.src = (aboutMeData.headshot || '').replace('../images/', './images/');
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

        const cardImage = (project.card_image || './images/card_placeholder_bg.webp').replace('../images/', './images/');
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
    updateSpotlight(projectsData[0]);
    setupScrollArrows();
    setupCardListeners();
}

function setupScrollArrows() {
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const projectList = document.getElementById('projectList');
    const isDesktop = window.matchMedia('(min-width: 1024px)');

    arrowLeft.addEventListener('click', () => {
        if (isDesktop.matches) {
            projectList.scrollBy({ top: -220, behavior: 'smooth' });
        } else {
            projectList.scrollBy({ left: -220, behavior: 'smooth' });
        }
    });

    arrowRight.addEventListener('click', () => {
        if (isDesktop.matches) {
            projectList.scrollBy({ top: 220, behavior: 'smooth' });
        } else {
            projectList.scrollBy({ left: 220, behavior: 'smooth' });
        }
    });
}

function updateSpotlight(project) {
    const spotlight = document.getElementById('projectSpotlight');
    const spotlightTitles = document.getElementById('spotlightTitles');
  const spotlightImage = (project.spotlight_image || './images/spotlight_placeholder_bg.webp').replace('../images/', './images/');    const title = document.createElement('h3');
    const longDesc = document.createElement('p');
    const link = document.createElement('a');
    const fragment = document.createDocumentFragment();

    spotlight.style.backgroundImage = `url(${spotlightImage})`;
    spotlight.style.backgroundSize = 'cover';
    spotlight.style.backgroundPosition = 'center';
    spotlightTitles.textContent = '';

    title.textContent = project.project_name || 'Untitled Project';

    longDesc.textContent = project.long_description || 'No description available.';

    link.textContent = 'Click here to see more...';
    link.href = project.url || '#';

    fragment.appendChild(title);
    fragment.appendChild(longDesc);
    fragment.appendChild(link);
    spotlightTitles.appendChild(fragment);
}

function setupCardListeners() {
    const cards = document.querySelectorAll('.projectCard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const project = projectsData.find(p => p.project_id === card.id);
            if (project) {
                updateSpotlight(project);
            }
        });
    });
}

// Form submission validation
function setupFormValidation() {
    const form = document.getElementById('formSection');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const illegalChars = /[^a-zA-Z0-9@._-]/;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        emailError.textContent = '';
        messageError.textContent = '';

        let isValid = true;
        if (email.value === '') {
            emailError.textContent = 'Email cannot be empty.';
            isValid = false;
        } else if (illegalChars.test(email.value)) {
            emailError.textContent = 'Email contains illegal characters.';
            isValid = false;
        } else if (!validEmail.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (message.value === '') {
            messageError.textContent = 'Message cannot be empty.';
            isValid = false;
        } else if (illegalChars.test(message.value)) {
            messageError.textContent = 'Message contains illegal characters.';
            isValid = false;
        } else if (message.value.length > 300) {
            messageError.textContent = 'Message cannot exceed 300 characters.';
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully! Validation passed.');
        }
    });
}

// setup Character Counter
function setupCharacterCounter() {
    const message = document.getElementById('contactMessage');
    const counter = document.getElementById('charactersLeft');
    message.addEventListener('input', () => {
        const count = message.value.length;
        counter.textContent = `Characters: ${count}/300`;
        if (count > 300) {
            counter.classList.add('error');
        } else {
            counter.classList.remove('error');
        }
    });
}

