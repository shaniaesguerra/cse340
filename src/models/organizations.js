import db from './db.js'

//Async function queries the database for all organizations
const getAllOrganizations = async () => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
      FROM public.organization;
    `;

    const result = await db.query(query);

    return result.rows; //returns all rows if successful
}

export { getAllOrganizations }  