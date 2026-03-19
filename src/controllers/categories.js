//Import necessary modules and functions
import { getAllCategories } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';
import { getCategoryById, getCategoriesByProjectId } from '../models/categories.js';

// Define controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories); //debugging line
    const title = 'Categories';

    // Pass the categories data to the template for rendering
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';  
    
    // Pass the category details and projects data to the template for rendering
    res.render('category', { title, categoryDetails, projects });   
};

//Export controller functions
export { showCategoriesPage, showCategoryDetailsPage };