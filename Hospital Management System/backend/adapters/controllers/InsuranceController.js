const InsurancePort = require("../../ports/InsurancePort");

class InsuranceController {
    async findAllInsurances(req, res) {
        console.log("Fetching insurances for user:", req.user);
        try {
            const insurances = await InsurancePort.findAllInsurances(req.user);
            res.status(200).json(insurances);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleInsurance(req, res) {
        try {
            const insurance = await InsurancePort.findSingleInsurance(req.params.id);
            if (!insurance) {
                return res.status(404).json({ message: "Insurance not found" });
            }
            res.status(200).json(insurance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addInsurance(req, res) {
        try {
            const newInsurance = await InsurancePort.addInsurance(req.body);
            res.status(201).json(newInsurance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateInsurance(req, res) {
        try {
            const updatedInsurance = await InsurancePort.updateInsurance(req.params.id, req.body);
            if (!updatedInsurance) {
                return res.status(404).json({ message: "Insurance not found or could not be updated" });
            }
            res.status(200).json(updatedInsurance);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteInsurance(req, res) {
        try {
            const deletedInsurance = await InsurancePort.deleteInsurance(req.params.id);
            if (!deletedInsurance) {
                return res.status(404).json({ message: "Insurance not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new InsuranceController();
