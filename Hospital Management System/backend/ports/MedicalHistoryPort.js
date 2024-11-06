// MedicalHistoryPort.js
const MedicalHistoryService = require("../core/services/MedicalHistoryService");

class MedicalHistoryPort {
    async findAllMedicalHistories(user) {
        console.log("Calling MedicalHistoryService.findAllMedicalHistories with user:", user);
        return await MedicalHistoryService.findAllMedicalHistories(user);
    }

    async findSingleMedicalHistory(medicalHistoryId) {
        return await MedicalHistoryService.findSingleMedicalHistory(medicalHistoryId);
    }

    async addMedicalHistory(medicalHistoryData) {
        return await MedicalHistoryService.addMedicalHistory(medicalHistoryData);
    }

    async updateMedicalHistory(medicalHistoryId, medicalHistoryData) {
        return await MedicalHistoryService.updateMedicalHistory(medicalHistoryId, medicalHistoryData);
    }

    async deleteMedicalHistory(medicalHistoryId) {
        return await MedicalHistoryService.deleteMedicalHistory(medicalHistoryId);
    }
}

module.exports = new MedicalHistoryPort();
