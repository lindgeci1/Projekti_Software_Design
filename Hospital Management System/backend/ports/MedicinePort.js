// MedicinePort.js
const MedicineService = require("../core/services/MedicineService");

class MedicinePort {
    constructor(medicineService) {
        this.medicineService = medicineService;
    }
    async findAllMedicines(user) {
        console.log("Calling MedicineService.findAllMedicines with user:", user);
        return await this.medicineService.findAllMedicines(user);
    }

    async findSingleMedicine(medicineId) {
        return await this.medicineService.findSingleMedicine(medicineId);
    }

    async addMedicine(medicineData) {
        return await this.medicineService.addMedicine(medicineData);
    }

    async updateMedicine(medicineId, medicineData) {
        return await this.medicineService.updateMedicine(medicineId, medicineData);
    }

    async deleteMedicine(medicineId) {
        return await this.medicineService.deleteMedicine(medicineId);
    }
}

module.exports = new MedicinePort(MedicineService);
