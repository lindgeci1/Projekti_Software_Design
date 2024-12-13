// PatientService.js
const PatientRepository = require("../../adapters/repositories/PatientRepository");

class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }

    async findAllPatients(user) {
        // console.log("Service: Finding all patients for user:", user);
        const { email, role } = user;
        return await this.patientRepository.findAllPatients(email, role);
    }

    async findSinglePatient(patientId) {
        return await this.patientRepository.findSinglePatient(patientId);
    }

    async addPatient(patientData) {
        return await this.patientRepository.addPatient(patientData);
    }

    async updatePatient(patientId, patientData) {
        return await this.patientRepository.updatePatient(patientId, patientData);
    }

    async deletePatient(patientId) {
        return await this.patientRepository.deletePatient(patientId);
    }

    async checkPatientExistence(patientId) {
        return await this.patientRepository.checkPatientExistence(patientId);
    }

    async findPatientByPersonalNumber(personalNumber) {
        return await this.patientRepository.findPatientByPersonalNumber(personalNumber);
    }

    async findRoomCostByPatientId(patientId) {
        try{
            console.log('Received patientId in Service:', patientId); // Log patientId
            return await this.patientRepository.findRoomCostByPatientId(patientId);
            
        }catch (error) {
            console.error('Error in service while fetching room cost:', error);
            throw new Error('Failed to fetch room cost'); // Customize this message as needed
        }
        
    }
    async findMedicineCostByPatientId(patientId) {
        try {
            console.log('Received patientId in Service:', patientId); // Log patientId
            return await this.patientRepository.findMedicineCostByPatientId(patientId);
        } catch (error) {
            console.error('Error in service while fetching medicine cost:', error);
            throw new Error('Failed to fetch medicine cost'); // Customize this message as needed
        }
    }
    
    

    async findEmailByPatientId(patientId) {
        return await this.patientRepository.findEmailByPatientId(patientId);
    }

    async checkPatientVisit(patientId) {
        return await this.patientRepository.checkPatientVisit(patientId);
    }
}

module.exports = new PatientService(PatientRepository);
