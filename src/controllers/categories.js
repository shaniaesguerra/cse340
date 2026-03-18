//Import necessary modules and functions
import { getAllCategories } from '../models/categories.js';

// Define controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories); //debugging line
    const title = 'Categories';

    // Pass the categories data to the template for rendering
    res.render('categories', { title, categories });
};

//Export controller functions
export { showCategoriesPage };