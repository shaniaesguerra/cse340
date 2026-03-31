import bycrypt from 'bcrypt';
import { createUser } from '../models/users.js';
import { body, validationResult } from 'express-validator';

const userValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Organization name must be between 3 and 100 characters'),
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

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    userValidation
};