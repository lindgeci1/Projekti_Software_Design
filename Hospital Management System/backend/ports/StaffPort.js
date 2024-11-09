const StaffService = require("../core/services/StaffService");

class StaffPort {
    async findAllStaff(user) {
        console.log("Calling StaffService.findAllStaff with user:", user);
        return await StaffService.findAllStaff(user);
    }

    async findSingleStaff(staffId) {
        return await StaffService.findSingleStaff(staffId);
    }

    async findStaffByEmail(email) {
        return await StaffService.findStaffByEmail(email);
    }

    async findDoctors() {
        return await StaffService.findDoctors();
    }

    async addStaff(staffData) {
        return await StaffService.addStaff(staffData);
    }

    async updateStaff(staffId, staffData) {
        return await StaffService.updateStaff(staffId, staffData);
    }

    async deleteStaff(staffId) {
        return await StaffService.deleteStaff(staffId);
    }

    async checkStaffExistence(staffId) {
        return await StaffService.checkStaffExistence(staffId);
    }

    async getDoctorByStaffEmail(email) {
        return await StaffService.getDoctorByStaffEmail(email);
    }
}

module.exports = new StaffPort();
