const UserService = require("../../core/services/UserService");

class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    // Fetch all users (for admin)
    async findAllUsers(req, res) {
        console.log("Fetching users for user:", req.user);
        try {
            const users = await this.userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Fetch a single user by ID
    async findSingleUser(req, res) {
        try {
            const user = await this.userService.findSingleUser(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add a new user
// In your controller
async AddUser(req, res) {
    const { email, username, password, role } = req.body;

    // Call the service method with the request body data
    const result = await this.userService.AddUser({ email, username, password, role });

    // Handle the response based on the result
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    return res.json({ success: true, message: result.message, data: result.data });
}


    

    // Update user details by ID
// Controller Layer
// Controller Layer (UserController.js)
async UpdateUser(req, res) {
    try {
        const updatedUser = await this.userService.UpdateUser(req.params.id, req.body);  // Pass ID and body to port

        // If the update was successful
        if (updatedUser.success) {
            return res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser.data });
        }

        // If there was an error
        return res.status(400).json({ error: updatedUser.error });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



// Controller Layer: UserController.js
// Controller Layer: UserController.js
async DeleteUser(req, res) {
    try {
        const userId = req.params.id;  // Get user ID from the route params
        console.log("Received user ID:", userId);  // Debug log

        // Pass the userId to UserPort
        const deletedUser = await this.userService.DeleteUser(userId);

        // If there is an error, return an error response
        if (deletedUser.error) {
            return res.status(404).json({ message: deletedUser.error });
        }

        // Return success response with the message
        res.json({ success: true, message: deletedUser.message });  // Include the success message
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: error.message });
    }
}





    

    // Get users with their roles
    async getUsersWithRoles(req, res) {
        try {
            const users = await this.userService.getUsersWithRoles();
            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json(users); // Send the response here
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new UserController(UserService);

