const express = require("express"); 
const FactoryProvider = require("../AsbtractFactoryPattern/FactoryProvider"); 
const { authenticateToken } = require('../middleware/authMiddleware');

class PayrollRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = FactoryProvider.getFactory('payroll').createController(); this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/payroll", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findAllPayrolls.bind(this.controller));
        this.router.get("/payroll/:id", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findSinglePayroll.bind(this.controller));
        this.router.post("/payroll/create", authenticateToken(['admin', 'doctor', 'patient']), this.controller.addPayroll.bind(this.controller));
        this.router.put("/payroll/update/:id", authenticateToken(['admin', 'doctor']), this.controller.updatePayroll.bind(this.controller));
        this.router.delete("/payroll/delete/:id", authenticateToken(['admin', 'doctor']), this.controller.deletePayroll.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new PayrollRoutes().getRouter();
