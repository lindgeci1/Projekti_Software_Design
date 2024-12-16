const bcrypt = require('bcrypt');
const User = require('../../core/entities/User');
const UserRole = require('../../core/entities/UserRole');
const Role = require('../../core/entities/Role');
const { Op, Sequelize } = require("sequelize");
const Patient = require('../../core/entities/Patient');
const Staff = require('../../core/entities/Staff'); // Make sure to import the Staff model
const UserPort = require('../../ports/UserPort'); 

class UserRepository extends UserPort{
    constructor() {
        super();
        this.Staff = Staff;
        this.UserRole = UserRole;
        this.Role = Role;
        this.User = User;
        this.Patient = Patient;
        this.Sequelize = Sequelize;
    }

    async findSingleUser(userId) {
        try {
            return await User.findByPk(userId, {
                include: [{
                    model: UserRole,
                    include: {
                        model: Role,
                        attributes: ['role_name'],
                    },
                }],
            });
        } catch (error) {
            throw new Error('Error finding user by ID: ' + error.message);
        }
    }
    async getPatientByEmail(email){
        try {
            const patient = await Patient.findOne({
                where: { Email: email }
            });
    
            if (!patient) {
                throw new Error('Patient not found');
            }
    
            return patient;
        } catch (error) {
            console.error('Error fetching patient by email:', error);
            throw error;
        }
    };
    async getUsersWithRoles() {
        try {
            const users = await User.findAll({
                include: [{
                    model: UserRole,
                    include: [{
                        model: Role,
                        attributes: ['role_name']
                    }]
                }],
                attributes: ['user_id', 'username', 'email']
            });
    
            const usersWithRoles = users.map(user => ({
                ...user.toJSON(),
                role: user.UserRoles.length > 0 ? user.UserRoles[0].Role.role_name : 'No Role'
            }));
    
            return usersWithRoles; 
        } catch (error) {
            console.error('Error fetching users with roles:', error);
            throw new Error('Internal server error');
        }
    }

    
    async AddUser(userData) {
        try {
            const { email, username, password, role } = userData;
    
            // Validate input fields
            if (!email || !username || !password || !role) {
                console.error('Validation error: All fields are required');
                return { error: 'All fields are required' }; // Return an error message
            }
    
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.error('Validation error: Invalid email address');
                return { error: 'Invalid email address' };
            }
    
            // Validate username length
            if (username.length < 3) {
                console.error('Validation error: Username must be at least 3 characters long');
                return { error: 'Username must be at least 3 characters long' };
            }
    
            // Validate password length
            if (password.length < 6) {
                console.error('Validation error: Password must be at least 6 characters long');
                return { error: 'Password must be at least 6 characters long' };
            }
    
            // Check if the user already exists by username
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                console.error('Validation error: User with the same username already exists');
                return { error: 'User with the same username already exists' };
            }
    
            // Check if the user already exists by email
            const existingUser1 = await User.findOne({ where: { email } });
            if (existingUser1) {
                console.error('Validation error: User with the same email already exists');
                return { error: 'User with the same email already exists' };
            }
    
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            const newUser = await User.create({
                email,
                username,
                password: hashedPassword,
            });
    
            // Find the role by name
            const userRole = await Role.findOne({ where: { role_name: role } });
            if (!userRole) {
                console.error('Validation error: Invalid role');
                return { error: 'Invalid role' };
            }
    
            // Assign the role to the user
            await UserRole.create({
                user_id: newUser.user_id,
                role_id: userRole.role_id,
            });
    
            return { success: true, message: 'User added successfully', data: newUser };
        } catch (error) {
            console.error('Error adding user:', error.message, error.stack);
            return { error: 'Internal Server Error' }; // Return error message
        }
    }
    
async UpdateUser(userId, userData) {
    try {
        const { email, username, password, role } = userData;

        // Validate input fields
        if (!email || !username || !role) {
            return { error: 'Email, username, and role are required' };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: 'Invalid email address' };
        }

        // Validate username length
        if (username.length < 3) {
            return { error: 'Username must be at least 3 characters long' };
        }

        // Check if the user exists
        const existingUser = await User.findOne({ where: { user_id: userId } });
        if (!existingUser) {
            return { error: 'User not found' };
        }

        // Check if the email is already taken by another user
        const existingEmail = await User.findOne({ where: { email, user_id: { [Op.ne]: userId } } });
        if (existingEmail) {
            return { error: 'User with the same email already exists' };
        }

        // Check if the username is already taken by another user
        const existingUsername = await User.findOne({ where: { username, user_id: { [Op.ne]: userId } } });
        if (existingUsername) {
            return { error: 'User with the same username already exists' };
        }

        // Check if there are any actual changes before updating
        const dataChanged = existingUser.email !== email || existingUser.username !== username || existingUser.role !== role;

        if (!dataChanged) {
            return { success: true, message: 'No changes detected' };  // No changes to update
        }

        // Proceed with the update since there are changes
        const [updated] = await User.update(
            { email, username, role },  // The fields to be updated
            { where: { user_id: userId } }  // The condition for the update
        );

        // Check if no rows were affected (meaning no actual update)
        if (updated === 0) {
            return { error: 'User not updated' };  // If no rows were affected, return error
        }

        // If update is successful, fetch the updated user
        const updatedUser = await User.findOne({ where: { user_id: userId } });

        // Find the role by name and update user's role
        const userRole = await Role.findOne({ where: { role_name: role } });
        if (!userRole) {
            return { error: 'Invalid role' };
        }

        // Update user's role
        await UserRole.update(
            { role_id: userRole.role_id },
            { where: { user_id: userId } }
        );

        return { success: true, message: 'User updated successfully', data: updatedUser }; // Return updated user data
    } catch (error) {
        console.error('Error updating user:', error);
        return { error: 'Internal Server Error' };
    }
}

async DeleteUser(userId) {
    try {
        // Check if the user exists
        const existingUser = await User.findOne({ where: { user_id: userId } });
        if (!existingUser) {
            return { error: 'User not found' }; // Return error if user does not exist
        }

        const userEmail = existingUser.email; // Get the email of the user to be deleted

        // Delete related staff and patients by the same email
        await Staff.destroy({ where: { email: userEmail } });
        await Patient.destroy({ where: { email: userEmail } });

        // Delete the user
        await User.destroy({ where: { user_id: userId } });

        return { success: true, message: 'User and associated staff/patients deleted successfully' };  
    } catch (error) {
        console.error('Error deleting user:', error);
        return { error: 'Internal Server Error' };  
    }
}

}
module.exports = new UserRepository();