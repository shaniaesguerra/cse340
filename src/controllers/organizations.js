//Import model functions
import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { createOrganization } from '../models/organization.js';

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

const showNewOrganizationForm = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
}

const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    const logoFilename = 'placeholder-logo.png'; // Use the placeholder logo for all new organizations

    const organizationId = await createOrganization(name, description, contactEmail, logoFilename);
    
    //Set a success flash message
    req.flash('success', 'Organization added successfully!');
    
    //Redirect to the newly created organization's details page
    res.redirect(`/organization/${organizationId}`);
};

//Export controller functions
export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm };
