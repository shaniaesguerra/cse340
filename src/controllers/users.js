import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllUsers, getProjectsByUserId} from '../models/users.js';
import { addVolunteer, deleteVolunteer} from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const userValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be between 3 and 100 characters'),
    body('email')
        .normalizeEmail()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const showUserRegistrationForm = (req, res) => {
    const title = 'User Registration';
    res.render('register', { title }); 
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //Hash the password before storing:
        //get random salt (text added to password before hashing to make it more secure)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //Create the user in the database
        const userId = await createUser(name, email, passwordHash);

        //Redirect to the homepage
        req.flash('success', 'Registration successful! You can now log in.');
        res.redirect('/');
        
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred while registering. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    const title = 'Login';
    res.render('login', { title });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);

        //Check to see is user object is returned
        if (user) {
            //Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in: ', user);
                //for debugging purposes
            }

            res.redirect('/dashboard'); //Redirect to dashboard
        } else {
            //If authentication fails (authenticateUser function returns null)
            req.flash('error', 'Invalid email or password.'); //Show error flash message
            res.redirect('/login'); //Redirect the user to login page
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};

const showDashboard = async (req, res) => {
    const user = req.session.user;
    //Fetch all projects with volunteers
    const allProjects = await getProjectsByUserId(user.user_id); 
    //console.log(allProjects); //for debugging
    
    // Set isVolunteer per project
    if (req.session && user) {
        allProjects.forEach(project => {
            project.isVolunteer = project.volunteers && project.volunteers.includes(user.user_id.toString());  // Ensure user_id is a string if needed
        });
    }

    //Filter projects to only include those that the user is volunteering for
    const projects = allProjects.filter(project => project.isVolunteer);
    
    if (!user) {
        req.flash('error', 'You must be logged in to view the dashboard.');
        return res.redirect('/login');
    }

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email,
        role_name: user.role_name,
        role_description: user.role_description,
        projects
    });
};

const requireRole = (role) => {
    return (req, res, next) => {
        //Check if user is logged in
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access that page.');
            return res.redirect('/login');//Redirect to login page
        }

        //Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access that page.');
            return res.redirect('/dashboard'); //Redirect to dashboard
        }

        //If required role matches the user role, continue
        next();
    };
};

const showUserPage = async (req, res) => {
    const users = await getAllUsers();
    const title = 'All Users';
    res.render('users', { title, users });
};

const volunteerForProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.body.projectId;
    try {
        await addVolunteer(userId, projectId);
        req.flash('success', 'You have successfully volunteered for this project!');

        //Redirect back to the page the user was on, or to dashboard if it is not available
        res.redirect(req.headers.referer || '/dashboard');  
    } catch (error) {
        console.error('Error volunteering for project:', error);
        req.flash('error', 'An error occurred while volunteering for the project. Please try again.');
        
        //Redirect back to the page the user was on, or to dashboard if it is not available
        res.redirect(req.headers.referer || '/dashboard');  
    }
};

const unvolunteerForProject = async (req, res) => {
    const userId = req.session.user.user_id;
    const projectId = req.body.projectId;
    try {
        await deleteVolunteer(userId, projectId);
        req.flash('success', 'You have unvolunteered for this project.');
        res.redirect(`/dashboard`);
    } catch (error) {
        console.error('Error unvolunteering for project:', error);
        req.flash('error', 'Failed to unvolunteer for the project. Please try again.');
        res.redirect(`/dashboard`);
    }
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    userValidation,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUserPage,
    volunteerForProject,
    unvolunteerForProject
};