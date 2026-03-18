import express from 'express'; //import EXPRESS library
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getServiceProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Define the the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
// fileURLToPath = converts that URL to a file system path
// import.meta.url = gives the URL of the current module
const __dirname = path.dirname(__filename); //extracts just the directory portion

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// Tells Express that any file in your public directory
//    should be accessible directly through your website

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

/**
  * Routes
  */
//Route handler for GET results to the root URL ("/"):
// req = parameter represents the incoming requests
// res = parameter used to send a response back to clients
app.get('/', (req, res) => { 
    const title = 'Home';
    res.render('home', {title});
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    // console.log(organizations); //debugging line
    const title = 'Our Partner Organizations';

    // Pass the organizations data to the template for rendering 
    res.render('organizations', { title, organizations }); 
});

app.get('/projects', async(req, res) => {
    const projects = await getServiceProjects();
    // console.log(projects); //debugging line
    const title = 'Service Projects';

    // Pass the projects data to the template for rendering
    res.render('projects', { title, projects }); 
});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();    
    //console.log(categories); //debugging line
    const title = 'Categories';

    // Pass the categories data to the template for rendering
    res.render('categories', { title, categories });
});

//Start the server and make it listen for incoming requests on the
// specifies port (3000):
app.listen(PORT, async () => {
    try {
        await testConnection(); //test the database connection before starting the server
        //When successfully started, it logs a message to the console
        // indicating that it is running and provides the URL where it can be accessed.
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error conneting to the database:', error);
    }
    
});