const express = require("express");
const { authenticateToken } = require('../middleware/authMiddleware');
const UserController = require("../adapters/controllers/UserController"); // Import UserController
const { loginUser, registerUser } = require("../controllers/AuthController");
class UserRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // User routes with role-based authentication
        this.router.get("/users", authenticateToken(['admin', 'doctor', 'patient']), UserController.getUsersWithRoles.bind(UserController));
        this.router.get("/users/:id", authenticateToken(['admin', 'doctor', 'patient']), UserController.findSingleUser.bind(UserController));
        this.router.post("/users/create", authenticateToken(['admin', 'doctor', 'patient']), UserController.AddUser.bind(UserController));
        this.router.put("/users/update/:id", authenticateToken(['admin', 'doctor', 'patient']), UserController.UpdateUser.bind(UserController));
        this.router.delete("/users/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), UserController.DeleteUser.bind(UserController));

        // Additional user-specific routes
        

        // Routes for login and registration
        this.router.post("/login", loginUser);

        // Route for user registration
        this.router.post("/register", registerUser);
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new UserRoutes().getRouter();
