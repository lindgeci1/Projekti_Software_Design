const VisitService = require("../core/services/VisitService");
class VisitPort {
    // Fetch all visits for a user
    async findAllVisits(user) {
        return await VisitService.findAllVisits(user);
    }

    // Fetch a single visit by its ID
    async findSingleVisit(visitId) {
        return await VisitService.findSingleVisit(visitId);
    }

    // Fetch visits by patient ID
    async findVisitsByPatientId(patientId) {
        return await VisitService.findVisitsByPatientId(patientId);
    }

    // Add a new visit
    async addVisit(visitData) {
        return await VisitService.addVisit(visitData);
    }

    // Update an existing visit
    async updateVisit(visitId, visitData) {
        return await VisitService.updateVisit(visitId, visitData);
    }

    // Delete a visit by its ID
    async deleteVisit(visitId) {
        return await VisitService.deleteVisit(visitId);
    }
}

module.exports = new VisitPort();
