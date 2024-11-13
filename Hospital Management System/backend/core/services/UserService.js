const UserRepository = require("../../adapters/repositories/UserRepository");

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findAllUsers() {
        console.log("Service: Finding all users");
        return await this.userRepository.findAll();
    }

    async findSingleUser(userId) {
        console.log("Service: Finding user with ID:", userId);
        return await this.userRepository.findById(userId);
    }

// In service layer
async AddUser(userData) {
    try {
        return await this.userRepository.AddUser(userData);
    } catch (error) {
        throw new Error(error.message);  // Ensure errors are thrown to be caught in controller
    }
}


   // Service Layer
async UpdateUser(userId, userData) {
    console.log("Service: Updating user with ID:", userId);
    return await this.userRepository.UpdateUser(userId, userData);  // Pass userId and data to repository
}


// Service Layer: UserService.js
// Service Layer: UserService.js
async DeleteUser(userId) {
    try {
        console.log("Service: Deleting user with ID:", userId);
        // Call the repository method to delete the user and return the result
        return await this.userRepository.DeleteUser(userId);
    } catch (error) {
        console.error("Error in UserService.DeleteUser:", error);
        return { error: 'Internal Server Error' };  // Return a general error if something fails
    }
}


    // Call to UserRepository to get users with roles
    async getUsersWithRoles() {
        console.log("Service: Getting users with roles");
        return await this.userRepository.getUsersWithRoles();
    }
}

module.exports = new UserService(UserRepository);
