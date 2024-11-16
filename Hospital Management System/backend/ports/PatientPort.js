// PatientPort.js
const PatientService = require("../core/services/PatientService");

class PatientPort {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async findAllPatients(user) {
        console.log("Calling PatientService.findAllPatients with user:", user);
        return await this.patientService.findAllPatients(user);
    }

    async findSinglePatient(patientId) {
        return await this.patientService.findSinglePatient(patientId);
    }

    async addPatient(patientData) {
        return await this.patientService.addPatient(patientData);
    }

    async updatePatient(patientId, patientData) {
        return await this.patientService.updatePatient(patientId, patientData);
    }

    async deletePatient(patientId) {
        return await this.patientService.deletePatient(patientId);
    }

    async checkPatientExistence(patientId) {
        return await this.patientService.checkPatientExistence(patientId);
    }

    async findPatientByPersonalNumber(personalNumber) {
        return await this.patientService.findPatientByPersonalNumber(personalNumber);
    }
    async findRoomCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Port:', patientId);
            return await this.patientService.findRoomCostByPatientId(patientId);
        } catch (error) {
            console.error('Error in PatientPort while fetching room cost:', error); // Log entire error
            throw new Error('Unable to fetch room cost'); // Handle error appropriately
        }
    }
   


    async findMedicineCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Port:', patientId); // Log patientId
            return await this.patientService.findMedicineCostByPatientId(patientId);
        } catch (error) {
            console.error('Error in PatientPort while fetching medicine cost:', error);
            throw new Error('Unable to fetch medicine cost'); // Handle error appropriately
        }
    }
   
    async findEmailByPatientId(patientId) {
        return await this.patientService.findEmailByPatientId(patientId);
    }

    async checkPatientVisit(patientId) {
        return await this.patientService.checkPatientVisit(patientId);
    }
}

module.exports = new PatientPort(PatientService);