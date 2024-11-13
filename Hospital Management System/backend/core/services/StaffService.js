const StaffRepository = require("../../adapters/repositories/StaffRepository");
const Doctor = require('../../models/Doctor');
Department = require('../entities/Department');
const User = require('../../core/entities/User');
class StaffService {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }

    async findAllStaff(user) {
        console.log("Service: Finding all staff for user:", user);
        const { email, role } = user;
        let staffMembers;
    
        if (role === "admin") {
            // Admin can fetch all staff members without condition
            staffMembers = await this.staffRepository.findAll();
        } else if (role === "doctor") {
            // Doctor can fetch only their own details
            const doctor = await this.staffRepository.getDoctorByStaffEmail(email);
            if (!doctor) {
                throw new Error("Doctor not found");
            }
    
            // Fetch only the specific doctor’s staff record by filtering with Emp_ID
            staffMembers = await this.staffRepository.findAll({
                Emp_ID: doctor.Emp_ID  // Pass the Emp_ID condition to findAll
            });
        } else {
            throw new Error("Unauthorized access");
        }
    
        return staffMembers;
    }
    

    async findSingleStaff(staffId) {
        return await this.staffRepository.findById(staffId);
    }

    async findStaffByEmail(email) {
        return await this.staffRepository.findByEmail(email);
    }

    async findDoctors() {
        return await this.staffRepository.findDoctors();
    }


    async addStaff(staffData) {
        return await this.staffRepository.create(staffData);
    }

    async updateStaff(staffId, staffData) {
        return await this.staffRepository.update(staffId, staffData);
    }

    async deleteStaff(staffId) {
        return await this.staffRepository.delete(staffId);
    }

    async checkStaffExistence(staffId) {
        return await this.staffRepository.checkExistence(staffId);
    }

    async getDoctorByStaffEmail(email) {
        return await this.staffRepository.getDoctorByStaffEmail(email);
    }
}

module.exports = new StaffService(StaffRepository);
