// MedicinePort.js
const MedicineService = require("../core/services/MedicineService");

class MedicinePort {
    async findAllMedicines(user) {
        console.log("Calling MedicineService.findAllMedicines with user:", user);
        return await MedicineService.findAllMedicines(user);
    }

    async findSingleMedicine(medicineId) {
        return await MedicineService.findSingleMedicine(medicineId);
    }

    async addMedicine(medicineData) {
        return await MedicineService.addMedicine(medicineData);
    }

    async updateMedicine(medicineId, medicineData) {
        return await MedicineService.updateMedicine(medicineId, medicineData);
    }

    async deleteMedicine(medicineId) {
        return await MedicineService.deleteMedicine(medicineId);
    }
}

module.exports = new MedicinePort();
