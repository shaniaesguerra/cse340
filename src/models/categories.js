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

export { getAllCategories }  