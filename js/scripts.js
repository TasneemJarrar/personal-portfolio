let aboutMeData;
let projectsData;

async function fetchData() {
    try {
        const aboutMeResponse = await fetch('../data/aboutMeData.json');
        aboutMeData = await aboutMeResponse.json();

        const projectsResponse = await fetch('../data/projectsData.json');
        projectsData = await projectsResponse.json();

        populateAboutMe();
        populateProjects();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
