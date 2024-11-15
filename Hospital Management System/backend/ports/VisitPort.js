const VisitService = require("../core/services/VisitService");
class VisitPort {
    constructor(visitService) {
        this.visitService = visitService;
    }
    // Fetch all visits for a user
    async findAllVisits(user) {
        return await this.visitService.findAllVisits(user);
    }

    // Fetch a single visit by its ID
    async findSingleVisit(visitId) {
        return await this.visitService.findSingleVisit(visitId);
    }

    // Fetch visits by patient ID
    async findVisitsByPatientId(patientId) {
        return await this.visitService.findVisitsByPatientId(patientId);
    }

    // Add a new visit
    async addVisit(visitData) {
        return await this.visitService.addVisit(visitData);
    }

    // Update an existing visit
    async updateVisit(visitId, visitData) {
        return await this.visitService.updateVisit(visitId, visitData);
    }

    // Delete a visit by its ID
    async deleteVisit(visitId) {
        return await this.visitService.deleteVisit(visitId);
    }
}

module.exports = new VisitPort(VisitService);
