// PatientPort.js
const PatientService = require("../core/services/PatientService");

class PatientPort {
    async findAllPatients(user) {
        console.log("Calling PatientService.findAllPatients with user:", user);
        return await PatientService.findAllPatients(user);
    }

    async findSinglePatient(patientId) {
        return await PatientService.findSinglePatient(patientId);
    }

    async addPatient(patientData) {
        return await PatientService.addPatient(patientData);
    }

    async updatePatient(patientId, patientData) {
        return await PatientService.updatePatient(patientId, patientData);
    }

    async deletePatient(patientId) {
        return await PatientService.deletePatient(patientId);
    }

    async checkPatientExistence(patientId) {
        return await PatientService.checkPatientExistence(patientId);
    }

    async findPatientByPersonalNumber(personalNumber) {
        return await PatientService.findPatientByPersonalNumber(personalNumber);
    }
    async findRoomCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Port:', patientId);
            return await PatientService.findRoomCostByPatientId(patientId);
        } catch (error) {
            console.error('Error in PatientPort while fetching room cost:', error); // Log entire error
            throw new Error('Unable to fetch room cost'); // Handle error appropriately
        }
    }
    


    async findMedicineCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Port:', patientId); // Log patientId
            return await PatientService.findMedicineCostByPatientId(patientId);
        } catch (error) {
            console.error('Error in PatientPort while fetching medicine cost:', error);
            throw new Error('Unable to fetch medicine cost'); // Handle error appropriately
        }
    }
    
    async findEmailByPatientId(patientId) {
        return await PatientService.findEmailByPatientId(patientId);
    }

    async checkPatientVisit(patientId) {
        return await PatientService.checkPatientVisit(patientId);
    }
}

module.exports = new PatientPort();
