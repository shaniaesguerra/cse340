import express from 'express'; //import EXPRESS library

// Define the the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();

//Route handler for GET results to the root URL ("/"):
// req = parameter represents the incoming requests
// res = parameter used to send a response back to clients
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

//Start the server and make it listen for incoming requests on the
// specifies port (3000):
app.listen(PORT, () => {
    //When successfully started, it logs a message to the console
    // indicating that it is running and provides the URL where it can be accessed.
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});