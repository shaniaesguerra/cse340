//Import necessary modules and functions
import { getAllCategories } from '../models/categories.js';
import { getProjectDetails, getProjectsByCategoryId } from '../models/projects.js';
import { getCategoryById, getCategoriesByProjectId, updateCategoryAssignment, createCategory} from '../models/categories.js';
import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules for category form
// Define validation rules for category form
const categoryValidation = [
    body('categoryName')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Category name must be between 3 and 150 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Category name can only contain letters, and spaces'),
];

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || []; 

    //Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    
    // Update category assignments for the project
    await updateCategoryAssignment(projectId, categoryIdsArray);

    //Flash a success message to the user
    req.flash('success', 'Categories assigned successfully!');
    
    // Redirect to the project details page or a success page
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    //Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        //Validation failed - loop through errors and set flash messages
        results.array().forEach(error => {
            req.flash('error', error.msg);
        });

        //Redirect back to the new category form
        return res.redirect('/new-category');
    };

    const { categoryName } = req.body;
    const categoryId = await createCategory(categoryName);
    
    //Set a success flash message
    req.flash('success', 'Category added successfully!');
    //Redirect to the categories page
    res.redirect(`/category/${categoryId}`);
};

//Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation
};