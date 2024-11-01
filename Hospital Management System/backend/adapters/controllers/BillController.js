const BillPort = require("../../ports/BillPort");

class BillController {
    async findAllBills(req, res) {
        console.log("Fetching bills for user:", req.user);
        try {
            const bills = await BillPort.findAllBills(req.user);
            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findSingleBill(req, res) {
        try {
            const bill = await BillPort.findSingleBill(req.params.id);
            if (!bill) {
                return res.status(404).json({ message: "Bill not found" });
            }
            res.status(200).json(bill);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addBill(req, res) {
        try {
            const newBill = await BillPort.addBill(req.body);
            res.status(201).json(newBill);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateBill(req, res) {
        try {
            const updatedBill = await BillPort.updateBill(req.params.id, req.body);
            if (!updatedBill) {
                return res.status(404).json({ message: "Bill not found or could not be updated" });
            }
            res.status(200).json(updatedBill);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBill(req, res) {
        try {
            const deletedBill = await BillPort.deleteBill(req.params.id);
            if (!deletedBill) {
                return res.status(404).json({ message: "Bill not found" });
            }
            res.status(204).send(); // No content to send back
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BillController();
