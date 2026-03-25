import db from './db.js'

//Async function queries the database for all organizations
const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.Organization;
    `;

    const result = await db.query(query);

    return result.rows; //returns all rows if successful
};

const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT
        organization_id, name, description, contact_email, logo_filename
        FROM public.Organization
        WHERE organization_id = $1;
        `;
    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    //Return the first row of the result, which should be the organization details
    // or null if no rows are found
    return result.rows.length > 0 ? result.rows[0] : null;
};

const updateOrganization = async (organizationId, name, description, contactEmail, logoFilename) => {
    const query = `
        UPDATE public.Organization
        SET name = $1, description = $2, contact_email = $3, logo_filename = $4
        WHERE organization_id = $5
        RETURNING organization_id;
    `;
    const query_params = [name, description, contactEmail, logoFilename, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Organization not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated organization with ID:', result.rows[0].organization_id);
    }

    return result.rows[0].organization_id;
};

//Export the model functions
export {
    getAllOrganizations,
    getOrganizationDetails,
    updateOrganization
};  