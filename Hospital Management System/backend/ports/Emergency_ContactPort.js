// EmergencyContactPort.js
const EmergencyContactService = require("../core/services/Emergency_ContactService");

class EmergencyContactPort {
    async findAllEmergencyContacts(user) {
        console.log("Calling EmergencyContactService.findAllEmergencyContacts with user:", user);
        return await EmergencyContactService.findAllEmergencyContacts(user);
    }

    async findSingleEmergencyContact(emergencyContactId) {
        return await EmergencyContactService.findSingleEmergencyContact(emergencyContactId);
    }

    async addEmergencyContact(emergencyContactData) {
        return await EmergencyContactService.addEmergencyContact(emergencyContactData);
    }

    async updateEmergencyContact(emergencyContactId, emergencyContactData) {
        return await EmergencyContactService.updateEmergencyContact(emergencyContactId, emergencyContactData);
    }

    async deleteEmergencyContact(emergencyContactId) {
        return await EmergencyContactService.deleteEmergencyContact(emergencyContactId);
    }
}

module.exports = new EmergencyContactPort();
