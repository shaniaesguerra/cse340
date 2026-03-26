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

//Get service project for a given category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
    SELECT sp.project_id,
           sp.organization_id,
           sp.title,
           sp.description,
           sp.location,
           sp.date
    FROM public.ServiceProject AS sp
    JOIN public.ServiceProject_Category AS spc
    ON sp.project_id = spc.project_id
    WHERE spc.category_id = $1
    `;

    const query_params = [categoryId];
    const result = await db.query(query, query_params);
    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO public.ServiceProject (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const query_params = [title, description, location, date, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
      UPDATE public.ServiceProject
      SET organization_id = $6, title = $2, description = $3, location = $4, date = $5
      WHERE project_id = $1
      RETURNING project_id;
    `;

    const query_params = [projectId, title, description, location, date, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to update project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

export {
    getServiceProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByCategoryId,
    createProject,
    updateProject
};