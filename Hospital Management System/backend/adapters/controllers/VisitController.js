const VisitPort = require("../../ports/VisitPort");

class VisitController {
    // Fetch all visits for the user (based on their role)
    async findAllVisits(req, res) {
        console.log("Fetching visits for user:", req.user);
        try {
            const visits = await VisitPort.findAllVisits(req.user);
            res.status(200).json(visits);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Fetch a single visit by ID
    async findSingleVisit(req, res) {
        try {
            const visit = await VisitPort.findSingleVisit(req.params.id);
            if (!visit) {
                return res.status(404).json({ message: "Visit not found" });
            }
            res.status(200).json(visit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Fetch visits by patient ID
    async findVisitsByPatientId(req, res) {
        const { patientId } = req.params;
        try {
            const visits = await VisitPort.findVisitsByPatientId(patientId);
            if (!visits.length) {
                return res.status(404).json({ error: 'Visits not found' });
            }
            res.json(visits);
        } catch (error) {
            console.error('Error fetching visits by patient ID:', error.message);
            console.error(error.stack); // Log the stack trace for debugging
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Add a new visit
    async addVisit(req, res) {
        try {
            const newVisit = await VisitPort.addVisit(req.body);
            res.status(201).json(newVisit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update an existing visit
    async updateVisit(req, res) {
        try {
            const updatedVisit = await VisitPort.updateVisit(req.params.id, req.body);
            if (!updatedVisit) {
                return res.status(404).json({ message: "Visit not found or could not be updated" });
            }
            res.status(200).json(updatedVisit);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a visit by its ID
    async deleteVisit(req, res) {
        try {
            const deletedVisit = await VisitPort.deleteVisit(req.params.id);
            if (!deletedVisit) {
                return res.status(404).json({ message: "Visit not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VisitController();
