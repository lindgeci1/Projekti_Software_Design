const Staff = require("../../core/entities/Staff");
const Department = require("../../core/entities/Department");
const Doctor = require("../../models/Doctor");
const User = require("../../models/User");
const { Op, Sequelize } = require("sequelize");
const validateEmail = async (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return new Promise((resolve) => {
        resolve(re.test(String(email).toLowerCase()));
    });
};

class StaffRepository {
    constructor() {
        this.Staff = Staff;
        this.Department = Department;
        this.Doctor = Doctor;
        this.User = User;
        this.Sequelize = Sequelize;
    }

    async findAll(condition = {}) {
        console.log("Repository: Fetching staff members with condition:", condition);
        return await this.Staff.findAll({
            where: condition,  // Apply the condition here
            include: [{ model: this.Department }],
        });
    }
    

    async findById(staffId) {
        console.log("Repository: Fetching staff by ID:", staffId);
        return await this.Staff.findByPk(staffId, {
            include: [{ model: this.Department }],
        });
    }

    async findByEmail(email) {
        console.log("Repository: Fetching staff by email:", email);
        return await this.Staff.findOne({
            where: { Email: email },
            include: [{ model: this.Department }],
        });
    }

    async findDoctors() {
        console.log("Repository: Fetching all doctors");
        return await this.Staff.findAll({
            where: { Emp_type: "doctor" },
            include: [{ model: this.Department, attributes: ["Dept_name"] }],
        });
    }

    async create(staffData) {
        try {
            const { Emp_Fname, Emp_Lname, Joining_Date, Emp_type, Email, Address, Dept_ID, DOB, Qualifications, Specialization } = staffData;

            // Validate input fields
            if (!Emp_Fname || !Emp_Lname || !Joining_Date || !Emp_type || !Email || !Address || !Dept_ID || !DOB || !Qualifications || !Specialization) {
                throw new Error('All fields are required');
            }

            // Validate email format
            if (!validateEmail(Email)) {
                throw new Error('Invalid email format');
            }

            // Check if a staff member with the same Email, First Name, and Last Name already exists
            const existingStaff = await this.Staff.findOne({ 
                where: { 
                    Email,
                    Emp_Fname,
                    Emp_Lname 
                }
            });

            if (existingStaff) {
                throw new Error('Staff member with the same Email, First Name, and Last Name already exists');
            }

            // Check if the department exists
            const department = await this.Department.findOne({ where: { Dept_ID } });
            if (!department) {
                throw new Error('Department not found');
            }

            const existingEmail = await this.Staff.findOne({ where: { Email } });
            if (existingEmail) {
                throw new Error('Staff member with the same Email already exists');
            }

            // Fetch the user by email
            const user = await this.User.findOne({ where: { email: Email } });

            let userId = null;
            if (user) {
                userId = user.user_id; // Get the user_id from the existing user
            } else {
                // If the user does not exist, return an error
                throw new Error('No user found with the provided email.');
            }

            // Create the staff member in the 'staff' table
            const newStaff = await this.Staff.create({
                Emp_Fname,
                Emp_Lname,
                Joining_Date,
                Emp_type,
                Email,
                Address,
                Dept_ID,
                DOB,
                Qualifications,
                Specialization,
                user_id: userId
            });

            // Handle Doctor type
            if (Emp_type === 'Doctor') {
                console.log('Creating a doctor record...');
                const doctorQualifications = Qualifications || 'testtest';
                const doctorSpecialization = Specialization || 'testtest';

                await this.Doctor.create({
                    Emp_ID: newStaff.Emp_ID, // Use the Emp_ID as foreign key
                    Qualifications: doctorQualifications,
                    Specialization: doctorSpecialization
                });
            }

            return newStaff;
        } catch (error) {
            console.error('Error adding staff:', error);

        // Throw the actual error message back to the calling function
        throw new Error(error.message || 'Internal Server Error');
        }
    }

    async update(staffId, staffData) {
        try {
            const { Emp_Fname, Emp_Lname, Joining_Date, Emp_type, Email, Address, Dept_ID, DOB, Qualifications, Specialization } = staffData;

            // Validate input fields
            if (!Emp_Fname || !Emp_Lname || !Joining_Date || !Emp_type || !Email || !Address || !Dept_ID || !DOB || !Qualifications || !Specialization) {
                throw new Error('All fields are required');
            }

            // Validate email format
            if (!validateEmail(Email)) {
                throw new Error('Invalid email format');
            }

            // Check if a staff member with the same Email, First Name, and Last Name already exists (excluding the current staff member)
            const existingStaff = await this.Staff.findOne({
                where: {
                    Email,
                    Emp_Fname,
                    Emp_Lname,
                    Emp_ID: { [Op.ne]: staffId } // Exclude the current staff member
                }
            });

            if (existingStaff) {
                throw new Error('Staff member with the same Email, First Name, and Last Name already exists');
            }

            // Check if a staff member with the same Email exists (excluding the current staff member)
            const existingEmail = await this.Staff.findOne({
                where: {
                    Email,
                    Emp_ID: { [Op.ne]: staffId } // Exclude the current staff member
                }
            });

            if (existingEmail) {
                throw new Error('Staff member with the same Email already exists');
            }

            // Update the staff member in the 'staff' table
            const [updated] = await this.Staff.update(
                { Emp_Fname, Emp_Lname, Joining_Date, Emp_type, Email, Address, Dept_ID, DOB, Qualifications, Specialization },
                { where: { Emp_ID: staffId } }
            );

            if (updated === 0) {
                throw new Error('Staff not found or not updated');
            }

            // Handle Doctor type updates
            if (Emp_type === 'Doctor') {
                if (Qualifications || Specialization) {
                    await this.Doctor.update(
                        { Qualifications, Specialization },
                        { where: { Emp_ID: staffId } }
                    );
                }
            }

            return { success: true, message: 'Staff updated successfully' };
        } catch (error) {
            console.error('Error updating staff:', error);

        // Throw the actual error message back to the calling function
        throw new Error(error.message || 'Internal Server Error');
        }
    }

    async delete(staffId) {
        console.log("Repository: Deleting staff with ID:", staffId);
        const staffMember = await this.Staff.findOne({ where: { Emp_ID: staffId } });
        if (!staffMember) {
            throw new Error("Staff not found");
        }

        const deletedStaff = await this.Staff.destroy({ where: { Emp_ID: staffId } });
        if (deletedStaff === 0) {
            throw new Error("Staff not found or not deleted");
        }

        const deletedUser = await this.User.destroy({ where: { email: staffMember.Email } });
        if (deletedUser === 0) {
            throw new Error("User associated with staff not found");
        }

        return deletedStaff;
    }

    async checkExistence(staffId) {
        console.log("Repository: Checking if staff exists with ID:", staffId);
        const staff = await this.Staff.findByPk(staffId);
        if (!staff) {
            throw new Error("Staff not found");
        }
        return staff;
    }

    async getDoctorByStaffEmail(email) {
        console.log("Repository: Fetching doctor by staff email:", email);
        const staff = await Staff.findOne({
            where: { Email: email } // Check the email in the Staff table
        });

        if (!staff) {
            throw new Error('Staff member not found');
        }

        // Fetch the doctor associated with the staff member
        const doctor = await Doctor.findOne({
            where: { Emp_ID: staff.Emp_ID } // Use Emp_ID to find the associated doctor
        });

        if (!doctor) {
            throw new Error('Doctor not found');
        }

        return doctor;
    }
}

module.exports = new StaffRepository();
