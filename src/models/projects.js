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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
    SELECT
        project_id, organization_id, title, description, location, date
    FROM public.ServiceProject
    WHERE organization_id = $1
    ORDER BY date
    `;

    const query_params = [organizationId];
    const result = await db.query(query, query_params);

    return result.rows; //returns all rows if successful
}

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.date, sp.location, org.organization_id, org.name
    FROM public.Organization as org
    INNER JOIN public.ServiceProject as sp
    ON org.organization_id = sp.organization_id
    WHERE sp.date >= CURRENT_DATE
    ORDER BY sp.date ASC
    LIMIT $1
    `;

    const query_params = [number_of_projects];
    const result = await db.query(query, query_params);
    return result.rows; 
};

const getProjectDetails = async (projectId) => {
    const query = `
    SELECT sp.project_id, sp.title, sp.description, sp.date, sp.location, org.organization_id, org.name
    FROM public.Organization as org
    INNER JOIN public.ServiceProject as sp
    ON org.organization_id = sp.organization_id
    WHERE sp.project_id = $1
    `;

    const query_params = [projectId];
    const result = await db.query(query, query_params);
    return result.rows;
};

export { getServiceProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };