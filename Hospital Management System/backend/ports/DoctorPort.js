const DoctorService = require("../core/services/DoctorService");

class DoctorPort {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async findAllDoctors() {
        console.log("Calling DoctorService.findAllDoctors");
        return await this.doctorService.findAllDoctors();
    }

    async findSingleDoctor(doctorId) {
        console.log(`Calling DoctorService.findSingleDoctor with ID: ${doctorId}`);
        return await this.doctorService.findSingleDoctor(doctorId);
    }

    async addDoctor(doctorData) {
        console.log("Calling DoctorService.addDoctor with data:", doctorData);
        return await this.doctorService.addDoctor(doctorData);
    }

    async updateDoctor(doctorId, doctorData) {
        console.log(`Calling DoctorService.updateDoctor with ID: ${doctorId} and data:`, doctorData);
        return await this.doctorService.updateDoctor(doctorId, doctorData);
    }

    async deleteDoctor(doctorId) {
        console.log(`Calling DoctorService.deleteDoctor with ID: ${doctorId}`);
        return await this.doctorService.deleteDoctor(doctorId);
    }
}

module.exports = new DoctorPort(DoctorService);