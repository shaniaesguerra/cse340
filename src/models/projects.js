import db from './db.js'

//Async function queries the database for all organizations
const getServiceProjects = async () => {
    const query = `
    SELECT org.name, sp.title, sp.description, sp.location, sp.date
    FROM public.Organization as org
    INNER JOIN public.ServiceProject as sp
    ON org.organization_id = sp.organization_id
    `;

    const result = await db.query(query);

    return result.rows; //returns all rows if successful
}

const getProjectsByOrganizationID = async (organizationId) => {
    const query = `
    SELECT
        project_id, organization_id, title, description, location, date
    FROM ServiceProject
    WHERE organization_id = $1
    ORDER BY date
    `;

    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    return result.rows; //returns all rows if successful
}

export { getServiceProjects, getProjectsByOrganizationID };