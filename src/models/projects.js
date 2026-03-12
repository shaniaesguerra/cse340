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

export { getServiceProjects }  