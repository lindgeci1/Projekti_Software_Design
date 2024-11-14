const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../core/entities/User'); // Assuming you have a User model

class LoginRoutes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }

    // Define routes and their corresponding handler functions
    routes() {
        this.router.post('/login', this.login.bind(this));
    }

    // Handler for user login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findOne({ where: { email } });

            // If user not found, send error response
            if (!user) {
                return res.status(401).json({ message: 'User does not exist' });
            }

            // If password is incorrect, send error response
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            // If user and password are correct, generate JWT token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send token in response
            res.json({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

// Export an instance of the LoginRoutes with its router
module.exports = new LoginRoutes().router;