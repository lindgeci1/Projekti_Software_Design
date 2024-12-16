

class UserPort {

    async findSingleUser(userId) {
        try {
            console.log(`Method: findSingleUser called with userId: ${userId}`);
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in findSingleUser: ${error.message}`);
        }
    }

    async getPatientByEmail(email) {
        try {
            console.log(`Method: getPatientByEmail called with email: ${email}`);
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in getPatientByEmail: ${error.message}`);
        }
    }


    async AddUser(userData) {
        try {
            console.log(`Method: addUser called with userData: ${JSON.stringify(userData)}`);
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in addUser: ${error.message}`);
        }
    }

    async UpdateUser(userId, userData) {
        try {
            console.log(`Method: updateUser called with userId: ${userId} and userData: ${JSON.stringify(userData)}`);
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in updateUser: ${error.message}`);
        }
    }

    async DeleteUser(userId) {
        try {
            console.log(`Method: deleteUser called with userId: ${userId}`);
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in deleteUser: ${error.message}`);
        }
    }

    async getUsersWithRoles() {
        try {
            console.log("Method: getUsersWithRoles called");
            throw new Error("Method not implemented");
        } catch (error) {
            console.error(`Error in getUsersWithRoles: ${error.message}`);
        }
    }
}

module.exports = UserPort;

