const VisitRepository = require("../../adapters/repositories/VisitRepository");

class VisitService {
    constructor(visitRepository) {
        this.visitRepository = visitRepository;
    }

    // Fetch all visits based on the user's role and email
    async findAllVisits(user) {
        console.log("Service: Finding all visits for user:", user);
        const { email, role } = user;
        return await this.visitRepository.findAll(user); // Passing user to filter visits
    }

    // Fetch a single visit by ID
    async findSingleVisit(visitId) {
        return await this.visitRepository.findById(visitId);
    }
    async findVisitsByPatientId(patientId) {
        return await this.visitRepository.findVisitsByPatientId(patientId);
    }

    // Create a new visit
    async addVisit(visitData) {
        try {
            return await this.visitRepository.createVisit(visitData);
        } catch (error) {
            throw new Error("Error creating visit: " + error.message);
        }
    }

    async updateVisit(visitId, visitData) {
        try {
            return await this.visitRepository.updateVisit(visitId, visitData);
        } catch (error) {
            throw new Error("Error updating visit: " + error.message);
        }
    }

    // Delete a visit
    async deleteVisit(visitId) {
        const deleted = await this.visitRepository.delete(visitId);
        if (!deleted) {
            throw new Error("Visit deletion failed");
        }
        return true;
    }
}

module.exports = new VisitService(VisitRepository);
