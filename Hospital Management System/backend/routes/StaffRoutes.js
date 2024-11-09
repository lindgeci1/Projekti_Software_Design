const express = require("express");
const { authenticateToken } = require('../middleware/authMiddleware');
const StaffController = require("../adapters/controllers/StaffController"); // Update the path if necessary

class StaffRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/staff", authenticateToken(['admin', 'doctor', 'patient']), StaffController.findAllStaff.bind(StaffController));
        this.router.get("/staff/doctors", authenticateToken(['admin', 'doctor', 'patient']), StaffController.findDoctors.bind(StaffController));
        this.router.get("/staff/:id", authenticateToken(['admin', 'doctor', 'patient']), StaffController.findSingleStaff.bind(StaffController));
        this.router.post("/staff/create", authenticateToken(['admin', 'doctor']), StaffController.addStaff.bind(StaffController));
        this.router.put("/staff/update/:id", authenticateToken(['admin', 'doctor']), StaffController.updateStaff.bind(StaffController));
        this.router.delete("/staff/delete/:id", authenticateToken(['admin']), StaffController.deleteStaff.bind(StaffController));
        this.router.get("/staff/check/:id", authenticateToken(['admin', 'doctor', 'patient']), StaffController.checkStaffExistence.bind(StaffController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new StaffRoutes().getRouter();
