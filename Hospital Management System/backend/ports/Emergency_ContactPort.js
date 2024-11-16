const EmergencyContactService = require("../core/services/Emergency_ContactService");

class EmergencyContactPort {
    constructor(emergencyContactService) {
        this.emergencyContactService = emergencyContactService;
    }
    async findAllEmergencyContacts(user) {
        console.log("Calling EmergencyContactService.findAllEmergencyContacts with user:", user);
        return await this.emergencyContactService.findAllEmergencyContacts(user);
    }

    async findSingleEmergencyContact(emergencyContactId) {
        return await this.emergencyContactService.findSingleEmergencyContact(emergencyContactId);
    }

    async addEmergencyContact(emergencyContactData) {
        return await this.emergencyContactService.addEmergencyContact(emergencyContactData);
    }

    async updateEmergencyContact(emergencyContactId, emergencyContactData) {
        return await this.emergencyContactService.updateEmergencyContact(emergencyContactId, emergencyContactData);
    }

    async deleteEmergencyContact(emergencyContactId) {
        return await this.emergencyContactService.deleteEmergencyContact(emergencyContactId);
    }
}

module.exports = new EmergencyContactPort(EmergencyContactService);
