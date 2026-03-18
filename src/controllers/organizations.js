//Import model functions
import { getAllOrganizations } from '../models/organizations.js';

//Define controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log(organizations); //debugging line
    const title = 'Our Partner Organizations';

    // Pass the organizations data to the template for rendering 
    res.render('organizations', { title, organizations });
};

//Export controller functions
export { showOrganizationsPage };
