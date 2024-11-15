const MedicalHistoryService = require("../core/services/MedicalHistoryService");

class MedicalHistoryPort {
    constructor(medicalHistoryService) {
        this.medicalHistoryService = medicalHistoryService;
    }
    async findAllMedicalHistories(user) {
        console.log("Calling MedicalHistoryService.findAllMedicalHistories with user:", user);
        return await this.medicalHistoryService.findAllMedicalHistories(user);
    }

    async findSingleMedicalHistory(medicalHistoryId) {
        return await this.medicalHistoryService.findSingleMedicalHistory(medicalHistoryId);
    }

    async addMedicalHistory(medicalHistoryData) {
        return await this.medicalHistoryService.addMedicalHistory(medicalHistoryData);
    }

    async updateMedicalHistory(medicalHistoryId, medicalHistoryData) {
        return await this.medicalHistoryService.updateMedicalHistory(medicalHistoryId, medicalHistoryData);
    }

    async deleteMedicalHistory(medicalHistoryId) {
        return await this.medicalHistoryService.deleteMedicalHistory(medicalHistoryId);
    }
}

module.exports = new MedicalHistoryPort(MedicalHistoryService);