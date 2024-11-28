const express = require("express"); 
const FactoryProvider = require("../AsbtractFactoryPattern/FactoryProvider"); 
const { authenticateToken } = require('../middleware/authMiddleware');

class RatingRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = FactoryProvider.getFactory('rating').createController(); this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/rating", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findAllRatings.bind(this.controller));
        this.router.get("/rating/:id", authenticateToken(['admin', 'doctor', 'patient']), this.controller.findSingleRating.bind(this.controller));
        this.router.post("/rating/create", authenticateToken(['admin', 'doctor', 'patient']), this.controller.addRating.bind(this.controller));
        this.router.put("/rating/update/:id", authenticateToken(['admin', 'doctor']), this.controller.updateRating.bind(this.controller));
        this.router.delete("/rating/delete/:id", authenticateToken(['admin', 'doctor', 'patient']), this.controller.deleteRating.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RatingRoutes().getRouter();
