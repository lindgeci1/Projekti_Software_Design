const express = require("express"); 
const Factory = require("../FactoryPattern/Factory");  
const { authenticateToken } = require('../middleware/authMiddleware');

class RatingRoutes {
    constructor() {
        this.router = express.Router();
        this.ratingController = Factory.createComponent('rating');  // Create controller via factory once
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Use the same controller for all routes
        this.router.get("/rating", authenticateToken(['admin', 'doctor']), this.ratingController.findAllRatings.bind(this.ratingController));
        this.router.get("/rating/:id", authenticateToken(['admin', 'doctor']), this.ratingController.findSingleRating.bind(this.ratingController));
        this.router.post("/rating/create", authenticateToken(['admin', 'doctor']), this.ratingController.addRating.bind(this.ratingController));
        this.router.put("/rating/update/:id", authenticateToken(['admin', 'doctor']), this.ratingController.updateRating.bind(this.ratingController));
        this.router.delete("/rating/delete/:id", authenticateToken(['admin', 'doctor']), this.ratingController.deleteRating.bind(this.ratingController));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RatingRoutes().getRouter();
