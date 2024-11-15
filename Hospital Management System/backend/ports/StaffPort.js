const StaffService = require("../core/services/StaffService");

class StaffPort {
    constructor(staffService) {
        this.staffService = staffService;
    }
    async findAllStaff(user) {
        console.log("Calling StaffService.findAllStaff with user:", user);
        return await this.staffService.findAllStaff(user);
    }

    async findSingleStaff(staffId) {
        return await this.staffService.findSingleStaff(staffId);
    }

    async findStaffByEmail(email) {
        return await this.staffService.findStaffByEmail(email);
    }

    async findDoctors() {
        return await this.staffService.findDoctors();
    }

    async addStaff(staffData) {
        return await this.staffService.addStaff(staffData);
    }

    async updateStaff(staffId, staffData) {
        return await this.staffService.updateStaff(staffId, staffData);
    }

    async deleteStaff(staffId) {
        return await this.staffService.deleteStaff(staffId);
    }

    async checkStaffExistence(staffId) {
        return await this.staffService.checkStaffExistence(staffId);
    }

    async getDoctorByStaffEmail(email) {
        return await this.staffService.getDoctorByStaffEmail(email);
    }
}

module.exports = new StaffPort(StaffService);
