import db from './db.js'

//Async function queries the database for all organizations
const getAllCategories = async () => {
  const query = `
        SELECT category_id, category_name
      FROM public.Category;
    `;

  const result = await db.query(query);

  return result.rows; //returns all rows if successful
};

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
};

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
};

const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
    INSERT INTO public.ServiceProject_Category (project_id, category_id)
    VALUES ($1, $2);
    `;
  
  await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignment = async (projectId, categoryIds) => {
  //Remove the existing category assignment for the project
  const deleteQuery = `
    DELETE FROM public.ServiceProject_Category
    WHERE project_id = $1 ;
    `;
  await db.query(deleteQuery, [projectId]);

  //Add the new category assignment for the project
  for(const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

const createCategory = async (categoryName) => {
  const query = `
    INSERT INTO Category (category_name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const query_params = [categoryName];
  const result = await db.query(query, query_params);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new category with ID:', result.rows[0].category_id);
  }
  
  return result.rows[0].category_id;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  updateCategoryAssignment,
  createCategory  
};  