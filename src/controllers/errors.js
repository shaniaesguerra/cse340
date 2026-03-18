//Display 500 error page for unmatched routes
// Test route for 500 errors
const testErrorPage = (req, res) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

//Export controller functions
export { testErrorPage };