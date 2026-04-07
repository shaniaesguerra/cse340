import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import db from "./db.js";

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user'; 
    const query = `
        INSERT INTO Users (name,email, password_hash, role_id)
        VALUES ($1, $2, $3, (SELECT role_id FROM Roles WHERE role_name = $4))
        RETURNING user_id
    `;

    const query_params = [name, email, passwordHash, default_role];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failes to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name, r.role_description
        FROM Users u
        JOIN Roles r ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const query_params = [email];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        return null; //User was not found
    }

    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    //Find user by email:
    const user = await findUserByEmail(email);

    //If no user, return null:
    if (!user) {
        return null;
    }

    //Verify if the password is correct:
    const passwordIsValid = await verifyPassword(password, user.password_hash);
    if (!passwordIsValid) {
        return null;
    }

    //Remove password_hash and return user:
    delete user.password_hash;
    return user;
};

const getAllUsers = async () => {
    const query = `
    SELECT u.name, u.email, r.role_name
    FROM Users u
    JOIN Roles r
    ON u.role_id = r.role_id
    `;

    const result = await db.query(query);

    if (result.rows.length === 0) {
        return null; //User was not found
    }

    return result.rows; //returns all rows if successful
};

export {
    createUser,
    authenticateUser,
    getAllUsers
};
