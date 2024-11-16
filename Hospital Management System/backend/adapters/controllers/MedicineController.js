// MedicineController.js
const MedicinePort = require("../../ports/MedicinePort");

class MedicineController {
    constructor(medicinePort) {
        this.medicinePort = medicinePort;
    }
    async findAllMedicines(req, res) {
        console.log("Fetching medicines for user:", req.user);
        try {
            const medicines = await this.medicinePort.findAllMedicines(req.user);
            res.status(200).json(medicines);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleMedicine(req, res) {
        try {
            const medicine = await this.medicinePort.findSingleMedicine(req.params.id);
            if (!medicine) {
                return res.status(404).json({ message: "Medicine not found" });
            }
            res.status(200).json(medicine);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addMedicine(req, res) {
        try {
            const newMedicine = await this.medicinePort.addMedicine(req.body);
            res.status(201).json(newMedicine);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicine(req, res) {
        try {
            const updatedMedicine = await this.medicinePort.updateMedicine(req.params.id, req.body);
            if (!updatedMedicine) {
                return res.status(404).json({ message: "Medicine not found or could not be updated" });
            }
            res.status(200).json(updatedMedicine);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicine(req, res) {
        try {
            const deletedMedicine = await this.medicinePort.deleteMedicine(req.params.id);
            if (!deletedMedicine) {
                return res.status(404).json({ message: "Medicine not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MedicineController(MedicinePort);
