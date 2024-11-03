const PayrollPort = require("../../ports/PayrollPort");

class PayrollController {
    async findAllPayrolls(req, res) {
        console.log("Fetching payrolls for user:", req.user);
        try {
            const payrolls = await PayrollPort.findAllPayrolls(req.user); // Ensure this matches the function name
            res.status(200).json(payrolls);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSinglePayroll(req, res) {
        try {
            const payroll = await PayrollPort.findSinglePayroll(req.params.id);
            if (!payroll) {
                return res.status(404).json({ message: "Payroll not found" });
            }
            res.status(200).json(payroll);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addPayroll(req, res) {
        try {
            const newPayroll = await PayrollPort.addPayroll(req.body);
            res.status(201).json(newPayroll);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePayroll(req, res) {
        try {
            const updatedPayroll = await PayrollPort.updatePayroll(req.params.id, req.body);
            if (!updatedPayroll) {
                return res.status(404).json({ message: "Payroll not found or could not be updated" });
            }
            res.status(200).json(updatedPayroll);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePayroll(req, res) {
        try {
            const deletedPayroll = await PayrollPort.deletePayroll(req.params.id);
            if (!deletedPayroll) {
                return res.status(404).json({ message: "Payroll not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PayrollController();
