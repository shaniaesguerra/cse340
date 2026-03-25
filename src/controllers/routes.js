import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';
import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation
} from './organizations.js';
import { showProjectDetailsPage } from './projects.js';
import { showCategoryDetailsPage } from './categories.js';

const router = express.Router(); //export this to server.js 

// Define routes and associate them with controller functions
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

//Error handling route for testing errors
router.get('/test-error', testErrorPage);

export default router;