// MedicineService.js
const MedicineRepository = require("../../adapters/repositories/MedicineRepository");

class MedicineService {
    constructor(medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    async findAllMedicines(user) {
        console.log("Service: Finding all medicines for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.medicineRepository.findAll();
        } else if (role === "doctor") {
            return await this.medicineRepository.findByDoctorEmail(email);
        } else if (role === "patient") {
            return await this.medicineRepository.findByPatientEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleMedicine(medicineId) {
        return await this.medicineRepository.findById(medicineId);
    }

    async addMedicine(medicineData) {
        return await this.medicineRepository.create(medicineData);
    }

    async updateMedicine(medicineId, medicineData) {
        return await this.medicineRepository.update(medicineId, medicineData);
    }

    async deleteMedicine(medicineId) {
        return await this.medicineRepository.delete(medicineId);
    }
}

module.exports = new MedicineService(MedicineRepository);
