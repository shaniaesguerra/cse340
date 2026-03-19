import db from './db.js'

//Async function queries the database for all organizations
const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
      FROM public.Category;
    `;

    const result = await db.query(query);

    return result.rows; //returns all rows if successful
}

//Get a category by its ID  
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, category_name
        FROM public.Category
        WHERE category_id = $1;
    `;
    const query_params = [categoryId];
    const result = await db.query(query, query_params);
    return result.rows; //returns all rows if successful
}

// Get categories for a given service project
const getCategoriesByProjectId = async (projectId) => {
  const query = ` 
    Select c.category_id, c.category_name
    FROM public.Category as c
    JOIN public.ServiceProject_Category AS spc
    ON c.category_id = spc.category_id
    WHERE spc.project_id = $1 
    `;
  
  const query_params = [projectId];
  const result = await db.query(query, query_params);
  return result.rows; //returns all rows if successful
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId };  