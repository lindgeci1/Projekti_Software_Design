// MedicalHistoryController.js
const MedicalHistoryPort = require("../../ports/MedicalHistoryPort");

class MedicalHistoryController {
    async findAllMedicalHistories(req, res) {
        console.log("Fetching medical histories for user:", req.user);
        try {
            const medicalHistories = await MedicalHistoryPort.findAllMedicalHistories(req.user);
            res.status(200).json(medicalHistories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleMedicalHistory(req, res) {
        try {
            const medicalHistory = await MedicalHistoryPort.findSingleMedicalHistory(req.params.id);
            if (!medicalHistory) {
                return res.status(404).json({ message: "Medical history not found" });
            }
            res.status(200).json(medicalHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addMedicalHistory(req, res) {
        try {
            const newMedicalHistory = await MedicalHistoryPort.addMedicalHistory(req.body);
            res.status(201).json(newMedicalHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicalHistory(req, res) {
        try {
            const updatedMedicalHistory = await MedicalHistoryPort.updateMedicalHistory(req.params.id, req.body);
            if (!updatedMedicalHistory) {
                return res.status(404).json({ message: "Medical history not found or could not be updated" });
            }
            res.status(200).json(updatedMedicalHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicalHistory(req, res) {
        try {
            const deletedMedicalHistory = await MedicalHistoryPort.deleteMedicalHistory(req.params.id);
            if (!deletedMedicalHistory) {
                return res.status(404).json({ message: "Medical history not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MedicalHistoryController();
