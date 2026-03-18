//Import necessary modules and functions
import { getServiceProjects } from '../models/projects.js'; 

// Define controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getServiceProjects();
    // console.log(projects); //debugging line
    const title = 'Service Projects';

    // Pass the projects data to the template for rendering
    res.render('projects', { title, projects });
};

//Export controller functions
export { showProjectsPage };