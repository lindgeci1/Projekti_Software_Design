const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../core/entities/User'); // Assuming you have a User model

class RegisterRoutes {
    constructor() {
        this.router = express.Router();
        this.routes();
    }

    // Define routes and their corresponding handler functions
    routes() {
        this.router.post('/register', this.register.bind(this));
    }

    // Handler for user registration
    async register(req, res) {
        try {
            const { email, username, password, role } = req.body;

            // Validate required fields
            if (!email || !username || !password || !role) {
                return res.status(400).json({ message: 'Email, username, and password are required' });
            }

            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await User.create({
                email,
                username,
                password: hashedPassword,
                role,
            });

            // Generate JWT token
            const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send success response with token
            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Export an instance of the UserController with its router
module.exports = new RegisterRoutes().router;