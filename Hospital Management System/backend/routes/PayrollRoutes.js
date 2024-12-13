const express = require("express"); 
const Factory = require("../core/factory_pattern/Factory");  
const { authenticateToken } = require('../middleware/authMiddleware');

class PayrollRoutes {
    constructor() {
        this.router = express.Router();
        this.payrollController = null; 
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/payroll", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('payroll', false);
            controller.findAllPayrolls(req, res);
        });

        this.router.get("/payroll/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('payroll', false);
            controller.findSinglePayroll(req, res);
        });

        this.router.post("/payroll/create", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('payroll', true);
            controller.addPayroll(req, res);
        });

        this.router.put("/payroll/update/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('payroll', false);
            controller.updatePayroll(req, res);
        });

        this.router.delete("/payroll/delete/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('payroll', false);
            controller.deletePayroll(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PayrollRoutes().getRouter();
