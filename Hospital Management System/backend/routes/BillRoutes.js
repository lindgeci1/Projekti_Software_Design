const express = require("express");
const Factory = require("../Factory");  
const { authenticateToken } = require('../middleware/authMiddleware');

class BillRoutes {
    constructor() {
        this.router = express.Router();
        this.billController = Factory.createComponent('bill');  // Create controller via factory once
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Use the same controller for all routes
        this.router.get("/bills", authenticateToken(['admin', 'doctor', 'patient']), this.billController.findAllBills.bind(this.billController));
        this.router.get("/bills/:id", authenticateToken(['admin', 'doctor', 'patient']), this.billController.findSingleBill.bind(this.billController));
        this.router.post("/bills/create", authenticateToken(['admin', 'doctor', 'patient']), this.billController.addBill.bind(this.billController));
        this.router.put("/bills/update/:id", authenticateToken(['admin', 'doctor']), this.billController.updateBill.bind(this.billController));
        this.router.delete("/bills/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), this.billController.deleteBill.bind(this.billController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new BillRoutes().getRouter();
