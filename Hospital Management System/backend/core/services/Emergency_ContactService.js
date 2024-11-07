const EmergencyContactRepository = require("../../adapters/repositories/Emergency_ContactRepository");

class EmergencyContactService {
    constructor(emergencyContactRepository) {
        this.emergencyContactRepository = emergencyContactRepository;
    }

    async findAllEmergencyContacts(user) {
        console.log("Service: Finding all emergency contacts for user:", user);
        const { email, role } = user;
        if (role === "admin") {
            return await this.emergencyContactRepository.findAll();
        } else if (role === "patient") {
            return await this.emergencyContactRepository.findByPatientEmail(email);
        } else {
            throw new Error("Unauthorized access");
        }
    }

    async findSingleEmergencyContact(contactId) {
        return await this.emergencyContactRepository.findById(contactId);
    }

    async addEmergencyContact(contactData) {
        return await this.emergencyContactRepository.create(contactData);
    }

    async updateEmergencyContact(contactId, contactData) {
        return await this.emergencyContactRepository.update(contactId, contactData);
    }

    async deleteEmergencyContact(contactId) {
        return await this.emergencyContactRepository.delete(contactId);
    }
}

module.exports = new EmergencyContactService(EmergencyContactRepository);
