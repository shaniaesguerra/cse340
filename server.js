import express from 'express'; //import EXPRESS library
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

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

app.get('/organizations', (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get('/projects', (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

app.get('/categories', (req, res) => {
    const title = 'Categories';
    res.render('categories', { title });
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