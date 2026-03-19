import express from 'express';

import { showHomePage } from './index.js';
import { showOrganizationsPage } from './organizations.js';
import { showProjectsPage } from './projects.js';
import { showCategoriesPage } from './categories.js';
import { testErrorPage } from './errors.js';
import { showOrganizationDetailsPage } from './organizations.js';
import { showProjectDetailsPage } from './projects.js';

const router = express.Router(); //export this to server.js 

// Define routes and associate them with controller functions
router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);

//Error handling route for testing errors
router.get('/test-error', testErrorPage);

export default router;