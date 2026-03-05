import express from 'express'; //import EXPRESS library
import { fileURLToPath } from 'url';
import path from 'path';

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


/**
  * Routes
  */
//Route handler for GET results to the root URL ("/"):
// req = parameter represents the incoming requests
// res = parameter used to send a response back to clients
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});

app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.html'));
});

//Start the server and make it listen for incoming requests on the
// specifies port (3000):
app.listen(PORT, () => {
    //When successfully started, it logs a message to the console
    // indicating that it is running and provides the URL where it can be accessed.
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});