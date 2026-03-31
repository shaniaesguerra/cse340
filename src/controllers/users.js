import bycrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js';
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
        const salt = await bycrypt.genSalt(10);
        const passwordHash = await bycrypt.hash(password, salt);

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

const showLoginForm = async (req, res) => {
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

            res.redirect('/'); //Redirect to homepage
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

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    userValidation,
    showLoginForm,
    processLoginForm,
    processLogout
};