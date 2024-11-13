const UserService = require("../core/services/UserService");

class UserPort {
    async findAllUsers() {
        console.log("Calling UserService.findAllUsers");
        return await UserService.findAllUsers();
    }

    async findSingleUser(userId) {
        console.log("Calling UserService.findSingleUser with ID:", userId);
        return await UserService.findSingleUser(userId);
    }

    async AddUser(userData) {
        console.log("Calling UserService.addUser with data:", userData);
        return await UserService.AddUser(userData);  // Make sure this calls the service method correctly
    }

// Port Layer
async UpdateUser(userId, userData) {
    console.log("Calling UserService.updateUser with ID:", userId);
    return await UserService.UpdateUser(userId, userData);  // Pass data to service
}


   // Port Layer: UserPort.js
// Port Layer: UserPort.js
async DeleteUser(userId) {
    try {
        // Call the service to delete the user
        const result = await UserService.DeleteUser(userId);

        // If the result contains an error, return it
        if (result.error) {
            return { error: result.error };  // Return an error object
        }

        return result;  // Return success result
    } catch (error) {
        console.error("Error in UserPort.DeleteUser:", error);
        return { error: 'Internal Server Error' };  // Return a general error if something fails
    }
}




    // Get users with their roles
    async getUsersWithRoles() {
        console.log("Calling UserService.getUsersWithRoles");
        return await UserService.getUsersWithRoles();
    }
}

module.exports = new UserPort();
