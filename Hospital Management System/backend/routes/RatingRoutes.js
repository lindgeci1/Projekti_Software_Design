const express = require("express");
const RatingController = require("../adapters/controllers/RatingController"); // Update the path if necessary
const { authenticateToken } = require('../middleware/authMiddleware');

class RatingRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/rating", authenticateToken(['admin', 'doctor', 'patient']), RatingController.findAllRatings.bind(RatingController));
        this.router.get("/rating/:id", authenticateToken(['admin', 'doctor', 'patient']), RatingController.findSingleRating.bind(RatingController));
        this.router.post("/rating/create", authenticateToken(['admin', 'doctor', 'patient']), RatingController.addRating.bind(RatingController));
        this.router.put("/rating/update/:id", authenticateToken(['admin', 'doctor']), RatingController.updateRating.bind(RatingController));
        this.router.delete("/rating/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), RatingController.deleteRating.bind(RatingController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RatingRoutes().getRouter();
