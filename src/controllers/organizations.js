//Import model functions
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationID } from '../models/projects.js';

//Define controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log(organizations); //debugging line
    const title = 'Our Partner Organizations';

    // Pass the organizations data to the template for rendering 
    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

//Export controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };
