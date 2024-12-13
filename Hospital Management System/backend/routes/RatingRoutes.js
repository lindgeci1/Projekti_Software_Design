const express = require("express");
const Factory = require("../core/factory_pattern/Factory");
const { authenticateToken } = require('../middleware/authMiddleware');

class RatingRoutes {
    constructor() {
        this.router = express.Router();
        this.ratingController = null;  
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/rating", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('rating', false);
            controller.findAllRatings(req, res);
        });

        this.router.get("/rating/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('rating', false);
            controller.findSingleRating(req, res);
        });

        this.router.post("/rating/create", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('rating', true); 
            controller.addRating(req, res);
        });

        this.router.put("/rating/update/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('rating', false);
            controller.updateRating(req, res);
        });

        this.router.delete("/rating/delete/:id", authenticateToken(['admin', 'doctor']), (req, res) => {
            const controller = Factory.createComponent('rating', false);
            controller.deleteRating(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RatingRoutes().getRouter();
