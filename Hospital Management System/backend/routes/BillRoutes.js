const express = require("express"); 
const BillController = require("../adapters/controllers/BillController"); // Update the path if necessary

const { authenticateToken } = require('../middleware/authMiddleware');

class BillRoutes {
    constructor() {
        this.router = express.Router();
                this.initializeRoutes();
    }

    initializeRoutes() {
        // Use the same controller for all routes
        this.router.get("/bills", authenticateToken(['admin', 'doctor', 'patient']), BillController.findAllBills.bind(BillController));
        this.router.get("/bills/:id", authenticateToken(['admin', 'doctor', 'patient']), BillController.findSingleBill.bind(BillController));
        this.router.post("/bills/create", authenticateToken(['admin', 'doctor', 'patient']), BillController.addBill.bind(BillController));
        this.router.put("/bills/update/:id", authenticateToken(['admin', 'doctor']), BillController.updateBill.bind(BillController));
        this.router.delete("/bills/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), BillController.deleteBill.bind(BillController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new BillRoutes().getRouter();
