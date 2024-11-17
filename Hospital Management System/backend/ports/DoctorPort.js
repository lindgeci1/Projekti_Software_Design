const DoctorService = require("../core/services/DoctorService");

class DoctorPort {
    async findAllDoctors() {
        console.log("Calling DoctorService.findAllDoctors");
        return await DoctorService.findAllDoctors();
    }

    async findSingleDoctor(doctorId) {
        console.log(`Calling DoctorService.findSingleDoctor with ID: ${doctorId}`);
        return await DoctorService.findSingleDoctor(doctorId);
    }

    async addDoctor(doctorData) {
        console.log("Calling DoctorService.addDoctor with data:", doctorData);
        return await DoctorService.addDoctor(doctorData);
    }

    async updateDoctor(doctorId, doctorData) {
        console.log(`Calling DoctorService.updateDoctor with ID: ${doctorId} and data:`, doctorData);
        return await DoctorService.updateDoctor(doctorId, doctorData);
    }

    async deleteDoctor(doctorId) {
        console.log(`Calling DoctorService.deleteDoctor with ID: ${doctorId}`);
        return await DoctorService.deleteDoctor(doctorId);
    }
}

module.exports = new DoctorPort();