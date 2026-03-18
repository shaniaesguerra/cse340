import db from './db.js'

//Async function queries the database for all organizations
const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.Organization;
    `;

    const result = await db.query(query);

    return result.rows; //returns all rows if successful
}

const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT
        organization_id, name, description, contact_email, logo_filename
        FROM Organization
        WHERE organization_id = $1;
        `;
    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    //Return the first row of the result, which should be the organization details
    // or null if no rows are found
    return result.rows.length > 0 ? result.rows[0] : null;
};

//Export the model functions
export { getAllOrganizations, getOrganizationDetails };  