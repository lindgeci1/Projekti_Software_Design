const express = require("express"); 
const Factory = require("../core/factories/Factory");  
const { authenticateToken } = require('../middleware/authMiddleware');

class PayrollRoutes {
    constructor() {
        this.router = express.Router();
        this.payrollController = Factory.createComponent('payroll');  // Create controller via factory once
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Use the same controller for all routes
        this.router.get("/payroll", authenticateToken(['admin', 'doctor']), this.payrollController.findAllPayrolls.bind(this.payrollController));
        this.router.get("/payroll/:id", authenticateToken(['admin', 'doctor']), this.payrollController.findSinglePayroll.bind(this.payrollController));
        this.router.post("/payroll/create", authenticateToken(['admin', 'doctor']), this.payrollController.addPayroll.bind(this.payrollController));
        this.router.put("/payroll/update/:id", authenticateToken(['admin', 'doctor']), this.payrollController.updatePayroll.bind(this.payrollController));
        this.router.delete("/payroll/delete/:id", authenticateToken(['admin', 'doctor']), this.payrollController.deletePayroll.bind(this.payrollController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PayrollRoutes().getRouter();
