import express from 'express';

import { showHomePage } from './index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation,
    showEditProjectForm,
    processEditProjectForm
} from './projects.js';
import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './categories.js';
 
import { testErrorPage } from './errors.js';

const router = express.Router(); //export this to server.js 

// Define routes and associate them with controller functions
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// Form handling routes for creating a new organization
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Edit organization form route
router.get('/edit-organization/:id', showEditOrganizationForm);
//Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

//Route for new project page
router.get('/new-project', showNewProjectForm);
//Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

//Show the form for assigning categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
//Form submission for assigning categories to a project
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

//Show the form for editing a project
router.get('/edit-project/:id', showEditProjectForm);
//Form submission for editing a project
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

//Error handling route for testing errors
router.get('/test-error', testErrorPage);

export default router;