// MedicalHistoryService.js
const MedicalHistoryRepository = require("../../adapters/repositories/MedicalHistoryRepository");

class MedicalHistoryService {
    constructor(medicalHistoryRepository) {
        this.medicalHistoryRepository = medicalHistoryRepository;
    }

    async findAllMedicalHistories(user) {
        console.log("Service: Finding all medical histories for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.medicalHistoryRepository.findAll();
        } else if (role === "doctor") {
            return await this.medicalHistoryRepository.findByDoctorEmail(email);
        } else if (role === "patient") {
            return await this.medicalHistoryRepository.findByPatientEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleMedicalHistory(medicalHistoryId) {
        return await this.medicalHistoryRepository.findById(medicalHistoryId);
    }

    async addMedicalHistory(medicalHistoryData) {
        return await this.medicalHistoryRepository.create(medicalHistoryData);
    }

    async updateMedicalHistory(medicalHistoryId, medicalHistoryData) {
        return await this.medicalHistoryRepository.update(medicalHistoryId, medicalHistoryData);
    }

    async deleteMedicalHistory(medicalHistoryId) {
        return await this.medicalHistoryRepository.delete(medicalHistoryId);
    }
}

module.exports = new MedicalHistoryService(MedicalHistoryRepository);
