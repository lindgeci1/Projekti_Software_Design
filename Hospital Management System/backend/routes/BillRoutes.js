const express = require("express"); 
const FactoryProvider = require("../core/abstract-factory/FactoryProvider"); 
const { authenticateToken } = require('../middleware/authMiddleware');

class BillRoutes {
    constructor() {
        this.router = express.Router();
        // Use FactoryProvider to create the Bill controller
        this.controller = FactoryProvider.getFactory('bill').createController();  
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Use the same controller for all routes
        this.router.get("/bills", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findAllBills.bind(this.controller));
        this.router.get("/bills/:id", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findSingleBill.bind(this.controller));
        this.router.post("/bills/create", authenticateToken(['admin', 'doctor', 'patient']), this.controller.addBill.bind(this.controller));
        this.router.put("/bills/update/:id", authenticateToken(['admin', 'doctor']), this.controller.updateBill.bind(this.controller));
        this.router.delete("/bills/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), this.controller.deleteBill.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new BillRoutes().getRouter();
