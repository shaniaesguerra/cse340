//Import necessary modules and functions
import { getServiceProjects, getProjectDetails, getUpcomingProjects } from '../models/projects.js'; 

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Define controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    // console.log(projects); //debugging line
    const title = 'Upcoming Service Projects';

    // Pass the projects data to the template for rendering
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId); 
    // console.log(projects); //debugging line
    const title = 'Service Projects';

    // Pass the projects data to the template for rendering
    res.render('project', { title, projectId,projectDetails });
};

//Export controller functions
export { showProjectsPage, showProjectDetailsPage};