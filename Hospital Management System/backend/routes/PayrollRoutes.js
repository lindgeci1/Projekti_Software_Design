const express = require("express");
const PayrollController = require("../adapters/controllers/PayrollController"); // Update the path if necessary
const { authenticateToken } = require('../middleware/authMiddleware');

class PayrollRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/payroll", authenticateToken(['admin', 'doctor', 'patient']), PayrollController.findAllPayrolls.bind(PayrollController));
        this.router.get("/payroll/:id", authenticateToken(['admin', 'doctor', 'patient']), PayrollController.findSinglePayroll.bind(PayrollController));
        this.router.post("/payroll/create", authenticateToken(['admin', 'doctor', 'patient']), PayrollController.addPayroll.bind(PayrollController));
        this.router.put("/payroll/update/:id", authenticateToken(['admin', 'doctor']), PayrollController.updatePayroll.bind(PayrollController));
        this.router.delete("/payroll/delete/:id", authenticateToken(['admin', 'doctor']), PayrollController.deletePayroll.bind(PayrollController));
        
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PayrollRoutes().getRouter();
